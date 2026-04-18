import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight, FiChevronDown } from 'react-icons/fi'
import ProjectCard from '../components/ProjectCard'
import ServiceRow from '../components/ServiceRow'
import { projects } from '../data/projects'
import { services, processSteps, generalFaqs } from '../data/services'

const techSkills = [
  'Java · Spring Boot',
  'React · Tailwind',
  'Node.js',
  'Python',
  'MySQL · PostgreSQL',
  'Docker',
  'REST APIs',
  'Git · CI/CD',
]

export default function Home() {
  const featuredProjects = projects.slice(0, 2)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="pt-16">
      {/* ─── Hero (centered, tight) ─── */}
      <section className="relative min-h-[calc(100vh-8rem)] flex items-center overflow-hidden">
        {/* Central golden atmospheric glow — like the reference */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{
            height: '70%',
            background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(245,166,35,0.10) 0%, rgba(245,166,35,0.03) 55%, transparent 100%)',
          }}
        />
        <div className="pointer-events-none absolute -top-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-accent/8 blur-3xl" style={{ opacity: 0.5 }} />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-amber-500/5 blur-3xl" style={{ opacity: 0.4 }} />

        <div className="max-w-5xl mx-auto px-6 py-10 w-full relative flex flex-col items-center text-center">
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted">
              Available for freelance · Flexible US / EU / APAC hours
            </span>
          </motion.div>

          {/* Greeting eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.04 }}
            className="font-display italic text-accent text-xl md:text-2xl mb-3"
          >
            Hi, I'm Pranav —
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="font-display text-heading leading-[0.98] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', fontWeight: 500 }}
          >
            Software engineer
            <br />
            who ships production
            <br />
            <span className="text-gradient italic">built to scale.</span>
          </motion.h1>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.12 }}
            className="mt-6 max-w-2xl text-base md:text-lg text-body leading-relaxed"
          >
            A full-stack engineer crafting scalable backends, production microservices, and custom software for global teams — built with care, shipped on time.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.16 }}
            className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/projects" className="btn-primary justify-center">
              View selected work
              <FiArrowRight />
            </Link>
            <Link to="/contact" className="btn-secondary justify-center">
              Book a call
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Technical skills marquee strip ─── */}
      <section className="border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-center gap-x-10 gap-y-3 flex-wrap text-xs uppercase tracking-[0.25em] text-muted">
          <span className="text-accent/70">✦ Stack</span>
          {techSkills.map((c) => (
            <span key={c} className="hover:text-accent transition-colors">
              {c}
            </span>
          ))}
          <span className="text-accent/70">✦</span>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="section-container">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
              01 — Services
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-heading leading-tight max-w-2xl" style={{ fontWeight: 500 }}>
              What I can <span className="text-gradient italic">build</span> for you.
            </h2>
          </div>
          <Link
            to="/services"
            className="group flex items-center gap-2 text-sm font-medium text-body hover:text-accent transition-colors"
          >
            All services
            <FiArrowUpRight className="group-hover:rotate-45 transition-transform" />
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ─── Selected Work ─── */}
      <section className="section-container">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
              02 — Selected Work
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-heading leading-tight" style={{ fontWeight: 500 }}>
              Recent <span className="text-gradient italic">projects.</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="group flex items-center gap-2 text-sm font-medium text-body hover:text-accent transition-colors"
          >
            View all projects
            <FiArrowUpRight className="group-hover:rotate-45 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* ─── Process (5-step) ─── */}
      <section className="section-container">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
            03 — How I work
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-heading leading-tight" style={{ fontWeight: 500 }}>
            A five-step process, <span className="text-gradient italic">no surprises.</span>
          </h2>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-3 items-stretch">
          {processSteps.map((step, i) => (
            <React.Fragment key={step.step}>
              <div className="rounded-btn border border-white/8 bg-transparent hover:border-accent/25 transition-colors p-5 flex flex-col flex-1 min-w-0">
                <div className="font-display text-3xl text-white/20 mb-4 leading-none" style={{ fontWeight: 500 }}>
                  {step.step}
                </div>
                <h3 className="font-display text-base text-heading mb-2 leading-tight" style={{ fontWeight: 500 }}>
                  {step.title}
                </h3>
                <p className="text-xs text-body leading-relaxed">{step.description}</p>
              </div>
              {i < processSteps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center shrink-0">
                  <span className="text-sm text-white/30 font-mono">{'->'}</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ─── Big portrait side-by-side with summary ─── */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div
            className="lg:col-span-6 relative overflow-hidden rounded-btn bg-surface-card"
            style={{
              border: '1px solid rgba(245,166,35,0.18)',
              boxShadow: '0 0 40px 4px rgba(245,166,35,0.10), 0 0 80px 12px rgba(245,166,35,0.05)',
            }}
          >
            <img
              src="/pranav.jpg"
              alt="Pranav Kumar"
              loading="lazy"
              decoding="async"
              className="w-full h-[60vh] lg:h-[70vh] object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
          </div>

          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">
              Hi, Pranav this side.
            </p>
            <h3 className="font-display text-heading leading-[1.05]" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', fontWeight: 500 }}>
              Full-Stack Software Engineer.
              <br />
              <span className="text-gradient italic">Freelancer.</span>
            </h3>
            <p className="mt-6 text-lg text-body leading-relaxed">
              I care about the craft — clean architectures, thoughtful APIs, interfaces that respect the people using them. My day job is enterprise Java; my evenings are spent on custom builds for founders with a sharp idea and a tight timeline.
            </p>
            <p className="mt-4 text-lg text-body leading-relaxed">
              I prefer long, honest conversations over short pitches. If you're thinking about a product, an internal tool, or a feature you can't quite find the right engineer for — let's talk.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary">
                Let's work together <FiArrowRight />
              </Link>
              <Link to="/about" className="btn-secondary">
                More about me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-container">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">04 — Frequently asked</p>
          <h2 className="font-display text-4xl md:text-5xl text-heading leading-tight mb-12" style={{ fontWeight: 500 }}>
            The <span className="text-gradient italic">practical</span> stuff.
          </h2>
          <div className="space-y-3">
            {generalFaqs.map((faq, i) => (
              <div key={i} className="rounded-btn border border-white/8 bg-transparent overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 text-left p-5 hover:bg-surface-muted/50 transition-colors"
                >
                  <span className="text-base md:text-lg text-heading font-medium">{faq.q}</span>
                  <FiChevronDown className={`text-muted shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-body leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="section-container">
        <div className="rounded-btn border border-white/8 bg-transparent p-10 md:p-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">
            Let's talk
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-heading leading-[1.05] max-w-4xl mx-auto" style={{ fontWeight: 500 }}>
            Have a product in mind?
            <br />
            <span className="italic text-gradient">Let's build it.</span>
          </h2>
          <p className="mt-6 text-base text-body max-w-xl mx-auto">
            Full-stack builds, microservices, landing pages, or a custom build around your exact idea — I'm open for new work.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary justify-center">
              Start a project
              <FiArrowRight />
            </Link>
            <a
              href="mailto:kpranav715@gmail.com"
              className="btn-secondary justify-center"
            >
              Email me directly
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
