document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const introVideo = document.getElementById("intro-video");
  const helpBtn = document.getElementById("help-me-btn");
  const testTrigger = document.getElementById("test-trigger");
  const rulesModal = document.getElementById("rules-modal");
  const closeRulesBtn = document.getElementById("close-rules");

  function showHelpButton() {
    helpBtn.classList.add("is-visible");
    if (testTrigger) testTrigger.style.display = "none";
  }

  // Automatically reveal the "Help me!" button when the video finishes playing
  if (introVideo) {
    introVideo.addEventListener("ended", showHelpButton);
  }

  // Prototype test button trigger
  if (testTrigger) {
    testTrigger.addEventListener("click", showHelpButton);
  }

  // Open the big rules window
  if (helpBtn) {
    helpBtn.addEventListener("click", () => {
      rulesModal.classList.add("open");
    });
  }

  // Close modal via X button
  if (closeRulesBtn) {
    closeRulesBtn.addEventListener("click", () => {
      rulesModal.classList.remove("open");
    });
  }

  // Close modal when clicking outside the window backdrop
  if (rulesModal) {
    rulesModal.addEventListener("click", (e) => {
      if (e.target === rulesModal) {
        rulesModal.classList.remove("open");
      }
    });
  }
});