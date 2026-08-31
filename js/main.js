/**
 * MAIN CLIENT APPLICATION LOGIC
 * Navigation, Project rendering, Filtering, Interactive Modals,
 * Pipeline Inspector, Scroll Animations, and Contact utilities.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initProjectsGrid();
    initFeaturedPipeline();
    initProjectModal();
    initScrollAnimations();
    initStatsCounter();
    initCopyEmail();
    initTechFilter();
  });

  /* ==========================================================================
     1. NAVIGATION & MOBILE MENU
     ========================================================================== */
  function initNavigation() {
    const header = document.getElementById('site-header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // Sticky header background blur on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header?.classList.add('header-scrolled');
      } else {
        header?.classList.remove('header-scrolled');
      }
      updateActiveNavLink();
    }, { passive: true });

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobileMenuBtn.classList.toggle('active', isOpen);
        document.body.classList.toggle('no-scroll', isOpen);
        if (window.AppAudio) window.AppAudio.playClick(1000, 'sine', 0.03);
      });

      // Close mobile menu on clicking any link
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenuBtn.classList.remove('active');
          document.body.classList.remove('no-scroll');
        });
      });
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId.startsWith('#')) return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* ==========================================================================
     2. SELECTED WORK GRID & FILTERING
     ========================================================================== */
  let activeFilter = 'all';

  function initProjectsGrid() {
    const gridContainer = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!gridContainer || typeof PROJECTS_DATA === 'undefined') return;

    renderProjects(PROJECTS_DATA, gridContainer);

    filterButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        activeFilter = this.getAttribute('data-filter') || 'all';

        const filtered = activeFilter === 'all'
          ? PROJECTS_DATA
          : PROJECTS_DATA.filter(p => p.category === activeFilter);

        renderProjects(filtered, gridContainer);
        if (window.AppAudio) window.AppAudio.playClick(1500, 'triangle', 0.03);
        if (window.initCursorHovers) window.initCursorHovers();
      });
    });
  }

  function renderProjects(projects, container) {
    container.innerHTML = '';

    projects.forEach((proj, idx) => {
      const card = document.createElement('article');
      card.className = 'project-card fade-in-up';
      card.style.animationDelay = `${idx * 0.1}s`;
      card.setAttribute('data-id', proj.id);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View details for project ${proj.title}`);

      // Tech badges markup
      const techTags = proj.technologies.slice(0, 4).map(t => `<span class="tech-tag">${t}</span>`).join('');

      card.innerHTML = `
        <div class="card-glass-glow"></div>
        <div class="project-card-header">
          <span class="project-num">${proj.number}</span>
          <span class="project-badge">${proj.badge}</span>
        </div>
        <div class="project-card-body">
          <span class="project-category-label">${proj.categoryLabel}</span>
          <h3 class="project-card-title">${proj.title}</h3>
          <p class="project-card-desc">${proj.shortDescription}</p>
        </div>
        <div class="project-card-footer">
          <div class="project-tech-list">
            ${techTags}
            ${proj.technologies.length > 4 ? `<span class="tech-tag more">+${proj.technologies.length - 4}</span>` : ''}
          </div>
          <div class="project-action-btn" aria-hidden="true">
            <span>EXPLORE</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </div>
      `;

      // Open detail modal on click or Enter key
      card.addEventListener('click', () => openProjectModal(proj.id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectModal(proj.id);
        }
      });

      container.appendChild(card);
    });
  }

  /* ==========================================================================
     3. FEATURED PROJECT PIPELINE INSPECTOR (CROSSPOSTBOT)
     ========================================================================== */
  function initFeaturedPipeline() {
    const nodes = document.querySelectorAll('.pipeline-node');
    const infoTitle = document.getElementById('pipeline-step-title');
    const infoDesc = document.getElementById('pipeline-step-desc');
    const infoTech = document.getElementById('pipeline-step-tech');

    const stepData = {
      ingest: {
        title: "01 / Ingestion & Trigger",
        desc: "High-speed media reception via private Telegram bot or authenticated REST endpoint. Extracts media headers, generates a unique job UUID, and queues tasks asynchronously.",
        tech: "Telegram Bot API · aiogram 3 · FastAPI Async Task"
      },
      worker: {
        title: "02 / Processing & Transcoding",
        desc: "Asynchronous Python worker validates video codecs (H.264/AAC), verifies target platform aspect ratios (9:16 vertical), sanitizes descriptions, and structures per-platform payload packages.",
        tech: "Python Asyncio · FFmpeg Pipelines · Metadata Sanitizer"
      },
      storage: {
        title: "03 / Cloud Vault & S3 Staging",
        desc: "Temporarily stores original high-definition video chunks in encrypted AWS S3 buckets. Securely refreshes and queries OAuth 2.0 access tokens from the persistent credential vault.",
        tech: "AWS S3 Cloud Storage · SQLite/PostgreSQL · AES-256 Auth Vault"
      },
      dispatch: {
        title: "04 / Multi-Platform Publication",
        desc: "Dispatches parallel multipart uploads to YouTube Data API (Shorts), Instagram Graph API (Reels Container & Publishing Flow), and TikTok Content API simultaneously with automatic retry policies.",
        tech: "YouTube API v3 · Instagram Graph API · TikTok API"
      }
    };

    nodes.forEach(node => {
      node.addEventListener('click', function () {
        nodes.forEach(n => n.classList.remove('active'));
        this.classList.add('active');

        const stepKey = this.getAttribute('data-step');
        if (stepData[stepKey] && infoTitle && infoDesc && infoTech) {
          infoTitle.textContent = stepData[stepKey].title;
          infoDesc.textContent = stepData[stepKey].desc;
          infoTech.textContent = stepData[stepKey].tech;
        }

        if (window.AppAudio) window.AppAudio.playClick(1800, 'sine', 0.03);
      });
    });
  }

  /* ==========================================================================
     4. PROJECT DETAIL MODAL
     ========================================================================== */
  const modalOverlay = document.getElementById('project-modal');
  let lastFocusedElement = null;

  function initProjectModal() {
    if (!modalOverlay) return;

    const closeBtn = document.getElementById('modal-close-btn');

    closeBtn?.addEventListener('click', closeProjectModal);

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeProjectModal();
      }
    });
  }

  function openProjectModal(projectId) {
    if (!modalOverlay || typeof PROJECTS_DATA === 'undefined') return;

    const proj = PROJECTS_DATA.find(p => p.id === projectId);
    if (!proj) return;

    lastFocusedElement = document.activeElement;

    // Populate modal contents
    document.getElementById('modal-num').textContent = proj.number;
    document.getElementById('modal-badge').textContent = proj.badge;
    document.getElementById('modal-title').textContent = proj.title;
    document.getElementById('modal-subtitle').textContent = proj.subtitle;
    document.getElementById('modal-overview').textContent = proj.overview;
    document.getElementById('modal-problem').textContent = proj.problem;
    document.getElementById('modal-solution').textContent = proj.solution;

    // Tech badges
    const techContainer = document.getElementById('modal-tech-list');
    if (techContainer) {
      techContainer.innerHTML = proj.technologies.map(t => `<span class="modal-tech-pill">${t}</span>`).join('');
    }

    // Architecture diagram box
    const archContainer = document.getElementById('modal-arch-box');
    if (archContainer && proj.architecture) {
      archContainer.innerHTML = `
        <div class="arch-flow">
          <div class="arch-step">
            <span class="arch-label">INGESTION</span>
            <span class="arch-val">${proj.architecture.input}</span>
          </div>
          <div class="arch-arrow">→</div>
          <div class="arch-step">
            <span class="arch-label">PIPELINE CORE</span>
            <span class="arch-val">${proj.architecture.pipeline}</span>
          </div>
          <div class="arch-arrow">→</div>
          <div class="arch-step">
            <span class="arch-label">OUTPUT & STORAGE</span>
            <span class="arch-val">${proj.architecture.storage}</span>
          </div>
        </div>
      `;
    }

    // Metrics grid
    const metricsContainer = document.getElementById('modal-metrics-grid');
    if (metricsContainer && proj.metrics) {
      metricsContainer.innerHTML = proj.metrics.map(m => `
        <div class="modal-metric-card">
          <span class="metric-val">${m.value}</span>
          <span class="metric-lbl">${m.label}</span>
        </div>
      `).join('');
    }

    // Action links
    const githubLink = document.getElementById('modal-github-link');
    if (githubLink) {
      githubLink.href = proj.github || 'https://github.com/DeHaad';
    }

    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');

    const closeBtn = document.getElementById('modal-close-btn');
    closeBtn?.focus();

    if (window.AppAudio) window.AppAudio.playClick(1600, 'triangle', 0.04);
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }

    if (window.AppAudio) window.AppAudio.playClick(1100, 'sine', 0.03);
  }

  /* ==========================================================================
     5. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ========================================================================== */
  function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      document.querySelectorAll('.reveal-on-scroll, .section-heading-wrap, .about-card, .lab-card, .skill-group, .timeline-item').forEach(el => {
        revealObserver.observe(el);
      });
    } else {
      // Fallback
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));
    }
  }

  /* ==========================================================================
     6. STATS COUNTER ANIMATION
     ========================================================================== */
  function initStatsCounter() {
    const statElements = document.querySelectorAll('.stat-number');
    if (!statElements.length) return;

    if ('IntersectionObserver' in window) {
      const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const targetNum = parseInt(el.getAttribute('data-target') || '0', 10);
            const suffix = el.getAttribute('data-suffix') || '';
            animateNumber(el, targetNum, suffix);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });

      statElements.forEach(el => statsObserver.observe(el));
    }
  }

  function animateNumber(element, target, suffix) {
    let current = 0;
    const duration = 1200;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = (target < 10 ? '0' : '') + target + suffix;
        clearInterval(timer);
      } else {
        const rounded = Math.floor(current);
        element.textContent = (rounded < 10 ? '0' : '') + rounded + suffix;
      }
    }, stepTime);
  }

  /* ==========================================================================
     7. 1-CLICK EMAIL COPY TOOL
     ========================================================================== */
  function initCopyEmail() {
    const copyBtn = document.getElementById('copy-email-btn');
    const emailStr = 'junaydullayev06@gmail.com';

    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailStr);
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span style="color: #38bdf8;">COPIED TO CLIPBOARD</span>
        `;
        if (window.AppAudio) window.AppAudio.playClick(2000, 'sine', 0.05);

        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2400);
      } catch (err) {
        // Fallback to mailto
        window.location.href = `mailto:${emailStr}`;
      }
    });
  }

  /* ==========================================================================
     8. TECH SKILLS INTERACTION
     ========================================================================== */
  function initTechFilter() {
    const skillPills = document.querySelectorAll('.skill-pill');
    skillPills.forEach(pill => {
      pill.addEventListener('mouseenter', () => {
        skillPills.forEach(p => {
          if (p !== pill) p.style.opacity = '0.55';
        });
      });
      pill.addEventListener('mouseleave', () => {
        skillPills.forEach(p => (p.style.opacity = '1'));
      });
    });
  }

  // Expose modal trigger globally
  window.openProjectModal = openProjectModal;
})();
