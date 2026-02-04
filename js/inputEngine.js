// ============================================
// Input Engine Module
// Handles form validation and data collection
// ============================================

const InputEngine = {
    pdfText: '',

    // Initialize form handlers
    init() {
        this.setupFormHandlers();
        this.setupPDFUpload();
    },

    // Set up form event listeners
    setupFormHandlers() {
        const form = document.getElementById('inputForm');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (this.validateInputs()) {
                await this.handleAnalyze();
            }
        });
    },

    // Set up PDF upload handler
    setupPDFUpload() {
        const pdfInput = document.getElementById('pdfUpload');
        const fileNameDisplay = document.getElementById('fileName');

        pdfInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];

            if (file) {
                if (file.type !== 'application/pdf') {
                    PDFExtractor.updateStatus('Please upload a PDF file', 'error');
                    return;
                }

                fileNameDisplay.textContent = file.name;

                // Extract text
                this.pdfText = await PDFExtractor.extractText(file);
            }
        });
    },

    // Validate form inputs
    validateInputs() {
        const curriculum = document.getElementById('curriculum').value;
        const cpu = document.getElementById('cpu').value.trim();
        const ram = document.getElementById('ram').value.trim();
        const budget = document.getElementById('budget').value.trim();
        const careerGoal = document.getElementById('careerGoal').value.trim();

        if (!curriculum) {
            this.showError('Please select a curriculum');
            return false;
        }

        if (!cpu) {
            this.showError('Please enter your CPU details');
            return false;
        }

        if (!ram) {
            this.showError('Please enter your RAM details');
            return false;
        }

        if (!budget || isNaN(budget) || parseInt(budget) <= 0) {
            this.showError('Please enter a valid budget');
            return false;
        }

        if (!careerGoal) {
            this.showError('Please enter your career goal');
            return false;
        }

        return true;
    },

    // Collect form data
    collectFormData() {
        return {
            curriculum: document.getElementById('curriculum').value,
            cpu: document.getElementById('cpu').value.trim(),
            ram: document.getElementById('ram').value.trim(),
            gpu: document.getElementById('gpu').value.trim() || 'Integrated',
            budget: document.getElementById('budget').value.trim(),
            careerGoal: document.getElementById('careerGoal').value.trim(),
            pdfText: this.pdfText
        };
    },

    // Handle analyze button click
    async handleAnalyze() {
        const btn = document.getElementById('analyzeBtn');
        const originalHTML = btn.innerHTML;

        try {
            // Show loading state
            btn.disabled = true;
            btn.innerHTML = `
                <div class="loading-spinner"></div>
                <span>Analyzing...</span>
            `;

            // Collect data
            const formData = this.collectFormData();

            // Analyze with AI logic
            const results = await AILogic.analyze(formData);

            // Render dashboard
            Dashboard.renderAll(results);

            // Success
            btn.disabled = false;
            btn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Analysis Complete!
            `;
            btn.classList.remove('from-cyan-500', 'to-blue-600');
            btn.classList.add('from-green-500', 'to-emerald-600');

            // Revert button after 3 seconds
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                btn.classList.remove('from-green-500', 'to-emerald-600');
                btn.classList.add('from-cyan-500', 'to-blue-600');
            }, 3000);

        } catch (error) {
            console.error('Analysis error:', error);
            btn.disabled = false;
            btn.innerHTML = originalHTML;
            this.showError('An error occurred during analysis. Please try again.');
        }
    },

    // Show error message
    showError(message) {
        alert(message); // Simple alert for now
        // Could be enhanced with a toast notification system
    },

    // Load demo data
    loadDemoData() {
        document.getElementById('curriculum').value = 'India-CBSE';
        document.getElementById('cpu').value = 'Intel i5 11th Gen';
        document.getElementById('ram').value = '8GB DDR4';
        document.getElementById('gpu').value = 'Integrated Intel UHD';
        document.getElementById('budget').value = '55000';
        document.getElementById('careerGoal').value = 'AI Research in UK';

        // Set demo PDF text
        this.pdfText = `Introduction to Machine Learning

Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. The field has revolutionized technology in recent years.

Key Concepts:
1. Supervised Learning: Training models with labeled data
2. Unsupervised Learning: Finding patterns in unlabeled data
3. Neural Networks: Computing systems inspired by biological neural networks
4. Deep Learning: Advanced neural networks with multiple layers

Applications include computer vision, natural language processing, recommendation systems, and autonomous vehicles. Machine learning requires strong foundation in mathematics, statistics, and programming.

Python is the primary language used in ML development, with libraries like NumPy, Pandas, Scikit-learn, TensorFlow, and PyTorch being essential tools.

Hardware Requirements:
- Minimum 8GB RAM for basic ML tasks
- 16GB+ recommended for deep learning
- GPU acceleration significantly improves training speed
- Modern multi-core CPU for data preprocessing

The field is constantly evolving with new techniques and architectures emerging regularly. Continuous learning is essential for practitioners.`;

        PDFExtractor.updateStatus('✓ Demo PDF content loaded', 'success');
        document.getElementById('fileName').textContent = 'demo_ml_notes.pdf';
    }
};

// Export for use in other modules
window.InputEngine = InputEngine;
