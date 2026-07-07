import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight, FiPlus, FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi'
import ServiceRow from '../components/ServiceRow'
import ProjectRow from '../components/ProjectRow'
import RotatingText from '../components/RotatingText'
import FindYourFit from '../components/FindYourFit'
import Tilt from '../components/Tilt'
import usePageMeta from '../hooks/usePageMeta'
import { SMILE } from '../theme.js'

// 3D hero backdrops, lazy-loaded so three.js stays out of the main bundle.
// Revert: remove these + their usage below, delete the files, npm uninstall three.
const Hero3D = React.lazy(() => import('../components/Hero3D'))
const SmileScene = React.lazy(() => import('../components/SmileScene'))
import { projects } from '../data/projects'
import { services, processSteps, generalFaqs } from '../data/services'

const heroPhrases = [
  'Backends that handle real traffic.',
  'SaaS platforms, shipped fast.',
  'Microservices built to scale.',
  'Automation that saves hours.',
]

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '100%', label: 'Live & Running' },
  { value: '5★', label: 'Client Rating' },
  { value: '24hr', label: 'Avg First Reply' },
]


function SectionHeader({ num, eyebrow, children }) {
  return (
    <motion.div
      className="flex items-start gap-4 md:gap-6"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="section-glyph hidden sm:flex w-12 h-12 md:w-14 md:h-14 rounded-lg bg-accent items-center justify-center shrink-0 mt-1.5 transition-transform">
        <span className="font-display text-xl md:text-2xl leading-none text-surface" style={{ fontWeight: 500 }}>
          {num}
        </span>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
          {num} — {eyebrow}
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-heading leading-tight" style={{ fontWeight: 500 }}>
          {children}
        </h2>
      </div>
    </motion.div>
  )
}

/** Counts the numeric part of a stat up from 0 when scrolled into view. */
function StatValue({ value }) {
  const m = String(value).match(/^(\d+)(.*)$/)
  const ref = useRef(null)
  const [n, setN] = useState(m ? 0 : null)

  useEffect(() => {
    if (!m || !ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(parseInt(m[1], 10))
      return
    }
    const target = parseInt(m[1], 10)
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const dur = 1200
      const start = performance.now()
      const step = (t) => {
        const p = Math.min((t - start) / dur, 1)
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.5 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  if (!m) return <span>{value}</span>
  return <span ref={ref}>{n}{m[2]}</span>
}

export default function Home() {
  usePageMeta(
    'Pranav Kumar — Software Engineer & Freelance Consultant',
    'Freelance software engineer building production-grade backends, full-stack SaaS, and algorithmic trading systems. Spring Boot, React, microservices.'
  )
  const featuredProjects = projects.slice(0, 2)
  const [openFaq, setOpenFaq] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const active = processSteps[activeStep]
  const StepIcon = active.icon

  return (
    <div className="pt-16">
      {/* ─── Hero (centered, tight) ─── */}
      <section className="relative min-h-[calc(100vh-8rem)] flex items-center overflow-hidden">
        {/* Central golden atmospheric glow — like the reference */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{
            height: '70%',
            background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgb(var(--accent) / 0.10) 0%, rgb(var(--accent) / 0.03) 55%, transparent 100%)',
          }}
        />
        <div className="pointer-events-none absolute -top-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-accent/8 blur-3xl" style={{ opacity: 0.5 }} />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-amber-500/5 blur-3xl" style={{ opacity: 0.4 }} />

        {/* 3D hero backdrop — the elegant smile stroke under SMILE, else the knot.
            Confined to the hero so it scrolls away (never floats over later sections). */}
        <React.Suspense fallback={null}>
          {SMILE ? <SmileScene /> : <Hero3D />}
        </React.Suspense>

        <div className="max-w-5xl mx-auto px-6 py-10 w-full relative z-10 flex flex-col items-center text-center">
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
            Hi, I'm Pranav, glad you 're here.
          </motion.p>

          {/* Headline — line-by-line cinematic reveal (rise + blur clear) */}
          <motion.h1
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } }}
            initial="hidden"
            animate="show"
            className="font-display text-heading leading-[0.98] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', fontWeight: 500 }}
          >
            {['Software engineer', 'who ships production'].map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  variants={{
                    hidden: { y: '110%', filter: 'blur(6px)', opacity: 0 },
                    show: { y: '0%', filter: 'blur(0px)', opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block text-gradient italic"
                variants={{
                  hidden: { y: '110%', filter: 'blur(6px)', opacity: 0 },
                  show: { y: '0%', filter: 'blur(0px)', opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                built to scale.
              </motion.span>
            </span>
          </motion.h1>

          {/* Decorative smile arc (SMILE theme, UI only) */}
          {SMILE && (
            <motion.svg
              className="smile-arc mt-3"
              width="220"
              height="34"
              viewBox="0 0 200 34"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              aria-hidden="true"
            >
              <path pathLength="100" d="M8 6 C 55 40, 145 40, 192 6" stroke="rgb(var(--accent))" strokeWidth="4" strokeLinecap="round" />
            </motion.svg>
          )}

          {/* Rotating gold subline (typewriter) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.11 }}
            className="mt-5 h-8 md:h-10 flex items-center justify-center"
          >
            <RotatingText
              words={heroPhrases}
              className="font-display italic text-accent text-xl md:text-3xl"
            />
          </motion.div>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.14 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-body leading-relaxed"
          >
            A full-stack engineer crafting scalable backends, production microservices, and custom software for global teams built with care, shipped on time.
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

      {/* ─── Stats strip (trust anchor) ─── */}
      <section className="smile-shimmer-line border-y border-white/5 bg-surface-muted/40">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-12 grid grid-cols-2 md:grid-cols-4 gap-y-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`group text-center px-2 md:px-4 ${i > 0 ? 'md:border-l md:border-white/8' : ''}`}
            >
              <div className="font-display text-4xl md:text-5xl text-heading leading-none transition-all duration-300 group-hover:text-accent group-hover:drop-shadow-[0_0_18px_rgb(var(--accent)/0.5)]" style={{ fontWeight: 500 }}>
                <StatValue value={s.value} />
              </div>
              <div className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="section-container">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <SectionHeader num="01" eyebrow="Services">
            What I can <span className="text-gradient italic">build</span> for you.
          </SectionHeader>
          <Link
            to="/services"
            className="group flex items-center gap-2 text-sm font-medium text-body hover:text-accent transition-colors"
          >
            All services
            <FiArrowUpRight className="group-hover:rotate-45 transition-transform" />
          </Link>
        </div>
        <div className="border-t border-white/8">
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ─── Selected Work (tinted band) ─── */}
      <section className="bg-surface-muted/30 border-y border-white/5">
        <div className="section-container">
          <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
            <SectionHeader num="02" eyebrow="Selected Work">
              Recent <span className="text-gradient italic">projects.</span>
            </SectionHeader>
            <Link
              to="/projects"
              className="group flex items-center gap-2 text-sm font-medium text-body hover:text-accent transition-colors"
            >
              View all projects
              <FiArrowUpRight className="group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
          <div className="border-t border-white/8">
            {featuredProjects.map((project, i) => (
              <ProjectRow key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process (tabbed stepper) ─── */}
      <section className="section-container">
        <div className="mb-12">
          <SectionHeader num="03" eyebrow="How I work">
            A simple process, <span className="text-gradient italic">start to launch.</span>
          </SectionHeader>
        </div>

        {/* Tabs */}
        <div className="relative border-b border-white/8 mb-8 overflow-x-auto">
          <div className="grid grid-cols-5 min-w-[560px]">
            {processSteps.map((step, i) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(i)}
                className={`relative pb-4 pt-2 px-2 text-left transition-colors ${
                  activeStep === i ? 'text-heading' : 'text-muted hover:text-body'
                }`}
              >
                <span className="text-accent font-mono text-xs md:text-sm mr-1.5">{step.step}</span>
                <span className="text-sm md:text-base font-medium">{step.label}</span>
                {activeStep === i && (
                  <motion.div
                    layoutId="stepUnderline"
                    className="absolute -bottom-px left-0 right-0 h-0.5 bg-accent"
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active step card with side arrows */}
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={() => setActiveStep((s) => (s - 1 + processSteps.length) % processSteps.length)}
            className="hidden md:flex p-3 rounded-full border border-white/10 hover:border-accent/40 text-body hover:text-accent transition-colors shrink-0"
            aria-label="Previous step"
          >
            <FiChevronLeft size={18} />
          </button>

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
                className="rounded-btn border border-white/8 bg-surface-card p-8 md:p-10 grid md:grid-cols-2 gap-8 md:gap-10 items-center"
              >
                <div>
                  <div className="w-12 h-12 rounded-btn bg-accent-light border border-accent/20 flex items-center justify-center mb-5">
                    <StepIcon className="text-accent text-xl" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-heading mb-3 leading-tight" style={{ fontWeight: 500 }}>
                    {active.title}
                  </h3>
                  <p className="text-body leading-relaxed">{active.description}</p>
                </div>
                <div className="flex flex-wrap gap-2.5 md:justify-end content-center">
                  {active.points.map((pt) => (
                    <span
                      key={pt}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-btn border border-white/8 bg-white/[0.03] text-sm text-body"
                    >
                      <FiCheck className="text-accent shrink-0" /> {pt}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => setActiveStep((s) => (s + 1) % processSteps.length)}
            className="hidden md:flex p-3 rounded-full border border-white/10 hover:border-accent/40 text-body hover:text-accent transition-colors shrink-0"
            aria-label="Next step"
          >
            <FiChevronRight size={18} />
          </button>
        </div>

        {/* Dots (+ arrows on mobile) */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <button
            onClick={() => setActiveStep((s) => (s - 1 + processSteps.length) % processSteps.length)}
            className="md:hidden p-2 rounded-full border border-white/10 text-body"
            aria-label="Previous step"
          >
            <FiChevronLeft />
          </button>
          <div className="flex gap-2">
            {processSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                aria-label={`Go to step ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  activeStep === i ? 'w-6 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setActiveStep((s) => (s + 1) % processSteps.length)}
            className="md:hidden p-2 rounded-full border border-white/10 text-body"
            aria-label="Next step"
          >
            <FiChevronRight />
          </button>
        </div>
      </section>

      {/* ─── Big portrait side-by-side with summary ─── */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div
            className="lg:col-span-6 relative overflow-hidden rounded-btn bg-surface-card"
            style={{
              border: '1px solid rgb(var(--accent) / 0.18)',
              boxShadow: '0 0 40px 4px rgb(var(--accent) / 0.10), 0 0 80px 12px rgb(var(--accent) / 0.05)',
            }}
          >
            <img
              src="/pranav.jpg"
              alt="Pranav Kumar"
              loading="lazy"
              decoding="async"
              className="w-full h-[60vh] lg:h-[70vh] object-cover"
              style={{ filter: 'saturate(1.06) contrast(1.03)' }}
            />
            {/* Warm accent color-grade — unifies the photo with the theme palette */}
            <div
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{
                background:
                  'linear-gradient(135deg, rgb(var(--accent) / 0.55) 0%, transparent 50%, rgb(var(--accent-secondary) / 0.35) 100%)',
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/85 via-surface/10 to-transparent" />
          </div>

          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">
              Hi, Pranav this side.
            </p>
            <h3 className="font-display text-3xl md:text-5xl text-heading leading-[1.05]" style={{ fontWeight: 500 }}>
              Full-Stack Software Engineer.
              <br />
              <span className="text-gradient italic">Freelancer.</span>
            </h3>
            <p className="mt-6 text-lg text-body leading-relaxed">
              I care about the craft and clean architectures, thoughtful APIs, interfaces that respect the people using them. My day job is enterprise Java, my evenings are spent on custom builds for founders with a sharp idea and a tight timeline.
            </p>
            <p className="mt-4 text-lg text-body leading-relaxed">
              I prefer long, honest conversations over short pitches. If you're thinking about a product, an internal tool, or a feature you can't quite find the right engineer for, let's talk.
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

      {/* ─── Find your fit (tinted band, tiers + quiz) ─── */}
      <section className="bg-surface-muted/30 border-y border-white/5">
        <div className="section-container">
          <div className="mb-12">
            <SectionHeader num="04" eyebrow="Find your fit">
              Not sure what you <span className="text-gradient italic">need?</span>
            </SectionHeader>
          </div>
          <FindYourFit />
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-container">
        <div className="max-w-4xl">
          <div className="mb-12">
            <SectionHeader num="05" eyebrow="Frequently asked">
              The <span className="text-gradient italic">practical</span> stuff.
            </SectionHeader>
          </div>
          <div className="border-t border-white/8">
            {generalFaqs.map((faq, i) => (
              <motion.div
                key={i}
                className="border-b border-white/8"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 text-left py-6 group"
                >
                  <span className="font-display text-xl md:text-2xl text-heading leading-tight group-hover:text-accent transition-colors" style={{ fontWeight: 500 }}>
                    {faq.q}
                  </span>
                  <FiPlus
                    className={`text-accent shrink-0 text-2xl transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="pb-6 text-body leading-relaxed max-w-3xl">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="section-container">
        <Tilt max={3}>
        <div className="rounded-btn border border-white/8 bg-surface-card p-10 md:p-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">
            Let's talk
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-heading leading-[1.05] max-w-4xl mx-auto" style={{ fontWeight: 500 }}>
            Have a product in mind?
            <br />
            <span className="italic text-gradient">Let's build it.</span>
          </h2>
          <p className="mt-6 text-base text-body max-w-xl mx-auto">
            Full-stack builds, microservices, landing pages, or a custom build around your exact idea, I'm open for new work.
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
        </Tilt>
      </section>
    </div>
  )
}
