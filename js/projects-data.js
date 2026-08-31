/**
 * PORTFOLIO PROJECT DATA
 * Ali Akbar Junaydullayev — Digital Economy × Software × AI
 * Real verified projects and technical architecture details.
 */

const PROJECTS_DATA = [
  {
    id: "crosspostbot",
    number: "01",
    featured: true,
    title: "CROSSPOSTBOT",
    badge: "FLAGSHIP AUTOMATION",
    subtitle: "Multi-Platform Social Media & Video Distribution Automation Engine",
    category: "automation",
    categoryLabel: "Cloud & Automation",
    shortDescription: "Automates the complete journey of media content from a single Telegram upload directly to YouTube Shorts, Instagram Reels, and TikTok via authenticated official APIs and AWS S3 storage.",
    overview: "CrosspostBot solves the friction of multi-platform video distribution. Content creators and media teams typically spend hours manually uploading, titling, tagging, and scheduling videos across different platforms with divergent format requirements. CrosspostBot creates an autonomous pipeline where a single video upload to a private Telegram bot triggers an async pipeline that processes metadata, stores master files on AWS S3, securely handles OAuth 2.0 refresh tokens, and publishes content simultaneously to YouTube, Instagram, and TikTok.",
    problem: "Distributing short-form video across YouTube Shorts, Instagram Reels, and TikTok requires navigating strict rate limits, differing OAuth authorization models, varying aspect ratio requirements, and tedious repetitive manual workflows.",
    solution: "A high-concurrency FastAPI & Python asynchronous backend paired with a Telegram Bot interface, AWS S3 object storage, Celery/asyncio background task workers, and OAuth 2.0 token management vault for resilient, zero-friction multi-platform publishing.",
    technologies: [
      "Python",
      "FastAPI",
      "Telegram Bot API",
      "YouTube Data API v3",
      "Instagram Graph API",
      "TikTok Content API",
      "AWS S3",
      "OAuth 2.0",
      "Asyncio",
      "Docker"
    ],
    architecture: {
      input: "Telegram Bot (Video & Metadata Ingestion)",
      pipeline: "FastAPI Async Worker + Metadata Parser + S3 Master Staging",
      distribution: [
        "YouTube Data API (Shorts Publication)",
        "Instagram Graph API (Reels Container & Publish)",
        "TikTok Content API (Direct Video Post)"
      ],
      storage: "AWS S3 Cloud Bucket + SQLite/PostgreSQL Token Vault"
    },
    metrics: [
      { label: "Publishing Channels", value: "3+ Platforms" },
      { label: "Workflow Efficiency", value: "85% Time Saved" },
      { label: "Architecture", value: "Async Microservice" },
      { label: "Status", value: "Active Development" }
    ],
    github: "https://github.com/DeHaad",
    demo: "#featured-project"
  },
  {
    id: "certlingo",
    number: "02",
    featured: false,
    title: "CERTLINGO (EDUTEST)",
    badge: "FULL-STACK / AI PLATFORM",
    subtitle: "AI-Powered International Language Certification & Telc Exam Suite",
    category: "fullstack-ai",
    categoryLabel: "Full-Stack & AI",
    shortDescription: "Interactive web platform and Telegram Mini App for Telc B1/B2 German exam preparation featuring automated AI evaluation, real-time testing, leaderboards, and dual-mode auth.",
    overview: "CertLingo (EduTest) is an end-to-end educational platform designed for students preparing for international German language certificates (Telc B1 and B2). It unifies a high-performance Next.js 14 web application and a Telegram Mini App under a single PostgreSQL & Prisma ORM backend. The system features an AI automated evaluation engine that grades student writing and speaking responses according to European CEFR standards, with freemium rate-limiting and redis caching.",
    problem: "Standard language testing tools lack realistic simulation of official Telc exam conditions and cannot offer immediate, individualized grading for written exercises without expensive human tutors.",
    solution: "Engineered a Next.js 14 App Router application integrated with OpenAI GPT evaluation models, Prisma ORM on PostgreSQL, Redis caching for fast quiz state queries, and multi-language support (Uzbek, Russian, German, English) with instant Telegram Mini App auth.",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma ORM",
      "OpenAI API",
      "Redis",
      "Telegram Mini App SDK",
      "JWT Auth"
    ],
    architecture: {
      input: "Web Browser + Telegram Mini App (initData)",
      pipeline: "Next.js App Router API + Prisma Data Layer + Redis Cache",
      distribution: [
        "AI Exam Evaluator (CEFR Standard)",
        "Automated Quiz Engine",
        "Global Leaderboard & Attempt Tracker"
      ],
      storage: "PostgreSQL Database + Docker Compose"
    },
    metrics: [
      { label: "Target Levels", value: "Telc B1 / B2" },
      { label: "AI Evaluation", value: "Real-time CEFR" },
      { label: "Interface", value: "Web + Telegram Mini App" },
      { label: "Languages", value: "UZ / RU / EN / DE" }
    ],
    github: "https://github.com/DeHaad",
    demo: null
  },
  {
    id: "deutschlab",
    number: "03",
    featured: false,
    title: "DEUTSCHLAB & UZDEBOT",
    badge: "TELEGRAM ECOSYSTEM",
    subtitle: "Telegram Bot & Async Backend for Telc B1 German Vocabulary & Testing",
    category: "telegram",
    categoryLabel: "Telegram & Python",
    shortDescription: "High-throughput Telegram bot and asynchronous backend with full Telc B1 vocabulary databases, timed quizzes, student progress tracking, and administrative dashboard.",
    overview: "DeutschLab (UzDeBot) is a dedicated learning bot built using aiogram 3.x and FastAPI with aiosqlite asynchronous database engine. It delivers specialized German-Uzbek vocabulary drills, grammar quizzes, timed examination simulations, and user performance analytics. It includes a password-hashed super-admin dashboard for question management and real-time database imports.",
    problem: "Students need accessible, lightweight mobile study tools that fit into everyday chat habits without requiring heavy standalone app downloads or high internet bandwidth.",
    solution: "Created an ultra-fast async Telegram bot powered by aiogram 3.7 and aiosqlite, with JWT-secured admin APIs, comprehensive Telc B1 vocabulary models, and interactive inline keyboards for seamless mobile practice.",
    technologies: [
      "Python 3",
      "aiogram 3.7",
      "FastAPI",
      "aiosqlite / SQLite",
      "bcrypt & PyJWT",
      "Uvicorn",
      "Telegram WebApp"
    ],
    architecture: {
      input: "Telegram User Chat Events & Inline Queries",
      pipeline: "aiogram 3 Router + Async Quiz State Machine",
      distribution: [
        "Interactive Vocabulary Flashcards",
        "Telc Simulation Quizzes",
        "Admin REST API"
      ],
      storage: "aiosqlite Database (telc_b1.db)"
    },
    metrics: [
      { label: "Vocabulary Base", value: "1,000+ Verified Words" },
      { label: "Response Time", value: "< 80ms Async" },
      { label: "Framework", value: "aiogram 3.7" },
      { label: "Admin Auth", value: "bcrypt + JWT" }
    ],
    github: "https://github.com/DeHaad",
    demo: null
  },
  {
    id: "ai-experiments",
    number: "04",
    featured: false,
    title: "AI CINEMATIC & VIDEO EXPERIMENTS",
    badge: "CREATIVE AI LAB",
    subtitle: "Generative AI Video Pipelines, Shaders & Visual Motion Studies",
    category: "experiments",
    categoryLabel: "AI & Creative Lab",
    shortDescription: "Explorations in generative video workflows, neural style synthesis, WebGL optical crystal shaders, and interactive audio-reactive visual interfaces.",
    overview: "An ongoing creative laboratory blending generative AI tools (ComfyUI, Stable Diffusion, Runway, Midjourney) with procedural WebGL shaders and audio-reactive canvas mathematics. Focuses on luxury cinematic aesthetics, optical-glass reflections, fluid physics, and editorial motion design for future digital interfaces.",
    problem: "Most AI media workflows result in disjointed, uncurated imagery without consistent art direction, cohesive lighting, or real-time interactive responsiveness.",
    solution: "Formulated custom multi-stage generative pipelines combining targeted prompting, controlnet consistency, Three.js chromatic dispersion shaders, and Web Audio API reactive synthesis.",
    technologies: [
      "Generative AI Video",
      "Three.js / WebGL",
      "GLSL Shaders",
      "HTML5 Canvas 2D",
      "Web Audio API",
      "ComfyUI Workflows"
    ],
    architecture: {
      input: "Audio Spectrum / Mouse Physics / Generative Prompts",
      pipeline: "Parametric Geometry Engine + Fragment Dispersion Shader",
      distribution: [
        "Real-time 60fps Glass Crystal Simulation",
        "Dynamic Ambient Orbital Lighting",
        "Interactive Energy Orb Canvas"
      ],
      storage: "Client-side GPU Hardware Accelerated"
    },
    metrics: [
      { label: "Rendering", value: "60 FPS WebGL / GPU" },
      { label: "Aesthetic", value: "Sapphire & Amethyst Glass" },
      { label: "Lighting", value: "Dynamic Orbital Shaders" },
      { label: "Interaction", value: "Mouse & Audio Reactive" }
    ],
    github: "https://github.com/DeHaad",
    demo: "#lab"
  },
  {
    id: "automation-suite",
    number: "05",
    featured: false,
    title: "AUTOMATION & INTEGRATION SUITE",
    badge: "SYSTEMS ARCHITECTURE",
    subtitle: "Cloud Schedulers, Web Scraping Engines & High-Reliability Webhook Services",
    category: "automation",
    categoryLabel: "Cloud & Automation",
    shortDescription: "Custom background schedulers, automated data extractors, multi-tenant webhook listeners, and resilient microservices deployed with Docker and AWS.",
    overview: "A portfolio of specialized backend automation tools designed to eliminate manual data entry, automate cross-service synchronization, and process real-time events. Includes custom scrapers with anti-detection headers, background cron workers, and unified REST endpoints.",
    problem: "Disparate business tools, social platforms, and databases frequently lack native integrations, resulting in manual data transfer and error-prone administrative overhead.",
    solution: "Engineered modular Python & FastAPI automation microservices equipped with error retry queues, structured JSON logging, secure secrets management, and automated health checks.",
    technologies: [
      "Python 3",
      "FastAPI",
      "Docker",
      "AWS EC2 / S3",
      "Webhooks",
      "BeautifulSoup / Scrapy",
      "REST APIs",
      "PostgreSQL"
    ],
    architecture: {
      input: "Scheduled Cron Triggers / Incoming Webhooks",
      pipeline: "FastAPI Processing Core + Data Sanitizer + Rate Limiter",
      distribution: [
        "Automated Cloud Sync",
        "Alert Notification Webhooks",
        "Structured Data Exports"
      ],
      storage: "PostgreSQL Database + Cloud S3 Logs"
    },
    metrics: [
      { label: "Uptime Reliability", value: "99.9% Monitored" },
      { label: "Data Pipeline", value: "Zero-Loss Retry Queue" },
      { label: "Architecture", value: "Modular Microservices" },
      { label: "Deployment", value: "Docker / Linux" }
    ],
    github: "https://github.com/DeHaad",
    demo: null
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS_DATA };
}
