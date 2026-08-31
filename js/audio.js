/**
 * AUDIO SYSTEM & SOUND DESIGN
 * Ambient background music controller + Web Audio API subtle interaction clicks.
 */

(function () {
  'use strict';

  let audioCtx = null;
  let bgAudio = null;
  let isPlaying = false;
  let hasInteracted = false;

  const toggleBtn = document.getElementById('sound-toggle');
  const waveIndicators = document.querySelectorAll('.sound-wave-bar');

  function initWebAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function initBgAudio() {
    if (!bgAudio) {
      bgAudio = new Audio('space-bg.mp3');
      bgAudio.loop = true;
      bgAudio.volume = 0.25;
      bgAudio.preload = 'none'; // Save bandwidth until triggered
    }
  }

  function playUiClick(freq = 1200, type = 'sine', duration = 0.04) {
    if (!audioCtx || audioCtx.state !== 'running') return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore audio synthesis errors
    }
  }

  function toggleAudio() {
    initWebAudio();
    initBgAudio();

    if (!isPlaying) {
      bgAudio.play().then(() => {
        isPlaying = true;
        updateUiState(true);
      }).catch(err => {
        console.warn('Audio play prevented:', err);
      });
    } else {
      bgAudio.pause();
      isPlaying = false;
      updateUiState(false);
    }
    playUiClick(1400, 'sine', 0.05);
  }

  function updateUiState(active) {
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', active ? 'true' : 'false');
      toggleBtn.classList.toggle('active', active);
      const textSpan = toggleBtn.querySelector('.sound-btn-text');
      if (textSpan) {
        textSpan.textContent = active ? 'SOUND: ON' : 'SOUND: OFF';
      }
    }

    waveIndicators.forEach(bar => {
      bar.classList.toggle('animating', active);
    });
  }

  // Attach interactive clicks to all primary interactive elements
  function attachUiSounds() {
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .filter-btn, .modal-close');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (isPlaying) {
          playUiClick(2200, 'triangle', 0.02);
        }
      }, { passive: true });
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleAudio);
  }

  // Global listener for first user click to initialize Web Audio context
  window.addEventListener('click', function onFirstClick() {
    if (!hasInteracted) {
      hasInteracted = true;
      initWebAudio();
      window.removeEventListener('click', onFirstClick);
    }
  }, { once: true });

  // Expose sound triggers to global app scope
  window.AppAudio = {
    toggle: toggleAudio,
    playClick: playUiClick,
    attachSounds: attachUiSounds
  };

  document.addEventListener('DOMContentLoaded', attachUiSounds);
})();
