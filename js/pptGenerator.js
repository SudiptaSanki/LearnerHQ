// ============================================
// PowerPoint Generator Module
// Uses PptxGenJS to create downloadable .pptx files
// ============================================

const PPTGenerator = {
  // Generate and download PowerPoint file
  generate(slideData) {
    try {
      // Show loading state
      const btn = document.getElementById("downloadPPTBtn");
      const originalHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `
                <div class="loading-spinner"></div>
                <span>Generating PowerPoint...</span>
            `;

      // Create new presentation
      const pptx = new PptxGenJS();

      // Set presentation properties
      pptx.author = "LearnerHQ";
      pptx.company = "Strategic Success Engine";
      pptx.subject = "Career Strategy Presentation";
      pptx.title = "My Educational Journey";

      // Define theme colors
      const colors = {
        primary: "06B6D4", // Cyan-500
        secondary: "2563EB", // Blue-600
        dark: "0F172A", // Slate-900
        light: "F1F5F9", // Slate-100
        accent: "7C3AED", // Purple-600
      };

      // Create slides
      slideData.forEach((slide, index) => {
        const pptSlide = pptx.addSlide();

        // Background gradient
        pptSlide.background = { color: colors.dark };

        // Add slide number
        pptSlide.addText(`${index + 1}`, {
          x: 9.3,
          y: 5.2,
          w: 0.5,
          h: 0.3,
          fontSize: 12,
          color: "64748B",
          align: "right",
        });

        if (index === 0) {
          // Title Slide
          pptSlide.addText("LearnerHQ", {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 0.8,
            fontSize: 48,
            bold: true,
            color: colors.primary,
            align: "center",
            fontFace: "Arial",
          });

          pptSlide.addText("Strategic Success Engine", {
            x: 0.5,
            y: 2.4,
            w: 9,
            h: 0.5,
            fontSize: 20,
            color: colors.light,
            align: "center",
            fontFace: "Arial",
          });

          pptSlide.addText(slide.title, {
            x: 1,
            y: 3.5,
            w: 8,
            h: 0.6,
            fontSize: 28,
            bold: true,
            color: "FFFFFF",
            align: "center",
            fontFace: "Arial",
          });

          pptSlide.addText(slide.content, {
            x: 1.5,
            y: 4.3,
            w: 7,
            h: 1,
            fontSize: 14,
            color: colors.light,
            align: "center",
            fontFace: "Arial",
            valign: "top",
          });
        } else {
          // Content Slides
          // Add colored header bar
          pptSlide.addShape(pptx.ShapeType.rect, {
            x: 0,
            y: 0,
            w: 10,
            h: 1,
            fill: { type: "solid", color: colors.primary, transparency: 20 },
          });

          // Slide title
          pptSlide.addText(slide.title, {
            x: 0.5,
            y: 0.3,
            w: 9,
            h: 0.5,
            fontSize: 32,
            bold: true,
            color: "FFFFFF",
            fontFace: "Arial",
          });

          // Content area
          const contentLines = slide.content.split("\n");
          contentLines.forEach((line, lineIdx) => {
            if (line.trim()) {
              pptSlide.addText(line.trim(), {
                x: 0.8,
                y: 1.5 + lineIdx * 0.5,
                w: 8.4,
                h: 0.4,
                fontSize: 16,
                color: colors.light,
                bullet: true,
                fontFace: "Arial",
              });
            }
          });

          // Image prompt section
          pptSlide.addShape(pptx.ShapeType.rect, {
            x: 0.5,
            y: 4.5,
            w: 9,
            h: 1,
            fill: { type: "solid", color: colors.secondary, transparency: 30 },
            line: { color: colors.primary, width: 1 },
          });

          pptSlide.addText("🎨 Visual Concept", {
            x: 0.7,
            y: 4.6,
            w: 8.6,
            h: 0.3,
            fontSize: 12,
            bold: true,
            color: colors.primary,
            fontFace: "Arial",
          });

          pptSlide.addText(slide.imagePrompt, {
            x: 0.7,
            y: 4.95,
            w: 8.6,
            h: 0.5,
            fontSize: 11,
            italic: true,
            color: "CBD5E1",
            fontFace: "Arial",
          });
        }

        // Add footer
        pptSlide.addText("Powered by LearnerHQ | Strategic Success Engine", {
          x: 0.5,
          y: 5.3,
          w: 8.5,
          h: 0.2,
          fontSize: 10,
          color: "64748B",
          align: "left",
          fontFace: "Arial",
        });
      });

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `LearnerHQ_Career_Strategy_${timestamp}.pptx`;

      // Download the file
      pptx.writeFile({ fileName: filename }).then(() => {
        // Success - restore button
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = originalHTML;

          // Show success message
          btn.innerHTML = `
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Downloaded Successfully!</span>
                    `;
          btn.classList.remove("from-blue-500", "to-indigo-600");
          btn.classList.add("from-green-500", "to-emerald-600");

          // Revert after 3 seconds
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove("from-green-500", "to-emerald-600");
            btn.classList.add("from-blue-500", "to-indigo-600");
          }, 3000);
        }, 500);
      });
    } catch (error) {
      console.error("PowerPoint generation error:", error);
      alert("Error generating PowerPoint. Please try again.");

      // Restore button
      const btn = document.getElementById("downloadPPTBtn");
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalHTML;
      }
    }
  },
};

// Export for use in other modules
window.PPTGenerator = PPTGenerator;
