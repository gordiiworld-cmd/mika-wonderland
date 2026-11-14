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

  if (introVideo) {
    introVideo.addEventListener("ended", showHelpButton);
  }

  if (testTrigger) {
    testTrigger.addEventListener("click", showHelpButton);
  }

  if (helpBtn) {
    helpBtn.addEventListener("click", () => {
      rulesModal.classList.add("open");
    });
  }

  if (closeRulesBtn) {
    closeRulesBtn.addEventListener("click", () => {
      rulesModal.classList.remove("open");
    });
  }

  if (rulesModal) {
    rulesModal.addEventListener("click", (e) => {
      if (e.target === rulesModal) {
        rulesModal.classList.remove("open");
      }
    });
  }
});