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
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const introVideo = document.getElementById("intro-video");
  const helpBtn = document.getElementById("help-me-btn");
  const testTrigger = document.getElementById("test-trigger");
  const rulesModal = document.getElementById("rules-modal");
  const closeRulesBtn = document.getElementById("close-rules");

  // Audio elements
  const bgMusic = document.getElementById("bg-music");
  const rulesAudio = document.getElementById("rules-audio");
  const listenRulesBtn = document.getElementById("listen-rules-btn");

  function playBgMusic() {
    if (!bgMusic) return;
    bgMusic.volume = 0.35;
    bgMusic.play().catch(() => {
      /* playback blocked or file unavailable */
    });
  }

  // Toggle Rules Audio & pause/resume background music
  if (listenRulesBtn && rulesAudio) {
    listenRulesBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (rulesAudio.paused) {
        if (bgMusic) bgMusic.pause();
        rulesAudio.play();
        listenRulesBtn.textContent = " Pause";
        listenRulesBtn.classList.add("is-playing");
      } else {
        rulesAudio.pause();
        listenRulesBtn.textContent = " Listen";
        listenRulesBtn.classList.remove("is-playing");
        playBgMusic();
      }
    });

    // Automatically resume background song when rules audio finishes
    rulesAudio.addEventListener("ended", () => {
      listenRulesBtn.textContent = " Listen";
      listenRulesBtn.classList.remove("is-playing");
      playBgMusic();
    });
  }

  // Helper to close modal and stop rules audio if it's still playing
  function closeRulesModal() {
    rulesModal.classList.remove("open");
    if (rulesAudio && !rulesAudio.paused) {
      rulesAudio.pause();
      rulesAudio.currentTime = 0;
      if (listenRulesBtn) {
        listenRulesBtn.textContent = " Listen";
        listenRulesBtn.classList.remove("is-playing");
      }
      playBgMusic();
    }
  }

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

  // Start background music and open the rules window when "Help me!" is clicked
  if (helpBtn) {
    helpBtn.addEventListener("click", () => {
      playBgMusic();
      rulesModal.classList.add("open");
    });
  }

  if (closeRulesBtn) {
    closeRulesBtn.addEventListener("click", closeRulesModal);
  }

  if (rulesModal) {
    rulesModal.addEventListener("click", (e) => {
      if (e.target === rulesModal) {
        closeRulesModal();
      }
    });
  }
});