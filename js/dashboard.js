// ============================================
// Dashboard Rendering Module
// Renders all 4 dashboard cards with processed data
// ============================================

const Dashboard = {
    // Show/hide dashboard
    show() {
        document.getElementById('welcomeState').classList.add('hidden');
        document.getElementById('dashboardGrid').classList.remove('hidden');
    },

    hide() {
        document.getElementById('welcomeState').classList.remove('hidden');
        document.getElementById('dashboardGrid').classList.add('hidden');
    },

    // Render all cards
    renderAll(data) {
        this.show();
        this.renderHardwareCard(data.hardware);
        this.renderNavigatorCard(data.roi, data.cloudSwap);
        this.renderStudyCard(data.study, data.aiInsights);
        this.renderPPTCard(data.ppt);
    },

    // Card 1: Hardware Engine
    renderHardwareCard(hardware) {
        const content = document.getElementById('hardwareContent');

        let scoreColor = 'low';
        if (hardware.score >= 80) scoreColor = 'high';
        else if (hardware.score >= 60) scoreColor = 'medium';

        let laptopsHTML = '';
        hardware.recommendedLaptops.forEach((laptop, idx) => {
            const delay = idx * 0.1;
            laptopsHTML += `
                <div class="p-4 bg-slate-800/40 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-all" style="animation: fadeIn 0.5s ease-out ${delay}s both">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-semibold text-white">${laptop.name}</h4>
                        <span class="badge badge-info text-xs">${laptop.score}% Match</span>
                    </div>
                    <div class="text-sm text-slate-300 space-y-1">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                            <span>${laptop.cpu}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <span>${laptop.ram}GB RAM</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                            <span>${laptop.gpu}</span>
                        </div>
                    </div>
                    <div class="mt-3 pt-3 border-t border-slate-700/50">
                        <div class="price-tag w-full text-center">${AILogic.formatPrice(laptop.price, hardware.curriculum.priority === 'RAM' ? 'India-ICSE' : 'India-CBSE')}</div>
                    </div>
                </div>
            `;
        });

        content.innerHTML = `
            <div class="mb-6">
                <div class="flex items-center justify-between mb-3">
                    <h4 class="text-lg font-semibold">Compatibility Score</h4>
                    <span class="badge ${hardware.verdictClass}">${hardware.verdict}</span>
                </div>
                <div class="score-meter">
                    <div class="score-fill ${scoreColor}" style="width: 0%" data-target="${hardware.score}"></div>
                </div>
                <p class="text-sm text-slate-400 mt-2">${hardware.score}% compatible with ${hardware.curriculum.reason}</p>
            </div>
            
            <div class="card-divider"></div>
            
            <h4 class="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Recommended Laptops
            </h4>
            <div class="space-y-3">
                ${laptopsHTML}
            </div>
            
            ${hardware.needsUpgrade ? `
                <div class="mt-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <p class="text-sm text-orange-300">💡 <strong>Tip:</strong> Consider upgrading your hardware or using cloud alternatives for optimal performance.</p>
                </div>
            ` : ''}
        `;

        // Animate score meter
        setTimeout(() => {
            const fill = content.querySelector('.score-fill');
            if (fill) {
                fill.style.width = fill.dataset.target + '%';
            }
        }, 100);
    },

    // Card 2: Global Navigator
    renderNavigatorCard(roi, cloudSwap) {
        const content = document.getElementById('navigatorContent');

        let timelineHTML = '';
        roi.timeline.forEach((item, idx) => {
            timelineHTML += `
                <div class="timeline-item" style="animation: slideUp 0.4s ease-out ${idx * 0.1}s both">
                    <div class="font-medium text-white">${item}</div>
                </div>
            `;
        });

        let cloudSwapHTML = '';
        if (cloudSwap) {
            cloudSwapHTML = `
                <div class="card-divider"></div>
                <div class="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-lg">
                    <h4 class="text-lg font-semibold mb-3 flex items-center gap-2">
                        <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                        Cloud-Swap Strategy
                    </h4>
                    <p class="text-sm text-slate-300 mb-3">Budget-friendly alternatives to expensive hardware:</p>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between items-center p-2 bg-slate-800/40 rounded">
                            <span class="text-slate-300">💻 ${cloudSwap.coding.name}</span>
                            <span class="badge badge-success">${cloudSwap.coding.cost}</span>
                        </div>
                        <div class="flex justify-between items-center p-2 bg-slate-800/40 rounded">
                            <span class="text-slate-300">🎨 ${cloudSwap.design.name}</span>
                            <span class="badge badge-success">${cloudSwap.design.cost}</span>
                        </div>
                        <div class="flex justify-between items-center p-2 bg-slate-800/40 rounded">
                            <span class="text-slate-300">🎮 ${cloudSwap.rendering.name}</span>
                            <span class="badge badge-warning">${cloudSwap.rendering.cost}</span>
                        </div>
                    </div>
                    <p class="text-xs text-slate-400 mt-3">Total monthly cost: $${cloudSwap.totalMonthlyCost.toFixed(2)}</p>
                </div>
            `;
        }

        content.innerHTML = `
            <div class="mb-6">
                <h4 class="text-lg font-semibold mb-2">Study Abroad Timeline</h4>
                <p class="text-sm text-slate-400 mb-4">Your roadmap to <span class="text-cyan-400 font-semibold">${roi.country}</span></p>
                <div class="space-y-2">
                    ${timelineHTML}
                </div>
            </div>
            
            <div class="card-divider"></div>
            
            <div class="p-4 bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-lg">
                <h4 class="text-lg font-semibold mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ROI Analysis
                </h4>
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="p-3 bg-slate-800/40 rounded">
                        <div class="text-slate-400 text-xs mb-1">Avg. Tuition</div>
                        <div class="text-white font-semibold">${roi.currency} ${roi.tuition.toLocaleString()}</div>
                    </div>
                    <div class="p-3 bg-slate-800/40 rounded">
                        <div class="text-slate-400 text-xs mb-1">Monthly Income</div>
                        <div class="text-white font-semibold">${roi.currency} ${roi.monthlyIncome.toFixed(0)}</div>
                    </div>
                    <div class="p-3 bg-slate-800/40 rounded col-span-2">
                        <div class="text-slate-400 text-xs mb-1">Investment Payback Period</div>
                        <div class="text-green-400 font-bold text-lg">${roi.paybackYears} years</div>
                        <div class="text-xs text-slate-500 mt-1">(${roi.paybackMonths} months working part-time)</div>
                    </div>
                </div>
            </div>
            
            ${cloudSwapHTML}
        `;
    },

    // Card 3: Study Architect
    renderStudyCard(study, aiInsights) {
        const content = document.getElementById('studyContent');

        let mnemonicsHTML = '';
        if (study.mnemonics.length > 0) {
            study.mnemonics.forEach((mnemonic, idx) => {
                mnemonicsHTML += `
                    <li class="text-sm text-slate-300" style="animation: slideUp 0.3s ease-out ${idx * 0.1}s both">
                        ${mnemonic}
                    </li>
                `;
            });
        } else {
            mnemonicsHTML = '<li class="text-sm text-slate-400">Upload a PDF to generate mnemonics</li>';
        }

        let quizHTML = '';
        if (study.quiz.length > 0) {
            study.quiz.forEach((q, idx) => {
                quizHTML += `
                    <div class="quiz-question" data-quiz-id="${idx}">
                        <div class="flex items-start gap-2">
                            <span class="text-cyan-400 font-bold">${idx + 1}.</span>
                            <span class="text-white flex-1">${q.question}</span>
                            <svg class="w-5 h-5 text-slate-500 flex-shrink-0 quiz-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <div class="quiz-answer" data-answer-id="${idx}">
                            <p class="text-sm text-slate-300 bg-slate-900/50 p-3 rounded mt-2 border-l-2 border-cyan-500">${q.answer}</p>
                        </div>
                    </div>
                `;
            });
        } else {
            quizHTML = '<p class="text-sm text-slate-400">Upload a PDF to generate quiz questions</p>';
        }

        let aiInsightsHTML = '';
        if (aiInsights) {
            aiInsightsHTML = `
                <div class="card-divider"></div>
                <div class="p-4 bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-lg">
                    <h4 class="text-sm font-semibold mb-2 flex items-center gap-2">
                        <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        AI-Enhanced Insights
                    </h4>
                    <p class="text-xs text-slate-300 whitespace-pre-line">${aiInsights.substring(0, 300)}${aiInsights.length > 300 ? '...' : ''}</p>
                </div>
            `;
        }

        content.innerHTML = `
            <div class="mb-4">
                <h4 class="text-lg font-semibold mb-2 flex items-center gap-2">
                    <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Material Summary
                </h4>
                <p class="text-sm text-slate-300 leading-relaxed">${study.summary}</p>
            </div>
            
            <div class="card-divider"></div>
            
            <div class="mb-4">
                <h4 class="text-lg font-semibold mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Key Mnemonics
                </h4>
                <ul class="space-y-2 list-disc list-inside">
                    ${mnemonicsHTML}
                </ul>
            </div>
            
            <div class="card-divider"></div>
            
            <div>
                <h4 class="text-lg font-semibold mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Active Recall Quiz
                </h4>
                <div class="space-y-2">
                    ${quizHTML}
                </div>
            </div>
            
            ${aiInsightsHTML}
        `;

        // Add quiz click handlers
        content.querySelectorAll('.quiz-question').forEach(quiz => {
            quiz.addEventListener('click', function () {
                const answerId = this.querySelector('.quiz-answer').dataset.answerId;
                const answerEl = this.querySelector('.quiz-answer');
                answerEl.classList.toggle('show');
            });
        });
    },

    // Card 4: PPT Architect
    renderPPTCard(pptData) {
        const content = document.getElementById('pptContent');

        let slidesHTML = '';
        pptData.forEach((slide, idx) => {
            slidesHTML += `
                <div class="ppt-slide" style="animation: fadeIn 0.4s ease-out ${idx * 0.05}s both">
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm">
                            ${idx + 1}
                        </div>
                        <div class="flex-1">
                            <h5 class="font-semibold text-white mb-1">${slide.title}</h5>
                            <p class="text-xs text-slate-400 mb-2">${slide.content}</p>
                            <div class="flex items-start gap-2 text-xs text-slate-500">
                                <svg class="w-3 h-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span class="italic">${slide.imagePrompt}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        content.innerHTML = `
            <div class="mb-4">
                <h4 class="text-lg font-semibold mb-2">7-Slide Presentation Outline</h4>
                <p class="text-sm text-slate-400">Professional PowerPoint for your career strategy</p>
            </div>
            
            <div class="space-y-3 mb-6 max-h-96 overflow-y-auto pr-2">
                ${slidesHTML}
            </div>
            
            <button id="downloadPPTBtn" class="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg font-semibold text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/75 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PowerPoint File
            </button>
        `;

        // Add download handler
        const downloadBtn = content.querySelector('#downloadPPTBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                PPTGenerator.generate(pptData);
            });
        }
    }
};

// Export for use in other modules
window.Dashboard = Dashboard;
