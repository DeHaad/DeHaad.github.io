/**
 * HERO 3D CINEMATIC OPTICAL GLASS VISUAL V2 (SAPPHIRE BLOOM / CRYSTAL LOTUS)
 * Transparent sapphire-to-amethyst optical glass crystal lotus geometry
 * with studio-grade orbital lighting, chromatic reflections, and dynamic refraction.
 */

(function () {
  'use strict';

  const container = document.getElementById('hero-canvas-container');
  if (!container) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let scene, camera, renderer, crystalGroup, clock;
  let orbitalLight1, orbitalLight2, ambientLight, coreLight, studioRimLight;
  let animationFrameId = null;
  let isVisible = true;
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  function init() {
    if (typeof THREE === 'undefined') {
      renderCanvasFallback();
      return;
    }

    try {
      scene = new THREE.Scene();
      clock = new THREE.Clock();

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 7.0);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;

      const canvas = renderer.domElement;
      canvas.id = 'hero-webgl-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      container.appendChild(canvas);

      buildSapphireLotus();
      setupStudioLighting();
      setupEvents();
      animate();
    } catch (e) {
      console.warn('WebGL init fallback:', e);
      renderCanvasFallback();
    }
  }

  function buildSapphireLotus() {
    crystalGroup = new THREE.Group();

    // Studio Optical Glass Material (Sapphire to Amethyst Transmission)
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x0a1128),
      emissive: new THREE.Color(0x190d2e),
      emissiveIntensity: 0.22,
      roughness: 0.04,
      metalness: 0.08,
      transmission: 0.94, // High transparency
      ior: 1.62, // Refractive optical index
      reflectivity: 0.98,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      transparent: true,
      opacity: 0.94,
      side: THREE.DoubleSide
    });

    // Inner Glowing Core Material (Cyan to Indigo Core)
    const innerCoreMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x38bdf8),
      emissive: new THREE.Color(0x6366f1),
      emissiveIntensity: 0.55,
      roughness: 0.08,
      metalness: 0.15,
      transmission: 0.75,
      ior: 1.68,
      transparent: true,
      opacity: 0.88
    });

    // Prismatic Wireframe Accents (Champagne Gold Facets)
    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xdfb15b),
      emissive: new THREE.Color(0x5a3f12),
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    // 1. Central Prismatic Core
    const coreGeo = new THREE.IcosahedronGeometry(0.8, 1);
    const coreMesh = new THREE.Mesh(coreGeo, innerCoreMaterial);
    crystalGroup.add(coreMesh);

    // 2. Wireframe Geometric Aura
    const wireCoreGeo = new THREE.IcosahedronGeometry(0.84, 1);
    const wireCore = new THREE.Mesh(wireCoreGeo, goldAccentMaterial);
    crystalGroup.add(wireCore);

    // 3. Tier 1 Inner Faceted Petals (Lotus Formation)
    const petalCountTier1 = 6;
    const petalGeo1 = new THREE.ConeGeometry(0.58, 2.0, 5);
    petalGeo1.translate(0, 1.0, 0);

    for (let i = 0; i < petalCountTier1; i++) {
      const angle = (i / petalCountTier1) * Math.PI * 2;
      const petal = new THREE.Mesh(petalGeo1, glassMaterial);
      petal.rotation.z = -0.54;
      petal.rotation.y = angle;
      petal.rotation.x = 0.24;
      petal.scale.set(0.85, 1.15, 0.45);
      crystalGroup.add(petal);
    }

    // Tier 2 Outer Faceted Petals (Interleaved Flare)
    const petalCountTier2 = 8;
    const petalGeo2 = new THREE.ConeGeometry(0.52, 2.4, 4);
    petalGeo2.translate(0, 1.2, 0);

    for (let i = 0; i < petalCountTier2; i++) {
      const angle = (i / petalCountTier2) * Math.PI * 2 + (Math.PI / petalCountTier2);
      const petal = new THREE.Mesh(petalGeo2, glassMaterial);
      petal.rotation.z = -0.88;
      petal.rotation.y = angle;
      petal.rotation.x = -0.16;
      petal.scale.set(0.92, 1.08, 0.36);
      crystalGroup.add(petal);
    }

    // Tier 3 Prismatic Gyro Orbit Rings
    const ringGeo1 = new THREE.TorusGeometry(2.2, 0.022, 16, 90);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x818cf8),
      emissive: new THREE.Color(0x3730a3),
      metalness: 0.92,
      roughness: 0.12,
      transparent: true,
      opacity: 0.65
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2.7;
    ringMesh1.rotation.y = Math.PI / 5.5;
    crystalGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(2.6, 0.016, 16, 90);
    const ringMesh2 = new THREE.Mesh(ringGeo2, goldAccentMaterial);
    ringMesh2.rotation.x = -Math.PI / 3.2;
    ringMesh2.rotation.y = -Math.PI / 4.8;
    crystalGroup.add(ringMesh2);

    // Initial position & tilt
    crystalGroup.rotation.x = 0.28;
    crystalGroup.rotation.y = 0.15;
    scene.add(crystalGroup);
  }

  function setupStudioLighting() {
    // Pure deep black ambient floor
    ambientLight = new THREE.AmbientLight(0x06060c, 1.4);
    scene.add(ambientLight);

    // Key Light: Sapphire to Cyan Orbital Light
    orbitalLight1 = new THREE.PointLight(0x38bdf8, 4.5, 20, 1.8);
    orbitalLight1.position.set(3.8, 2.2, 3.8);
    scene.add(orbitalLight1);

    // Rim Light: Amethyst & Violet Orbital Light
    orbitalLight2 = new THREE.PointLight(0xa855f7, 4.2, 20, 1.8);
    orbitalLight2.position.set(-3.8, -2.2, 3.2);
    scene.add(orbitalLight2);

    // Core Gemstone Radiance Light
    coreLight = new THREE.PointLight(0x6366f1, 2.4, 6, 2.0);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // Studio Top Specular Highlight (Champagne Gold)
    studioRimLight = new THREE.DirectionalLight(0xfef08a, 0.95);
    studioRimLight.position.set(0, 6, -4.5);
    scene.add(studioRimLight);
  }

  function setupEvents() {
    window.addEventListener('mousemove', function (e) {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetMouseX = (e.clientX - halfW) / halfW;
      targetMouseY = (e.clientY - halfH) / halfH;
    }, { passive: true });

    window.addEventListener('resize', onWindowResize, { passive: true });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          isVisible = entry.isIntersecting;
          if (isVisible && !animationFrameId) {
            animate();
          }
        });
      }, { threshold: 0.05 });
      observer.observe(container);
    }
  }

  function onWindowResize() {
    if (!renderer || !camera || !container) return;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }

    animationFrameId = requestAnimationFrame(animate);

    const elapsedTime = clock ? clock.getElapsedTime() : 0;
    const speedMultiplier = prefersReducedMotion ? 0.08 : 1.0;

    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    if (crystalGroup) {
      crystalGroup.rotation.y = 0.15 + (elapsedTime * 0.045 * speedMultiplier) + (mouseX * 0.14);
      crystalGroup.rotation.x = 0.28 + (Math.sin(elapsedTime * 0.26 * speedMultiplier) * 0.04) + (mouseY * 0.09);
      crystalGroup.position.y = Math.sin(elapsedTime * 0.48 * speedMultiplier) * 0.09;
    }

    if (orbitalLight1) {
      const orbit1Time = elapsedTime * 0.36 * speedMultiplier;
      orbitalLight1.position.x = Math.cos(orbit1Time) * 4.0 + (mouseX * 1.6);
      orbitalLight1.position.y = Math.sin(orbit1Time * 0.82) * 2.4 - (mouseY * 1.1);
      orbitalLight1.position.z = Math.sin(orbit1Time) * 4.0 + 2.2;
    }

    if (orbitalLight2) {
      const orbit2Time = elapsedTime * 0.3 * speedMultiplier + Math.PI;
      orbitalLight2.position.x = Math.cos(orbit2Time) * 3.8 - (mouseX * 1.3);
      orbitalLight2.position.y = Math.cos(orbit2Time * 0.75) * 2.5 + (mouseY * 0.9);
      orbitalLight2.position.z = Math.sin(orbit2Time) * 3.8 + 2.0;
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  function renderCanvasFallback() {
    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.id = 'hero-fallback-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function drawFallback() {
      canvas.width = container.clientWidth || window.innerWidth;
      canvas.height = container.clientHeight || window.innerHeight;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.45;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, 'rgba(99, 102, 241, 0.24)');
      grad.addColorStop(0.4, 'rgba(168, 85, 247, 0.14)');
      grad.addColorStop(0.7, 'rgba(56, 189, 248, 0.06)');
      grad.addColorStop(1, 'rgba(2, 2, 4, 0)');

      ctx.fillStyle = '#020204';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    drawFallback();
    window.addEventListener('resize', drawFallback, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
