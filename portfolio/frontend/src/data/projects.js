export const projects = [
  {
    id: 1,
    slug: 'autonomous-algo-trading',
    number: '01',
    title: 'Autonomous Indian Algo Trading System',
    badge: 'In Progress',
    tagline:
      'A fully autonomous Zerodha-connected trading engine — real-time feeds, 50+ indicators, deep news sentiment, and intraday execution without supervision.',
    challenge:
      'Manual intraday trading is slow, emotionally biased, and impossible to run across dozens of stocks simultaneously. Retail traders need institutional-grade analysis — live price feeds, technical depth, news sentiment, and order-book data — fused into one autonomous system they can actually trust.',
    solution:
      'Built a Spring Boot engine that streams live Zerodha Kite data, runs 50+ technical indicators, ingests news with sentiment scoring and clickable source timestamps, analyses order-book volume, and executes customizable strategies autonomously. Paper-trading mode for safe validation, historical backtesting for strategy tuning, a React dashboard for P&L tracking and dynamic watchlists, and auto token refresh so it runs without babysitting.',
    challengeDetails: [
      'Live market data arrives at millisecond cadence — any processing delay means missed entries and stale signals.',
      'Retail-grade tooling exposes either price OR news OR technicals — never all three fused into one decision loop.',
      'Zerodha session tokens expire daily, meaning most automation breaks at 8:30 AM market open without manual re-login.',
      'Strategy tuning requires historical replay — and naïve backtests leak information, producing unrealistically optimistic results.',
    ],
    solutionDetails: [
      'Adopted a streaming architecture — Kite WebSocket feeds push tick data into an in-memory ring buffer consumed by an indicator pipeline; latency stays sub-100ms end-to-end.',
      'Unified the decision layer: each stock maintains a fused feature vector combining technical indicators, news sentiment score, order-book imbalance, and recent price action.',
      'Implemented a token auto-refresh service that runs pre-market, handles TOTP flow, and writes a fresh session — 24/7 uptime without intervention.',
      'Built a deterministic historical replay engine using walk-forward validation; separate paper-trade environment lets strategies run on live data without capital risk.',
      'React dashboard exposes live P&L, dynamic watchlists, and per-strategy attribution — so the human reviewer can sanity-check what the autonomous system is doing.',
    ],
    stack: ['Spring Boot', 'Java', 'React', 'Zerodha Kite API', 'WebSocket', 'PostgreSQL'],
    metrics: [
      { value: '50+', label: 'technical indicators' },
      { value: 'Live', label: 'Zerodha integration' },
      { value: '24/7', label: 'autonomous execution' },
    ],
    outcomes: [
      'Autonomous intraday execution across watchlist with zero manual intervention during trading hours.',
      'Fused signal model: technicals + sentiment + order-book data in one decision loop — rare even in institutional setups.',
      'Strategy backtesting framework that surfaces realistic P&L, drawdown, and trade frequency before deploying live capital.',
    ],
    duration: 'Ongoing (2025 – present)',
    role: 'Sole engineer — architecture, backend, frontend, ops.',
  },
  {
    id: 2,
    slug: 'spring-boot-transformation',
    number: '02',
    title: 'Spring Boot Transformation Services',
    badge: 'Banking · Multi-country',
    tagline:
      'Re-architected legacy IBM Integration Bus across France, Germany, and the UK. Rising Star nomination.',
    challenge:
      'Ageing IBM Integration Bus infrastructure was expensive, slow, and blocked modern API integrations across three European markets. Every new partner integration required months of specialist IIB work, and the operational cost was climbing year over year.',
    solution:
      'Re-architected the integration layer onto Spring Boot and Apache Camel with an API-first design. Migrated data flows incrementally — zero big-bang — with thorough regression testing against production traffic. Laid the foundation for the subsequent China Abacus and HUB Modernization workstreams.',
    challengeDetails: [
      'Production banking system — zero tolerance for data loss, every release needed full regulatory traceability.',
      'Legacy IIB flows had thin documentation; business logic lived in ESQL scripts understood by only a handful of engineers.',
      'Three European markets (FR, DE, UK) with market-specific routing rules and compliance variations needed unified treatment.',
      'Stakeholders were burned by past "big-bang" migrations — strong preference for incremental, provably-safe rollout.',
    ],
    solutionDetails: [
      'Reverse-engineered IIB flows into formal spec docs before writing a single line of Spring Boot — business-logic parity was non-negotiable.',
      'Apache Camel routes mirrored IIB message flows 1:1, giving operators a familiar mental model while modernising the runtime.',
      'Shadow-traffic validation: new service consumed production traffic in parallel for weeks, with diff reports on every response before cutover.',
      'Country-specific routing abstracted behind a strategy pattern — FR, DE, UK rules live in isolated modules, making new markets trivial to add.',
      'Incremental traffic shifting (1% → 10% → 50% → 100%) per endpoint, with automated rollback triggers on error-rate regression.',
    ],
    stack: ['Spring Boot', 'Apache Camel', 'Java', 'REST APIs', 'Docker'],
    metrics: [
      { value: '35%', label: 'annual cost reduction' },
      { value: '60%', label: 'faster processing' },
      { value: '10K+', label: 'daily transactions' },
      { value: '30%', label: 'better query perf' },
    ],
    outcomes: [
      '35% annual infra cost reduction by retiring IIB licenses — paid back the migration effort in under a year.',
      'Processing latency down 60%; P99 response time halved across all three markets.',
      'Rising Star nomination for leading the technical design and zero-incident rollout.',
      'Platform became the template for subsequent China Abacus and HUB Modernization projects.',
    ],
    duration: '2023 – 2024',
    role: 'Lead backend engineer — design, implementation, rollout coordination.',
  },
  {
    id: 3,
    slug: 'movie-booking-system',
    number: '03',
    title: 'Movie Booking Management System',
    badge: 'Full-Stack · Production',
    tagline:
      'End-to-end booking platform handling 1K+ daily transactions with rigorous validation and recoverable error flows.',
    challenge:
      'Existing booking flow had a high failure rate, inconsistent payment handling, and poor error messaging. Users abandoned at checkout, and support tickets were growing faster than bookings.',
    solution:
      'Designed a clean Spring Boot REST API covering booking, cancellation, seat-locking, and user management, paired with an Angular frontend that tightened the entire booking flow. Added a comprehensive validation layer and clear error states so failures became rare — and recoverable — rather than silent.',
    challengeDetails: [
      'Seat double-booking under concurrent load — two users could claim the same seat during payment finalization.',
      'Cryptic "transaction failed" errors with no guidance — users had no way to tell if payment succeeded or not, leading to duplicate support tickets.',
      'Cancellation logic bled into six different service methods, with inconsistent rules on refund eligibility.',
      'No observability — when bookings failed, engineers had to replay logs to reconstruct what happened.',
    ],
    solutionDetails: [
      'Optimistic seat-locking with a short TTL during the checkout window — releases automatically if payment does not complete, preventing orphaned holds.',
      'Typed error responses with recovery hints: every failure state tells the user exactly what to try next (retry, check email, contact support with reference ID).',
      'Consolidated cancellation into a single domain service with explicit policy rules, tested against 30+ scenario cases.',
      'Structured logging with correlation IDs — a single booking is traceable end-to-end across API, DB, and payment service.',
      'Angular frontend uses a finite-state-machine for the checkout flow, eliminating the "stuck on loading" bug class entirely.',
    ],
    stack: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'REST APIs'],
    metrics: [
      { value: '1K+', label: 'daily transactions' },
      { value: '+30%', label: 'booking-flow efficiency' },
      { value: '-25%', label: 'failure rate' },
    ],
    outcomes: [
      'Booking completion rate up 30% within the first month of launch.',
      'Failure-rate dropped 25%; support ticket volume followed it down.',
      'Zero seat-double-booking incidents post-rollout (previously ~5/week).',
    ],
    duration: '2022',
    role: 'Full-stack engineer — REST API, frontend, data model.',
  },
  {
    id: 4,
    slug: 'facial-sentiment-hospital',
    number: '04',
    title: 'Facial Sentiment Analysis for Hospital Monitoring',
    badge: 'ML · Published Research',
    tagline:
      'Real-time CNN-based emotion recognition monitoring 50+ patients daily. 85% accuracy, published paper.',
    challenge:
      'Subjective, manual patient-sentiment assessment does not scale and is often missed during busy shifts. Care teams needed objective, continuous emotional-state monitoring without adding paperwork or compromising privacy.',
    solution:
      'Built a real-time facial emotion recognition pipeline using YOLOv3 for face detection and a CNN classifier for emotion prediction. Validated on a 5K+ image dataset with privacy-compliant handling, and published the methodology and results in a peer-reviewed paper.',
    challengeDetails: [
      'Hospital lighting varies wildly across wards and shifts — models trained on curated datasets collapse under real conditions.',
      'Patient privacy — raw video cannot leave the device, so inference must run locally on modest hardware.',
      'Emotion labels are inherently ambiguous; rigorous validation required human-rater agreement as a baseline.',
      'Peer-reviewed publication meant every methodology decision needed defensible justification and reproducibility.',
    ],
    solutionDetails: [
      'Two-stage pipeline: YOLOv3 detects and crops faces first, feeding a smaller CNN downstream — faster and more accurate than end-to-end.',
      'Aggressive augmentation (brightness, contrast, perspective) in training simulated hospital lighting variance, closing the real-world accuracy gap.',
      'Edge deployment — inference runs locally on ward hardware, only aggregated emotion-state summaries cross the network, preserving raw-video privacy.',
      'Rigorous evaluation against inter-rater agreement benchmarks; published methodology with full hyperparameter and dataset-prep details for reproducibility.',
    ],
    stack: ['Python', 'YOLOv3', 'CNN', 'TensorFlow', 'OpenCV'],
    metrics: [
      { value: '85%', label: 'accuracy on 5K+ images' },
      { value: '50+', label: 'patients monitored daily' },
      { value: '+20%', label: 'diagnostic accuracy' },
      { value: '-15%', label: 'misclassifications' },
    ],
    outcomes: [
      '85% accuracy on a 5K+ image validation set under realistic ward lighting conditions.',
      'Deployed across wards monitoring 50+ patients daily without adding paperwork.',
      'Peer-reviewed publication — methodology is now a reference point for subsequent hospital-ML studies.',
      '20% improvement in diagnostic agreement between clinical teams using the tool.',
    ],
    duration: '2021 – 2022',
    role: 'ML engineer — data pipeline, model training, paper lead author.',
  },
]
