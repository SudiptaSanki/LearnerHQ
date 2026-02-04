// ============================================
// PC Builder Logic - Component Database & AI Integration
// ============================================

const PCBuilder = {
  // Current build state
  build: {
    useCase: "gaming",
    cpu: null,
    motherboard: null,
    ram: { type: "ddr5", capacity: 16, brand: "Corsair" },
    gpu: null,
    storage: { capacity: 512, brand: "Samsung" },
    psu: { wattage: 650, rating: "Gold", brand: "Corsair" },
    monitor: { size: 27, resolution: "1440p", refresh: 144, brand: "LG" },
    currency: "inr",
    budget: 100000,
  },

  // CPU Database
  cpuDatabase: {
    intel: [
      { name: "Intel Core i3-12100F", cores: 4, threads: 8, price: 8500, tier: "entry", gen: "12th" },
      { name: "Intel Core i5-12400F", cores: 6, threads: 12, price: 14500, tier: "mid", gen: "12th" },
      { name: "Intel Core i5-13400F", cores: 10, threads: 16, price: 18500, tier: "mid", gen: "13th" },
      { name: "Intel Core i5-14400F", cores: 10, threads: 16, price: 21000, tier: "mid", gen: "14th" },
      { name: "Intel Core i7-13700F", cores: 16, threads: 24, price: 32000, tier: "high", gen: "13th" },
      { name: "Intel Core i7-14700KF", cores: 20, threads: 28, price: 42000, tier: "high", gen: "14th" },
      { name: "Intel Core i9-14900K", cores: 24, threads: 32, price: 58000, tier: "extreme", gen: "14th" },
      { name: "Intel Core Ultra 5 125H", cores: 14, threads: 18, price: 28000, tier: "mid", gen: "Ultra" },
      { name: "Intel Core Ultra 5 135H", cores: 14, threads: 18, price: 32000, tier: "mid", gen: "Ultra" },
      { name: "Intel Core Ultra 7 155H", cores: 16, threads: 22, price: 45000, tier: "high", gen: "Ultra" },
      { name: "Intel Core Ultra 7 165H", cores: 16, threads: 22, price: 52000, tier: "high", gen: "Ultra" },
      { name: "Intel Core Ultra 9 185H", cores: 16, threads: 22, price: 65000, tier: "extreme", gen: "Ultra" },
      { name: "Intel Core Ultra 5 225H", cores: 14, threads: 18, price: 35000, tier: "mid", gen: "Ultra2" },
      { name: "Intel Core Ultra 7 255H", cores: 16, threads: 22, price: 55000, tier: "high", gen: "Ultra2" },
      { name: "Intel Core Ultra 9 285H", cores: 16, threads: 24, price: 72000, tier: "extreme", gen: "Ultra2" },
    ],
    amd: [
      { name: "AMD Ryzen 5 5500", cores: 6, threads: 12, price: 9500, tier: "entry", gen: "5000" },
      { name: "AMD Ryzen 5 5600", cores: 6, threads: 12, price: 12500, tier: "mid", gen: "5000" },
      { name: "AMD Ryzen 5 7600", cores: 6, threads: 12, price: 20000, tier: "mid", gen: "7000" },
      { name: "AMD Ryzen 7 5700X", cores: 8, threads: 16, price: 18000, tier: "mid", gen: "5000" },
      { name: "AMD Ryzen 7 7700X", cores: 8, threads: 16, price: 29000, tier: "high", gen: "7000" },
      { name: "AMD Ryzen 9 7900X", cores: 12, threads: 24, price: 42000, tier: "high", gen: "7000" },
      { name: "AMD Ryzen 9 7950X", cores: 16, threads: 32, price: 55000, tier: "extreme", gen: "7000" },
      { name: "AMD Ryzen 5 9600X", cores: 6, threads: 12, price: 26000, tier: "mid", gen: "9000" },
      { name: "AMD Ryzen 7 9700X", cores: 8, threads: 16, price: 38000, tier: "high", gen: "9000" },
      { name: "AMD Ryzen 9 9900X", cores: 12, threads: 24, price: 52000, tier: "high", gen: "9000" },
      { name: "AMD Ryzen 9 9950X", cores: 16, threads: 32, price: 68000, tier: "extreme", gen: "9000" },
    ],
  },

  // Motherboard Database
  motherboardDatabase: {
    intel: {
      asus: [
        {
          name: "ASUS Prime B660M-A",
          chipset: "B660",
          form: "matx",
          price: 11000,
        },
        {
          name: "ASUS TUF Gaming B760-Plus",
          chipset: "B760",
          form: "atx",
          price: 16500,
        },
        {
          name: "ASUS ROG Strix Z790-A",
          chipset: "Z790",
          form: "atx",
          price: 32000,
        },
      ],
      msi: [
        { name: "MSI PRO B660M-A", chipset: "B660", form: "matx", price: 9500 },
        {
          name: "MSI MAG B760 Tomahawk",
          chipset: "B760",
          form: "atx",
          price: 18000,
        },
        {
          name: "MSI MPG Z790 Edge",
          chipset: "Z790",
          form: "atx",
          price: 28000,
        },
      ],
      gigabyte: [
        {
          name: "Gigabyte B660M DS3H",
          chipset: "B660",
          form: "matx",
          price: 8500,
        },
        {
          name: "Gigabyte B760 Aorus Elite",
          chipset: "B760",
          form: "atx",
          price: 17500,
        },
        {
          name: "Gigabyte Z790 Aorus Master",
          chipset: "Z790",
          form: "atx",
          price: 35000,
        },
      ],
      asrock: [
        {
          name: "ASRock B660M Pro RS",
          chipset: "B660",
          form: "matx",
          price: 8000,
        },
        {
          name: "ASRock B760 Pro RS",
          chipset: "B760",
          form: "atx",
          price: 13500,
        },
        {
          name: "ASRock Z790 Steel Legend",
          chipset: "Z790",
          form: "atx",
          price: 24000,
        },
      ],
    },
    amd: {
      asus: [
        {
          name: "ASUS Prime B550M-A",
          chipset: "B550",
          form: "matx",
          price: 9500,
        },
        {
          name: "ASUS TUF Gaming B650-Plus",
          chipset: "B650",
          form: "atx",
          price: 18000,
        },
        {
          name: "ASUS ROG Strix X670E-E",
          chipset: "X670E",
          form: "atx",
          price: 42000,
        },
      ],
      msi: [
        {
          name: "MSI MAG B550M Mortar",
          chipset: "B550",
          form: "matx",
          price: 10500,
        },
        {
          name: "MSI MAG B650 Tomahawk",
          chipset: "B650",
          form: "atx",
          price: 20000,
        },
        {
          name: "MSI MEG X670E Ace",
          chipset: "X670E",
          form: "atx",
          price: 48000,
        },
      ],
      gigabyte: [
        {
          name: "Gigabyte B550M DS3H",
          chipset: "B550",
          form: "matx",
          price: 7500,
        },
        {
          name: "Gigabyte B650 Aorus Elite",
          chipset: "B650",
          form: "atx",
          price: 19000,
        },
        {
          name: "Gigabyte X670E Aorus Master",
          chipset: "X670E",
          form: "atx",
          price: 45000,
        },
      ],
      asrock: [
        {
          name: "ASRock B550M Pro4",
          chipset: "B550",
          form: "matx",
          price: 7000,
        },
        {
          name: "ASRock B650 PG Lightning",
          chipset: "B650",
          form: "atx",
          price: 15500,
        },
        {
          name: "ASRock X670E Taichi",
          chipset: "X670E",
          form: "atx",
          price: 40000,
        },
      ],
    },
  },

  // GPU Database with Series for Filtering
  gpuDatabase: {
    nvidia: [
      // GTX 16 Series (Legacy)
      { name: "NVIDIA GTX 1650", vram: 4, price: 14000, tier: "entry", tdp: 75, series: "16" },
      // RTX 30 Series
      { name: "NVIDIA RTX 3060", vram: 12, price: 26000, tier: "mid", tdp: 170, series: "30" },
      { name: "NVIDIA RTX 3070", vram: 8, price: 38000, tier: "high", tdp: 220, series: "30" },
      { name: "NVIDIA RTX 3080", vram: 10, price: 52000, tier: "high", tdp: 320, series: "30" },
      // RTX 40 Series
      { name: "NVIDIA RTX 4060", vram: 8, price: 30000, tier: "mid", tdp: 115, series: "40" },
      { name: "NVIDIA RTX 4060 Ti", vram: 8, price: 42000, tier: "mid", tdp: 160, series: "40" },
      { name: "NVIDIA RTX 4070", vram: 12, price: 58000, tier: "high", tdp: 200, series: "40" },
      { name: "NVIDIA RTX 4070 Super", vram: 12, price: 62000, tier: "high", tdp: 220, series: "40" },
      { name: "NVIDIA RTX 4070 Ti Super", vram: 16, price: 82000, tier: "high", tdp: 285, series: "40" },
      { name: "NVIDIA RTX 4080 Super", vram: 16, price: 105000, tier: "extreme", tdp: 320, series: "40" },
      { name: "NVIDIA RTX 4090", vram: 24, price: 175000, tier: "extreme", tdp: 450, series: "40" },
      // RTX 50 Series (Latest 2025) - Prices are estimates
      { name: "NVIDIA RTX 5060", vram: 8, price: 35000, tier: "mid", tdp: 130, series: "50", upcoming: true },
      { name: "NVIDIA RTX 5060 Ti", vram: 16, price: 48000, tier: "mid", tdp: 180, series: "50", upcoming: true },
      { name: "NVIDIA RTX 5070", vram: 12, price: 65000, tier: "high", tdp: 220, series: "50" },
      { name: "NVIDIA RTX 5070 Ti", vram: 16, price: 85000, tier: "high", tdp: 300, series: "50" },
      { name: "NVIDIA RTX 5080", vram: 16, price: 120000, tier: "extreme", tdp: 360, series: "50" },
      { name: "NVIDIA RTX 5090", vram: 32, price: 210000, tier: "extreme", tdp: 575, series: "50" },
    ],
    amd: [
      // RX 6000 Series
      { name: "AMD RX 6600", vram: 8, price: 18000, tier: "entry", tdp: 132, series: "6000" },
      { name: "AMD RX 6700 XT", vram: 12, price: 28000, tier: "mid", tdp: 230, series: "6000" },
      // RX 7000 Series
      { name: "AMD RX 7600", vram: 8, price: 27000, tier: "mid", tdp: 165, series: "7000" },
      { name: "AMD RX 7700 XT", vram: 12, price: 42000, tier: "mid", tdp: 245, series: "7000" },
      { name: "AMD RX 7800 XT", vram: 16, price: 52000, tier: "high", tdp: 263, series: "7000" },
      { name: "AMD RX 7900 XT", vram: 20, price: 75000, tier: "high", tdp: 315, series: "7000" },
      { name: "AMD RX 7900 XTX", vram: 24, price: 95000, tier: "extreme", tdp: 355, series: "7000" },
      // RX 9000 Series (Latest 2025) - Prices are estimates
      { name: "AMD RX 9060 XT", vram: 8, price: 32000, tier: "mid", tdp: 150, series: "9000", upcoming: true },
      { name: "AMD RX 9070", vram: 12, price: 55000, tier: "high", tdp: 200, series: "9000" },
      { name: "AMD RX 9070 XT", vram: 16, price: 68000, tier: "high", tdp: 250, series: "9000" },
    ],
    integrated: [
      { name: "Intel UHD 730", vram: 0, price: 0, tier: "integrated", tdp: 0, series: "integrated" },
      { name: "Intel Iris Xe", vram: 0, price: 0, tier: "integrated", tdp: 0, series: "integrated" },
      { name: "AMD Radeon Graphics", vram: 0, price: 0, tier: "integrated", tdp: 0, series: "integrated" },
    ],
  },

  // RAM Pricing
  ramPricing: {
    ddr4: { 8: 2000, 16: 3500, 32: 6500, 64: 12000 },
    ddr5: { 8: 2800, 16: 4500, 32: 8500, 64: 16000 },
  },

  // Storage Pricing
  storagePricing: {
    256: 2500,
    512: 4000,
    1000: 6500,
    2000: 12000,
  },

  // PSU Pricing
  psuPricing: {
    550: { Bronze: 4000, Gold: 5500, Platinum: 7500 },
    650: { Bronze: 5000, Gold: 7000, Platinum: 9500 },
    750: { Bronze: 6000, Gold: 8500, Platinum: 11000 },
    850: { Bronze: 7500, Gold: 10000, Platinum: 13500 },
    1000: { Bronze: 9000, Gold: 12500, Platinum: 16000 },
  },

  // Monitor Pricing
  monitorPricing: {
    "1080p": {
      24: { 60: 8000, 144: 12000, 165: 14000 },
      27: { 60: 10000, 144: 14000, 165: 16000 },
    },
    "1440p": {
      27: { 60: 18000, 144: 24000, 165: 28000 },
      32: { 60: 22000, 144: 28000, 165: 32000 },
    },
    "4K": { 27: { 60: 28000, 144: 45000 }, 32: { 60: 35000, 144: 55000 } },
  },

  // Selected brands
  selectedBrands: {
    cpu: "intel",
    mobo: "asus",
    moboForm: "atx",
    gpu: "nvidia",
  },

  // Filter state
  cpuFilter: {
    gen: "all",
    search: ""
  },

  // Initialize
  init() {
    this.renderCpuOptions();
    this.renderMoboOptions();
    this.renderGpuOptions();
    this.updateBuildSummary();
  },

  // Render CPU Options with filter support
  renderCpuOptions(filter = null) {
    const container = document.getElementById("cpuOptions");
    let cpus = this.cpuDatabase[this.selectedBrands.cpu];
    
    // Apply generation filter
    if (this.cpuFilter.gen !== "all") {
      cpus = cpus.filter(cpu => cpu.gen === this.cpuFilter.gen);
    }
    
    // Apply search filter
    if (this.cpuFilter.search) {
      const searchLower = this.cpuFilter.search.toLowerCase();
      cpus = cpus.filter(cpu => cpu.name.toLowerCase().includes(searchLower));
    }
    
    if (cpus.length === 0) {
      container.innerHTML = '<div class="text-slate-400 text-sm col-span-full text-center py-4">No processors match your filter. Try a different generation or search term.</div>';
      return;
    }

    container.innerHTML = cpus
      .map(
        (cpu, i) => `
            <div class="spec-item ${i === 0 ? "selected" : ""}" data-name="${cpu.name}" onclick="PCBuilder.selectCpuByName(this, '${cpu.name}')">
                <div class="font-medium text-sm">${cpu.name.replace("Intel Core ", "").replace("AMD ", "")}</div>
                <div class="text-xs text-slate-400">${cpu.cores}C/${cpu.threads}T</div>
                <div class="text-xs text-purple-400">₹${cpu.price.toLocaleString()}</div>
            </div>
        `,
      )
      .join("");

    if (cpus[0]) this.build.cpu = cpus[0];
    this.updateBuildSummary();
  },

  // Select CPU by name (for filtered lists)
  selectCpuByName(el, name) {
    document
      .querySelectorAll("#cpuOptions .spec-item")
      .forEach((e) => e.classList.remove("selected"));
    el.classList.add("selected");
    
    const allCpus = [...this.cpuDatabase.intel, ...this.cpuDatabase.amd];
    this.build.cpu = allCpus.find(cpu => cpu.name === name);
    this.updateBuildSummary();
  },

  // Render Motherboard Options
  renderMoboOptions() {
    const container = document.getElementById("moboOptions");
    const platform = this.selectedBrands.cpu === "intel" ? "intel" : "amd";
    const mobos =
      this.motherboardDatabase[platform][this.selectedBrands.mobo] || [];

    container.innerHTML = mobos
      .map(
        (mobo, i) => `
            <div class="spec-item ${i === 1 ? "selected" : ""}" data-index="${i}" onclick="PCBuilder.selectMobo(this, ${i})">
                <div class="font-medium text-sm">${mobo.name.split(" ").slice(-2).join(" ")}</div>
                <div class="text-xs text-slate-400">${mobo.chipset} • ${mobo.form.toUpperCase()}</div>
                <div class="text-xs text-purple-400">₹${mobo.price.toLocaleString()}</div>
            </div>
        `,
      )
      .join("");

    if (mobos[1]) this.build.motherboard = mobos[1];
  },

  // Render GPU Options
  renderGpuOptions() {
    const container = document.getElementById("gpuOptions");
    const gpus = this.gpuDatabase[this.selectedBrands.gpu];

    container.innerHTML = gpus
      .map(
        (gpu, i) => `
            <div class="spec-item ${i === 2 ? "selected" : ""}" data-index="${i}" onclick="PCBuilder.selectGpu(this, ${i})">
                <div class="font-medium text-sm">${gpu.name.replace("NVIDIA ", "").replace("AMD ", "")}</div>
                <div class="text-xs text-slate-400">${gpu.vram}GB VRAM</div>
                <div class="text-xs text-purple-400">₹${gpu.price.toLocaleString()}</div>
            </div>
        `,
      )
      .join("");

    if (gpus[2]) this.build.gpu = gpus[2];
  },

  // Select CPU
  selectCpu(el, index) {
    document
      .querySelectorAll("#cpuOptions .spec-item")
      .forEach((e) => e.classList.remove("selected"));
    el.classList.add("selected");
    this.build.cpu = this.cpuDatabase[this.selectedBrands.cpu][index];
    this.updateBuildSummary();
  },

  // Select Motherboard
  selectMobo(el, index) {
    document
      .querySelectorAll("#moboOptions .spec-item")
      .forEach((e) => e.classList.remove("selected"));
    el.classList.add("selected");
    const platform = this.selectedBrands.cpu === "intel" ? "intel" : "amd";
    this.build.motherboard =
      this.motherboardDatabase[platform][this.selectedBrands.mobo][index];
    this.updateBuildSummary();
  },

  // Select GPU
  selectGpu(el, index) {
    document
      .querySelectorAll("#gpuOptions .spec-item")
      .forEach((e) => e.classList.remove("selected"));
    el.classList.add("selected");
    this.build.gpu = this.gpuDatabase[this.selectedBrands.gpu][index];
    this.updateBuildSummary();
  },

  // Calculate Total Price
  calculateTotal() {
    let total = 0;

    if (this.build.cpu) total += this.build.cpu.price;
    if (this.build.motherboard) total += this.build.motherboard.price;
    if (this.build.gpu) total += this.build.gpu.price;

    // RAM
    total +=
      this.ramPricing[this.build.ram.type][this.build.ram.capacity] || 4500;

    // Storage
    total += this.storagePricing[this.build.storage.capacity] || 4000;

    // PSU
    const psuPrice = this.psuPricing[this.build.psu.wattage];
    total += psuPrice ? psuPrice[this.build.psu.rating] || 7000 : 7000;

    // Monitor
    const monRes = this.monitorPricing[this.build.monitor.resolution];
    if (monRes && monRes[this.build.monitor.size]) {
      total +=
        monRes[this.build.monitor.size][this.build.monitor.refresh] || 24000;
    } else {
      total += 24000;
    }

    return total;
  },

  // Update Build Summary
  updateBuildSummary() {
    const container = document.getElementById("buildSummary");
    const total = this.calculateTotal();
    const budget = parseInt(document.getElementById("budgetInput")?.value) || 100000;

    const items = [];
    if (this.build.cpu)
      items.push({
        name: "CPU",
        value: this.build.cpu.name,
        price: this.build.cpu.price,
      });
    if (this.build.motherboard)
      items.push({
        name: "Motherboard",
        value: this.build.motherboard.name,
        price: this.build.motherboard.price,
      });
    if (this.build.gpu && this.build.gpu.price > 0)
      items.push({
        name: "GPU",
        value: this.build.gpu.name,
        price: this.build.gpu.price,
      });
    items.push({
      name: "RAM",
      value: `${this.build.ram.capacity}GB ${this.build.ram.type.toUpperCase()}`,
      price: this.ramPricing[this.build.ram.type][this.build.ram.capacity],
    });
    items.push({
      name: "Storage",
      value: `${this.build.storage.capacity >= 1000 ? this.build.storage.capacity / 1000 + "TB" : this.build.storage.capacity + "GB"} NVMe`,
      price: this.storagePricing[this.build.storage.capacity],
    });
    items.push({
      name: "PSU",
      value: `${this.build.psu.wattage}W ${this.build.psu.rating}`,
      price: this.psuPricing[this.build.psu.wattage][this.build.psu.rating],
    });
    
    // Add Monitor to summary
    const monRes = this.monitorPricing[this.build.monitor.resolution];
    let monitorPrice = 24000;
    if (monRes && monRes[this.build.monitor.size]) {
      monitorPrice = monRes[this.build.monitor.size][this.build.monitor.refresh] || 24000;
    }
    items.push({
      name: "Monitor",
      value: `${this.build.monitor.size}" ${this.build.monitor.resolution} ${this.build.monitor.refresh}Hz`,
      price: monitorPrice,
    });

    container.innerHTML = items
      .map(
        (item) => `
            <div class="flex justify-between items-center text-sm">
                <span class="text-slate-400">${item.name}</span>
                <div class="text-right">
                    <div class="text-white text-xs">${item.value.length > 25 ? item.value.substring(0, 22) + "..." : item.value}</div>
                    <div class="text-purple-400 text-xs">₹${item.price.toLocaleString()}</div>
                </div>
            </div>
        `,
      )
      .join("");

    // Update total price with budget indicator
    const totalEl = document.getElementById("totalPrice");
    totalEl.textContent = `₹${total.toLocaleString()}`;
    
    // Show budget warning if over
    if (total > budget) {
      totalEl.classList.add("text-red-400");
      totalEl.classList.remove("text-purple-400");
      const alertEl = document.getElementById("budgetAlert");
      if (alertEl) {
        alertEl.classList.remove("hidden");
        alertEl.innerHTML = `⚠️ Build exceeds budget by ₹${(total - budget).toLocaleString()}. Consider lower-tier components.`;
      }
    } else {
      totalEl.classList.remove("text-red-400");
      totalEl.classList.add("text-green-400");
      const alertEl = document.getElementById("budgetAlert");
      if (alertEl) alertEl.classList.add("hidden");
    }
  },
};

// Mode Switching
function switchMode(mode) {
  const slider = document.getElementById("toggleSlider");
  const pcBtn = document.getElementById("pcBtn");
  const laptopBtn = document.getElementById("laptopBtn");
  const pcSection = document.getElementById("pcSection");
  const laptopSection = document.getElementById("laptopSection");

  if (mode === "laptop") {
    slider.classList.add("laptop");
    pcBtn.classList.remove("active");
    laptopBtn.classList.add("active");
    pcSection.classList.add("hidden");
    laptopSection.classList.remove("hidden");
  } else {
    slider.classList.remove("laptop");
    pcBtn.classList.add("active");
    laptopBtn.classList.remove("active");
    pcSection.classList.remove("hidden");
    laptopSection.classList.add("hidden");
  }
}

// Use Case Requirements Database
const useCaseRequirements = {
  gaming: {
    name: "Gaming",
    icon: "🎮",
    minBudget: 60000,
    recommendedBudget: 100000,
    requirements: {
      cpu: { minCores: 6, minThreads: 12, tier: "mid" },
      gpu: { minVram: 6, dedicated: true, tier: "mid" },
      ram: { minCapacity: 16, type: "ddr4" },
      storage: { minCapacity: 512 },
      monitor: { minRefresh: 144, resolution: "1080p" }
    },
    description: "Smooth 1080p/1440p gaming at 60+ FPS",
    specs: [
      "CPU: 6+ cores (Intel i5/Ryzen 5 or better)",
      "GPU: 6GB+ VRAM dedicated graphics",
      "RAM: 16GB DDR4/DDR5 minimum",
      "Storage: 512GB+ NVMe SSD",
      "Monitor: 144Hz+ recommended"
    ]
  },
  workstation: {
    name: "Workstation",
    icon: "🎬",
    minBudget: 80000,
    recommendedBudget: 150000,
    requirements: {
      cpu: { minCores: 8, minThreads: 16, tier: "high" },
      gpu: { minVram: 8, dedicated: true, tier: "high" },
      ram: { minCapacity: 32, type: "ddr5" },
      storage: { minCapacity: 1000 },
      monitor: { minRefresh: 60, resolution: "1440p" }
    },
    description: "Video editing, 3D rendering, development",
    specs: [
      "CPU: 8+ cores (Intel i7/Ryzen 7 or better)",
      "GPU: 8GB+ VRAM for CUDA/OpenCL",
      "RAM: 32GB DDR5 recommended",
      "Storage: 1TB+ NVMe SSD",
      "Monitor: 1440p+ color accurate"
    ]
  },
  office: {
    name: "Office",
    icon: "💼",
    minBudget: 25000,
    recommendedBudget: 40000,
    requirements: {
      cpu: { minCores: 4, minThreads: 4, tier: "entry" },
      gpu: { minVram: 0, dedicated: false, tier: "integrated" },
      ram: { minCapacity: 8, type: "ddr4" },
      storage: { minCapacity: 256 },
      monitor: { minRefresh: 60, resolution: "1080p" }
    },
    description: "Documents, browsing, light productivity",
    specs: [
      "CPU: 4+ cores (Intel i3/Ryzen 3)",
      "GPU: Integrated graphics sufficient",
      "RAM: 8GB DDR4 minimum",
      "Storage: 256GB SSD",
      "Monitor: 1080p 60Hz"
    ]
  },
  student: {
    name: "Student",
    icon: "📚",
    minBudget: 30000,
    recommendedBudget: 50000,
    requirements: {
      cpu: { minCores: 4, minThreads: 8, tier: "entry" },
      gpu: { minVram: 0, dedicated: false, tier: "integrated" },
      ram: { minCapacity: 8, type: "ddr4" },
      storage: { minCapacity: 512 },
      monitor: { minRefresh: 60, resolution: "1080p" }
    },
    description: "Coding, research, light gaming",
    specs: [
      "CPU: 4+ cores with good single-thread",
      "GPU: Integrated or entry graphics",
      "RAM: 8-16GB DDR4",
      "Storage: 512GB SSD for projects",
      "Monitor: 1080p with eye-care"
    ]
  },
  streaming: {
    name: "Streaming",
    icon: "📺",
    minBudget: 90000,
    recommendedBudget: 140000,
    requirements: {
      cpu: { minCores: 8, minThreads: 16, tier: "high" },
      gpu: { minVram: 8, dedicated: true, tier: "high" },
      ram: { minCapacity: 32, type: "ddr5" },
      storage: { minCapacity: 1000 },
      monitor: { minRefresh: 144, resolution: "1080p" }
    },
    description: "Gaming + live streaming simultaneously",
    specs: [
      "CPU: 8+ cores (encoding while gaming)",
      "GPU: 8GB+ with NVENC encoder",
      "RAM: 32GB for multitasking",
      "Storage: 1TB+ fast SSD",
      "Monitor: Dual monitor setup ideal"
    ]
  }
};

// Use Case Selection
function selectUseCase(el) {
  document
    .querySelectorAll("#useCaseGrid .component-card")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  
  const useCase = el.dataset.value;
  PCBuilder.build.useCase = useCase;
  
  // Get requirements for this use case
  const requirements = useCaseRequirements[useCase];
  if (!requirements) return;
  
  // Show requirements panel
  showUseCaseRequirements(requirements);
  
  // Update minimum budget if current is too low
  const currentBudget = parseInt(document.getElementById("budgetInput").value) || 100000;
  if (currentBudget < requirements.minBudget) {
    document.getElementById("budgetInput").value = requirements.recommendedBudget;
    onBudgetChange();
  }
  
  // Auto-select recommended components
  autoSelectComponentsForUseCase(requirements);
}

// Show Use Case Requirements
function showUseCaseRequirements(req) {
  // Check if requirements panel exists, if not create it
  let reqPanel = document.getElementById("useCaseReqPanel");
  if (!reqPanel) {
    const useCaseSection = document.querySelector("#useCaseGrid")?.parentElement;
    if (useCaseSection) {
      const panel = document.createElement("div");
      panel.id = "useCaseReqPanel";
      panel.className = "mt-4 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/30";
      useCaseSection.appendChild(panel);
      reqPanel = panel;
    }
  }
  
  if (reqPanel) {
    reqPanel.innerHTML = `
      <div class="flex items-start justify-between mb-3">
        <div>
          <h4 class="font-semibold text-white flex items-center gap-2">
            ${req.icon} ${req.name} Requirements
          </h4>
          <p class="text-sm text-slate-400 mt-1">${req.description}</p>
        </div>
        <div class="text-right">
          <div class="text-xs text-slate-500">Min Budget</div>
          <div class="text-lg font-bold text-green-400">₹${req.minBudget.toLocaleString()}</div>
          <div class="text-xs text-slate-500">Recommended: ₹${req.recommendedBudget.toLocaleString()}</div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
        ${req.specs.map(spec => `
          <div class="flex items-center gap-2 text-slate-300">
            <span class="text-green-400">✓</span> ${spec}
          </div>
        `).join("")}
      </div>
    `;
  }
}

// Auto-select components based on use case
function autoSelectComponentsForUseCase(req) {
  const { requirements } = req;
  
  // Select RAM capacity based on requirement
  const ramCapacity = requirements.ram.minCapacity;
  document.querySelectorAll("#ramCapacityOptions .spec-item").forEach(el => {
    el.classList.remove("selected");
    if (parseInt(el.dataset.value) === ramCapacity) {
      el.classList.add("selected");
      PCBuilder.build.ram.capacity = ramCapacity;
    }
  });
  
  // Select RAM type
  const ramType = requirements.ram.type;
  document.querySelectorAll("#ramTypeOptions .spec-item").forEach(el => {
    el.classList.remove("selected");
    if (el.dataset.value === ramType) {
      el.classList.add("selected");
      PCBuilder.build.ram.type = ramType;
    }
  });
  
  // Select Storage
  const storageSize = requirements.storage.minCapacity;
  document.querySelectorAll("#storageCapacityOptions .spec-item").forEach(el => {
    el.classList.remove("selected");
    if (parseInt(el.dataset.value) === storageSize) {
      el.classList.add("selected");
      PCBuilder.build.storage.capacity = storageSize;
    }
  });
  
  // Select Monitor refresh
  const refresh = requirements.monitor.minRefresh;
  document.querySelectorAll("#monitorRefreshOptions .spec-item").forEach(el => {
    el.classList.remove("selected");
    if (parseInt(el.dataset.value) === refresh) {
      el.classList.add("selected");
      PCBuilder.build.monitor.refresh = refresh;
    }
  });
  
  // Select Monitor resolution
  const resolution = requirements.monitor.resolution;
  document.querySelectorAll("#monitorResOptions .spec-item").forEach(el => {
    el.classList.remove("selected");
    if (el.dataset.value === resolution) {
      el.classList.add("selected");
      PCBuilder.build.monitor.resolution = resolution;
    }
  });
  
  // Update summary
  PCBuilder.updateBuildSummary();
}

// CPU Generation Filter
function filterCpuByGen(gen) {
  PCBuilder.cpuFilter.gen = gen;
  
  // Auto-switch brand based on generation
  if (gen.includes("Ultra") || gen.includes("th")) {
    // Intel generations
    document.querySelectorAll('[data-brand="intel"]').forEach(e => {
      if (e.closest('.category-section')?.querySelector('.category-title span')?.textContent === '⚡') {
        e.classList.add('selected');
      }
    });
    document.querySelectorAll('[data-brand="amd"]').forEach(e => {
      if (e.closest('.category-section')?.querySelector('.category-title span')?.textContent === '⚡') {
        e.classList.remove('selected');
      }
    });
    PCBuilder.selectedBrands.cpu = "intel";
  } else if (gen.includes("000")) {
    // AMD generations
    document.querySelectorAll('[data-brand="amd"]').forEach(e => {
      if (e.closest('.category-section')?.querySelector('.category-title span')?.textContent === '⚡') {
        e.classList.add('selected');
      }
    });
    document.querySelectorAll('[data-brand="intel"]').forEach(e => {
      if (e.closest('.category-section')?.querySelector('.category-title span')?.textContent === '⚡') {
        e.classList.remove('selected');
      }
    });
    PCBuilder.selectedBrands.cpu = "amd";
  }
  
  PCBuilder.renderCpuOptions();
}

// CPU Search
function searchCpu(query) {
  PCBuilder.cpuFilter.search = query;
  PCBuilder.renderCpuOptions();
}

// CPU Brand Selection
function selectCpuBrand(el) {
  document
    .querySelectorAll('[data-brand="intel"], [data-brand="amd"]')
    .forEach((e) => {
      if (
        e.closest(".category-section")?.querySelector(".category-title span")
          ?.textContent === "⚡"
      ) {
        e.classList.remove("selected");
      }
    });
  el.classList.add("selected");
  PCBuilder.selectedBrands.cpu = el.dataset.brand;
  
  // Reset filter to "all" when switching brands
  PCBuilder.cpuFilter.gen = "all";
  const genFilter = document.getElementById("cpuGenFilter");
  if (genFilter) genFilter.value = "all";
  
  // Re-apply budget filter for the new brand
  const budget = parseInt(document.getElementById("budgetInput")?.value) || 100000;
  filterComponentsByBudget(budget);
  
  PCBuilder.renderMoboOptions();
  PCBuilder.updateBuildSummary();
}

// Motherboard Form Selection
function selectMoboForm(el) {
  document
    .querySelectorAll("#moboFormFactor .spec-item")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  PCBuilder.selectedBrands.moboForm = el.dataset.value;
}

// Motherboard Brand Selection
function selectMoboBrand(el) {
  el.parentElement
    .querySelectorAll(".brand-chip")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  PCBuilder.selectedBrands.mobo = el.dataset.brand;
  PCBuilder.renderMoboOptions();
  PCBuilder.updateBuildSummary();
}

// RAM Type Selection
function selectRamType(el) {
  el.parentElement
    .querySelectorAll(".spec-item")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  PCBuilder.build.ram.type = el.dataset.value;
  PCBuilder.updateBuildSummary();
}

// GPU Brand Selection
function selectGpuBrand(el) {
  el.parentElement
    .querySelectorAll(".brand-chip")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  PCBuilder.selectedBrands.gpu = el.dataset.brand;
  
  // Re-apply budget filter for the new brand
  const budget = parseInt(document.getElementById("budgetInput")?.value) || 100000;
  filterComponentsByBudget(budget);
  
  PCBuilder.updateBuildSummary();
}

// Currency Selection
function selectCurrency(el) {
  el.parentElement
    .querySelectorAll(".spec-item")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  PCBuilder.build.currency = el.dataset.currency;
}

// AI Recommendation
async function getAIRecommendation() {
  const resultDiv = document.getElementById("aiResult");
  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML =
    '<div class="flex items-center gap-2 text-purple-400"><div class="loading-spinner"></div> Getting AI recommendation...</div>';

  // Check if APIManager is available
  if (typeof APIManager === 'undefined') {
    resultDiv.innerHTML = `<div class="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
      <p class="text-orange-300 text-sm">⚠️ API Manager not loaded. Your build summary:</p>
      <p class="text-white mt-2">Total: ₹${PCBuilder.calculateTotal().toLocaleString()}</p>
    </div>`;
    return;
  }

  const build = PCBuilder.build;
  const total = PCBuilder.calculateTotal();
  const budget =
    parseInt(document.getElementById("budgetInput").value) || 100000;

  const prompt = `You are a PC building expert. Analyze this build and provide a brief recommendation:

Use Case: ${build.useCase}
Budget: ₹${budget.toLocaleString()}
Current Build Total: ₹${total.toLocaleString()}

Components:
- CPU: ${build.cpu?.name || "Not selected"}
- Motherboard: ${build.motherboard?.name || "Not selected"}
- GPU: ${build.gpu?.name || "Not selected"}
- RAM: ${build.ram.capacity}GB ${build.ram.type.toUpperCase()}
- Storage: ${build.storage.capacity}GB NVMe SSD
- PSU: ${build.psu.wattage}W ${build.psu.rating}

Provide:
1. Overall rating (1-10)
2. Is this build balanced for the use case?
3. Top 2 suggestions to improve
4. Any compatibility concerns

Keep response under 150 words.`;

  try {
    console.log("Calling AI API (Gemini with HuggingFace fallback)...");
    const result = await APIManager.smartCall(prompt);
    console.log("API Result:", result);
    
    if (result.success) {
      resultDiv.innerHTML = `
        <div class="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <h4 class="font-semibold text-purple-300 mb-2">✨ AI Analysis</h4>
          <div class="text-sm text-slate-300 whitespace-pre-line">${result.text}</div>
        </div>`;
    } else if (result.error) {
      resultDiv.innerHTML = `<div class="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
        <p class="text-orange-300 text-sm">⚠️ ${result.message || 'Could not get AI recommendation.'}</p>
        <p class="text-white mt-2">Your build total: ₹${total.toLocaleString()}</p>
      </div>`;
    } else {
      resultDiv.innerHTML = `<div class="text-orange-400 text-sm">Could not get AI recommendation. Your build looks good! Total: ₹${total.toLocaleString()}</div>`;
    }
  } catch (e) {
    console.error("AI Error:", e);
    resultDiv.innerHTML = `<div class="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
      <p class="text-orange-300 text-sm">⚠️ AI service unavailable.</p>
      <p class="text-white mt-2">Your build total: ₹${total.toLocaleString()}</p>
    </div>`;
  }
}

// Laptop Search with AI
async function searchLaptops() {
  const resultDiv = document.getElementById("aiLaptopResult");
  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = `
    <div class="glass-card p-6 rounded-2xl border border-purple-500/30 laptop-card-animate">
      <div class="flex items-center gap-3 text-purple-400">
        <div class="loading-spinner"></div>
        <span class="font-medium">Finding best laptops for you...</span>
      </div>
    </div>`;

  // Get values from new UI elements
  const useCase = window.laptopPrefs?.useCase || "gaming";
  const minBudget = document.getElementById("laptopBudgetMin").value;
  const maxBudget = document.getElementById("laptopBudgetMax").value;
  const brand = window.laptopPrefs?.brand || "any";
  const displaySize = window.laptopPrefs?.displaySize || "15";
  const processor = document.getElementById("laptopProcessor")?.value || "any";
  const gpu = document.getElementById("laptopGpu")?.value || "any";

  const brandText = brand === "any" ? "any brand" : brand.toUpperCase();
  const processorText = processor === "any" ? "any processor" : processor;
  const gpuText = gpu === "any" ? "integrated or dedicated" : gpu;
  
  const prompt = `Recommend 3 best laptops for ${useCase} use in India between ₹${minBudget} to ₹${maxBudget}.
Preferred brand: ${brandText}
Preferred display size: ${displaySize} inches
Processor preference: ${processorText}
Graphics preference: ${gpuText}

For each laptop provide:
- Model name
- Key specs (CPU, RAM, Display, GPU if applicable)
- Approximate price in ₹
- Best for (one line)

Keep response concise, under 200 words. Format as a clean list.`;

  try {
    console.log("Searching laptops with AI...");
    const result = await APIManager.smartCall(prompt);
    if (result.success) {
      resultDiv.innerHTML = `
        <div class="glass-card p-6 rounded-2xl border border-purple-500/30 laptop-card-animate">
          <div class="flex items-center gap-2 mb-4">
            <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">✨</span>
            <h4 class="font-bold text-lg text-purple-300">AI Laptop Recommendations</h4>
          </div>
          <div class="text-sm text-slate-300 whitespace-pre-line leading-relaxed">${result.text}</div>
          <div class="mt-4 pt-4 border-t border-slate-700/50">
            <p class="text-xs text-slate-500 flex items-center gap-2">
              <span>💡</span> Compare prices on the platforms on the right for the best deals!
            </p>
          </div>
        </div>`;
    } else {
      resultDiv.innerHTML = `
        <div class="glass-card p-6 rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-900/10 to-slate-900/50 laptop-card-animate">
          <p class="text-orange-300 text-sm flex items-center gap-2">
            <span>⚠️</span> ${result.message || 'Could not get recommendations.'}
          </p>
          <p class="text-slate-300 mt-3 text-sm">Use the comparison platforms to find the best deals for your requirements.</p>
        </div>`;
    }
  } catch (e) {
    console.error("Laptop search error:", e);
    resultDiv.innerHTML = `
      <div class="glass-card p-6 rounded-2xl border border-slate-700/30 laptop-card-animate">
        <p class="text-slate-400 text-sm">Check the comparison platforms for current deals matching your preferences.</p>
      </div>`;
  }
}

// Laptop Brand Selection - Updated for new chip UI
function selectLaptopBrand(el) {
  document
    .querySelectorAll("#laptopBrands .laptop-brand-chip, #laptopBrands .brand-chip")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  // Store selected brand for AI prompt
  if (!window.laptopPrefs) window.laptopPrefs = {};
  window.laptopPrefs.brand = el.dataset.brand;
}

// Display Size Selection - Updated for new chip UI
function selectDisplaySize(el) {
  document
    .querySelectorAll("#displaySizeOptions .laptop-size-chip, #displaySizeOptions .spec-item")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  // Store selected size for AI prompt
  if (!window.laptopPrefs) window.laptopPrefs = {};
  window.laptopPrefs.displaySize = el.dataset.value;
}

// Laptop Use Case Selection - New card-based UI
function selectLaptopUseCase(el) {
  document
    .querySelectorAll("#laptopUseCaseGrid .laptop-use-card")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  // Store selected use case for AI prompt
  if (!window.laptopPrefs) window.laptopPrefs = {};
  window.laptopPrefs.useCase = el.dataset.value;
}

// Quick Budget Preset for Laptops
function setLaptopBudget(min, max) {
  document.getElementById("laptopBudgetMin").value = min;
  document.getElementById("laptopBudgetMax").value = max;
  
  // Update visual button state
  document.querySelectorAll(".laptop-budget-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
  
  updateBudgetDisplay();
}

// Update Budget Range Display
function updateBudgetDisplay() {
  const min = parseInt(document.getElementById("laptopBudgetMin").value) || 0;
  const max = parseInt(document.getElementById("laptopBudgetMax").value) || 0;
  const display = document.getElementById("budgetRangeDisplay");
  if (display) {
    display.textContent = `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  }
}

// Generic Brand Chip Selection
function selectBrandChip(el, containerId) {
  document
    .querySelectorAll(`#${containerId} .brand-chip`)
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
}

// RAM Capacity Selection
function selectRamCapacity(el) {
  document
    .querySelectorAll("#ramCapacityOptions .spec-item")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  PCBuilder.build.ram.capacity = parseInt(el.dataset.value);
  PCBuilder.updateBuildSummary();
}

// Storage Capacity Selection
function selectStorageCapacity(el) {
  document
    .querySelectorAll("#storageCapacityOptions .spec-item")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  PCBuilder.build.storage.capacity = parseInt(el.dataset.value);
  PCBuilder.updateBuildSummary();
}

// PSU Wattage Selection
function selectPsuWattage(el) {
  document
    .querySelectorAll("#psuWattageOptions .spec-item")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  PCBuilder.build.psu.wattage = parseInt(el.dataset.value);
  PCBuilder.updateBuildSummary();
}

// PSU Rating Selection
function selectPsuRating(el) {
  document
    .querySelectorAll("#psuRatingOptions .spec-item")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  PCBuilder.build.psu.rating = el.dataset.value;
  PCBuilder.updateBuildSummary();
}

// Monitor Size Selection
function selectMonitorSize(el) {
  document
    .querySelectorAll("#monitorSizeOptions .spec-item")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  PCBuilder.build.monitor.size = parseInt(el.dataset.value);
  PCBuilder.updateBuildSummary();
}

// Monitor Resolution Selection
function selectMonitorRes(el) {
  document
    .querySelectorAll("#monitorResOptions .spec-item")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  PCBuilder.build.monitor.resolution = el.dataset.value;
  PCBuilder.updateBuildSummary();
}

// Monitor Refresh Rate Selection
function selectMonitorRefresh(el) {
  document
    .querySelectorAll("#monitorRefreshOptions .spec-item")
    .forEach((e) => e.classList.remove("selected"));
  el.classList.add("selected");
  PCBuilder.build.monitor.refresh = parseInt(el.dataset.value);
  PCBuilder.updateBuildSummary();
}

// Budget preset selection
function setBudgetPreset(amount) {
  document.getElementById("budgetInput").value = amount;
  onBudgetChange();
}

// Budget change handler - filters components and updates links
function onBudgetChange() {
  const budget = parseInt(document.getElementById("budgetInput").value) || 100000;
  
  // Update budget display in prebuilt links
  const budgetDisplay = document.getElementById("budgetDisplayLink");
  if (budgetDisplay) {
    budgetDisplay.textContent = budget.toLocaleString();
  }
  
  // Update prebuilt PC links with budget
  updatePrebuiltLinks(budget);
  
  // Filter components based on budget
  filterComponentsByBudget(budget);
  
  // Update build summary
  PCBuilder.updateBuildSummary();
}

// Update prebuilt PC shopping links
function updatePrebuiltLinks(budget) {
  const budgetK = Math.floor(budget / 1000);
  const amazonUrl = `https://www.amazon.in/s?k=gaming+pc+under+${budget}`;
  const flipkartUrl = `https://www.flipkart.com/search?q=gaming+pc+under+${budgetK}k`;
  
  const linksContainer = document.getElementById("prebuiltLinks");
  if (linksContainer) {
    linksContainer.innerHTML = `
      <a href="${amazonUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-2 bg-slate-700/50 rounded-lg text-xs hover:bg-orange-500/20 hover:border-orange-500/30 border border-transparent transition flex flex-col items-center gap-1 text-center">
        <span class="text-lg">🛒</span>
        <span>Amazon</span>
      </a>
      <a href="${flipkartUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-2 bg-slate-700/50 rounded-lg text-xs hover:bg-blue-500/20 hover:border-blue-500/30 border border-transparent transition flex flex-col items-center gap-1 text-center">
        <span class="text-lg">🛒</span>
        <span>Flipkart</span>
      </a>
      <a href="https://mdcomputers.in/desktops" target="_blank" rel="noopener noreferrer" class="px-3 py-2 bg-slate-700/50 rounded-lg text-xs hover:bg-green-500/20 hover:border-green-500/30 border border-transparent transition flex flex-col items-center gap-1 text-center">
        <span class="text-lg">💻</span>
        <span>MD Comp.</span>
      </a>
      <a href="https://www.primeabgb.com/buy-online-price-india/assembled-pc/" target="_blank" rel="noopener noreferrer" class="px-3 py-2 bg-slate-700/50 rounded-lg text-xs hover:bg-purple-500/20 hover:border-purple-500/30 border border-transparent transition flex flex-col items-center gap-1 text-center">
        <span class="text-lg">💻</span>
        <span>PrimeABGB</span>
      </a>
      <a href="https://www.vedantcomputers.com/pre-build-pc" target="_blank" rel="noopener noreferrer" class="px-3 py-2 bg-slate-700/50 rounded-lg text-xs hover:bg-cyan-500/20 hover:border-cyan-500/30 border border-transparent transition flex flex-col items-center gap-1 text-center">
        <span class="text-lg">💻</span>
        <span>Vedant</span>
      </a>
      <a href="https://www.modxcomputers.com/product-category/custom-pc/" target="_blank" rel="noopener noreferrer" class="px-3 py-2 bg-slate-700/50 rounded-lg text-xs hover:bg-red-500/20 hover:border-red-500/30 border border-transparent transition flex flex-col items-center gap-1 text-center">
        <span class="text-lg">🔧</span>
        <span>ModX</span>
      </a>
    `;
  }
}

// Filter components based on budget - shows affordable options
function filterComponentsByBudget(budget) {
  // Calculate max component prices based on budget allocation
  // Typical allocation: CPU 20%, GPU 35%, Mobo 10%, RAM 5%, Storage 5%, PSU 8%, Monitor 17%
  const maxCpuPrice = budget * 0.25;
  const maxGpuPrice = budget * 0.40;
  
  // Filter CPUs
  const cpuContainer = document.getElementById("cpuOptions");
  if (cpuContainer) {
    const cpus = PCBuilder.cpuDatabase[PCBuilder.selectedBrands.cpu];
    const affordableCpus = cpus.filter(cpu => cpu.price <= maxCpuPrice);
    
    if (affordableCpus.length > 0) {
      cpuContainer.innerHTML = affordableCpus
        .map((cpu, i) => `
          <div class="spec-item ${i === 0 ? "selected" : ""}" data-name="${cpu.name}" onclick="PCBuilder.selectCpuByName(this, '${cpu.name}')">
            <div class="font-medium text-sm">${cpu.name.replace("Intel Core ", "").replace("AMD ", "")}</div>
            <div class="text-xs text-slate-400">${cpu.cores}C/${cpu.threads}T</div>
            <div class="text-xs text-purple-400">₹${cpu.price.toLocaleString()}</div>
          </div>
        `)
        .join("");
      if (affordableCpus[0]) PCBuilder.build.cpu = affordableCpus[0];
    } else {
      cpuContainer.innerHTML = `<div class="text-orange-400 text-sm col-span-full text-center py-2">Budget too low for ${PCBuilder.selectedBrands.cpu.toUpperCase()} CPUs. Try AMD for better value.</div>`;
    }
  }
  
  // Filter GPUs
  const gpuContainer = document.getElementById("gpuOptions");
  if (gpuContainer) {
    const gpus = PCBuilder.gpuDatabase[PCBuilder.selectedBrands.gpu];
    const affordableGpus = gpus.filter(gpu => gpu.price <= maxGpuPrice);
    
    if (affordableGpus.length > 0) {
      gpuContainer.innerHTML = affordableGpus
        .map((gpu, i) => `
          <div class="spec-item ${i === 0 ? "selected" : ""}" data-index="${i}" onclick="PCBuilder.selectGpu(this, ${gpus.indexOf(gpu)})">
            <div class="font-medium text-sm">${gpu.name.replace("NVIDIA ", "").replace("AMD ", "")}</div>
            <div class="text-xs text-slate-400">${gpu.vram}GB VRAM</div>
            <div class="text-xs text-purple-400">₹${gpu.price.toLocaleString()}</div>
          </div>
        `)
        .join("");
      if (affordableGpus[0]) PCBuilder.build.gpu = affordableGpus[0];
    } else {
      // Show integrated graphics option
      gpuContainer.innerHTML = `
        <div class="spec-item selected" onclick="PCBuilder.selectGpu(this, 'integrated')">
          <div class="font-medium text-sm">Integrated Graphics</div>
          <div class="text-xs text-slate-400">Use CPU iGPU</div>
          <div class="text-xs text-green-400">₹0 (included)</div>
        </div>
        <div class="text-orange-400 text-xs col-span-full text-center">Budget too low for dedicated GPUs. Consider higher budget for gaming.</div>
      `;
      PCBuilder.build.gpu = { name: "Integrated Graphics", price: 0, vram: 0 };
    }
  }
}

// ============================================
// AI BUILD SCORING SYSTEM
// ============================================

// GPU Series Filter State
let gpuSeriesFilter = "all";

// Filter GPU by Series
function filterGpuBySeries(series) {
  gpuSeriesFilter = series;
  renderFilteredGpuOptions();
}

// Render GPU Options with Series Filter and Upcoming Badge
function renderFilteredGpuOptions() {
  const container = document.getElementById("gpuOptions");
  if (!container) return;
  
  let gpus = PCBuilder.gpuDatabase[PCBuilder.selectedBrands.gpu] || [];
  
  // Apply series filter
  if (gpuSeriesFilter !== "all") {
    gpus = gpus.filter(gpu => gpu.series === gpuSeriesFilter);
  }
  
  // Apply budget filter
  const budget = parseInt(document.getElementById("budgetInput")?.value) || 100000;
  const maxGpuPrice = budget * 0.40;
  gpus = gpus.filter(gpu => gpu.price <= maxGpuPrice || gpu.price === 0);
  
  if (gpus.length === 0) {
    container.innerHTML = '<div class="text-slate-400 text-sm col-span-full text-center py-4">No GPUs match your filter. Try a different series or increase budget.</div>';
    return;
  }
  
  container.innerHTML = gpus.map((gpu, i) => `
    <div class="spec-item ${i === 0 ? "selected" : ""}" data-name="${gpu.name}" onclick="selectGpuByName(this, '${gpu.name}')">
      <div class="font-medium text-sm">${gpu.name.replace("NVIDIA ", "").replace("AMD ", "")}</div>
      <div class="text-xs text-slate-400">${gpu.vram}GB VRAM</div>
      <div class="text-xs ${gpu.upcoming ? 'text-yellow-400' : 'text-purple-400'}">
        ₹${gpu.price.toLocaleString()}${gpu.upcoming ? ' <span class="text-yellow-300 text-[10px]">Est.</span>' : ''}
      </div>
      ${gpu.upcoming ? '<div class="text-[9px] text-yellow-300/70 mt-1">🆕 Upcoming</div>' : ''}
    </div>
  `).join("");
  
  if (gpus[0]) PCBuilder.build.gpu = gpus[0];
  PCBuilder.updateBuildSummary();
}

// Select GPU by name (for filtered lists)
function selectGpuByName(el, name) {
  document.querySelectorAll("#gpuOptions .spec-item").forEach(e => e.classList.remove("selected"));
  el.classList.add("selected");
  
  const allGpus = [...PCBuilder.gpuDatabase.nvidia, ...PCBuilder.gpuDatabase.amd, ...PCBuilder.gpuDatabase.integrated];
  PCBuilder.build.gpu = allGpus.find(gpu => gpu.name === name);
  PCBuilder.updateBuildSummary();
  updateBuildScore();
}

// ============================================
// BUILD SCORE CALCULATION
// ============================================

// Score weights for different use cases
const scoreWeights = {
  gaming: { gpu: 0.50, cpu: 0.30, ram: 0.10, storage: 0.05, psu: 0.05 },
  workstation: { cpu: 0.40, ram: 0.30, gpu: 0.20, storage: 0.10 },
  streaming: { cpu: 0.35, gpu: 0.35, ram: 0.20, storage: 0.10 },
  office: { cpu: 0.35, ram: 0.30, storage: 0.25, gpu: 0.10 },
  student: { cpu: 0.30, ram: 0.25, storage: 0.25, gpu: 0.20 }
};

// Component performance scores (normalized 0-100)
function getCpuScore(cpu) {
  if (!cpu) return 0;
  const tierScores = { entry: 30, mid: 55, high: 80, extreme: 100 };
  const baseScore = tierScores[cpu.tier] || 50;
  const coreBonus = Math.min((cpu.cores - 4) * 3, 20);
  return Math.min(baseScore + coreBonus, 100);
}

function getGpuScore(gpu) {
  if (!gpu || gpu.price === 0) return 10; // Integrated graphics
  const tierScores = { entry: 25, mid: 50, high: 75, extreme: 100, integrated: 10 };
  const baseScore = tierScores[gpu.tier] || 40;
  const vramBonus = Math.min(gpu.vram * 2, 20);
  return Math.min(baseScore + vramBonus, 100);
}

function getRamScore(ram) {
  const capacityScores = { 8: 30, 16: 60, 32: 85, 64: 100 };
  const typeBonus = ram.type === "ddr5" ? 10 : 0;
  return Math.min((capacityScores[ram.capacity] || 50) + typeBonus, 100);
}

function getStorageScore(storage) {
  const capacityScores = { 256: 30, 512: 55, 1000: 75, 2000: 100 };
  return capacityScores[storage.capacity] || 50;
}

// Calculate overall build score for a specific use case
function calculateBuildScore(useCase) {
  const build = PCBuilder.build;
  const weights = scoreWeights[useCase] || scoreWeights.gaming;
  
  const cpuScore = getCpuScore(build.cpu);
  const gpuScore = getGpuScore(build.gpu);
  const ramScore = getRamScore(build.ram);
  const storageScore = getStorageScore(build.storage);
  
  let totalScore = 0;
  totalScore += cpuScore * (weights.cpu || 0);
  totalScore += gpuScore * (weights.gpu || 0);
  totalScore += ramScore * (weights.ram || 0);
  totalScore += storageScore * (weights.storage || 0);
  
  return Math.round(totalScore);
}

// Calculate all use case scores
function calculateAllScores() {
  return {
    gaming: calculateBuildScore("gaming"),
    workstation: calculateBuildScore("workstation"),
    streaming: calculateBuildScore("streaming"),
    office: calculateBuildScore("office"),
    student: calculateBuildScore("student")
  };
}

// Get letter grade from score
function getGrade(score) {
  if (score >= 90) return { grade: "S", color: "text-yellow-400", label: "Exceptional" };
  if (score >= 80) return { grade: "A", color: "text-green-400", label: "Excellent" };
  if (score >= 70) return { grade: "B", color: "text-blue-400", label: "Very Good" };
  if (score >= 60) return { grade: "C", color: "text-purple-400", label: "Good" };
  if (score >= 50) return { grade: "D", color: "text-orange-400", label: "Adequate" };
  return { grade: "E", color: "text-red-400", label: "Needs Upgrade" };
}

// Detect bottlenecks
function detectBottleneck() {
  const build = PCBuilder.build;
  const cpuScore = getCpuScore(build.cpu);
  const gpuScore = getGpuScore(build.gpu);
  
  const diff = Math.abs(cpuScore - gpuScore);
  
  if (diff > 30) {
    if (cpuScore > gpuScore) {
      return { type: "gpu", message: "GPU may bottleneck your CPU. Consider upgrading the graphics card for better gaming performance." };
    } else {
      return { type: "cpu", message: "CPU may bottleneck your GPU. Consider upgrading the processor for better overall performance." };
    }
  }
  return null;
}

// Find better options within budget
function findBetterOptions() {
  const build = PCBuilder.build;
  const budget = parseInt(document.getElementById("budgetInput")?.value) || 100000;
  const currentTotal = PCBuilder.calculateTotal();
  const headroom = budget - currentTotal;
  
  const suggestions = [];
  
  // Check if there's budget headroom
  if (headroom > 5000) {
    // Check for GPU upgrade
    const allGpus = [...PCBuilder.gpuDatabase.nvidia, ...PCBuilder.gpuDatabase.amd];
    const currentGpuScore = getGpuScore(build.gpu);
    const betterGpu = allGpus.find(gpu => {
      const price = gpu.price;
      const score = getGpuScore(gpu);
      return score > currentGpuScore && price <= (build.gpu?.price || 0) + headroom && !gpu.upcoming;
    });
    
    if (betterGpu) {
      suggestions.push({
        type: "gpu",
        icon: "🎮",
        current: build.gpu?.name || "None",
        recommended: betterGpu.name,
        priceDiff: betterGpu.price - (build.gpu?.price || 0)
      });
    }
    
    // Check for RAM upgrade
    if (build.ram.capacity < 32 && headroom > 4000) {
      suggestions.push({
        type: "ram",
        icon: "💾",
        current: `${build.ram.capacity}GB ${build.ram.type.toUpperCase()}`,
        recommended: `${build.ram.capacity * 2}GB ${build.ram.type.toUpperCase()}`,
        priceDiff: PCBuilder.ramPricing[build.ram.type][build.ram.capacity * 2] - PCBuilder.ramPricing[build.ram.type][build.ram.capacity]
      });
    }
  }
  
  return suggestions;
}

// Update the build score display
function updateBuildScore() {
  const scoreContainer = document.getElementById("buildScoreContainer");
  if (!scoreContainer) return;
  
  const useCase = PCBuilder.build.useCase;
  const scores = calculateAllScores();
  const primaryScore = scores[useCase] || scores.gaming;
  const grade = getGrade(primaryScore);
  const bottleneck = detectBottleneck();
  const suggestions = findBetterOptions();
  
  // Create score display HTML
  let html = `
    <div class="mb-4 p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50">
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm text-slate-400">AI Build Score</span>
        <span class="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-300">${useCaseRequirements[useCase]?.icon || '🎮'} ${useCaseRequirements[useCase]?.name || 'Gaming'}</span>
      </div>
      
      <!-- Circular Score Display -->
      <div class="flex items-center gap-4 mb-3">
        <div class="relative w-16 h-16">
          <svg class="w-16 h-16 transform -rotate-90">
            <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="4" fill="none" class="text-slate-700"/>
            <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="4" fill="none" 
              class="${grade.color.replace('text-', 'text-')}"
              stroke-dasharray="${primaryScore * 1.76} 176"
              stroke-linecap="round"/>
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-lg font-bold ${grade.color}">${grade.grade}</span>
          </div>
        </div>
        <div>
          <div class="text-2xl font-bold ${grade.color}">${primaryScore}/100</div>
          <div class="text-xs text-slate-400">${grade.label}</div>
        </div>
      </div>
      
      <!-- Score Bars -->
      <div class="space-y-2 text-xs">
        <div class="flex items-center gap-2">
          <span class="w-16 text-slate-400">🎮 Gaming</span>
          <div class="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all" style="width: ${scores.gaming}%"></div>
          </div>
          <span class="w-8 text-right text-slate-300">${scores.gaming}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-16 text-slate-400">🎬 Work</span>
          <div class="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all" style="width: ${scores.workstation}%"></div>
          </div>
          <span class="w-8 text-right text-slate-300">${scores.workstation}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-16 text-slate-400">📺 Stream</span>
          <div class="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full transition-all" style="width: ${scores.streaming}%"></div>
          </div>
          <span class="w-8 text-right text-slate-300">${scores.streaming}</span>
        </div>
      </div>
    </div>
  `;
  
  // Bottleneck warning
  if (bottleneck) {
    html += `
      <div class="mb-3 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
        <div class="flex items-start gap-2">
          <span class="text-orange-400">⚠️</span>
          <div>
            <div class="text-sm font-medium text-orange-300">Potential Bottleneck</div>
            <p class="text-xs text-orange-200/80 mt-1">${bottleneck.message}</p>
          </div>
        </div>
      </div>
    `;
  }
  
  // Better options suggestions
  if (suggestions.length > 0) {
    html += `
      <div class="mb-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
        <div class="text-sm font-medium text-green-300 mb-2">🚀 Better Options Available</div>
        ${suggestions.map(s => `
          <div class="text-xs text-green-200/80 mb-1">
            ${s.icon} Upgrade ${s.type.toUpperCase()}: <span class="text-green-400">${s.recommended}</span>
            <span class="text-slate-400">(+₹${s.priceDiff.toLocaleString()})</span>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  scoreContainer.innerHTML = html;
}

// Override the original updateBuildSummary to also update scores
const originalUpdateBuildSummary = PCBuilder.updateBuildSummary.bind(PCBuilder);
PCBuilder.updateBuildSummary = function() {
  originalUpdateBuildSummary();
  updateBuildScore();
};

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  PCBuilder.init();
  // Trigger initial budget filter after a short delay
  setTimeout(() => {
    onBudgetChange();
    updateBuildScore();
  }, 100);
});
