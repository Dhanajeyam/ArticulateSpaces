// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "Close ✕" : "Menu ☰";
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "Menu ☰";
}));
document.getElementById("year").textContent = new Date().getFullYear();

// ============================================================================
// Google Sheets Form Integration
// ============================================================================
// SETUP: Copy config.example.js → config.local.js and paste your Web App URL.
// config.local.js is gitignored and must NOT be committed to version control.
//
// The GOOGLE_SHEET_SCRIPT_URL constant is defined in config.local.js (loaded
// before this script in index.html). If it is undefined, forms will show a
// setup message prompting configuration.
//
// See GOOGLE_SHEETS_SETUP.md for full deployment instructions.
const GOOGLE_SHEET_SCRIPT_URL = (typeof _SHEET_URL !== "undefined") ? _SHEET_URL : "";

document.querySelectorAll(".enquiry-form").forEach(form => {
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const statusBox = form.querySelector(".form-status");
    const originalBtnText = submitBtn ? submitBtn.textContent : "Submit Enquiry ↗";

    // Helper to render feedback message
    const setStatus = (type, message) => {
      if (!statusBox) return;
      statusBox.className = `form-status is-visible ${type}${form.classList.contains("contact-form") ? " full" : ""}`;
      statusBox.textContent = message;
    };

    const clearStatus = () => {
      if (!statusBox) return;
      statusBox.className = `form-status${form.classList.contains("contact-form") ? " full" : ""}`;
      statusBox.textContent = "";
    };

    // Check if Google Sheet URL has been configured
    if (!GOOGLE_SHEET_SCRIPT_URL || GOOGLE_SHEET_SCRIPT_URL.trim() === "" || GOOGLE_SHEET_SCRIPT_URL.includes("PASTE_YOUR")) {
      setStatus(
        "info",
        "Setup required: Please paste your Google Apps Script Web App URL into GOOGLE_SHEET_SCRIPT_URL in script.js. See GOOGLE_SHEETS_SETUP.md for simple 2-minute setup instructions."
      );
      return;
    }

    clearStatus();

    // Disable button & show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending Enquiry...";
    }

    try {
      const formData = new FormData(form);
      const formLabel = form.dataset.formName === "homepage"
        ? "Homepage Hero Enquiry"
        : "Contact Section Enquiry";
      formData.append("formName", formLabel);

      const response = await fetch(GOOGLE_SHEET_SCRIPT_URL, {
        method: "POST",
        body: formData
      });

      const result = await response.json().catch(() => null);

      if (response.ok || (result && result.result === "success")) {
        setStatus(
          "success",
          "✓ Thank you! Your enquiry has been sent successfully. We will get back to you shortly."
        );
        form.reset();
      } else {
        throw new Error(result && result.error ? result.error : "Failed to record enquiry");
      }
    } catch (error) {
      console.error("Enquiry submission error:", error);
      console.warn("Troubleshooting tip: Ensure Google Apps Script deployment 'Who has access' is set to 'Anyone', and you are previewing via a local server (Live Server) rather than file://.");
      setStatus(
        "error",
        "Unable to send your enquiry right now. Please try again or reach out directly at hello@articulatespaces.in or WhatsApp +91 86829 09603."
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
});
