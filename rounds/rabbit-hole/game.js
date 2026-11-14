(function () {
  "use strict";
  if (document.body.dataset.round !== "rabbit-hole") return;

  const form = document.getElementById("word-form");
  const feedback = document.getElementById("word-feedback");
  const unlocked = document.getElementById("unlocked");
  const reset = document.getElementById("reset-round");
  const video = document.getElementById("rabbit-video");
  const placeholder = document.getElementById("rabbit-video-placeholder");
  const rabbitInputs = document.querySelectorAll("#rabbit-answer-board input");
  const KEY = "wonderlandDream.rabbitHole.complete";

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

  // Handle auto-advancing character inputs & backspace navigation
  rabbitInputs.forEach((inp, index) => {
    inp.addEventListener("input", () => {
      inp.value = inp.value.toUpperCase();
      if (inp.value && index < rabbitInputs.length - 1) {
        rabbitInputs[index + 1].focus();
      }
    });

    inp.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !inp.value && index > 0) {
        rabbitInputs[index - 1].focus();
      }
    });
  });

  // Handle puzzle submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    let answer = "";
    rabbitInputs.forEach(inp => {
      answer += inp.value.trim().toUpperCase();
    });

    if (answer.length < 5) {
      feedback.textContent = "Please enter all 5 letters.";
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
      feedback.textContent = "Not quite! Look again at the five correct silhouettes.";
      rabbitInputs[0].focus();
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
    rabbitInputs.forEach(inp => inp.value = "");
    feedback.textContent = "";
    rabbitInputs[0].focus();
  });

  // Video state handlers
  video.addEventListener("loadedmetadata", function () {
    video.hidden = false;
    placeholder.hidden = true;
  });
  
  video.addEventListener("error", function () {
    video.hidden = true;
    placeholder.hidden = false;
  });
})();

function playAudio() {
  const audio = document.getElementById("myAudio");
  if (audio) audio.play();
}