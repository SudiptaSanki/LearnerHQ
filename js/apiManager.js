// ============================================
// API Manager - Centralized API Key Rotation
// Handles Gemini keys rotation and Hugging Face integration
// ============================================

const APIManager = {
    // Gemini API Keys (8 slots - rotating pool)
    // Get your API key from: https://aistudio.google.com/apikey
    geminiKeys: [
        '',  // Key 1 - Add your Gemini API key here
        '',  // Key 2
        '',  // Key 3
        '',  // Key 4
        '',  // Key 5
        '',  // Key 6
        '',  // Key 7
        ''   // Key 8 - Reserved for future
    ],

    // Hugging Face Token
    // Get your token from: https://huggingface.co/settings/tokens
    huggingFaceToken: '',

    // Current key index for rotation
    currentKeyIndex: 0,

    // Usage tracking
    keyUsage: {
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
    },

    // API URLs
    GEMINI_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
    HF_INFERENCE_URL: 'https://api-inference.huggingface.co/models/',

    // Get next available Gemini key (round-robin)
    getNextGeminiKey() {
        const activeKeys = this.geminiKeys.filter(key => key && key.length > 0);
        if (activeKeys.length === 0) {
            console.error('No Gemini API keys configured!');
            return null;
        }

        // Find next non-empty key
        let attempts = 0;
        while (attempts < 8) {
            this.currentKeyIndex = (this.currentKeyIndex + 1) % 8;
            if (this.geminiKeys[this.currentKeyIndex]) {
                this.keyUsage[this.currentKeyIndex]++;
                console.log(`Using Gemini Key #${this.currentKeyIndex + 1} (used ${this.keyUsage[this.currentKeyIndex]} times)`);
                return this.geminiKeys[this.currentKeyIndex];
            }
            attempts++;
        }

        return activeKeys[0];
    },

    // Call Gemini API with rotation
    async callGemini(prompt, options = {}) {
        // Reset failed keys on new call (if not in retry mode)
        if (!options._isRetry) {
            this.failedKeys = new Set();
            this.retryCount = 0;
        }

        // Check if we've exceeded max retries
        const maxRetries = options.maxRetries || 3;
        if (this.retryCount >= maxRetries) {
            console.error('Max retries exceeded. All API keys may be rate limited.');
            return { 
                error: true, 
                message: 'API rate limit reached. Please try again in a few minutes.',
                rateLimited: true
            };
        }

        const apiKey = this.getNextGeminiKey();
        if (!apiKey) {
            return { error: true, message: 'No API keys available' };
        }

        // Check if this key has already failed
        if (this.failedKeys && this.failedKeys.has(this.currentKeyIndex)) {
            // All keys have failed
            if (this.failedKeys.size >= this.geminiKeys.filter(k => k && k.length > 0).length) {
                return { 
                    error: true, 
                    message: 'All API keys are currently rate limited. Please try again in a few minutes.',
                    rateLimited: true
                };
            }
        }

        try {
            const response = await fetch(`${this.GEMINI_URL}?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    generationConfig: {
                        temperature: options.temperature || 0.7,
                        maxOutputTokens: options.maxTokens || 1024
                    }
                })
            });

            if (!response.ok) {
                // Handle rate limits (429), forbidden (403), and bad requests (400)
                if (response.status === 429 || response.status === 403 || response.status === 400) {
                    const reason = response.status === 429 ? 'rate limited' : 
                                  response.status === 403 ? 'forbidden' : 'bad request';
                    console.warn(`Key #${this.currentKeyIndex + 1} failed (${reason}), trying next key...`);
                    if (!this.failedKeys) this.failedKeys = new Set();
                    this.failedKeys.add(this.currentKeyIndex);
                    this.retryCount = (this.retryCount || 0) + 1;
                    
                    // Check if all active keys have failed
                    const activeKeys = this.geminiKeys.filter(k => k && k.length > 0);
                    if (this.failedKeys.size >= activeKeys.length) {
                        return { 
                            error: true, 
                            message: 'All API keys temporarily unavailable. Please try again in a moment.',
                            rateLimited: true
                        };
                    }
                    
                    // Retry with next key (limited retries)
                    return this.callGemini(prompt, { ...options, _isRetry: true });
                }
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

            // Reset on success
            this.failedKeys = new Set();
            this.retryCount = 0;

            return { success: true, text, keyUsed: this.currentKeyIndex + 1 };

        } catch (error) {
            console.error('Gemini API error:', error);
            return { error: true, message: error.message };
        }
    },

    // Call Hugging Face Inference API
    async callHuggingFace(prompt, model = 'meta-llama/Llama-3.2-3B-Instruct') {
        console.log('Calling Hugging Face API as fallback...');
        try {
            const response = await fetch(`${this.HF_INFERENCE_URL}${model}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.huggingFaceToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: 500,
                        temperature: 0.7,
                        return_full_text: false
                    }
                })
            });

            if (!response.ok) {
                // Try a simpler model if first one fails
                if (model !== 'google/flan-t5-large') {
                    console.log('Trying alternative HF model...');
                    return this.callHuggingFace(prompt, 'google/flan-t5-large');
                }
                throw new Error(`HF API Error: ${response.status}`);
            }

            const data = await response.json();
            let text = '';
            
            if (Array.isArray(data)) {
                text = data[0]?.generated_text || '';
            } else if (data.generated_text) {
                text = data.generated_text;
            } else if (typeof data === 'string') {
                text = data;
            }

            return { success: true, text, model, source: 'huggingface' };

        } catch (error) {
            console.error('Hugging Face API error:', error);
            return { error: true, message: error.message };
        }
    },

    // Smart AI call - tries Gemini first, falls back to HF
    async smartCall(prompt, context = 'general') {
        // Try Gemini first
        console.log('Attempting Gemini API...');
        const geminiResult = await this.callGemini(prompt);

        if (geminiResult.success) {
            console.log('Gemini succeeded!');
            return { ...geminiResult, source: 'gemini' };
        }

        // If rate limited, try Hugging Face
        if (geminiResult.rateLimited || geminiResult.error) {
            console.log('Gemini failed, falling back to Hugging Face...');
            const hfResult = await this.callHuggingFace(prompt);
            
            if (hfResult.success) {
                console.log('Hugging Face succeeded!');
                return hfResult;
            }
            
            // Both failed
            return {
                error: true,
                message: 'AI services temporarily unavailable. Please try again later.',
                geminiError: geminiResult.message,
                hfError: hfResult.message
            };
        }

        return geminiResult;
    },

    // Get usage statistics
    getUsageStats() {
        const stats = [];
        for (let i = 0; i < 8; i++) {
            stats.push({
                slot: i + 1,
                active: !!this.geminiKeys[i],
                uses: this.keyUsage[i]
            });
        }
        return stats;
    }
};

// Export
window.APIManager = APIManager;
