// Navigation and Tool Switching Logic

function scrollToTools() {
    document.getElementById('tools').scrollIntoView({ behavior: 'smooth' });
}

function openTool(toolName) {
    const modal = document.getElementById('toolModal');
    const content = document.getElementById('toolContent');

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    content.innerHTML = getToolHTML(toolName);

    // Reinitialize tool-specific functionality
    if (toolName === 'hardware' || toolName === 'abroad' || toolName === 'notes' || toolName === 'ppt') {
        InputEngine.init();
    }
}

function closeTool() {
    const modal = document.getElementById('toolModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function getToolHTML(toolName) {
    const tools = {
        hardware: `
            <h2 class="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Hardware Compatibility Analyzer</h2>
            <div class="grid lg:grid-cols-2 gap-8">
                <div>
                    ${getInputForm()}
                </div>
                <div id="hardwareResults" class="glass-card p-6 rounded-xl">
                    <p class="text-slate-400">Fill the form to see compatibility analysis</p>
                </div>
            </div>
        `,
        abroad: `
            <h2 class="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Study Abroad ROI Calculator</h2>
            <div class="grid lg:grid-cols-2 gap-8">
                <div>
                    <form id="abroadForm" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold mb-2">Target Country</label>
                            <select id="country" class="w-full px-4 py-3 bg-slate-800 rounded-lg">
                                <option value="UK">United Kingdom</option>
                                <option value="US">United States</option>
                                <option value="Canada">Canada</option>
                                <option value="Germany">Germany</option>
                                <option value="Australia">Australia</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-2">Field of Study</label>
                            <input type="text" id="field" placeholder="e.g., Computer Science" class="w-full px-4 py-3 bg-slate-800 rounded-lg"/>
                        </div>
                        <button type="submit" class="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold">Calculate ROI</button>
                    </form>
                </div>
                <div id="abroadResults" class="glass-card p-6 rounded-xl">
                    <p class="text-slate-400">Fill the form to see ROI calculations</p>
                </div>
            </div>
        `,
        notes: `
            <h2 class="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">AI Study Notes Generator</h2>
            ${getNotesToolHTML()}
        `,
        ppt: `
            <h2 class="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">Career Strategy Presentation</h2>
            ${getPPTToolHTML()}
        `,
        budget: `
            <h2 class="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">Cloud-Swap Budget Optimizer</h2>
            ${getBudgetToolHTML()}
        `,
        curriculum: `
            <h2 class="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-rose-600 bg-clip-text text-transparent">Curriculum Comparison Tool</h2>
            ${getCurriculumToolHTML()}
        `
    };

    return tools[toolName] || '<p>Tool not found</p>';
}

function getInputForm() {
    return `
        <form id="hardwareForm" class="space-y-4">
            <div>
                <label class="block text-sm font-semibold mb-2">Curriculum</label>
                <select id="curriculum" class="w-full px-4 py-3 bg-slate-800 rounded-lg">
                    <option value="India-CBSE">India - CBSE</option>
                    <option value="India-ICSE">India - ICSE</option>
                    <option value="Global-IB">Global - IB</option>
                    <option value="US-HighSchool">US - High School</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-semibold mb-2">CPU</label>
                <input type="text" id="cpu" placeholder="Intel i5 11th Gen" class="w-full px-4 py-3 bg-slate-800 rounded-lg"/>
            </div>
            <div>
                <label class="block text-sm font-semibold mb-2">RAM</label>
                <input type="text" id="ram" placeholder="8GB DDR4" class="w-full px-4 py-3 bg-slate-800 rounded-lg"/>
            </div>
            <div>
                <label class="block text-sm font-semibold mb-2">Budget (₹)</label>
                <input type="number" id="budget" placeholder="50000" class="w-full px-4 py-3 bg-slate-800 rounded-lg"/>
            </div>
            <button type="submit" class="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold">Analyze Hardware</button>
        </form>
    `;
}

function getNotesToolHTML() {
    return `
        <div class="space-y-6">
            <div class="p-6 bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-700">
                <input type="file" id="pdfUpload" accept=".pdf" class="hidden">
                <label for="pdfUpload" class="cursor-pointer flex flex-col items-center gap-3">
                    <svg class="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span class="text-lg font-semibold">Upload Study Material (PDF)</span>
                    <span id="fileName" class="text-sm text-slate-400"></span>
                </label>
            </div>
            <div id="notesResults"></div>
        </div>
    `;
}

function getPPTToolHTML() {
    return `
        <div class="grid lg:grid-cols-2 gap-8">
            <div class="space-y-4">
                <input type="text" id="careerGoal" placeholder="Career Goal (e.g., AI Research in UK)" class="w-full px-4 py-3 bg-slate-800 rounded-lg"/>
                <select id="pptCurriculum" class="w-full px-4 py-3 bg-slate-800 rounded-lg">
                    <option value="India-CBSE">India - CBSE</option>
                    <option value="India-ICSE">India - ICSE</option>
                    <option value="Global-IB">Global - IB</option>
                    <option value="US-HighSchool">US - High School</option>
                </select>
                <button onclick="generatePresentation()" class="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-semibold">Generate Presentation</button>
            </div>
            <div id="pptPreview" class="glass-card p-6 rounded-xl">
                <p class="text-slate-400">Preview will appear here</p>
            </div>
        </div>
    `;
}

function getBudgetToolHTML() {
    return `
        <div class="grid gap-6">
            <div class="glass-card p-6 rounded-xl">
                <h3 class="text-xl font-bold mb-4">Free Cloud Alternatives</h3>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="p-4 bg-slate-800/50 rounded-lg">
                        <h4 class="font-semibold text-cyan-400 mb-2">Coding & Development</h4>
                        <ul class="space-y-2 text-sm">
                            <li>• Google Colab (Free GPU)</li>
                            <li>• Replit (Online IDE)</li>
                            <li>• GitHub Codespaces</li>
                        </ul>
                    </div>
                    <div class="p-4 bg-slate-800/50 rounded-lg">
                        <h4 class="font-semibold text-cyan-400 mb-2">Design & Creative</h4>
                        <ul class="space-y-2 text-sm">
                            <li>• Photopea (Photo editing)</li>
                            <li>• Canva (Graphic design)</li>
                            <li>• Figma (UI/UX design)</li>
                        </ul>
                    </div>
                    <div class="p-4 bg-slate-800/50 rounded-lg">
                        <h4 class="font-semibold text-cyan-400 mb-2">Productivity</h4>
                        <ul class="space-y-2 text-sm">
                            <li>• Google Workspace (Free)</li>
                            <li>• Notion (Notes & Wiki)</li>
                            <li>• Trello (Project management)</li>
                        </ul>
                    </div>
                    <div class="p-4 bg-slate-800/50 rounded-lg">
                        <h4 class="font-semibold text-cyan-400 mb-2">Heavy Tasks</h4>
                        <ul class="space-y-2 text-sm">
                            <li>• Shadow.tech ($29.99/mo)</li>
                            <li>• Paperspace (GPU rental)</li>
                            <li>• AWS Free Tier</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getCurriculumToolHTML() {
    return `
        <div class="grid lg:grid-cols-2 gap-6">
            ${getCurriculumCard('CBSE', 'India - Central Board', ['Python focus', 'ML/AI emphasis', '8GB RAM minimum'])}
            ${getCurriculumCard('ICSE', 'India - Council', ['Java with BlueJ', '16GB RAM recommended', 'Practical focus'])}
            ${getCurriculumCard('IB', 'International Baccalaureate', ['Balanced curriculum', 'Research oriented', 'Global recognition'])}
            ${getCurriculumCard('US', 'US High School', ['Creative projects', 'GPU beneficial', 'Flexible system'])}
        </div>
    `;
}

function getCurriculumCard(name, fullName, features) {
    return `
        <div class="glass-card p-6 rounded-xl">
            <h3 class="text-2xl font-bold mb-2">${name}</h3>
            <p class="text-slate-400 text-sm mb-4">${fullName}</p>
            <ul class="space-y-2">
                ${features.map(f => `<li class="flex items-center gap-2 text-sm"><svg class="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>${f}</li>`).join('')}
            </ul>
        </div>
    `;
}

// Mobile menu toggle
document.getElementById('mobileMenuBtn')?.addEventListener('click', function () {
    alert('Mobile menu - to be implemented');
});
