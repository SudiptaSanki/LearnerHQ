// ============================================
// LearnerHQ - Floating Chatbot Widget
// Website Guide + AI-powered Q&A
// ============================================

const ChatbotWidget = {
  isOpen: false,

  // Website knowledge base
  websiteInfo: {
    name: "LearnerHQ",
    description: "Your Strategic Success Engine for education planning",
    tools: {
      hardware: {
        name: "Hardware Analyzer",
        description:
          "Get curriculum-specific laptop recommendations with compatibility scores",
        link: "tools/hardware.html",
      },
      abroad: {
        name: "Study Abroad ROI Calculator",
        description:
          "Calculate investment payback period with live currency rates for UK, US, Canada, Germany, Australia",
        link: "tools/abroad.html",
      },
      notes: {
        name: "AI Study Notes Generator",
        description:
          "Upload PDFs to get AI-powered summaries, mnemonics, and active recall quizzes",
        link: "tools/notes.html",
      },
      budget: {
        name: "Cloud-Swap Budget Optimizer",
        description:
          "Find free cloud alternatives like Google Colab, Photopea, Figma, Notion",
        link: "tools/budget.html",
      },
      curriculum: {
        name: "Curriculum Comparison",
        description:
          "Compare CBSE, ICSE, IB, and US High School curricula side-by-side",
        link: "tools/curriculum.html",
      },
      wellness: {
        name: "Student Wellness Check",
        description:
          "10-question wellness assessment with AI-powered insights and helpline resources",
        link: "tools/mental-health.html",
      },
      verifai: {
        name: "VerifAI Fake News Detector",
        description:
          "External tool to verify educational news and detect misinformation",
        link: "https://verifai-news.web.app/",
      },
    },
    quickAnswers: {
      hello:
        "Hello! I'm EduBot, your guide to LearnerHQ. I can help you navigate our tools or answer education-related questions. What would you like to know?",
      hi: "Hi there! I'm EduBot. How can I help you today?",
      help: "I can help you with:\n• Finding the right tool for your needs\n• Study abroad guidance\n• Hardware recommendations\n• Curriculum comparisons\n• Mental wellness resources\n\nJust ask me anything!",
      "what can you do":
        "I'm your LearnerHQ guide! I can:\n• Navigate you to the right tools\n• Answer education questions\n• Provide study abroad info\n• Recommend laptops/PCs for your curriculum\n• Share free learning resources",
      tools:
        "LearnerHQ offers 7 powerful tools:\n1. Hardware Analyzer (PC/Laptop Builder)\n2. Study Abroad ROI\n3. AI Study Notes\n4. Budget Optimizer\n5. Curriculum Compare\n6. Wellness Check\n7. VerifAI\n\nWhich one interests you?",

      // PC & Hardware Related - Expanded Keywords
      laptop:
        "Looking for laptop or PC recommendations? Try our **PC Builder & Hardware Analyzer** tool! It gives curriculum-specific recommendations and helps you build a PC within your budget.\n\n<a href='tools/hardware.html'>Open PC Builder →</a>",
      pc: "Want to build a PC? Our **PC Builder & Hardware Analyzer** tool helps you:\n• Build a custom PC within your budget\n• Get AI-powered component recommendations\n• Compare prices across 6 retailers\n\n<a href='tools/hardware.html'>Open PC Builder →</a>",
      build:
        "Looking to build a system? Our **PC Builder** tool is perfect for you! Enter your budget and use case, and get AI-powered recommendations for the best components.\n\n<a href='tools/hardware.html'>Start Building →</a>",
      computer:
        "Need computer recommendations? Check out our **PC Builder & Hardware Analyzer**! It helps you build a PC or find a laptop based on your budget and needs.\n\n<a href='tools/hardware.html'>Open PC Builder →</a>",
      gaming:
        "For gaming setups, try our **PC Builder**! It has:\n• Gaming-optimized component recommendations\n• Latest GPUs including RTX 50 series\n• AI scoring for gaming performance\n• Budget-based filtering\n\n<a href='tools/hardware.html'>Build Your Gaming PC →</a>",
      rupee:
        "Looking to build a system within a specific budget? Our **PC Builder** lets you set any budget in rupees and filters components automatically!\n\n<a href='tools/hardware.html'>Open PC Builder →</a>",
      budget:
        "Need help with budgeting? We have:\n• **PC Builder** - Build a PC/laptop within your budget\n• **Cloud-Swap Budget Optimizer** - Find free alternatives to paid software\n\nWhich one interests you?",
      gpu: "Looking for graphics card info? Our **PC Builder** has the latest GPUs including:\n• NVIDIA RTX 50 series (5060, 5060 Ti, 5070, 5080, 5090)\n• AMD RX 9000 series\n• AI-powered bottleneck detection\n\n<a href='tools/hardware.html'>Explore GPUs →</a>",
      cpu: "Need CPU recommendations? Our **PC Builder** has Intel 14th Gen and AMD Ryzen 7000 series CPUs with AI-powered scoring to help you choose!\n\n<a href='tools/hardware.html'>Explore CPUs →</a>",
      processor:
        "Looking for processor recommendations? Check our **PC Builder** with Intel & AMD CPUs, generation filters, and AI scoring!\n\n<a href='tools/hardware.html'>Open PC Builder →</a>",
      graphics:
        "Need graphics card help? Our **PC Builder** features the latest RTX 50 and RX 9000 series with AI-powered performance scoring!\n\n<a href='tools/hardware.html'>Explore Graphics Cards →</a>",
      ram: "For RAM recommendations, our **PC Builder** helps you choose between DDR4 and DDR5 with different capacities based on your use case!\n\n<a href='tools/hardware.html'>Open PC Builder →</a>",
      ssd: "Need storage advice? Our **PC Builder** helps you select the right SSD/NVMe capacity for your needs!\n\n<a href='tools/hardware.html'>Open PC Builder →</a>",
      monitor:
        "Looking for monitor recommendations? Our **PC Builder** includes monitor selection with refresh rate and resolution options!\n\n<a href='tools/hardware.html'>Open PC Builder →</a>",
      workstation:
        "For workstation builds, our **PC Builder** offers optimized configurations for productivity, video editing, and 3D rendering!\n\n<a href='tools/hardware.html'>Build Workstation →</a>",
      streaming:
        "Want a streaming setup? Our **PC Builder** has streaming-optimized component recommendations with AI scoring!\n\n<a href='tools/hardware.html'>Build Streaming PC →</a>",
      rtx: "Looking for RTX GPUs? Our **PC Builder** has the latest RTX 50 series (5060-5090) and RTX 40 series with price comparisons!\n\n<a href='tools/hardware.html'>Explore RTX GPUs →</a>",
      nvidia:
        "NVIDIA GPUs available in our **PC Builder**:\n• RTX 50 series (Latest 2025)\n• RTX 40 series\n• RTX 30 series\n\n<a href='tools/hardware.html'>Explore NVIDIA GPUs →</a>",
      amd: "AMD products in our **PC Builder**:\n• Ryzen 5000/7000 series CPUs\n• RX 7000/9000 series GPUs\n\n<a href='tools/hardware.html'>Explore AMD →</a>",
      intel:
        "Intel CPUs in our **PC Builder**:\n• 12th, 13th, 14th Gen Core series\n• Generation filters available\n\n<a href='tools/hardware.html'>Explore Intel →</a>",
      50000:
        "₹50,000 budget? Our **PC Builder** can help you build an entry-level gaming or productivity PC!\n\n<a href='tools/hardware.html'>Start Building →</a>",
      100000:
        "₹1,00,000 budget? Perfect for a mid-range gaming PC! Try our **PC Builder** for optimized recommendations.\n\n<a href='tools/hardware.html'>Build Your PC →</a>",
      "1 lakh":
        "₹1 Lakh budget? Great choice! Our **PC Builder** can help you get the best mid-range gaming PC with RTX 40/50 series.\n\n<a href='tools/hardware.html'>Build Your PC →</a>",
      "2 lakh":
        "₹2 Lakh budget? You can build a high-end gaming/workstation PC! Try our **PC Builder** for premium component recommendations.\n\n<a href='tools/hardware.html'>Build Premium PC →</a>",
      under:
        "Looking to build under a specific budget? Our **PC Builder** has preset budgets from ₹40K to ₹2L+ and filters components automatically!\n\n<a href='tools/hardware.html'>Open PC Builder →</a>",
      want: "Tell me more about what you're looking for! If it's about building a PC/laptop, try our **PC Builder**. For study abroad, check our **ROI Calculator**.",
      make: "Want to make/build something? Our **PC Builder** helps you configure a custom PC, and our **AI Notes** tool helps create study materials!",
      component:
        "Looking for component advice? Our **PC Builder** covers CPUs, GPUs, RAM, Storage, PSU, and Monitors with AI recommendations!\n\n<a href='tools/hardware.html'>Open PC Builder →</a>",
      recommend:
        "I can recommend:\n• **PC Builder** for hardware\n• **Study Abroad ROI** for education abroad\n• **Budget Optimizer** for free software\n• **Notes Generator** for studying\n\nWhat do you need?",

      // Study Abroad & Education
      "study abroad":
        "For study abroad planning, use our **Study Abroad ROI Calculator**. It shows tuition costs, part-time income potential, and month-by-month application timelines for UK, US, Canada, Germany, and Australia.",
      abroad:
        "Planning to study abroad? Our **Study Abroad ROI Calculator** shows costs, potential income, and ROI for 5 countries!\n\n<a href='tools/abroad.html'>Calculate ROI →</a>",
      usa: "Studying in USA? Our **Study Abroad ROI Calculator** shows US tuition costs, scholarship options, and expected ROI!",
      uk: "Studying in UK? Check our **Study Abroad ROI Calculator** for UK university costs and work opportunities!",
      canada:
        "Canada is popular for students! Our **Study Abroad ROI Calculator** covers Canadian immigration pathways and costs.",
      germany:
        "Germany offers free tuition at public universities! Check our **Study Abroad ROI Calculator** for details.",
      australia:
        "Australia study info available in our **Study Abroad ROI Calculator**!",

      // Other Tools & Topics
      free: "Need free tools? Our **Cloud-Swap Budget Optimizer** lists free alternatives like:\n• Google Colab (coding)\n• Photopea (design)\n• Notion (notes)\n• Figma (UI design)",
      cbse: "CBSE focuses on Python programming and is best for engineering/tech careers. Need 8GB minimum RAM, but 16GB recommended. Check our Curriculum Compare tool for more!",
      icse: "ICSE focuses on Java/BlueJ programming. Requires 16GB RAM for IDEs. Best for software development and research careers.",
      ib: "IB curriculum is internationally recognized. Our **Curriculum Comparison** tool shows hardware requirements!",
      "mental health":
        "Your wellbeing matters! Take our **Wellness Check** - a quick 10-question assessment with AI-powered insights. Remember, seeking help is strength! 💚",
      stress:
        "Feeling stressed? Our **Student Wellness Check** can help assess your mental wellbeing and provide resources. 💚\n\n<a href='tools/mental-health.html'>Take Wellness Check →</a>",
      notes:
        "Need to create study notes? Our **AI Study Notes Generator** can summarize PDFs and create mnemonics!\n\n<a href='tools/notes.html'>Generate Notes →</a>",
      study:
        "For studying, try:\n• **AI Study Notes** - Summarize PDFs\n• **Curriculum Compare** - Compare syllabi\n• **Wellness Check** - Manage stress",
      "fake news":
        "Worried about misinformation? Use our **VerifAI Fake News Detector** to verify educational news and articles!\n\n<a href='https://verifai-news.web.app/' target='_blank'>Open VerifAI →</a>",
      verify:
        "Need to verify information? Our **VerifAI** tool detects fake news and misinformation!",
      contact:
        "LearnerHQ is here to help! Use our AI Chatbot for instant answers, or explore our tools. For the Innov-A-Thon project team, check the README.",
      thank:
        "You're welcome! Feel free to ask if you need anything else. Happy to help! 😊",
      thanks: "Glad I could help! Let me know if you have more questions. 😊",
      bye: "Goodbye! Good luck with your studies! Come back anytime you need help. 👋",
    },
  },

  // AI Mode - when enabled, AI answers any question (not just education-related)
  aiMode: false,

  // Chat history storage
  chatHistory: [],

  // User Location
  userLocation: null,

  // Initialize the widget
  init() {
    this.loadChatHistory();
    this.loadAIMode();
    this.createWidget();
    this.attachEventListeners();
    this.renderSavedMessages();
  },

  // Load chat history from localStorage
  loadChatHistory() {
    try {
      const saved = localStorage.getItem("edubot_chat_history");
      if (saved) {
        this.chatHistory = JSON.parse(saved);
      }
    } catch (e) {
      console.log("No saved chat history");
      this.chatHistory = [];
    }
  },

  // Save chat history to localStorage
  saveChatHistory() {
    try {
      // Keep only last 100 messages to prevent storage overflow
      if (this.chatHistory.length > 100) {
        this.chatHistory = this.chatHistory.slice(-100);
      }
      localStorage.setItem(
        "edubot_chat_history",
        JSON.stringify(this.chatHistory),
      );
    } catch (e) {
      console.error("Failed to save chat history:", e);
    }
  },

  // Load AI Mode preference
  loadAIMode() {
    this.aiMode = localStorage.getItem("edubot_ai_mode") === "true";
  },

  // Toggle AI Mode
  toggleAIMode() {
    this.aiMode = !this.aiMode;
    localStorage.setItem("edubot_ai_mode", this.aiMode);
    this.updateAIModeUI();

    const modeText = this.aiMode
      ? "AI Mode ON - I can answer anything!"
      : "Guide Mode - I help with LearnerHQ tools";
    this.addMessage(modeText, "bot", false); // Don't save mode change messages
  },

  // Update AI Mode UI
  updateAIModeUI() {
    const toggle = document.getElementById("ai-mode-toggle");
    const status = document.querySelector(".chatbot-status");
    if (toggle) {
      toggle.classList.toggle("active", this.aiMode);
      toggle.title = this.aiMode ? "AI Mode ON" : "Guide Mode";
    }
    if (status) {
      status.textContent = this.aiMode
        ? "AI Mode • Ask Anything"
        : "Online • AI Powered";
    }
  },

  // Clear chat history
  clearChatHistory() {
    if (confirm("Delete all chat history? This cannot be undone.")) {
      this.chatHistory = [];
      localStorage.removeItem("edubot_chat_history");
      const messages = document.getElementById("chatbot-messages");
      if (messages) {
        messages.innerHTML = this.getWelcomeMessage();
      }
    }
  },

  // Get welcome message HTML
  getWelcomeMessage() {
    return `
            <div class="chatbot-message bot">
                <img src="${this.getBasePath()}Images/ChatBot.png" alt="EduBot" class="chatbot-msg-avatar">
                <div class="chatbot-bubble">
                    <p>Hi! I'm <strong>EduBot</strong>, your guide to LearnerHQ! 👋</p>
                    <p class="mt-2">I can help you:</p>
                    <ul>
                        <li>Navigate our tools</li>
                        <li>Answer education questions</li>
                        <li>Provide study abroad info</li>
                    </ul>
                    <p class="mt-2" style="font-size: 12px; color: #94a3b8;">💡 Enable <strong>AI Mode</strong> (🤖 button) for general questions!</p>
                </div>
            </div>
        `;
  },

  // Render saved messages on load
  renderSavedMessages() {
    if (this.chatHistory.length === 0) return;

    const messages = document.getElementById("chatbot-messages");
    if (!messages) return;

    // Clear default welcome and add saved history
    messages.innerHTML = this.getWelcomeMessage();

    this.chatHistory.forEach((msg) => {
      const msgEl = document.createElement("div");
      msgEl.className = `chatbot-message ${msg.type}`;
      const avatarSrc = this.getBasePath() + "Images/ChatBot.png";
      msgEl.innerHTML = `
                ${msg.type === "bot" ? `<img src="${avatarSrc}" alt="EduBot" class="chatbot-msg-avatar">` : ""}
                <div class="chatbot-bubble">${this.formatText(msg.text)}</div>
            `;
      messages.appendChild(msgEl);
    });

    messages.scrollTop = messages.scrollHeight;
  },

  // Create the widget HTML
  createWidget() {
    const widget = document.createElement("div");
    widget.id = "chatbot-widget";
    widget.innerHTML = `
            <!-- Floating Button -->
            <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Open chat">
                <img src="${this.getBasePath()}Images/ChatBot.png" alt="EduBot" class="chatbot-avatar">
                <span class="chatbot-pulse"></span>
            </button>
            
            <!-- Chat Window -->
            <div id="chatbot-window" class="chatbot-window hidden">
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <img src="${this.getBasePath()}Images/ChatBot.png" alt="EduBot" class="chatbot-header-avatar">
                        <div>
                            <h4>EduBot</h4>
                            <span class="chatbot-status">${this.aiMode ? "AI Mode • Ask Anything" : "Online • AI Powered"}</span>
                        </div>
                    </div>
                    <div class="chatbot-header-actions">
                        <button id="chatbot-location-btn" class="chatbot-header-btn" title="Enable Location Context">
                            📍
                        </button>
                        <button id="chatbot-web-btn" class="chatbot-header-btn" title="Search Web">
                            🌐
                        </button>
                        <button id="ai-mode-toggle" class="chatbot-header-btn ${this.aiMode ? "active" : ""}" title="${this.aiMode ? "AI Mode ON" : "Enable AI Mode"}">
                            🤖
                        </button>
                        <button id="clear-chat-btn" class="chatbot-header-btn" title="Clear Chat History">
                            🗑️
                        </button>
                        <button id="chatbot-close" class="chatbot-close" aria-label="Close chat">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div id="chatbot-messages" class="chatbot-messages">
                    <div class="chatbot-message bot">
                        <img src="${this.getBasePath()}Images/ChatBot.png" alt="EduBot" class="chatbot-msg-avatar">
                        <div class="chatbot-bubble">
                            <p>Hi! I'm <strong>EduBot</strong>, your guide to LearnerHQ! 👋</p>
                            <p class="mt-2">I can help you:</p>
                            <ul>
                                <li>Navigate our tools</li>
                                <li>Answer education questions</li>
                                <li>Provide study abroad info</li>
                            </ul>
                            <p class="mt-2" style="font-size: 12px; color: #94a3b8;">💡 Enable <strong>AI Mode</strong> (🤖) to ask me anything!</p>
                        </div>
                    </div>
                </div>
                
                <div class="chatbot-quick-actions">
                    <button class="chatbot-quick-btn" data-msg="What tools do you have?">🛠️ Tools</button>
                    <button class="chatbot-quick-btn" data-msg="Tell me about study abroad">🌍 Abroad</button>
                    <button class="chatbot-quick-btn" data-msg="I need laptop help">💻 Laptop</button>
                    <button class="chatbot-quick-btn" data-msg="Show free resources">🆓 Free</button>
                </div>
                
                <form id="chatbot-form" class="chatbot-input-area">
                    <input type="text" id="chatbot-input" placeholder="${this.aiMode ? "Ask me anything..." : "Ask about our tools..."}" autocomplete="off">
                    <button type="submit" class="chatbot-send">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                        </svg>
                    </button>
                </form>
            </div>
        `;

    document.body.appendChild(widget);
    this.injectStyles();
  },

  // Get base path for assets
  getBasePath() {
    const path = window.location.pathname;
    if (path.includes("/tools/")) {
      return "../";
    }
    return "";
  },

  // Inject CSS styles
  injectStyles() {
    if (document.getElementById("chatbot-styles")) return;

    const styles = document.createElement("style");
    styles.id = "chatbot-styles";
    styles.textContent = `
            #chatbot-widget {
                font-family: 'Inter', sans-serif;
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
            }
            
            .chatbot-toggle {
                width: 64px;
                height: 64px;
                border-radius: 50%;
                background: linear-gradient(135deg, #06b6d4, #3b82f6);
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(6, 182, 212, 0.4);
                transition: transform 0.3s, box-shadow 0.3s;
                position: relative;
                padding: 8px;
            }
            
            .chatbot-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 30px rgba(6, 182, 212, 0.6);
            }
            
            .chatbot-avatar {
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 50%;
            }
            
            .chatbot-pulse {
                position: absolute;
                inset: -4px;
                border-radius: 50%;
                border: 2px solid #06b6d4;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0; }
            }
            
            .chatbot-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 380px;
                max-width: calc(100vw - 40px);
                height: 520px;
                max-height: calc(100vh - 120px);
                background: #0f172a;
                border-radius: 16px;
                border: 1px solid rgba(255,255,255,0.1);
                box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                transition: opacity 0.3s, transform 0.3s;
            }
            
            .chatbot-window.hidden {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
                pointer-events: none;
            }
            
            .chatbot-header {
                background: linear-gradient(135deg, #06b6d4, #3b82f6);
                padding: 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .chatbot-header-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .chatbot-header-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: white;
                padding: 4px;
            }
            
            .chatbot-header h4 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
                color: white;
            }
            
            .chatbot-status {
                font-size: 12px;
                color: rgba(255,255,255,0.8);
            }
            
            .chatbot-close {
                background: rgba(255,255,255,0.2);
                border: none;
                border-radius: 8px;
                padding: 8px;
                cursor: pointer;
                color: white;
                transition: background 0.2s;
            }
            
            .chatbot-close:hover {
                background: rgba(255,255,255,0.3);
            }

            .chatbot-header-actions {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .chatbot-header-btn {
                background: rgba(255,255,255,0.2);
                border: none;
                border-radius: 8px;
                padding: 6px 8px;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.2s;
                opacity: 0.8;
            }

            .chatbot-header-btn:hover {
                background: rgba(255,255,255,0.3);
                opacity: 1;
            }

            .chatbot-header-btn.active {
                background: rgba(255,255,255,0.9);
                opacity: 1;
                box-shadow: 0 0 8px rgba(255,255,255,0.5);
            }
            
            .chatbot-messages {
                flex: 1;
                overflow-y: auto;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            
            .chatbot-message {
                display: flex;
                gap: 8px;
                max-width: 85%;
            }
            
            .chatbot-message.bot {
                align-self: flex-start;
            }
            
            .chatbot-message.user {
                align-self: flex-end;
                flex-direction: row-reverse;
            }
            
            .chatbot-msg-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                flex-shrink: 0;
            }
            
            .chatbot-message.user .chatbot-msg-avatar {
                display: none;
            }
            
            .chatbot-bubble {
                background: #1e293b;
                padding: 12px 16px;
                border-radius: 16px;
                font-size: 14px;
                line-height: 1.5;
                color: #e2e8f0;
            }
            
            .chatbot-message.bot .chatbot-bubble {
                border-top-left-radius: 4px;
            }
            
            .chatbot-message.user .chatbot-bubble {
                background: linear-gradient(135deg, #06b6d4, #3b82f6);
                color: white;
                border-top-right-radius: 4px;
            }
            
            .chatbot-bubble ul {
                margin: 8px 0 0;
                padding-left: 16px;
            }
            
            .chatbot-bubble li {
                margin: 4px 0;
            }
            
            .chatbot-bubble a {
                color: #06b6d4;
                text-decoration: underline;
            }
            
            .chatbot-bubble strong {
                color: #22d3ee;
            }
            
            .chatbot-quick-actions {
                padding: 8px 16px;
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            
            .chatbot-quick-btn {
                padding: 6px 12px;
                background: #1e293b;
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 20px;
                color: #94a3b8;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .chatbot-quick-btn:hover {
                background: #334155;
                color: white;
            }
            
            .chatbot-input-area {
                padding: 12px 16px;
                display: flex;
                gap: 8px;
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            
            .chatbot-input-area input {
                flex: 1;
                background: #1e293b;
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 24px;
                padding: 12px 16px;
                color: white;
                font-size: 14px;
                outline: none;
            }
            
            .chatbot-input-area input:focus {
                border-color: #06b6d4;
            }
            
            .chatbot-send {
                width: 44px;
                height: 44px;
                background: linear-gradient(135deg, #06b6d4, #3b82f6);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s;
            }
            
            .chatbot-send:hover {
                transform: scale(1.1);
            }
            
            .chatbot-typing {
                display: flex;
                gap: 4px;
                padding: 8px;
            }
            
            .chatbot-typing span {
                width: 8px;
                height: 8px;
                background: #64748b;
                border-radius: 50%;
                animation: typing 1.4s infinite;
            }
            
            .chatbot-typing span:nth-child(2) { animation-delay: 0.2s; }
            .chatbot-typing span:nth-child(3) { animation-delay: 0.4s; }
            
            @keyframes typing {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-8px); }
            }
            
            .mt-2 { margin-top: 8px; }
            
            /* Mobile Responsive */
            @media (max-width: 480px) {
                #chatbot-widget {
                    bottom: 16px;
                    right: 16px;
                }
                
                .chatbot-toggle {
                    width: 56px;
                    height: 56px;
                }
                
                .chatbot-window {
                    width: calc(100vw - 32px);
                    height: calc(100vh - 100px);
                    bottom: 72px;
                    right: -4px;
                }
                
                .chatbot-quick-actions {
                    display: none;
                }
            }
        `;

    document.head.appendChild(styles);
  },

  // Attach event listeners
  attachEventListeners() {
    const toggle = document.getElementById("chatbot-toggle");
    const close = document.getElementById("chatbot-close");
    const form = document.getElementById("chatbot-form");
    const quickBtns = document.querySelectorAll(".chatbot-quick-btn");
    const aiModeBtn = document.getElementById("ai-mode-toggle");
    const locationBtn = document.getElementById("chatbot-location-btn");
    const webBtn = document.getElementById("chatbot-web-btn");
    const clearChatBtn = document.getElementById("clear-chat-btn");

    toggle.addEventListener("click", () => this.toggle());
    close.addEventListener("click", () => this.close());
    form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Location toggle
    if (locationBtn) {
      locationBtn.addEventListener("click", () => this.toggleLocation());
    }

    // Web Search toggle (Open Google Search input)
    if (webBtn) {
      webBtn.addEventListener("click", () => {
        const input = document.getElementById("chatbot-input");
        const query = input.value.trim();
        if (query) {
          window.open(
            `https://www.google.com/search?q=${encodeURIComponent(query)}`,
            "_blank",
          );
          this.addMessage(`🌐 Opened Google Search for: "${query}"`, "bot");
          input.value = "";
        } else {
          this.addMessage(
            "Type something in the box first, then click 🌐 to search Google!",
            "bot",
            false,
          );
          input.focus();
        }
      });
    }

    // AI Mode toggle
    if (aiModeBtn) {
      aiModeBtn.addEventListener("click", () => this.toggleAIMode());
    }

    // Clear chat history
    if (clearChatBtn) {
      clearChatBtn.addEventListener("click", () => this.clearChatHistory());
    }

    quickBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const msg = btn.dataset.msg;
        document.getElementById("chatbot-input").value = msg;
        form.dispatchEvent(new Event("submit"));
      });
    });
  },

  // Toggle chat window
  toggle() {
    const window = document.getElementById("chatbot-window");
    this.isOpen = !this.isOpen;
    window.classList.toggle("hidden", !this.isOpen);

    if (this.isOpen) {
      document.getElementById("chatbot-input").focus();
    }
  },

  // Close chat window
  close() {
    const window = document.getElementById("chatbot-window");
    this.isOpen = false;
    window.classList.add("hidden");
  },

  // Handle form submit
  async handleSubmit(e) {
    e.preventDefault();

    const input = document.getElementById("chatbot-input");
    const message = input.value.trim();
    if (!message) return;

    // Add user message
    this.addMessage(message, "user");
    input.value = "";

    // Show typing indicator
    this.showTyping();

    // Get response
    const response = await this.getResponse(message);

    // Remove typing and add response
    this.hideTyping();
    this.addMessage(response, "bot");
  },

  // Add message to chat
  addMessage(text, type, saveToHistory = true) {
    const messages = document.getElementById("chatbot-messages");
    const msg = document.createElement("div");
    msg.className = `chatbot-message ${type}`;

    const avatarSrc = this.getBasePath() + "Images/ChatBot.png";

    msg.innerHTML = `
            ${type === "bot" ? `<img src="${avatarSrc}" alt="EduBot" class="chatbot-msg-avatar">` : ""}
            <div class="chatbot-bubble">${this.formatText(text)}</div>
        `;

    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;

    // Save to history if enabled
    if (saveToHistory) {
      this.chatHistory.push({ text, type, timestamp: Date.now() });
      this.saveChatHistory();
    }
  },

  // Show typing indicator
  showTyping() {
    const messages = document.getElementById("chatbot-messages");
    const typing = document.createElement("div");
    typing.id = "chatbot-typing-indicator";
    typing.className = "chatbot-message bot";
    typing.innerHTML = `
            <img src="${this.getBasePath()}Images/ChatBot.png" alt="EduBot" class="chatbot-msg-avatar">
            <div class="chatbot-bubble chatbot-typing">
                <span></span><span></span><span></span>
            </div>
        `;
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
  },

  // Hide typing indicator
  hideTyping() {
    const typing = document.getElementById("chatbot-typing-indicator");
    if (typing) typing.remove();
  },

  // Format text with markdown-like syntax
  formatText(text) {
    return (
      text
        // Convert LaTeX math notation to plain text
        .replace(/\$\\int\s*/g, "∫")
        .replace(/\$\\sin\(([^)]+)\)\$/g, "sin($1)")
        .replace(/\$\\cos\(([^)]+)\)\$/g, "cos($1)")
        .replace(/\$\\tan\(([^)]+)\)\$/g, "tan($1)")
        .replace(/\$\\sqrt\{([^}]+)\}\$/g, "√($1)")
        .replace(/\$\\frac\{([^}]+)\}\{([^}]+)\}\$/g, "($1/$2)")
        .replace(/\$\\pi\$/g, "π")
        .replace(/\$\\times\$/g, "×")
        .replace(/\$\\div\$/g, "÷")
        .replace(/\$\\pm\$/g, "±")
        .replace(/\$\\infty\$/g, "∞")
        .replace(/\$([^$]+)\$/g, "$1") // Remove remaining $ wrappers
        .replace(/\\,/g, " ") // LaTeX thin space
        .replace(/\\cdot/g, "·")
        // Standard formatting
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>")
        .replace(/• /g, "&bull; ")
    );
  },

  // Get response - tries website knowledge first, then AI
  async getResponse(message) {
    const lowerMsg = message.toLowerCase();

    // If AI Mode is ON, use AI for everything (except basic greetings)
    if (this.aiMode) {
      const basicGreetings = ["hi", "hello", "hey"];
      if (basicGreetings.some((g) => lowerMsg === g || lowerMsg === g + "!")) {
        return "Hi there! 👋 AI Mode is ON - I can answer anything! What would you like to know?";
      }
      return await this.getFullAIResponse(message);
    }

    // Check quick answers (Guide Mode)
    for (const [key, answer] of Object.entries(this.websiteInfo.quickAnswers)) {
      if (lowerMsg.includes(key)) {
        return answer;
      }
    }

    // Check for tool-specific queries
    for (const [id, tool] of Object.entries(this.websiteInfo.tools)) {
      if (lowerMsg.includes(id) || lowerMsg.includes(tool.name.toLowerCase())) {
        const link = tool.link.startsWith("http")
          ? tool.link
          : this.getBasePath() + tool.link;
        return `**${tool.name}**\n\n${tool.description}\n\n<a href="${link}" target="${tool.link.startsWith("http") ? "_blank" : "_self"}">Open ${tool.name} →</a>`;
      }
    }

    // Check for navigation intents
    if (lowerMsg.includes("home") || lowerMsg.includes("main")) {
      return `You can go to the <a href="${this.getBasePath()}index.html">Home Page</a> to see all our tools and get started!`;
    }

    // Fall back to AI (education-focused)
    return await this.getAIResponse(message);
  },

  // Get full AI response (AI Mode - answers anything)
  async getFullAIResponse(message) {
    if (typeof APIManager === "undefined") {
      return this.getAIModeFallback(message);
    }

    const systemPrompt = `You are a helpful, knowledgeable AI assistant. You can answer ANY question on ANY topic including:
- Math, science, history, geography
- Travel destinations, food, recipes, culture
- Coding, technology, general knowledge
- Entertainment, sports, current events
- Personal advice, recommendations, anything else!

IMPORTANT FORMATTING RULES:
- Use PLAIN TEXT only - NO LaTeX, NO $ symbols for math
- Write math as: sin(x), cos(x), sqrt(x), pi (not $\\sin(x)$ or $\\pi$)
- Write fractions as: (a/b) or "a divided by b"
- Keep responses concise (2-5 sentences for simple questions)
- Be friendly, helpful, and informative
- For calculations, show the answer clearly
- For coding, provide code snippets if helpful

User Location: ${this.userLocation ? `${this.userLocation.display} (Lat: ${this.userLocation.lat}, Lng: ${this.userLocation.lng})` : "Unknown (User has not shared location)"}
User question: ${message}

Your response:`;

    try {
      const result = await APIManager.callGemini(systemPrompt, {
        maxTokens: 800,
      });
      if (result.success) {
        // Check if response seems incomplete (ends with sentence fragment)
        let text = result.text;
        if (
          text.length > 0 &&
          ![".", "!", "?", "\n"].includes(text.slice(-1))
        ) {
          text +=
            "...\n\n(Response truncated. Try asking for effective summary)";
        }
        // Add Google Search fallback link
        text += `\n\n<a href="https://www.google.com/search?q=${encodeURIComponent(message)}" target="_blank" style="font-size: 0.8em; opacity: 0.8;">🌐 Search on Google</a>`;
        return text;
      }

      // Don't try Hugging Face from file:// protocol (CORS issues)
      if (window.location.protocol !== "file:") {
        const hfResult = await APIManager.callHuggingFace(systemPrompt);
        if (hfResult.success) {
          return hfResult.text;
        }
      }
    } catch (error) {
      console.error("AI Mode error:", error);
    }

    // Smart fallback when API fails
    return this.getAIModeFallback(message);
  },

  // Fallback for AI Mode when APIs are unavailable
  getAIModeFallback(message) {
    const lowerMsg = message.toLowerCase();

    // Check if it's a math question - provide basic help
    if (
      /\d+\s*[\+\-\*\/x×÷]\s*\d+/.test(message) ||
      lowerMsg.includes("calculate") ||
      lowerMsg.includes("multiply") ||
      lowerMsg.includes("divide")
    ) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(message)}`;
      return `I can't process calculations right now (API temporarily busy). Quick tip: Try using your browser's console or a calculator! 🧮\n\nOr ask me about our **PC Builder** or **Study Abroad** tools!\n\n<a href="${searchUrl}" target="_blank" class="google-search-link">🌐 Search on Google →</a>`;
    }

    // Check for education/tool related - redirect to smart fallback
    const eduKeywords = [
      "pc",
      "laptop",
      "build",
      "study",
      "abroad",
      "notes",
      "curriculum",
      "budget",
      "wellness",
      "hardware",
    ];
    if (eduKeywords.some((kw) => lowerMsg.includes(kw))) {
      return this.getSmartFallback(message);
    }

    // General fallback with Google Search redirect
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(message)}`;
    return `I don't have enough information for that specific question, but you can continue your search on Google!\n\n<a href="${searchUrl}" target="_blank" style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #4285f4, #34a853); border-radius: 8px; color: white; text-decoration: none; font-weight: 500; margin: 8px 0;">🌐 Search "${message.substring(0, 30)}${message.length > 30 ? "..." : ""}" on Google</a>\n\n**I can also help with:**\n• **PC Building** - Get hardware recommendations\n• **Study Abroad** - Calculate ROI for different countries\n• **AI Notes** - Generate study materials`;
  },

  // Get AI response using APIManager
  async getAIResponse(message) {
    // Check if APIManager is available
    if (typeof APIManager === "undefined") {
      // Fallback when API not available - check for common patterns
      return this.getSmartFallback(message);
    }

    const systemPrompt = `You are EduBot, a friendly AI assistant for LearnerHQ - an education planning platform for students.

AVAILABLE TOOLS (always recommend relevant tools with links):
1. **PC Builder & Hardware Analyzer** (tools/hardware.html) - Build custom PCs, get laptop recommendations, budget-based component selection, AI scoring, compare prices across 6 retailers
2. **Study Abroad ROI Calculator** (tools/abroad.html) - Calculate costs, ROI, and timelines for UK, US, Canada, Germany, Australia
3. **AI Study Notes Generator** (tools/notes.html) - Upload PDFs, get summaries, mnemonics, quizzes
4. **Cloud-Swap Budget Optimizer** (tools/budget.html) - Find free alternatives to paid software
5. **Curriculum Comparison** (tools/curriculum.html) - Compare CBSE, ICSE, IB, US curricula
6. **Student Wellness Check** (tools/mental-health.html) - Mental health assessment with resources
7. **VerifAI Fake News Detector** (https://verifai-news.web.app/) - Verify news and information

RESPONSE RULES:
- Keep responses brief (2-4 sentences)
- If user mentions budget/₹/rupees/lakh + PC/computer/build/gaming → recommend PC Builder
- If user mentions study/abroad/country → recommend Study Abroad ROI
- Always include a clickable link when recommending a tool
- Be helpful, friendly, and proactive in suggesting relevant tools
- For PC building queries with specific budgets, mention our PC Builder has presets for ₹40K to ₹2L+

User Location: ${this.userLocation ? `${this.userLocation.display} (Lat: ${this.userLocation.lat}, Lng: ${this.userLocation.lng})` : "Unknown"}
User message: ${message}

Respond as EduBot:`;

    try {
      const result = await APIManager.callGemini(systemPrompt, {
        maxTokens: 250,
      });
      if (result.success) {
        return result.text;
      }

      // Try Hugging Face
      const hfResult = await APIManager.callHuggingFace(systemPrompt);
      if (hfResult.success) {
        return hfResult.text;
      }
    } catch (error) {
      console.error("AI error:", error);
    }

    // Smart fallback if AI fails
    return this.getSmartFallback(message);
  },

  // Smart fallback when AI is unavailable
  getSmartFallback(message) {
    const lowerMsg = message.toLowerCase();

    // Check for PC/hardware related keywords
    const pcKeywords = [
      "pc",
      "build",
      "computer",
      "gaming",
      "laptop",
      "gpu",
      "cpu",
      "rupee",
      "₹",
      "lakh",
      "budget",
      "hardware",
      "graphics",
      "processor",
      "ram",
    ];
    if (pcKeywords.some((kw) => lowerMsg.includes(kw))) {
      return `Great question! For PC building and hardware recommendations, try our **PC Builder & Hardware Analyzer**. It helps you build a custom PC within any budget with AI-powered recommendations!\n\n<a href='${this.getBasePath()}tools/hardware.html'>Open PC Builder →</a>`;
    }

    // Check for study abroad keywords
    const abroadKeywords = [
      "abroad",
      "study",
      "university",
      "college",
      "usa",
      "uk",
      "canada",
      "germany",
      "australia",
      "scholarship",
    ];
    if (abroadKeywords.some((kw) => lowerMsg.includes(kw))) {
      return `For study abroad planning, our **Study Abroad ROI Calculator** can help! It shows costs, potential income, and ROI for 5 countries.\n\n<a href='${this.getBasePath()}tools/abroad.html'>Calculate ROI →</a>`;
    }

    // Default response with tool suggestions
    return `I'd love to help! Here are some suggestions:\n• For PC/laptop help → **PC Builder**\n• For study abroad → **ROI Calculator**\n• For free software → **Budget Optimizer**\n• For study materials → **AI Notes**\n\nTell me what you're looking for!`;
  },

  // Toggle Location Access
  async toggleLocation() {
    const btn = document.getElementById("chatbot-location-btn");

    if (this.userLocation) {
      // Disable location
      this.userLocation = null;
      btn.classList.remove("active");
      btn.title = "Enable Location Context";
      this.addMessage("🚫 Location access disabled.", "bot", false);
    } else {
      // Enable location
      btn.classList.add("animate-pulse");
      this.addMessage("📍 Requesting location access...", "bot", false);

      await this.detectLocation();

      btn.classList.remove("animate-pulse");
      if (this.userLocation) {
        btn.classList.add("active");
        btn.title = "Location Active: " + this.userLocation.display;
        this.addMessage(
          `✅ Location detected: **${this.userLocation.display}**. I can now give better answers based on your region!`,
          "bot",
        );
      } else {
        this.addMessage(
          "⚠️ Could not access location. Please check browser permissions.",
          "bot",
          false,
        );
      }
    }
  },

  // Detect User Location
  async detectLocation() {
    if (!navigator.geolocation) return;

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          this.userLocation = {
            lat,
            lng,
            display: `${lat.toFixed(2)}, ${lng.toFixed(2)}`,
          };

          // Reverse Geocoding (Nominatim Free API)
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
            );
            const data = await res.json();
            if (data.address) {
              const city =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.county;
              const state = data.address.state;
              const country = data.address.country;
              this.userLocation.city = city;
              this.userLocation.country = country;
              this.userLocation.state = state;
              this.userLocation.display = [city, state, country]
                .filter(Boolean)
                .join(", ");

              // Update button title if active
              const btn = document.getElementById("chatbot-location-btn");
              if (btn)
                btn.title = "Location Active: " + this.userLocation.display;
            }
          } catch (e) {
            console.error("Reverse geocoding failed", e);
          }
          resolve();
        },
        (err) => {
          console.error("Geolocation error", err);
          resolve();
        },
      );
    });
  },
};

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => ChatbotWidget.init());
} else {
  ChatbotWidget.init();
}

// Export
window.ChatbotWidget = ChatbotWidget;
