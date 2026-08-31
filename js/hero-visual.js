/**
 * HERO 3D CINEMATIC OPTICAL GLASS VISUAL
 * Transparent sapphire-to-amethyst optical glass crystal / flower
 * with dynamic orbital lighting revealing cyan, indigo, violet & champagne reflections.
 */

(function () {
  'use strict';

  const container = document.getElementById('hero-canvas-container');
  if (!container) return;

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let scene, camera, renderer, crystalGroup, clock;
  let orbitalLight1, orbitalLight2, ambientLight, coreLight;
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
      camera.position.set(0, 0, 7.2);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      
      const canvas = renderer.domElement;
      canvas.id = 'hero-webgl-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      container.appendChild(canvas);

      buildCrystalFlower();
      setupLighting();
      setupEvents();
      animate();
    } catch (e) {
      console.warn('WebGL init fallback:', e);
      renderCanvasFallback();
    }
  }

  function buildCrystalFlower() {
    crystalGroup = new THREE.Group();

    // High quality glass optical material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x0f172a), // deep obsidian / sapphire base
      emissive: new THREE.Color(0x1e1035), // internal amethyst glow
      emissiveIntensity: 0.18,
      roughness: 0.08,
      metalness: 0.12,
      transmission: 0.88, // glass transparency
      ior: 1.58, // optical glass refractive index
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide
    });

    const innerCoreMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x38bdf8), // cyan/sapphire core
      emissive: new THREE.Color(0x6366f1), // indigo emission
      emissiveIntensity: 0.45,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.7,
      ior: 1.65,
      transparent: true,
      opacity: 0.85
    });

    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xdfb15b),
      emissive: new THREE.Color(0x5a3f12),
      roughness: 0.25,
      metalness: 0.85,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });

    // 1. Central Core Crystal (Faceted Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(0.75, 1);
    const coreMesh = new THREE.Mesh(coreGeo, innerCoreMaterial);
    crystalGroup.add(coreMesh);

    // 2. Wireframe structural aura (Subtle champagne gold geometry lines)
    const wireCoreGeo = new THREE.IcosahedronGeometry(0.78, 1);
    const wireCore = new THREE.Mesh(wireCoreGeo, goldAccentMaterial);
    crystalGroup.add(wireCore);

    // 3. Petal Rings (Optical Glass Flower Architecture)
    const petalCountTier1 = 6;
    const petalGeo1 = new THREE.ConeGeometry(0.55, 1.9, 5);
    petalGeo1.translate(0, 0.95, 0);

    for (let i = 0; i < petalCountTier1; i++) {
      const angle = (i / petalCountTier1) * Math.PI * 2;
      const petal = new THREE.Mesh(petalGeo1, glassMaterial);
      petal.rotation.z = -0.52; // outward flare
      petal.rotation.y = angle;
      petal.rotation.x = 0.22;
      petal.scale.set(0.85, 1.1, 0.45);
      crystalGroup.add(petal);
    }

    // Tier 2: Outer Faceted Petals (Offset)
    const petalCountTier2 = 8;
    const petalGeo2 = new THREE.ConeGeometry(0.48, 2.3, 4);
    petalGeo2.translate(0, 1.15, 0);

    for (let i = 0; i < petalCountTier2; i++) {
      const angle = (i / petalCountTier2) * Math.PI * 2 + (Math.PI / petalCountTier2);
      const petal = new THREE.Mesh(petalGeo2, glassMaterial);
      petal.rotation.z = -0.85; // wider flare
      petal.rotation.y = angle;
      petal.rotation.x = -0.15;
      petal.scale.set(0.9, 1.05, 0.35);
      crystalGroup.add(petal);
    }

    // Tier 3: Floating Prismatic Crystal Rings
    const ringGeo = new THREE.TorusGeometry(2.1, 0.022, 16, 80);
    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x818cf8),
      emissive: new THREE.Color(0x3730a3),
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.6
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 2.8;
    ringMesh1.rotation.y = Math.PI / 6;
    crystalGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(2.5, 0.015, 16, 80);
    const ringMesh2 = new THREE.Mesh(ringGeo2, goldAccentMaterial);
    ringMesh2.rotation.x = -Math.PI / 3;
    ringMesh2.rotation.y = -Math.PI / 5;
    crystalGroup.add(ringMesh2);

    // Initial orientation: slightly tilted for dramatic editorial lighting angle
    crystalGroup.rotation.x = 0.28;
    crystalGroup.rotation.y = 0.15;
    scene.add(crystalGroup);
  }

  function setupLighting() {
    // Ambient light - keep background pure deep black
    ambientLight = new THREE.AmbientLight(0x0a0a14, 1.2);
    scene.add(ambientLight);

    // Orbital Light 1: Sapphire to Cyan Key Light
    orbitalLight1 = new THREE.PointLight(0x38bdf8, 4.2, 18, 1.8);
    orbitalLight1.position.set(3.5, 2.0, 3.5);
    scene.add(orbitalLight1);

    // Orbital Light 2: Amethyst / Violet to Champagne Gold Rim Light
    orbitalLight2 = new THREE.PointLight(0xa855f7, 3.8, 18, 1.8);
    orbitalLight2.position.set(-3.5, -2.0, 3.0);
    scene.add(orbitalLight2);

    // Core internal light for subtle luminescence
    coreLight = new THREE.PointLight(0x6366f1, 2.0, 5, 2.0);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // Distant Champagne Gold Accent Light
    const goldRim = new THREE.DirectionalLight(0xfef08a, 0.8);
    goldRim.position.set(0, 5, -4);
    scene.add(goldRim);
  }

  function setupEvents() {
    // Mouse movement interaction (restrained and elegant)
    window.addEventListener('mousemove', function (e) {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetMouseX = (e.clientX - halfW) / halfW;
      targetMouseY = (e.clientY - halfH) / halfH;
    }, { passive: true });

    // Resize handling
    window.addEventListener('resize', onWindowResize, { passive: true });

    // Pause when scrolled out of view for 0% CPU consumption
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
    const speedMultiplier = prefersReducedMotion ? 0.1 : 1.0;

    // Smooth mouse inertia
    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    // Camera and object remain mostly stable; subtle micro-drift
    if (crystalGroup) {
      crystalGroup.rotation.y = 0.15 + (elapsedTime * 0.04 * speedMultiplier) + (mouseX * 0.12);
      crystalGroup.rotation.x = 0.28 + (Math.sin(elapsedTime * 0.25 * speedMultiplier) * 0.04) + (mouseY * 0.08);
      crystalGroup.position.y = Math.sin(elapsedTime * 0.45 * speedMultiplier) * 0.08;
    }

    // Dynamic Orbital Lights: Smooth orbital paths revealing cyan, violet, indigo & champagne reflections
    if (orbitalLight1) {
      const orbit1Time = elapsedTime * 0.35 * speedMultiplier;
      orbitalLight1.position.x = Math.cos(orbit1Time) * 3.8 + (mouseX * 1.5);
      orbitalLight1.position.y = Math.sin(orbit1Time * 0.8) * 2.2 - (mouseY * 1.0);
      orbitalLight1.position.z = Math.sin(orbit1Time) * 3.8 + 2.0;
    }

    if (orbitalLight2) {
      const orbit2Time = elapsedTime * 0.28 * speedMultiplier + Math.PI;
      orbitalLight2.position.x = Math.cos(orbit2Time) * 3.6 - (mouseX * 1.2);
      orbitalLight2.position.y = Math.cos(orbit2Time * 0.7) * 2.4 + (mouseY * 0.8);
      orbitalLight2.position.z = Math.sin(orbit2Time) * 3.6 + 1.8;
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  // Fallback 2D Canvas Gradient Visualizer (if WebGL is unsupported or disabled)
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
      grad.addColorStop(0, 'rgba(99, 102, 241, 0.22)');
      grad.addColorStop(0.4, 'rgba(168, 85, 247, 0.12)');
      grad.addColorStop(0.7, 'rgba(56, 189, 248, 0.06)');
      grad.addColorStop(1, 'rgba(5, 5, 7, 0)');

      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    drawFallback();
    window.addEventListener('resize', drawFallback, { passive: true });
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
