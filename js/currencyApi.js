// ============================================
// Currency API - Using Frankfurter (Free, No Key Required)
// ============================================

const CurrencyAPI = {
    baseURL: 'https://api.frankfurter.app',
    cache: {},
    cacheExpiry: 3600000, // 1 hour

    // Get latest exchange rates
    async getLatestRates(baseCurrency = 'USD') {
        const cacheKey = `latest_${baseCurrency}`;

        // Check cache
        if (this.cache[cacheKey] && Date.now() - this.cache[cacheKey].timestamp < this.cacheExpiry) {
            return this.cache[cacheKey].data;
        }

        try {
            const response = await fetch(`${this.baseURL}/latest?from=${baseCurrency}`);
            if (!response.ok) throw new Error('API Error');

            const data = await response.json();

            // Cache the result
            this.cache[cacheKey] = {
                data: data,
                timestamp: Date.now()
            };

            return data;
        } catch (error) {
            console.error('Currency API error:', error);
            // Return fallback rates
            return this.getFallbackRates(baseCurrency);
        }
    },

    // Convert amount between currencies
    async convert(amount, from, to) {
        try {
            const response = await fetch(`${this.baseURL}/latest?amount=${amount}&from=${from}&to=${to}`);
            if (!response.ok) throw new Error('API Error');

            const data = await response.json();
            return data.rates[to];
        } catch (error) {
            console.error('Conversion error:', error);
            return this.fallbackConvert(amount, from, to);
        }
    },

    // Format price with currency symbol
    formatPrice(amount, currency) {
        const symbols = {
            'INR': '₹',
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'CAD': 'C$',
            'AUD': 'A$'
        };

        const symbol = symbols[currency] || currency;
        const formatted = new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0
        }).format(amount);

        return `${symbol}${formatted}`;
    },

    // Format with approximate conversion
    async formatWithConversion(amount, fromCurrency, toCurrency = 'USD') {
        const converted = await this.convert(amount, fromCurrency, toCurrency);
        const fromFormatted = this.formatPrice(amount, fromCurrency);
        const toFormatted = this.formatPrice(converted, toCurrency);

        return `${fromFormatted} <span class="text-slate-400 text-sm">(≈ ${toFormatted})</span>`;
    },

    // Fallback rates if API fails
    getFallbackRates(base) {
        const fallback = {
            'USD': { INR: 83.5, EUR: 0.92, GBP: 0.79, CAD: 1.36, AUD: 1.53 },
            'INR': { USD: 0.012, EUR: 0.011, GBP: 0.0095, CAD: 0.016, AUD: 0.018 },
            'EUR': { USD: 1.09, INR: 90.9, GBP: 0.86, CAD: 1.48, AUD: 1.67 },
            'GBP': { USD: 1.27, INR: 105.8, EUR: 1.16, CAD: 1.72, AUD: 1.94 }
        };

        return {
            base: base,
            rates: fallback[base] || fallback['USD'],
            isFallback: true
        };
    },

    // Fallback conversion
    fallbackConvert(amount, from, to) {
        const rates = this.getFallbackRates(from);
        return amount * (rates.rates[to] || 1);
    }
};

// Export
window.CurrencyAPI = CurrencyAPI;
