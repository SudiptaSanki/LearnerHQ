// ============================================
// AI Logic Engine
// Handles curriculum mapping, ROI calculation, and Gemini API integration
// ============================================

const AILogic = {
    // Configuration
    GEMINI_API_KEY: '', // User will add their API key here
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent',

    // Exchange rates (hardcoded - approximate)
    exchangeRates: {
        'India-CBSE': { currency: '₹', toUSD: 83.5, symbol: 'INR' },
        'India-ICSE': { currency: '₹', toUSD: 83.5, symbol: 'INR' },
        'Global-IB': { currency: '$', toUSD: 1, symbol: 'USD' },
        'US-HighSchool': { currency: '$', toUSD: 1, symbol: 'USD' }
    },

    // Curriculum requirements database
    curriculumRequirements: {
        'India-ICSE': {
            minRAM: 16,
            minCPU: 'i5 10th Gen or equivalent',
            priority: 'RAM',
            reason: 'Java development with BlueJ and IntelliJ requires higher RAM for compilation and IDE performance',
            software: ['BlueJ', 'Eclipse', 'IntelliJ IDEA', 'MySQL'],
            recommendedRAM: 16,
            recommendedCPU: 'i5 11th Gen+',
            budgetRange: { min: 45000, max: 75000 }
        },
        'India-CBSE': {
            minRAM: 8,
            minCPU: 'i5 10th Gen or Ryzen 5',
            priority: 'CPU',
            reason: 'Python and ML workloads benefit from faster CPU cores for data processing and scientific computing',
            software: ['Python', 'Jupyter', 'NumPy', 'Pandas', 'MySQL'],
            recommendedRAM: 16,
            recommendedCPU: 'i7 or Ryzen 7',
            budgetRange: { min: 40000, max: 70000 }
        },
        'Global-IB': {
            minRAM: 8,
            minCPU: 'i5 or equivalent',
            priority: 'Balanced',
            reason: 'Diverse coursework requires balanced system for research, presentations, and creative projects',
            software: ['Microsoft Office', 'LaTeX', 'SPSS', 'Various IDEs'],
            recommendedRAM: 16,
            recommendedCPU: 'i5 12th Gen+',
            budgetRange: { min: 800, max: 1500 }
        },
        'US-HighSchool': {
            minRAM: 8,
            minCPU: 'i5 or equivalent',
            priority: 'GPU',
            reason: 'Creative projects, video editing, and STEM coursework benefit from dedicated GPU',
            software: ['Adobe Suite', 'Video Editing', 'CAD Software'],
            recommendedRAM: 16,
            recommendedCPU: 'i7 or Ryzen 7',
            budgetRange: { min: 900, max: 1800 }
        }
    },

    // Laptop recommendations database
    laptopDatabase: {
        'India-CBSE': [
            { name: 'HP Pavilion 15', cpu: 'i5 12th Gen', ram: 16, gpu: 'Integrated', price: 52999, score: 85 },
            { name: 'Lenovo IdeaPad Slim 3', cpu: 'Ryzen 5 5500U', ram: 16, gpu: 'Integrated', price: 48999, score: 82 },
            { name: 'ASUS VivoBook 15', cpu: 'i5 11th Gen', ram: 8, gpu: 'Integrated', price: 42999, score: 75 },
            { name: 'Dell Inspiron 15', cpu: 'i7 11th Gen', ram: 16, gpu: 'MX450', price: 67999, score: 90 }
        ],
        'India-ICSE': [
            { name: 'Lenovo ThinkPad E14', cpu: 'i5 12th Gen', ram: 16, gpu: 'Integrated', price: 58999, score: 88 },
            { name: 'HP 15s', cpu: 'i5 11th Gen', ram: 16, gpu: 'Integrated', price: 54999, score: 85 },
            { name: 'ASUS TUF Gaming F15', cpu: 'i5 11th Gen', ram: 16, gpu: 'GTX 1650', price: 64999, score: 92 },
            { name: 'Acer Aspire 5', cpu: 'i5 12th Gen', ram: 16, gpu: 'Integrated', price: 51999, score: 83 }
        ],
        'Global-IB': [
            { name: 'MacBook Air M1', cpu: 'Apple M1', ram: 8, gpu: 'Integrated', price: 999, score: 88 },
            { name: 'Dell XPS 13', cpu: 'i5 12th Gen', ram: 16, gpu: 'Integrated', price: 1199, score: 90 },
            { name: 'HP Envy 13', cpu: 'i7 11th Gen', ram: 16, gpu: 'Integrated', price: 1099, score: 87 },
            { name: 'Lenovo Yoga 7i', cpu: 'i5 12th Gen', ram: 16, gpu: 'Integrated', price: 949, score: 85 }
        ],
        'US-HighSchool': [
            { name: 'ASUS ROG Zephyrus G14', cpu: 'Ryzen 7', ram: 16, gpu: 'RTX 3050', price: 1299, score: 92 },
            { name: 'MSI Prestige 14', cpu: 'i7 11th Gen', ram: 16, gpu: 'GTX 1650', price: 1149, score: 88 },
            { name: 'Dell G15', cpu: 'i5 11th Gen', ram: 16, gpu: 'RTX 3050', price: 999, score: 85 },
            { name: 'MacBook Pro M1', cpu: 'Apple M1 Pro', ram: 16, gpu: 'Integrated', price: 1999, score: 95 }
        ]
    },

    // Format price with currency
    formatPrice(price, curriculum) {
        const rate = this.exchangeRates[curriculum];
        if (rate.currency === '₹') {
            const usdEquiv = Math.round(price / rate.toUSD);
            return `${rate.currency}${price.toLocaleString('en-IN')} <span class="text-slate-400 text-sm">(approx $${usdEquiv})</span>`;
        } else {
            return `${rate.currency}${price.toLocaleString('en-US')}`;
        }
    },

    // Analyze hardware compatibility
    analyzeHardware(formData) {
        const curriculum = this.curriculumRequirements[formData.curriculum];
        const userRAM = parseInt(formData.ram) || 8;
        const budget = parseInt(formData.budget) || 0;

        // Calculate compatibility score
        let score = 50; // Base score

        // RAM check
        if (userRAM >= curriculum.recommendedRAM) score += 25;
        else if (userRAM >= curriculum.minRAM) score += 15;
        else score -= 10;

        // CPU check (simplified - checks if contains i5/i7/Ryzen)
        const cpu = formData.cpu.toLowerCase();
        if (cpu.includes('i7') || cpu.includes('ryzen 7')) score += 15;
        else if (cpu.includes('i5') || cpu.includes('ryzen 5')) score += 10;
        else score += 5;

        // GPU check
        const gpu = formData.gpu.toLowerCase();
        if (curriculum.priority === 'GPU' && (gpu.includes('gtx') || gpu.includes('rtx'))) score += 10;
        else if (gpu.includes('integrated') || gpu === '') score += 0;
        else score += 5;

        // Clamp score
        score = Math.max(0, Math.min(100, score));

        // Get laptop recommendations
        const laptops = this.laptopDatabase[formData.curriculum] || [];
        const affordableLaptops = laptops.filter(l => {
            const priceInUserCurrency = formData.curriculum.startsWith('India') ? l.price : l.price * this.exchangeRates[formData.curriculum].toUSD;
            return priceInUserCurrency <= budget * 1.1; // 10% buffer
        });

        const recommendedLaptops = affordableLaptops.length > 0 ? affordableLaptops : laptops.slice(0, 3);

        // Determine verdict
        let verdict = '';
        let verdictClass = '';
        if (score >= 80) {
            verdict = 'Excellent Match';
            verdictClass = 'badge-success';
        } else if (score >= 60) {
            verdict = 'Good Enough';
            verdictClass = 'badge-warning';
        } else {
            verdict = 'Upgrade Recommended';
            verdictClass = 'badge-danger';
        }

        return {
            score,
            verdict,
            verdictClass,
            curriculum,
            recommendedLaptops,
            needsUpgrade: score < 60,
            userCurrency: this.exchangeRates[formData.curriculum].currency
        };
    },

    // Generate cloud swap strategy
    generateCloudSwap(budget, recommendedPrice) {
        const needsCloudSwap = budget < recommendedPrice * 0.8;

        if (!needsCloudSwap) return null;

        return {
            coding: {
                name: 'Google Colab',
                description: 'Free GPU-powered Python notebooks',
                cost: 'Free (or $9.99/month for Pro)',
                link: 'https://colab.research.google.com'
            },
            design: {
                name: 'Photopea',
                description: 'Free online Photoshop alternative',
                cost: 'Free',
                link: 'https://www.photopea.com'
            },
            rendering: {
                name: 'Shadow.tech',
                description: 'Cloud gaming PC for heavy rendering',
                cost: '$29.99/month',
                link: 'https://shadow.tech'
            },
            office: {
                name: 'Google Workspace',
                description: 'Free office suite and cloud storage',
                cost: 'Free',
                link: 'https://workspace.google.com'
            },
            totalMonthlyCost: 9.99 + 29.99,
            annualSavings: recommendedPrice - (budget + (9.99 + 29.99) * 12)
        };
    },

    // Calculate ROI for study abroad
    calculateROI(careerGoal, region) {
        // Sample data - would be enhanced with real statistics
        const countryData = {
            'UK': {
                avgTuition: 25000,
                minWage: 11.44,
                workHours: 20,
                currency: 'GBP',
                applications: ['Sep-Nov: Research universities', 'Dec-Jan: Prepare documents', 'Feb-Mar: Submit applications', 'Apr-May: Interviews', 'Jun-Jul: Visa process', 'Aug: Departure']
            },
            'US': {
                avgTuition: 35000,
                minWage: 15,
                workHours: 20,
                currency: 'USD',
                applications: ['Sep-Oct: Standardized tests', 'Nov-Dec: Applications', 'Jan-Feb: Wait for decisions', 'Mar-Apr: Financial aid', 'May-Jun: Visa', 'Jul-Aug: Departure']
            },
            'Canada': {
                avgTuition: 20000,
                minWage: 16.50,
                workHours: 20,
                currency: 'CAD',
                applications: ['Sep-Nov: Research programs', 'Dec-Jan: Applications', 'Feb-Mar: Decisions', 'Apr-May: Study permit', 'Jun-Jul: Accommodation', 'Aug: Departure']
            },
            'Germany': {
                avgTuition: 3000,
                minWage: 12,
                workHours: 20,
                currency: 'EUR',
                applications: ['Oct-Dec: Language prep', 'Jan-Feb: Applications', 'Mar-Apr: Admissions', 'May-Jun: Visa', 'Jul-Aug: Blocked account', 'Sep: Departure']
            },
            'Australia': {
                avgTuition: 30000,
                minWage: 23.23,
                workHours: 20,
                currency: 'AUD',
                applications: ['Aug-Oct: Research universities', 'Nov-Dec: Applications', 'Jan-Feb: Offers', 'Mar-Apr: Visa', 'May-Jun: Accommodation', 'Jul: Departure']
            }
        };

        // Extract country from career goal
        let targetCountry = 'UK'; // Default
        const goal = careerGoal.toLowerCase();
        for (const country of Object.keys(countryData)) {
            if (goal.includes(country.toLowerCase())) {
                targetCountry = country;
                break;
            }
        }

        const data = countryData[targetCountry];
        const monthlyIncome = data.minWage * data.workHours * 4.33; // weeks per month
        const paybackMonths = Math.ceil(data.avgTuition / monthlyIncome);

        return {
            country: targetCountry,
            tuition: data.avgTuition,
            currency: data.currency,
            monthlyIncome,
            paybackMonths,
            paybackYears: (paybackMonths / 12).toFixed(1),
            timeline: data.applications
        };
    },

    // Generate active recall notes from PDF
    generateActiveRecall(pdfText) {
        if (!pdfText || pdfText.length < 50) {
            return {
                summary: 'Upload a PDF to generate AI-powered study notes.',
                mnemonics: [],
                quiz: []
            };
        }

        // Create summary (first 300 words)
        const words = pdfText.split(/\s+/).slice(0, 300);
        const summary = words.join(' ') + '...';

        // Extract key terms (simple heuristic - capitalized words that appear multiple times)
        const termCount = {};
        const termRegex = /\b[A-Z][a-z]{3,}\b/g;
        const matches = pdfText.match(termRegex) || [];

        matches.forEach(term => {
            termCount[term] = (termCount[term] || 0) + 1;
        });

        // Get top 5 terms
        const keyTerms = Object.entries(termCount)
            .filter(([_, count]) => count > 1)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([term, _]) => term);

        // Create simple mnemonics
        const mnemonics = keyTerms.map(term => {
            const firstLetter = term[0];
            return `${term}: Remember "${firstLetter}" stands for ${term}`;
        });

        // Generate simple quiz questions
        const quiz = keyTerms.slice(0, 3).map((term, idx) => ({
            question: `What is the significance of "${term}" in this context?`,
            answer: `${term} is a key concept mentioned ${termCount[term]} times in the material. Review the sections where it appears for deeper understanding.`
        }));

        return { summary, mnemonics, questions: quiz };
    },

    // Generate PPT outline
    generatePPTOutline(careerGoal, curriculum, pdfText) {
        const slides = [
            {
                title: 'My Educational Journey',
                content: `Career Goal: ${careerGoal}\nCurriculum: ${curriculum}\nStrategic pathway to success`,
                imagePrompt: 'A student climbing a mountain path towards a glowing university building, inspirational gradient sky'
            },
            {
                title: 'Hardware & Technology Setup',
                content: 'Optimal computer specifications for my coursework\nSoftware recommendations\nCloud alternatives for budget optimization',
                imagePrompt: 'Modern laptop with holographic coding interface, vibrant tech background, professional setup'
            },
            {
                title: 'Study Abroad Timeline',
                content: 'Month-by-month application roadmap\nKey deadlines and milestones\nFinancial planning strategy',
                imagePrompt: 'World map with connected flight paths, calendar overlay, global education theme'
            },
            {
                title: 'Financial Investment & ROI',
                content: 'Tuition breakdown and costs\nPart-time work opportunities\nPayback period analysis',
                imagePrompt: 'Financial growth chart with upward trend, graduation cap, investment symbols'
            },
            {
                title: 'Study Strategy & Techniques',
                content: 'Active recall methodology\nKey concepts and mnemonics\nEfficient learning framework',
                imagePrompt: 'Brain with neural connections, colorful notes, light bulb moment illustration'
            },
            {
                title: 'Cloud Tools for Success',
                content: 'Google Colab for coding projects\nPhotopea for design work\nFree educational resources',
                imagePrompt: 'Cloud computing icons, collaborative tools interface, modern workspace'
            },
            {
                title: 'Next Steps & Action Plan',
                content: 'Immediate priorities\n30-day action items\nLong-term goals checklist',
                imagePrompt: 'Road ahead with milestones, success journey, motivational sunrise scene'
            }
        ];

        return slides;
    },

    // Call Gemini API for enhanced recommendations
    async callGeminiAPI(formData, fallbackData) {
        // If no API key, return fallback
        if (!this.GEMINI_API_KEY || this.GEMINI_API_KEY === '') {
            console.log('No Gemini API key found, using fallback logic');
            return fallbackData;
        }

        try {
            const prompt = `ACT AS: Global Education Architect. 
            
Analyze this student profile and provide strategic recommendations:
- Region/Curriculum: ${formData.curriculum}
- Current Hardware: CPU: ${formData.cpu}, RAM: ${formData.ram}, GPU: ${formData.gpu || 'None'}
- Budget: ${formData.budget}
- Career Goal: ${formData.careerGoal}
- Study Material Summary: ${formData.pdfText ? formData.pdfText.substring(0, 500) : 'Not provided'}

Provide:
1. Hardware verdict based on curriculum needs (${this.curriculumRequirements[formData.curriculum].reason})
2. Cloud-swap strategy recommendation if budget is tight
3. Study abroad timeline for their career goal
4. Active recall study techniques
5. Creative presentation ideas

Return insights as natural text that can enhance the student's strategic planning.`;

            const response = await fetch(`${this.GEMINI_API_URL}?key=${this.GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

            // Merge AI insights with fallback data
            return {
                ...fallbackData,
                aiInsights: aiResponse,
                enhancedByAI: true
            };

        } catch (error) {
            console.error('Gemini API error:', error);
            return fallbackData;
        }
    },

    // Main analysis function
    async analyze(formData) {
        // Generate all fallback data first
        const hardwareAnalysis = this.analyzeHardware(formData);
        const roiData = this.calculateROI(formData.careerGoal, formData.curriculum);
        const activeRecall = this.generateActiveRecall(formData.pdfText);
        const pptOutline = this.generatePPTOutline(formData.careerGoal, formData.curriculum, formData.pdfText);

        // Check if cloud swap is needed
        const avgRecommendedPrice = hardwareAnalysis.recommendedLaptops.length > 0
            ? hardwareAnalysis.recommendedLaptops[0].price
            : 60000;
        const cloudSwap = this.generateCloudSwap(formData.budget, avgRecommendedPrice);

        const fallbackData = {
            hardware: hardwareAnalysis,
            roi: roiData,
            study: activeRecall,
            ppt: pptOutline,
            cloudSwap,
            enhancedByAI: false
        };

        // Try to enhance with Gemini API
        const finalData = await this.callGeminiAPI(formData, fallbackData);

        return finalData;
    }
};

// Export for use in other modules
window.AILogic = AILogic;
