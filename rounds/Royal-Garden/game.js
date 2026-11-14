(function () {
  "use strict";
  if (document.body.dataset.round !== "royal-garden") return;

  const form = document.getElementById("word-form");
  const feedback = document.getElementById("word-feedback");
  const unlocked = document.getElementById("unlocked");
  const reset = document.getElementById("reset-round");
  const video = document.getElementById("garden-video");
  const placeholder = document.getElementById("garden-video-placeholder");
  const gardenInputs = document.querySelectorAll("#rabbit-answer-board input");
  const KEY = "wonderlandDream.royalGarden.complete";

  function reveal() {
    unlocked.hidden = false;
    unlocked.classList.add("w-unlocked-show");
    form.hidden = true;
    feedback.textContent = "";
  }

  try {
    if (window.localStorage.getItem(KEY) === "yes") reveal();
  } catch (_) {
    /* privacy mode */
  }

  gardenInputs.forEach((inp, index) => {
    inp.addEventListener("input", () => {
      inp.value = inp.value.toUpperCase();
      if (inp.value && index < gardenInputs.length - 1) {
        gardenInputs[index + 1].focus();
      }
    });

    inp.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !inp.value && index > 0) {
        gardenInputs[index - 1].focus();
      }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    let answer = "";
    gardenInputs.forEach(inp => {
      answer += inp.value.trim().toUpperCase();
    });

    if (answer.length < 5) {
      feedback.textContent = "Please enter all 5 royal crest letters.";
      return;
    }

    if (answer === "QUEEN") {
      try {
        window.localStorage.setItem(KEY, "yes");
      } catch (_) {
        /* privacy mode */
      }
      reveal();
      unlocked.focus();
    } else {
      feedback.textContent = "Not quite! Inspect the golden hedges again.";
      gardenInputs[0].focus();
    }
  });

  reset.addEventListener("click", function () {
    try {
      window.localStorage.removeItem(KEY);
    } catch (_) {
      /* privacy mode */
    }
    unlocked.hidden = true;
    unlocked.classList.remove("w-unlocked-show");
    form.hidden = false;
    gardenInputs.forEach(inp => inp.value = "");
    feedback.textContent = "";
    gardenInputs[0].focus();
  });

  if (video) {
    video.addEventListener("loadedmetadata", function () {
      video.hidden = false;
      if (placeholder) placeholder.hidden = true;
    });
    
    video.addEventListener("error", function () {
      video.hidden = true;
      if (placeholder) placeholder.hidden = false;
    });
  }
})();