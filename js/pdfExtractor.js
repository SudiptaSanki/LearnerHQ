// ============================================
// PDF Extractor Module
// Uses PDF.js to extract text from uploaded PDFs
// ============================================

const PDFExtractor = {
    // Set up PDF.js worker
    init() {
        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
        }
    },

    // Extract text from PDF file
    async extractText(file) {
        try {
            this.updateStatus('Reading PDF file...', 'loading');
            
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            
            this.updateStatus(`Extracting text from ${pdf.numPages} pages...`, 'loading');
            
            let fullText = '';
            
            // Extract text from each page
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n\n';
                
                // Update progress
                this.updateStatus(`Processing page ${pageNum}/${pdf.numPages}...`, 'loading');
            }
            
            // Success
            this.updateStatus(`✓ Successfully extracted ${fullText.length} characters`, 'success');
            
            return fullText.trim();
        } catch (error) {
            console.error('PDF extraction error:', error);
            this.updateStatus('✗ Error extracting PDF. Please try another file.', 'error');
            return '';
        }
    },

    // Update status display
    updateStatus(message, type = 'info') {
        const statusEl = document.getElementById('pdfStatus');
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.className = 'mt-2 text-xs';
            
            switch(type) {
                case 'loading':
                    statusEl.classList.add('text-cyan-400');
                    break;
                case 'success':
                    statusEl.classList.add('text-green-400');
                    break;
                case 'error':
                    statusEl.classList.add('text-red-400');
                    break;
                default:
                    statusEl.classList.add('text-slate-400');
            }
        }
    }
};

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PDFExtractor.init());
} else {
    PDFExtractor.init();
}
