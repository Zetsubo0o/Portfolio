import {
  FiLayers,
  FiZap,
  FiCpu,
  FiServer,
  FiMonitor,
  FiTool,
} from 'react-icons/fi'

export const services = [
  {
    id: 'saas',
    slug: 'custom-saas-applications',
    title: 'Custom SaaS Applications',
    tagline: 'From idea to production-ready SaaS product',
    description:
      'Full-stack SaaS built on Spring Boot + React with multi-tenant architecture. Role-based access, real-time dashboards, and infrastructure designed to handle growth from day one.',
    icon: FiLayers,
    whatsIncluded: [
      'Multi-tenant architecture with data isolation',
      'Interactive dashboards with real-time data',
      'Authentication & role-based access control',
      'Responsive, mobile-first UI',
      'REST API design & third-party integrations',
      'Database schema design & query optimization',
    ],
    plainBenefits: [
      { title: 'Your own web app, live and working', example: 'Like having your own Notion or Trello — but built around exactly how your business works, not someone else\'s template.' },
      { title: 'Each customer sees only their own data', example: 'If you run a coaching business, Client A sees their progress dashboard and Client B sees theirs — fully separate, fully private.' },
      { title: 'Your team logs in with different permissions', example: 'Your admin sees everything, your sales team sees leads, your support team sees tickets — everyone gets exactly the access they need.' },
      { title: 'Works on phones, tablets, and desktops', example: 'Your clients can check their dashboard from their phone at lunch or their laptop at the office — it just works everywhere.' },
    ],
    techStack: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker', 'JWT'],
    startingAt: '$4,500',
    timeline: '4–10 weeks',
    idealFor: [
      'Founders validating a new B2B product',
      'Teams replacing spreadsheet-driven internal tools',
      'Agencies that need a dependable engineering partner',
    ],
    outcomes: [
      'A production-deployed SaaS with CI/CD, monitoring, and docs',
      'Clear technical foundation you can hand to an in-house team',
      'Auth, billing-ready integrations, and tenant-aware data layer',
    ],
    faqs: [
      {
        q: 'Do you handle design too?',
        a: 'Yes. I work with a clean, modern design language and can adapt to your brand. If you have a designer already, I happily implement from Figma.',
      },
      {
        q: 'What about hosting and deployments?',
        a: 'I set everything up on your preferred cloud (AWS, GCP, DigitalOcean, Vercel, Render). You own the infrastructure — no lock-in.',
      },
      {
        q: 'Can you add Stripe billing?',
        a: 'Absolutely. Stripe subscriptions, usage-based billing, and webhooks are all part of the engagement if you need them.',
      },
    ],
  },
  {
    id: 'automation',
    slug: 'workflow-automation',
    title: 'Workflow Automation',
    tagline: 'Eliminate manual work, save 20+ hours a week',
    description:
      'Enterprise-grade automation that connects your systems and removes repetitive work. Event-driven pipelines with Apache Camel, Spring Batch, and message brokers — the same patterns that route 10K+ daily transactions in banking.',
    icon: FiZap,
    whatsIncluded: [
      'Business process automation end-to-end',
      'Multi-step workflow design & implementation',
      'CRM & ERP integrations via REST APIs',
      'Data sync across disparate platforms',
      'Retry logic, dead-letter queues, monitoring',
      'Documentation & operational runbooks',
    ],
    plainBenefits: [
      { title: 'Stop copy-pasting between apps', example: 'When a new lead fills out your form, it automatically appears in your CRM, sends a welcome email, and creates a task for your sales team — no one has to touch it.' },
      { title: 'Reports that build themselves', example: 'Instead of spending Friday afternoons pulling numbers from five different tools, get a single report delivered to your inbox every Monday morning.' },
      { title: 'Nothing falls through the cracks', example: 'If an invoice isn\'t paid after 7 days, the system sends a reminder. If a task is overdue, it flags your team. No more "I forgot to follow up."' },
      { title: 'Your tools finally talk to each other', example: 'Your Shopify orders, QuickBooks invoices, and Slack notifications all stay in sync — automatically, in real time.' },
    ],
    techStack: ['Apache Camel', 'Spring Boot', 'Kafka', 'RabbitMQ', 'REST APIs'],
    startingAt: '$2,500',
    timeline: '2–6 weeks',
    idealFor: [
      'Ops teams drowning in manual data entry',
      'Agencies passing data between tools (HubSpot, Salesforce, Notion)',
      'Companies with brittle Zapier / Make setups hitting their limits',
    ],
    outcomes: [
      'Reliable, observable pipelines replacing spreadsheets and scripts',
      'Hours of weekly manual work moved to auto-execution',
      'Retry + alerting so failures are visible, not silent',
    ],
    faqs: [
      {
        q: 'Is this just Zapier with extra steps?',
        a: 'No. Zapier is great for small, linear flows. I build durable, versioned, monitorable pipelines that survive schema changes, rate limits, and partial failures.',
      },
      {
        q: 'Can you integrate with internal APIs?',
        a: 'Yes. Any REST, GraphQL, SOAP, database, or message-queue endpoint is fair game. Auth is handled properly, with secrets managed outside of source control.',
      },
      {
        q: 'What happens when something breaks?',
        a: 'Every workflow ships with logging, retries, and optional alerting (Slack, email, PagerDuty). You see failures; they do not sit silent for a week.',
      },
    ],
  },
  {
    id: 'ai',
    slug: 'ai-powered-features',
    title: 'AI-Powered Features',
    tagline: 'Add intelligent capabilities to your existing product',
    description:
      'Practical AI that solves real business problems. I have shipped CNN-based ML in healthcare and integrate LLMs into backend services — sentiment analysis, smart search, recommendations, and automated content workflows.',
    icon: FiCpu,
    whatsIncluded: [
      'Feature scoping & architecture design',
      'LLM integration (OpenAI, Anthropic, local models)',
      'Intelligent search & recommendation engines',
      'AI-powered content generation pipelines',
      'Custom chatbots & internal assistants',
      'ML model deployment & monitoring',
    ],
    plainBenefits: [
      { title: 'A smart assistant that knows your business', example: 'Your customers type a question and get an accurate answer pulled from your own docs, policies, and knowledge base — not a generic chatbot response.' },
      { title: 'Search that actually understands what people mean', example: 'A customer searches "something to keep my coffee hot" and finds your travel mug — even though the product name never mentions "coffee" or "hot."' },
      { title: '"You might also like" that actually works', example: 'After someone buys a camera, your site suggests the right lens, bag, and memory card — like having a knowledgeable salesperson for every visitor.' },
      { title: 'Content that writes itself (with your voice)', example: 'Product descriptions, email drafts, or support replies generated automatically in your brand\'s tone — you just review and hit send.' },
    ],
    techStack: ['Python', 'OpenAI API', 'CNN / YOLO', 'Spring Boot', 'Vector DB'],
    startingAt: '$3,500',
    timeline: '3–8 weeks',
    idealFor: [
      'Products that want a smart search or recommendations layer',
      'Teams adding an internal assistant over their own docs',
      'Companies with ML ideas but no one to productionize them',
    ],
    outcomes: [
      'Working AI feature integrated into your existing product',
      'Evaluation harness so quality is measurable, not vibes',
      'Cost-aware deployment — private or API, whichever suits',
    ],
    faqs: [
      {
        q: 'OpenAI or self-hosted?',
        a: 'Both are on the table. I recommend based on latency, cost, privacy requirements, and how deep the integration needs to go.',
      },
      {
        q: 'Do you fine-tune models?',
        a: 'For the right use case, yes. Most business problems do not need fine-tuning — RAG + good prompts often wins. I will tell you honestly which camp you are in.',
      },
      {
        q: 'What about hallucinations?',
        a: 'We design with guardrails: grounded retrieval, structured outputs, confidence thresholds, and human-in-the-loop where correctness matters.',
      },
    ],
  },
  {
    id: 'backend',
    slug: 'backend-and-api-development',
    title: 'Backend & API Development',
    tagline: 'Robust backends your frontend team can rely on',
    description:
      'Scalable Spring Boot backends built for the long haul. Clean REST APIs, thoughtful database architecture, and the observability to debug production at 3 a.m. — the same way I do it for a 99.9%-uptime banking platform.',
    icon: FiServer,
    whatsIncluded: [
      'RESTful API design & implementation',
      'Database architecture & query optimization',
      'Authentication, authorization, security hardening',
      'Third-party API integrations',
      'Performance profiling & caching strategy',
      'Comprehensive API documentation (OpenAPI)',
    ],
    plainBenefits: [
      { title: 'Your app works fast and never loses data', example: 'When a user hits "Save," it actually saves — instantly, reliably, every time. No spinning wheels, no mysterious errors.' },
      { title: 'Your mobile app and website share the same brain', example: 'Update a price in one place and it shows up everywhere — your iOS app, Android app, website, and admin panel all stay perfectly in sync.' },
      { title: 'It handles growth without breaking', example: 'Whether you have 100 users today or 100,000 next year, the system is built to scale smoothly — no emergency rewrites when you get featured on Product Hunt.' },
      { title: 'You can connect anything to it later', example: 'Want to add Stripe payments next month? Or connect to Mailchimp? The backend is built with clean connection points so new features plug in easily.' },
    ],
    techStack: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Swagger / OpenAPI'],
    startingAt: '$3,000',
    timeline: '3–8 weeks',
    idealFor: [
      'Mobile or web teams needing a reliable API partner',
      'Startups upgrading from MVP stacks to production-ready infra',
      'Companies outgrowing Firebase / no-code backends',
    ],
    outcomes: [
      'Documented, versioned API your frontend can actually trust',
      'Real observability — logs, metrics, traces — for fast debugging',
      'Performance budget met under realistic load testing',
    ],
    faqs: [
      {
        q: 'Spring Boot only?',
        a: 'Primarily, because that is where I am fastest and safest. For smaller projects or specific constraints I also work in Node.js or Python.',
      },
      {
        q: 'Do you write tests?',
        a: 'Always. Unit, integration, and contract tests where appropriate. If you already have a test culture, I match it; if not, I bring a sensible baseline.',
      },
      {
        q: 'Can you join an existing codebase?',
        a: 'Yes. I start with a full review, document what is there, and work within your conventions rather than fighting them.',
      },
    ],
  },
  {
    id: 'landing',
    slug: 'landing-pages',
    title: 'Landing Pages',
    tagline: 'High-converting landing pages that look sharp and load fast',
    description:
      'Pixel-perfect, fast-loading landing pages built with modern React + Tailwind. Designed to convert — clean copy, clear CTAs, SEO-ready, and deployed to a CDN with full mobile responsiveness on day one.',
    icon: FiMonitor,
    whatsIncluded: [
      'Custom design tailored to your brand',
      'Mobile-first, fully responsive layouts',
      'SEO metadata, Open Graph, sitemap',
      'Performance-tuned (Lighthouse 95+ target)',
      'Contact forms & analytics integration',
      'Deployment to Vercel / Netlify / your host',
    ],
    plainBenefits: [
      { title: 'A page that makes people want to buy', example: 'Visitors land on your page, immediately understand what you offer, and click "Get Started" — instead of bouncing after 3 seconds because the page looks cheap.' },
      { title: 'Shows up on Google', example: 'When someone searches "best yoga studio in Brooklyn," your page actually has a chance of appearing — not buried on page 10 because of poor SEO.' },
      { title: 'Loads in under 2 seconds', example: 'No one waits for a slow website. Your page loads almost instantly — even on a phone with spotty 4G at a coffee shop.' },
      { title: 'You own it completely', example: 'No $30/month Squarespace bill, no Wix watermarks. The code is yours, hosted wherever you want, and you can change it anytime.' },
    ],
    techStack: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Vercel'],
    startingAt: '$600',
    timeline: '1–2 weeks',
    idealFor: [
      'Founders launching a product or pre-sale page',
      'Freelancers and consultants who need a polished portfolio',
      'Small businesses tired of clunky template-based sites',
    ],
    outcomes: [
      'A crisp, fast, mobile-ready landing page live on your domain',
      'Clear CTA funnel wired into email or CRM',
      'Ownership of the code — no proprietary builder lock-in',
    ],
    faqs: [
      {
        q: 'Can you work from my existing branding?',
        a: 'Yes — Figma, PDF brand guide, or a handful of reference sites all work. I will adapt to what you have.',
      },
      {
        q: 'Do you include hosting?',
        a: 'I deploy on your preferred host (Vercel, Netlify, Cloudflare Pages). You own the account — no lock-in.',
      },
      {
        q: 'Can I edit copy myself later?',
        a: 'Yes. I can wire up a lightweight CMS (Sanity, Contentful, or markdown) if you want to update text without touching code.',
      },
    ],
  },
  {
    id: 'custom',
    slug: 'custom-builds',
    title: 'Custom Builds',
    tagline: "Have an idea? I'll turn it into working software.",
    description:
      "If it does not fit neatly into a category, bring it anyway. I take original ideas — internal tools, niche web apps, side-project MVPs — and turn them into working, well-built software tailored to exactly what you have in mind.",
    icon: FiTool,
    whatsIncluded: [
      'Deep scoping session to understand the idea',
      'Architecture & stack recommendation',
      'Custom frontend + backend implementation',
      'Database design suited to your data',
      'Deployment & handoff with documentation',
      'Iterative builds with weekly demos',
    ],
    plainBenefits: [
      { title: 'Your exact idea, built exactly how you want it', example: 'You sketch it on a napkin, explain it over a call, and get back working software that does precisely what you described — no compromises, no "use this workaround instead."' },
      { title: 'See progress every week, not just at the end', example: 'Every Friday you get a working demo you can click through and test. If something feels off, we adjust before it becomes expensive to change.' },
      { title: 'Simple enough for your team to use', example: 'Your operations team doesn\'t need a manual. The interface is clean, intuitive, and designed for the people who\'ll actually use it daily.' },
      { title: 'You can grow it later without starting over', example: 'Need to add a new feature in 6 months? The code is clean and documented so any developer (including me) can pick it up and extend it.' },
    ],
    techStack: ['React', 'Spring Boot', 'Node.js', 'Python', 'PostgreSQL', 'Docker'],
    startingAt: '$2,000',
    timeline: '2–10 weeks',
    idealFor: [
      'Founders with a unique idea and no clear category for it',
      'Teams needing a specific internal tool built from scratch',
      'Anyone who needs tailored software, not off-the-shelf',
    ],
    outcomes: [
      'Working software built around your exact requirements',
      'Clean, documented code you can take in-house later',
      'A partner who listens first and builds second',
    ],
    faqs: [
      {
        q: 'What if my idea is half-baked?',
        a: "That is fine — I will help you shape it. We will start with a scoping call to turn a rough idea into a buildable plan.",
      },
      {
        q: 'Will you sign an NDA?',
        a: 'Yes, mutual NDA on request before we get into specifics.',
      },
      {
        q: 'Can you keep it simple?',
        a: 'Absolutely. I favor the smallest stack that ships your idea well. No over-engineering.',
      },
    ],
  },
]

export const processSteps = [
  {
    step: '01',
    title: 'Free 15-min discovery call',
    description:
      'Tell me what you are trying to solve. I will tell you honestly whether I can help, roughly how much it costs, and how long it takes. No pitch, no obligation.',
  },
  {
    step: '02',
    title: 'Systems assessment',
    description:
      'Deep analysis of current workflows, architecture, and bottlenecks. I map exactly where engineering time, compute, and money are being lost — and where the leverage is.',
  },
  {
    step: '03',
    title: 'Fixed-price quote in 24 hours',
    description:
      'You get a detailed proposal: exact scope, fixed price, delivery timeline, and expected outcomes. You know what you pay before a single line of code is written.',
  },
  {
    step: '04',
    title: 'Build with weekly demos',
    description:
      'Iterative development with weekly updates, milestone demos, and full Git visibility. No black-box engineering — you see progress as it happens.',
  },
  {
    step: '05',
    title: 'Ship & support',
    description:
      'Deployment, monitoring, performance tuning, and an ongoing partnership if you want it. Your system grows with the business.',
  },
]

export const generalFaqs = [
  {
    q: 'How do we start?',
    a: 'Book a free 15-min discovery call. If it is a fit, I send a detailed proposal within 24 hours. If it is not, I tell you honestly and point you elsewhere.',
  },
  {
    q: 'What are your rates?',
    a: 'Rates depend on project scope, complexity, and engagement type — not a one-size list. I am competitive with senior freelance market rates and always transparent about where the number comes from. The cleanest path: book a free discovery call and I will send a live, tailored quote within 24 hours. No templates, no surprises.',
  },
  {
    q: 'How do you handle payments?',
    a: 'Everything runs on milestones — never a single upfront lump sum. A typical split is 25% to kick off, 2–3 milestone payments tied to concrete deliverables, and a final 15–20% due after handoff and sign-off. This keeps me accountable at every stage and keeps your risk low. Wise, Stripe, or direct bank transfer all work.',
  },
  {
    q: 'How do you handle communication?',
    a: 'Async-first, with weekly syncs on Google Meet or Zoom. Day-to-day on Slack, Discord, or email — whatever you prefer. You get a shared project board, weekly written updates, and demo links at every milestone. No guessing where things stand.',
  },
  {
    q: "What's your typical project process?",
    a: 'Discovery call → scoping and fixed-price quote → kickoff → milestone-based build with weekly demos → staging review → production deploy → post-launch support window. You review and sign off at each milestone before we move forward.',
  },
  {
    q: "What if I'm not satisfied with the work?",
    a: 'I build in milestones and checkpoints for exactly this reason. You review progress at every stage before we move on — if something is off, we iterate until it is right. I would rather rebuild a component than ship something you are not proud of.',
  },
  {
    q: 'Can you work with my existing team or codebase?',
    a: 'Yes. I start with a full review of what exists — architecture, conventions, tooling, tests — and document my findings before touching anything. I work inside your conventions instead of fighting them, and pair with your engineers when it speeds things up. No ego, no rewrite-for-the-sake-of-it.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes — happy to sign a mutual NDA before diving into specifics. Your product and business details stay confidential.',
  },
  {
    q: 'What time zone do you work in?',
    a: 'IST (UTC+5:30), with flexible overlap for US, EU, and APAC clients. I have shipped alongside teams in France, Germany, the UK, and the US — so async workflows and scheduled syncs are well-tuned.',
  },
]
