import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiZap, FiLayers, FiTool, FiMapPin, FiShoppingBag, FiBriefcase, FiTrendingUp,
  FiMonitor, FiCpu, FiServer, FiHelpCircle, FiClock, FiCalendar, FiCoffee,
  FiSend, FiRefreshCw, FiUsers, FiRotateCcw, FiArrowRight, FiArrowLeft,
} from 'react-icons/fi'
import { services } from '../data/services'
import Tilt from './Tilt'

const tiers = [
  {
    icon: FiZap,
    title: 'Quick build',
    blurb: 'Landing pages, automations, single integrations. Scoped tight, live in days to a couple of weeks.',
    featured: false,
  },
  {
    icon: FiLayers,
    title: 'Full product build',
    blurb: 'SaaS platforms, dashboards, and backends with AI baked in. Milestone-based with weekly demos.',
    featured: true,
  },
  {
    icon: FiTool,
    title: 'Custom scope',
    blurb: "An idea that doesn't fit a box. We shape it on a call and you get a fixed quote in 24 hours.",
    featured: false,
  },
]

const questions = [
  {
    q: 'What best describes your business?',
    options: [
      { icon: FiMapPin, label: 'Local service', sub: 'Clinic, salon, contractor' },
      { icon: FiShoppingBag, label: 'E-commerce', sub: 'Online store or products' },
      { icon: FiBriefcase, label: 'Professional / consulting', sub: 'Agency, advisor, specialist' },
      { icon: FiTrendingUp, label: 'Startup or app', sub: 'Software, SaaS, tech product' },
    ],
  },
  {
    q: 'What do you need most right now?',
    options: [
      { icon: FiMonitor, label: 'A website that converts', slug: 'landing-pages' },
      { icon: FiZap, label: 'Automating manual work', slug: 'workflow-automation' },
      { icon: FiCpu, label: 'AI-powered features', slug: 'ai-powered-features' },
      { icon: FiLayers, label: 'A full product, from scratch', slug: 'custom-saas-applications' },
      { icon: FiServer, label: 'Rock-solid backend & APIs', slug: 'backend-and-api-development' },
      { icon: FiHelpCircle, label: 'Not sure yet', slug: 'custom-builds' },
    ],
  },
  {
    q: 'How soon do you need it?',
    options: [
      { icon: FiZap, label: 'ASAP', sub: 'Under 2 weeks' },
      { icon: FiClock, label: 'Soon', sub: '2–6 weeks' },
      { icon: FiCalendar, label: 'This quarter', sub: '1–3 months' },
      { icon: FiCoffee, label: 'Flexible', sub: 'Quality over speed' },
    ],
  },
  {
    q: 'How involved do you want to be?',
    options: [
      { icon: FiSend, label: 'Just ship it', sub: 'Brief me at milestones' },
      { icon: FiRefreshCw, label: 'Weekly check-ins', sub: 'Demos every Friday' },
      { icon: FiUsers, label: 'Close collaboration', sub: 'Feedback loop all the way' },
    ],
  },
]

export default function FindYourFit() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])

  const done = step >= questions.length
  const recommended = done
    ? services.find((s) => s.slug === (answers[1]?.slug || 'custom-builds'))
    : null

  const pick = (opt) => {
    const next = [...answers]
    next[step] = opt
    setAnswers(next)
    setStep(step + 1)
  }

  const back = () => setStep(Math.max(0, step - 1))
  const restart = () => {
    setAnswers([])
    setStep(0)
  }

  return (
    <div>
      {/* Engagement tiers (no pricing) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-12">
        {tiers.map((t) => {
          const Icon = t.icon
          return (
            <Tilt key={t.title} className="h-full">
              <div
                className={`h-full rounded-btn border p-6 md:p-7 ${
                  t.featured
                    ? 'border-accent/30 bg-accent-light'
                    : 'border-white/8 bg-surface-card'
                }`}
              >
                <Icon className="text-accent text-xl mb-4" />
                <h3 className="font-display text-xl text-heading mb-2" style={{ fontWeight: 500 }}>
                  {t.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">{t.blurb}</p>
              </div>
            </Tilt>
          )
        })}
      </div>

      {/* Quiz */}
      <div className="rounded-btn border border-white/8 bg-surface-card p-6 md:p-10">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent border border-accent/25 rounded-btn px-2.5 py-1">
                  {step + 1} of {questions.length}
                </span>
                {step > 0 && (
                  <button
                    onClick={back}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors"
                  >
                    <FiArrowLeft /> Back
                  </button>
                )}
              </div>

              <h3 className="font-display text-2xl md:text-3xl text-heading mb-8 leading-tight" style={{ fontWeight: 500 }}>
                {questions[step].q}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {questions[step].options.map((opt) => {
                  const Icon = opt.icon
                  return (
                    <button
                      key={opt.label}
                      onClick={() => pick(opt)}
                      className="flex items-center gap-4 text-left rounded-btn border border-white/8 bg-white/[0.02] hover:border-accent/40 hover:bg-accent/5 transition-colors p-4 md:p-5 group"
                    >
                      <span className="w-10 h-10 rounded-btn bg-accent-light border border-accent/20 flex items-center justify-center shrink-0">
                        <Icon className="text-accent" />
                      </span>
                      <span>
                        <span className="block text-sm md:text-base font-medium text-heading group-hover:text-accent transition-colors">
                          {opt.label}
                        </span>
                        {opt.sub && <span className="block text-xs text-muted mt-0.5">{opt.sub}</span>}
                      </span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-accent border border-accent/25 rounded-btn px-2.5 py-1">
                My recommendation
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-heading mt-6 leading-tight" style={{ fontWeight: 500 }}>
                {recommended.title}
              </h3>
              <p className="text-base text-muted italic mt-2">{recommended.tagline}</p>
              <p className="text-body leading-relaxed mt-5 max-w-2xl">{recommended.description}</p>
              {recommended.timeline && (
                <p className="text-sm text-muted mt-4">
                  Typical timeline: <span className="text-body">{recommended.timeline}</span>
                  {answers[2]?.sub ? ` · your window: ${answers[2].sub}` : ''}
                </p>
              )}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to={`/services/${recommended.slug}`} className="btn-primary justify-center">
                  See this service <FiArrowRight />
                </Link>
                <Link to="/contact" className="btn-secondary justify-center">
                  Book a call
                </Link>
                <button
                  onClick={restart}
                  className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors px-4"
                >
                  <FiRotateCcw /> Start over
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i < step ? 'w-5 bg-accent' : i === step && !done ? 'w-5 bg-accent/50' : 'w-1.5 bg-white/15'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
