/**
 * SECONDARY CINEMATIC VISUAL V2: CHROME HANDS & GLOWING ENERGY ORB
 * Metallic chrome sculptural contours reaching toward a pulsating plasma energy orb
 * with sapphire, amethyst, and champagne-gold specular highlights and orbital filaments.
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

  // Orbital energy filaments & particles
  const PARTICLE_COUNT = 75;
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      angle: Math.random() * Math.PI * 2,
      distance: 28 + Math.random() * 175,
      speed: 0.006 + Math.random() * 0.014,
      radius: 0.75 + Math.random() * 2.4,
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

    // Chrome reflection gradient with sapphire, violet & champagne highlights
    const chromeGrad = ctx.createLinearGradient(-160, -90, 130, 110);
    chromeGrad.addColorStop(0.0, '#09090d');
    chromeGrad.addColorStop(0.2, '#1e293b');
    chromeGrad.addColorStop(0.4, '#64748b');
    chromeGrad.addColorStop(0.55, '#f8fafc'); // Pure specular highlight
    chromeGrad.addColorStop(0.7, '#6366f1'); // Indigo reflection
    chromeGrad.addColorStop(0.85, '#a855f7'); // Violet reflection
    chromeGrad.addColorStop(0.95, '#dfb15b'); // Champagne gold rim
    chromeGrad.addColorStop(1.0, '#040407');

    ctx.strokeStyle = chromeGrad;
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const reachOffset = Math.sin(t * 0.85 + (flip ? 1.2 : 0)) * 7;

    // Wrist / Forearm base
    ctx.beginPath();
    ctx.moveTo(-190, 105);
    ctx.quadraticCurveTo(-115, 65, -75, 38);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-180, 135);
    ctx.quadraticCurveTo(-95, 85, -55, 48);
    ctx.stroke();

    // Palm structure
    ctx.beginPath();
    ctx.moveTo(-75, 38);
    ctx.lineTo(-22, 16);
    ctx.lineTo(22, 6 + reachOffset);
    ctx.lineTo(-12, -26);
    ctx.lineTo(-65, -12);
    ctx.closePath();
    ctx.fillStyle = 'rgba(10, 15, 30, 0.45)';
    ctx.fill();
    ctx.stroke();

    // Finger 1 (Index reaching to orb)
    ctx.beginPath();
    ctx.moveTo(22, 6 + reachOffset);
    ctx.quadraticCurveTo(65, -12, 112 + reachOffset, -10);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(65, -12, 3.6, 0, Math.PI * 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fill();

    // Finger 2 (Middle finger reaching furthest)
    ctx.beginPath();
    ctx.moveTo(20, -10 + reachOffset);
    ctx.quadraticCurveTo(75, -34, 132 + reachOffset, -30);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(75, -34, 4.0, 0, Math.PI * 2);
    ctx.fillStyle = '#a855f7';
    ctx.fill();

    // Finger 3 (Ring finger)
    ctx.beginPath();
    ctx.moveTo(12, -22 + reachOffset);
    ctx.quadraticCurveTo(58, -50, 105 + reachOffset, -52);
    ctx.stroke();

    // Thumb (Opposed grip)
    ctx.beginPath();
    ctx.moveTo(-12, 32);
    ctx.quadraticCurveTo(28, 48, 60 + reachOffset * 0.5, 32);
    ctx.stroke();

    // Specular node at fingertip
    ctx.beginPath();
    ctx.arc(132 + reachOffset, -30, 2.4, 0, Math.PI * 2);
    ctx.fillStyle = '#f8fafc';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();
  }

  function drawEnergyOrb(cx, cy, t) {
    const pulse = Math.sin(t * 1.6) * 7;
    const baseRadius = 40 + pulse;

    // 1. Ambient Outer Halo
    const haloGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, baseRadius * 3.4);
    haloGrad.addColorStop(0.0, 'rgba(56, 189, 248, 0.48)');
    haloGrad.addColorStop(0.3, 'rgba(168, 85, 247, 0.3)');
    haloGrad.addColorStop(0.65, 'rgba(99, 102, 241, 0.14)');
    haloGrad.addColorStop(0.85, 'rgba(223, 177, 91, 0.07)');
    haloGrad.addColorStop(1.0, 'rgba(2, 2, 4, 0)');

    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius * 3.4, 0, Math.PI * 2);
    ctx.fill();

    // 2. High-energy Plasma Core
    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius);
    coreGrad.addColorStop(0.0, '#ffffff'); // Blinding center
    coreGrad.addColorStop(0.22, '#67e8f9'); // Cyan glare
    coreGrad.addColorStop(0.52, '#818cf8'); // Indigo energy
    coreGrad.addColorStop(0.82, '#c084fc'); // Purple plasma
    coreGrad.addColorStop(1.0, 'rgba(99, 102, 241, 0)');

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
    ctx.fill();

    // 3. Orbital Prismatic Gyro Rings
    for (let r = 0; r < 2; r++) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * (0.45 + r * 0.22) * (r === 0 ? 1 : -1));
      ctx.scale(1, 0.36 + r * 0.16);

      ctx.beginPath();
      ctx.arc(0, 0, baseRadius * 1.65 + r * 14, 0, Math.PI * 2);
      ctx.strokeStyle = r === 0 ? 'rgba(56, 189, 248, 0.55)' : 'rgba(223, 177, 91, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }

    // 4. Filaments and Particles
    particles.forEach(function (p) {
      if (!prefersReducedMotion) {
        p.angle += p.speed;
      }
      const dist = p.distance + Math.sin(t * 2.2 + p.pulseOffset) * 14;
      const px = cx + Math.cos(p.angle) * dist;
      const py = cy + Math.sin(p.angle) * dist * 0.76;

      ctx.beginPath();
      ctx.arc(px, py, p.radius, 0, Math.PI * 2);

      if (p.colorType < 0.33) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.88)';
      } else if (p.colorType < 0.66) {
        ctx.fillStyle = 'rgba(192, 132, 252, 0.88)';
      } else {
        ctx.fillStyle = 'rgba(223, 177, 91, 0.88)';
      }
      ctx.fill();

      if (Math.random() < 0.045 && !prefersReducedMotion) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.28)';
        ctx.lineWidth = 0.85;
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

    time += prefersReducedMotion ? 0.004 : 0.019;

    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    ctx.clearRect(0, 0, width, height);

    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 60, width / 2, height / 2, width * 0.68);
    bgGrad.addColorStop(0, '#090910');
    bgGrad.addColorStop(1, '#020204');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2 + (mouse.x - width / 2) * 0.08;
    const centerY = height / 2 + (mouse.y - height / 2) * 0.08;

    drawChromeHand(centerX - 200, centerY + 18, false, time);
    drawChromeHand(centerX + 200, centerY + 18, true, time);
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
