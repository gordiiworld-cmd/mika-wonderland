/* Wonderland Dream — interactive logic for Round 6 ONLY.
   Original HTML/CSS design remains intact. Replace video paths below and
   adjust keyholeTarget to the actual keyhole in the finished video.
   Key 3 is the CLUB and leads to Secret Ending.
*/
const ROUND6 = {
  correctKey: 3,
  keyholeTarget: { x: 0.50, y: 0.56 }, // fractions of the displayed video shell
  videoFiles: {
    intro: '../../assets/videos/Round5.mp4',
    intro: '../../assets/videos/ROUND6.mp4',
    rabbit1: '../../assets/videos/WEAK UP ENDING v1.mp4',
    rabbit2: '../../assets/videos/Round5.mp4',
    wakeEnding: '../../assets/videos/Round5.mp4',
    rabbit2: '../../assets/videos/WEAKUP ENDING V2.mp4',
    wakeEnding: '../../assets/videos/WEAK UP FINAL.mp4',
    secretEnding: '../../assets/videos/ENDINGrightKey.mov'
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const shell = document.querySelector('#round6-video-shell');
  const video = document.querySelector('#garden-video');
  const placeholder = document.querySelector('#garden-video-placeholder');
  const caption = document.querySelector('#video-caption');
  const helper = document.querySelector('#video-help');
  const wake = document.querySelector('#wake-up-button');
  const replay = document.querySelector('#replay-round6-button');
  const sound = document.querySelector('#round6-play-with-sound');
  const feedback = document.querySelector('#word-feedback');
  const keyButtons = [...document.querySelectorAll('.round6-key')];
  const state = { stage: 'choose', clipRequest: 0, busy: false };

  // The source is replaced through JS so every clip shares this same player.
  video.querySelector('source')?.remove();
  video.addEventListener('error', () => {
    if (state.stage === 'choose' && !state.busy) {
      // Initial scene is still optional in this standalone demo.
    }
    placeholder.hidden = false;
    caption.textContent = 'VIDEO FILE NOT AVAILABLE';
    helper.textContent = 'Add the approved video file at the path listed in game.js.';
    sound.hidden = true;
    video.controls = false; // Do not overlay native controls onto an absent video.
  });
  video.addEventListener('loadeddata', () => {
    placeholder.hidden = true;
    if (state.stage === 'choose') video.controls = true;
  });
  video.addEventListener('ended', () => {
    if (state.stage === 'secretEnding' || state.stage === 'wakeEnding') {
      replay.hidden = false;
    }
    // For rabbit1 and rabbit2 the visible WAKE UP button waits for the child.
  });

  function setFeedback(message = '') { feedback.textContent = message; }
  function showMissing(label, path) {
    placeholder.hidden = false;
    caption.textContent = label;
    helper.textContent = `Waiting for video: ${path}`;
  }

  async function loadClip(id, { start = true } = {}) {
    const request = ++state.clipRequest;
    const path = ROUND6.videoFiles[id];
    sound.hidden = true;
    video.pause();
    video.controls = !start;
    video.loop = false;
    showMissing(id.toUpperCase(), path);
    video.src = path;
    video.load();
    if (!start) return;
    try {
      await video.play();
      if (request !== state.clipRequest) return;
      // The loadeddata event will hide the placeholder once video is ready.
    } catch (error) {
      if (request !== state.clipRequest) return;
      if (error.name === 'NotAllowedError') {
        sound.hidden = false;
        caption.textContent = 'TAP TO PLAY THE VIDEO';
        helper.textContent = 'Your browser requires a tap to play audio.';
      } else if (error.name !== 'AbortError') {
        showMissing(id.toUpperCase() + ' — VIDEO NOT LOADED', path);
      }
    }
  }

  // On mobile the key list may be below the visible video. Scroll the video
  // into view only AFTER making the flying clone, which stays in the viewport.
  async function flyKey(button) {
    const original = button.querySelector('img');
    const from = original.getBoundingClientRect();
    const clone = original.cloneNode(false);
    clone.className = 'round6-flying-key';
    Object.assign(clone.style, {
      left: `${from.left}px`, top: `${from.top}px`,
      width: `${from.width}px`, height: `${from.height}px`
    });
    document.body.appendChild(clone);
    button.classList.add('round6-selected');
    shell.scrollIntoView({ behavior: 'instant', block: 'center' });
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const box = shell.getBoundingClientRect();
    const x = box.left + box.width * ROUND6.keyholeTarget.x;
    const y = box.top + box.height * ROUND6.keyholeTarget.y;
    const destLeft = x - from.width / 2;
    const destTop = y - from.height / 2;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      clone.remove();
      return;
    }
    try {
      const animation = clone.animate([
        { left: `${from.left}px`, top: `${from.top}px`, transform: 'rotate(0deg) scale(1)', opacity: 1 },
        { left: `${destLeft}px`, top: `${destTop}px`, transform: 'rotate(-15deg) scale(0.65)', opacity: 1, offset: 0.72 },
        { left: `${destLeft}px`, top: `${destTop}px`, transform: 'rotate(70deg) scale(0.08)', opacity: 0 }
      ], { duration: 900, easing: 'cubic-bezier(.2,.72,.22,1)', fill: 'forwards' });
      await animation.finished;
    } catch (_) {
      // Animation may be cancelled by navigation: still continue the story.
    } finally {
      clone.remove();
    }
  }

  function disableKeys() { keyButtons.forEach(b => b.disabled = true); }
  function enableKeys() {
    keyButtons.forEach(b => { b.disabled = false; b.classList.remove('round6-selected'); });
  }

  async function beginWakeBranch() {
    state.stage = 'rabbit1';
    // Per requested timing, show WAKE UP immediately when Rabbit video 1 starts.
    wake.hidden = false;
    replay.hidden = true;
    await loadClip('rabbit1');
  }

  async function chooseKey(button) {
    if (state.stage !== 'choose' || state.busy) return;
    state.busy = true;
    disableKeys();
    setFeedback('');
    video.pause();
    wake.hidden = true;
    replay.hidden = true;
    sound.hidden = true;
    state.stage = 'flying';
    await flyKey(button);
    if (Number(button.dataset.key) === ROUND6.correctKey) {
      state.stage = 'secretEnding';
      await loadClip('secretEnding');
    } else {
      await beginWakeBranch();
    }
    state.busy = false;
  }

  wake.addEventListener('click', async () => {
    if (state.busy) return;
    if (state.stage !== 'rabbit1' && state.stage !== 'rabbit2') return;
    state.busy = true;
    const next = state.stage === 'rabbit1' ? 'rabbit2' : 'wakeEnding';
    state.stage = next;
    if (next === 'wakeEnding') wake.hidden = true;
    // Otherwise WAKE UP stays centered on the second Rabbit video.
    await loadClip(next);
    state.busy = false;
  });

  sound.addEventListener('click', async () => {
    sound.hidden = true;
    try { await video.play(); }
    catch (error) {
      sound.hidden = false;
      setFeedback('Could not start video. Check the video file path and encoding.');
    }
  });

  replay.addEventListener('click', () => {
    state.stage = 'choose';
    state.busy = false;
    wake.hidden = true;
    replay.hidden = true;
    sound.hidden = true;
    enableKeys();
    setFeedback('');
    loadClip('intro', { start: false });
  });

  keyButtons.forEach(b => b.addEventListener('click', () => chooseKey(b)));
  // Keep the original Round6 video with manual controls on first page load.
  loadClip('intro', { start: false });
});
