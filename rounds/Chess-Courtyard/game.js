(function () {
  "use strict";
  if (document.body.dataset.round !== "chess-courtyard") return;

  const form = document.getElementById("word-form");
  const feedback = document.getElementById("word-feedback");
  const unlocked = document.getElementById("unlocked");
  const reset = document.getElementById("reset-round");
  const video = document.getElementById("chess-video");
  const placeholder = document.getElementById("chess-video-placeholder");
  const chessInputs = document.querySelectorAll("#rabbit-answer-board input");
  const KEY = "wonderlandDream.chessCourtyard.complete";

  function reveal() {
    unlocked.hidden = false;
    unlocked.classList.add("w-unlocked-show");
    form.hidden = true;
    feedback.textContent = "";
    const audio = document.getElementById("End");
    audio.play();
  }

  try {
    if (window.localStorage.getItem(KEY) === "yes") reveal();
  } catch (_) {
    /* privacy mode */
  }

  // Handle auto-advancing character inputs & backspace navigation
  chessInputs.forEach((inp, index) => {
    inp.addEventListener("input", () => {
      inp.value = inp.value.toUpperCase();
      if (inp.value && index < chessInputs.length - 1) {
        chessInputs[index + 1].focus();
      }
    });

    inp.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !inp.value && index > 0) {
        chessInputs[index - 1].focus();
      }
    });
  });

  // Handle puzzle submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    let answer = "";
    chessInputs.forEach(inp => {
      answer += inp.value.trim().toUpperCase();
    });

    if (answer.length < 5) {
      feedback.textContent = "Please enter all 5 move letters.";
      return;
    }

    if (answer === "MIRROR") {
      try {
        window.localStorage.setItem(KEY, "yes");
      } catch (_) {
        /* privacy mode */
      }
      reveal();
      unlocked.focus();
    } else {
      feedback.textContent = "Incorrect move sequence! Study the board positions again.";
      chessInputs[0].focus();
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
    chessInputs.forEach(inp => inp.value = "");
    feedback.textContent = "";
    chessInputs[0].focus();
  });

  // Video state handlers (ensures fallback behavior works if video metadata loads or fails)
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

function playAudio() {
  const audio = document.getElementById("myAudio");
  if (audio) audio.play();
}
function playTask() {
  const audio = document.getElementById("myTask");
  if (audio) audio.play();
}