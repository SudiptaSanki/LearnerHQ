// ============================================
// Main Application Controller
// Orchestrates all modules and handles demo mode
// ============================================

const App = {
  demoMode: false,

  // Initialize application
  init() {
    console.log("🚀 LearnerHQ - Initializing...");

    // Initialize all modules
    InputEngine.init();

    // Set up demo mode toggle
    this.setupDemoMode();

    // Add API key check reminder
    this.checkAPIKey();

    console.log("✓ LearnerHQ - Ready!");
  },

  // Set up demo mode toggle
  setupDemoMode() {
    const demoToggle = document.getElementById("demoToggle");

    demoToggle.addEventListener("change", (e) => {
      this.demoMode = e.target.checked;

      if (this.demoMode) {
        this.enableDemoMode();
      } else {
        this.disableDemoMode();
      }
    });
  },

  // Enable demo mode
  enableDemoMode() {
    console.log("🎭 Demo Mode: ENABLED");

    // Load demo data into form
    InputEngine.loadDemoData();

    // Add visual indicator
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.add("demo-active");

    // Auto-trigger analysis after short delay
    setTimeout(() => {
      const analyzeBtn = document.getElementById("analyzeBtn");
      if (analyzeBtn && !analyzeBtn.disabled) {
        analyzeBtn.click();
      }
    }, 1000);
  },

  // Disable demo mode
  disableDemoMode() {
    console.log("🎭 Demo Mode: DISABLED");

    const sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("demo-active");

    // Hide dashboard
    Dashboard.hide();
  },

  // Check if API key is configured
  checkAPIKey() {
    if (!AILogic.GEMINI_API_KEY || AILogic.GEMINI_API_KEY === "") {
      console.warn(`
╔════════════════════════════════════════════════════════════╗
║  ⚠️  GEMINI API KEY NOT CONFIGURED                         ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  The application will work with fallback logic, but for    ║
║  enhanced AI-powered recommendations, please add your      ║
║  Gemini API key:                                           ║
║                                                            ║
║  1. Get free API key: https://aistudio.google.com/apikey   ║
║  2. Open: js/aiLogic.js                                    ║
║  3. Set: GEMINI_API_KEY = 'your-api-key-here'              ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
            `);

      // Show subtle reminder in UI after 2 seconds
      setTimeout(() => {
        const reminder = document.createElement("div");
        reminder.className =
          "fixed bottom-4 right-4 p-4 bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/40 rounded-lg shadow-xl max-w-sm animate-slideUp z-50";
        reminder.innerHTML = `
                    <div class="flex items-start gap-3">
                        <svg class="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div class="flex-1">
                            <h4 class="font-semibold text-sm text-white mb-1">Gemini API Not Configured</h4>
                            <p class="text-xs text-slate-300">Add your API key in <code class="text-purple-300">js/aiLogic.js</code> for AI-enhanced insights.</p>
                            <a href="https://aistudio.google.com/apikey" target="_blank" class="text-xs text-cyan-400 hover:text-cyan-300 underline mt-1 inline-block">Get Free API Key →</a>
                        </div>
                        <button onclick="this.parentElement.parentElement.remove()" class="text-slate-400 hover:text-white">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                `;
        document.body.appendChild(reminder);

        // Auto-dismiss after 10 seconds
        setTimeout(() => {
          reminder.style.opacity = "0";
          reminder.style.transform = "translateY(20px)";
          setTimeout(() => reminder.remove(), 300);
        }, 10000);
      }, 2000);
    } else {
      console.log("✓ Gemini API key configured");
    }
  },
};

// Initialize app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => App.init());
} else {
  App.init();
}

// Export for debugging
window.App = App;
