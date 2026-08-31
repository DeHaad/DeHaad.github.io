/**
 * CINEMATIC CUSTOM CURSOR
 * Smooth follower ring & dot with interactive state changes and magnetic feedback.
 * Disabled on touch screens.
 */

(function () {
  'use strict';

  // Disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');

  const follower = document.createElement('div');
  follower.className = 'cursor-follower';
  follower.setAttribute('aria-hidden', 'true');

  const label = document.createElement('span');
  label.className = 'cursor-label';
  follower.appendChild(label);

  document.body.appendChild(dot);
  document.body.appendChild(follower);

  let mouseX = -100, mouseY = -100;
  let followerX = -100, followerY = -100;
  let isHovered = false;

  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }, { passive: true });

  function renderCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }

  renderCursor();

  // Attach hover interactions
  function initHoverListeners() {
    document.querySelectorAll('a, button, [role="button"], input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.classList.add('is-hovered');
        label.textContent = '';
      });
      el.addEventListener('mouseleave', () => {
        follower.classList.remove('is-hovered');
      });
    });

    document.querySelectorAll('.project-card, .featured-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.classList.add('is-card-hover');
        label.textContent = 'EXPLORE';
      });
      el.addEventListener('mouseleave', () => {
        follower.classList.remove('is-card-hover');
        label.textContent = '';
      });
    });

    document.querySelectorAll('.lab-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.classList.add('is-card-hover');
        label.textContent = 'VIEW';
      });
      el.addEventListener('mouseleave', () => {
        follower.classList.remove('is-card-hover');
        label.textContent = '';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initHoverListeners);
  window.initCursorHovers = initHoverListeners;
})();
