/**
 * SECONDARY CINEMATIC VISUAL: CHROME HANDS & GLOWING ENERGY ORB
 * Metallic chrome sculptural forms reaching toward a pulsating glowing plasma orb
 * with blue, violet, and champagne-gold particle filaments and specular highlights.
 */

(function () {
  'use strict';

  const container = document.getElementById('secondary-visual-container');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'secondary-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = container.clientWidth || 800);
  let height = (canvas.height = container.clientHeight || 500);

  let animId = null;
  let isVisible = false;
  let time = 0;
  let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Particle energy filaments
  const PARTICLE_COUNT = 65;
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      angle: Math.random() * Math.PI * 2,
      distance: 30 + Math.random() * 160,
      speed: 0.005 + Math.random() * 0.012,
      radius: 0.8 + Math.random() * 2.2,
      colorType: Math.random(),
      pulseOffset: Math.random() * Math.PI
    });
  }

  function resize() {
    width = canvas.width = container.clientWidth || 800;
    height = canvas.height = container.clientHeight || 500;
  }

  window.addEventListener('resize', resize, { passive: true });

  container.addEventListener('mousemove', function (e) {
    const rect = container.getBoundingClientRect();
    mouse.targetX = e.clientX - rect.left;
    mouse.targetY = e.clientY - rect.top;
  }, { passive: true });

  container.addEventListener('mouseleave', function () {
    mouse.targetX = width / 2;
    mouse.targetY = height / 2;
  }, { passive: true });

  function drawChromeHand(originX, originY, flip, t) {
    ctx.save();
    ctx.translate(originX, originY);
    if (flip) ctx.scale(-1, 1);

    // Chrome gradient with blue, violet & champagne specular highlights
    const chromeGrad = ctx.createLinearGradient(-150, -80, 120, 100);
    chromeGrad.addColorStop(0.0, '#0f172a');
    chromeGrad.addColorStop(0.2, '#334155');
    chromeGrad.addColorStop(0.4, '#94a3b8');
    chromeGrad.addColorStop(0.55, '#f8fafc'); // Pure specular highlight
    chromeGrad.addColorStop(0.7, '#6366f1'); // Indigo reflection
    chromeGrad.addColorStop(0.85, '#a855f7'); // Violet reflection
    chromeGrad.addColorStop(0.95, '#dfb15b'); // Subtle champagne gold rim
    chromeGrad.addColorStop(1.0, '#09090b');

    ctx.strokeStyle = chromeGrad;
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Articulated cybernetic / sculptural hand contours reaching toward center
    const reachOffset = Math.sin(t * 0.8 + (flip ? 1 : 0)) * 6;

    // Wrist / Forearm base
    ctx.beginPath();
    ctx.moveTo(-180, 100);
    ctx.quadraticCurveTo(-110, 60, -70, 35);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-170, 130);
    ctx.quadraticCurveTo(-90, 80, -50, 45);
    ctx.stroke();

    // Palm structure
    ctx.beginPath();
    ctx.moveTo(-70, 35);
    ctx.lineTo(-20, 15);
    ctx.lineTo(20, 5 + reachOffset);
    ctx.lineTo(-10, -25);
    ctx.lineTo(-60, -10);
    ctx.closePath();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
    ctx.fill();
    ctx.stroke();

    // Finger 1 (Index reaching to orb)
    ctx.beginPath();
    ctx.moveTo(20, 5 + reachOffset);
    ctx.quadraticCurveTo(60, -10, 105 + reachOffset, -8);
    ctx.stroke();

    // Finger 1 joint node
    ctx.beginPath();
    ctx.arc(60, -10, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fill();

    // Finger 2 (Middle finger reaching furthest)
    ctx.beginPath();
    ctx.moveTo(18, -8 + reachOffset);
    ctx.quadraticCurveTo(70, -32, 125 + reachOffset, -28);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(70, -32, 3.8, 0, Math.PI * 2);
    ctx.fillStyle = '#a855f7';
    ctx.fill();

    // Finger 3 (Ring finger)
    ctx.beginPath();
    ctx.moveTo(10, -20 + reachOffset);
    ctx.quadraticCurveTo(55, -48, 98 + reachOffset, -50);
    ctx.stroke();

    // Thumb (Opposed grip)
    ctx.beginPath();
    ctx.moveTo(-10, 30);
    ctx.quadraticCurveTo(25, 45, 55 + reachOffset * 0.5, 30);
    ctx.stroke();

    // Specular node at fingertip
    ctx.beginPath();
    ctx.arc(125 + reachOffset, -28, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = '#f8fafc';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();
  }

  function drawEnergyOrb(cx, cy, t) {
    const pulse = Math.sin(t * 1.5) * 6;
    const baseRadius = 38 + pulse;

    // 1. Ambient Outer Halo
    const haloGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, baseRadius * 3.2);
    haloGrad.addColorStop(0.0, 'rgba(56, 189, 248, 0.45)');
    haloGrad.addColorStop(0.3, 'rgba(168, 85, 247, 0.28)');
    haloGrad.addColorStop(0.65, 'rgba(99, 102, 241, 0.12)');
    haloGrad.addColorStop(0.85, 'rgba(223, 177, 91, 0.06)');
    haloGrad.addColorStop(1.0, 'rgba(5, 5, 7, 0)');

    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius * 3.2, 0, Math.PI * 2);
    ctx.fill();

    // 2. High-energy Plasma Core
    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius);
    coreGrad.addColorStop(0.0, '#ffffff'); // Pure blinding center
    coreGrad.addColorStop(0.25, '#67e8f9'); // Cyan glare
    coreGrad.addColorStop(0.55, '#818cf8'); // Indigo energy
    coreGrad.addColorStop(0.85, '#c084fc'); // Purple plasma
    coreGrad.addColorStop(1.0, 'rgba(99, 102, 241, 0)');

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
    ctx.fill();

    // 3. Orbital Prismatic Rings around Orb
    for (let r = 0; r < 2; r++) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * (0.4 + r * 0.2) * (r === 0 ? 1 : -1));
      ctx.scale(1, 0.35 + r * 0.15);

      ctx.beginPath();
      ctx.arc(0, 0, baseRadius * 1.6 + r * 12, 0, Math.PI * 2);
      ctx.strokeStyle = r === 0 ? 'rgba(56, 189, 248, 0.5)' : 'rgba(223, 177, 91, 0.4)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.restore();
    }

    // 4. Filaments and Particles
    particles.forEach(function (p) {
      if (!prefersReducedMotion) {
        p.angle += p.speed;
      }
      const dist = p.distance + Math.sin(t * 2 + p.pulseOffset) * 12;
      const px = cx + Math.cos(p.angle) * dist;
      const py = cy + Math.sin(p.angle) * dist * 0.75;

      ctx.beginPath();
      ctx.arc(px, py, p.radius, 0, Math.PI * 2);

      if (p.colorType < 0.33) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
      } else if (p.colorType < 0.66) {
        ctx.fillStyle = 'rgba(192, 132, 252, 0.85)';
      } else {
        ctx.fillStyle = 'rgba(223, 177, 91, 0.85)';
      }
      ctx.fill();

      // Delicate lightning thread connecting to core
      if (Math.random() < 0.04 && !prefersReducedMotion) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    });
  }

  function render() {
    if (!isVisible) {
      animId = null;
      return;
    }

    animId = requestAnimationFrame(render);

    time += prefersReducedMotion ? 0.004 : 0.018;

    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    ctx.clearRect(0, 0, width, height);

    // Deep graphite background canvas fill with delicate vignetting
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.65);
    bgGrad.addColorStop(0, '#090912');
    bgGrad.addColorStop(1, '#050507');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2 + (mouse.x - width / 2) * 0.08;
    const centerY = height / 2 + (mouse.y - height / 2) * 0.08;

    // Draw Left Chrome Hand reaching right
    drawChromeHand(centerX - 190, centerY + 15, false, time);

    // Draw Right Chrome Hand reaching left
    drawChromeHand(centerX + 190, centerY + 15, true, time);

    // Draw Central Pulsating Energy Orb
    drawEnergyOrb(centerX, centerY, time);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          render();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(container);
  } else {
    isVisible = true;
    render();
  }
})();
