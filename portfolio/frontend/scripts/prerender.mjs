/**
 * Post-build prerender.
 *
 * Emits dist/<route>/index.html for every route with route-specific
 * <title>, meta description, canonical, Open Graph tags, JSON-LD and a
 * static content snapshot inside #root. Crawlers and social fetchers
 * that do not execute JavaScript see real, per-URL content; React
 * replaces the snapshot on mount for real visitors.
 *
 * Runs automatically after `vite build` (see "build" script).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = join(__dirname, '..', 'dist')
const SITE = 'https://pranavkumar.dev'

const { projects } = await import('../src/data/projects.js')
const { services, generalFaqs } = await import('../src/data/services.js')

const esc = (s = '') =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

// BreadcrumbList schema from [label, url] pairs — helps Google show the
// site hierarchy under each result instead of a bare URL.
const breadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: url,
  })),
})

const routes = [
  {
    path: '/',
    title: 'Pranav Kumar — Full-Stack Software Engineer & Freelance Developer',
    description:
      'Pranav Kumar is a freelance full-stack software engineer building production-grade backends, full-stack SaaS, and algorithmic trading systems. Spring Boot, React, microservices. Available for hire worldwide.',
    h1: 'Pranav Kumar — Full-Stack Software Engineer & Freelance Developer',
    body: 'Pranav Kumar is a freelance full-stack software engineer and consultant crafting scalable backends, production microservices, custom SaaS, and algorithmic trading systems for founders and global teams. Core stack: Java, Spring Boot, React, Node.js, Python, PostgreSQL, MySQL, Docker, and REST APIs. Available to hire for freelance and contract work across US, EU, and APAC timezones.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: generalFaqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  },
  {
    path: '/about',
    title: 'About — Pranav Kumar, Software Engineer & Freelance Consultant',
    description:
      'Full-stack engineer with a production-first mindset. Java, Spring Boot, React, and microservices experience across banking and SaaS systems.',
    h1: 'About Pranav Kumar',
    body: 'Full-stack engineer. Core stack: enterprise Java, Spring Boot, microservices, multi-country banking integrations. Outside of client work, I ship custom backends, landing pages, and full-stack products for founders.',
  },
  {
    path: '/services',
    title: 'Services — Pranav Kumar | SaaS, Backend, AI & Automation Development',
    description:
      'Freelance development services: custom SaaS applications, workflow automation, AI-powered features, backend & API development, and landing pages.',
    h1: 'Freelance software development services',
    body: services.map((s) => `${s.title}: ${s.tagline}`).join(' '),
  },
  {
    path: '/projects',
    title: 'Projects — Pranav Kumar | Case Studies with Real Outcomes',
    description:
      'Case studies of shipped projects: algorithmic trading systems, Spring Boot microservices transformations, booking platforms, and AI-powered applications.',
    h1: 'Selected projects and case studies',
    body: projects.map((p) => `${p.title}: ${p.tagline}`).join(' '),
  },
  {
    path: '/contact',
    title: 'Contact — Pranav Kumar | Book a Call or Send a Project Brief',
    description:
      'Get a quote within 24 hours. Book a call or send a brief for SaaS, backend, AI, or automation work. Available across US, EU, and APAC timezones.',
    h1: 'Contact Pranav Kumar',
    body: 'Send a project brief or book a 30-minute call. Replies within 24 hours. Working globally from IST (UTC+5:30).',
  },
  ...services.map((s) => ({
    path: `/services/${s.slug}`,
    title: `${s.title} — Pranav Kumar`,
    description: s.tagline,
    h1: s.title,
    body: s.description,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: s.title,
        description: s.tagline,
        url: `${SITE}/services/${s.slug}`,
        provider: { '@id': `${SITE}/#person` },
        areaServed: 'Worldwide',
      },
      breadcrumb([
        ['Home', `${SITE}/`],
        ['Services', `${SITE}/services`],
        [s.title, `${SITE}/services/${s.slug}`],
      ]),
    ],
  })),
  ...projects.map((p) => ({
    path: `/projects/${p.slug}`,
    title: `${p.title} — Case Study | Pranav Kumar`,
    description: p.tagline,
    h1: p.title,
    body: `${p.challenge} ${p.solution}`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: p.title,
        description: p.tagline,
        url: `${SITE}/projects/${p.slug}`,
        author: { '@id': `${SITE}/#person` },
      },
      breadcrumb([
        ['Home', `${SITE}/`],
        ['Projects', `${SITE}/projects`],
        [p.title, `${SITE}/projects/${p.slug}`],
      ]),
    ],
  })),
]

const navLinks = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/projects', 'Projects'],
  ['/contact', 'Contact'],
]

const template = readFileSync(join(dist, 'index.html'), 'utf8')

for (const r of routes) {
  const url = SITE + (r.path === '/' ? '/' : r.path)
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace(
      /(<meta name="description" content=")[^"]*(")/,
      `$1${esc(r.description)}$2`
    )
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(r.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(r.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(r.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(r.description)}$2`)

  if (r.jsonLd) {
    html = html.replace(
      '</head>',
      `<script type="application/ld+json">${JSON.stringify(r.jsonLd)}</script>\n</head>`
    )
  }

  // Static snapshot React replaces on mount; visible to non-JS crawlers.
  const snapshot = `<div style="max-width:56rem;margin:0 auto;padding:6rem 1.5rem;font-family:Inter,system-ui,sans-serif">
      <h1>${esc(r.h1)}</h1>
      <p>${esc(r.body)}</p>
      <nav>${navLinks.map(([href, label]) => `<a href="${href}" style="margin-right:1rem">${label}</a>`).join('')}</nav>
    </div>`
  html = html.replace('<div id="root"></div>', `<div id="root">${snapshot}</div>`)

  const outDir = r.path === '/' ? dist : join(dist, r.path.slice(1))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
}

// Regenerate sitemap.xml from the same route list so it never drifts, with a
// fresh <lastmod> so crawlers know the content was updated.
const today = new Date().toISOString().slice(0, 10)
const priorityFor = (p) => (p === '/' ? '1.0' : p.split('/').length > 2 ? '0.7' : '0.9')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url><loc>${SITE}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod><priority>${priorityFor(r.path)}</priority></url>`
  )
  .join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

console.log(`Prerendered ${routes.length} routes + sitemap into dist/`)
