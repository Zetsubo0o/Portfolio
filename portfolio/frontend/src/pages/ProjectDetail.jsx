import { useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiAlertCircle, FiCheckCircle, FiTarget, FiClock, FiUser } from 'react-icons/fi'
import { projects } from '../data/projects'
import TechBadge from '../components/TechBadge'
import usePageMeta from '../hooks/usePageMeta'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug])

  usePageMeta(
    project ? `${project.title} — Case Study | Pranav Kumar` : 'Projects — Pranav Kumar',
    project?.tagline
  )

  if (!project) return <Navigate to="/projects" replace />

  const currentIdx = projects.findIndex((p) => p.slug === slug)
  const nextProject = projects[(currentIdx + 1) % projects.length]

  return (
    <div className="pt-24 pb-20">
      {/* Back */}
      <section className="section-container pb-0">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors">
          <FiArrowLeft /> All projects
        </Link>
      </section>

      {/* Hero */}
      <section className="section-container pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-display text-3xl text-accent leading-none" style={{ fontWeight: 500 }}>{project.number}</span>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Case study</p>
              {project.badge && (
                <span className="text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-btn border border-white/8 text-body">
                  {project.badge}
                </span>
              )}
            </div>
            <h1 className="font-display text-heading leading-[0.98] tracking-tight" style={{ fontSize: 'clamp(2.25rem, 6vw, 4.75rem)', fontWeight: 500 }}>
              {project.title}
            </h1>
            {project.tagline && (
              <p className="mt-6 text-lg md:text-xl text-accent italic">{project.tagline}</p>
            )}
          </div>

          {/* Summary card */}
          <div className="lg:col-span-4">
            <div className="rounded-btn border border-white/8 bg-surface-card p-6 space-y-5">
              {project.duration && (
                <div className="flex items-start gap-3">
                  <FiClock className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-0.5">Duration</p>
                    <p className="text-sm text-heading">{project.duration}</p>
                  </div>
                </div>
              )}
              {project.role && (
                <div className="flex items-start gap-3">
                  <FiUser className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-0.5">Role</p>
                    <p className="text-sm text-heading">{project.role}</p>
                  </div>
                </div>
              )}
              <div className="h-px bg-white/5" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <TechBadge key={tech} tech={tech} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {project.metrics.map((m, i) => (
              <div key={i} className="rounded-btn border border-white/8 bg-surface-card p-6 text-center">
                <p className="font-display text-3xl md:text-4xl text-heading leading-none" style={{ fontWeight: 500 }}>{m.value}</p>
                <p className="text-[11px] text-muted mt-3 leading-tight uppercase tracking-[0.15em]">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Challenge (detailed) */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <FiAlertCircle className="text-accent" />
              <p className="text-xs uppercase tracking-[0.3em] text-accent">The Challenge</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-heading leading-tight" style={{ fontWeight: 500 }}>What needed solving.</h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="text-lg text-body leading-relaxed">{project.challenge}</p>
            {project.challengeDetails && project.challengeDetails.length > 0 && (
              <ul className="space-y-4 mt-6">
                {project.challengeDetails.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 text-body leading-relaxed"
                  >
                    <span className="text-accent mt-1.5 text-[10px] shrink-0">●</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </section>

      {/* Solution (detailed) */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <FiCheckCircle className="text-accent" />
              <p className="text-xs uppercase tracking-[0.3em] text-accent">The Solution</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-heading leading-tight" style={{ fontWeight: 500 }}>How I built it.</h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="text-lg text-body leading-relaxed">{project.solution}</p>
            {project.solutionDetails && project.solutionDetails.length > 0 && (
              <ul className="space-y-4 mt-6">
                {project.solutionDetails.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 text-body leading-relaxed"
                  >
                    <span className="mt-1 w-5 h-5 rounded-full bg-accent-light border border-accent/30 flex items-center justify-center shrink-0">
                      <FiCheckCircle className="text-accent text-xs" />
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </section>

      {/* Outcomes */}
      {project.outcomes && project.outcomes.length > 0 && (
        <section className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FiTarget className="text-accent" />
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Outcomes</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-heading leading-tight mb-10 max-w-2xl" style={{ fontWeight: 500 }}>What it delivered.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.outcomes.map((outcome, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="rounded-btn border border-white/8 bg-surface-card p-7"
                >
                  <p className="font-display text-3xl text-white/20 mb-4 leading-none" style={{ fontWeight: 500 }}>{String(i + 1).padStart(2, '0')}</p>
                  <p className="text-body leading-relaxed">{outcome}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* CTA */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-btn border border-white/10 bg-surface-card p-10 md:p-16 text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">Have a similar challenge?</p>
          <h2 className="font-display text-3xl md:text-5xl text-heading leading-[1.1] max-w-3xl mx-auto" style={{ fontWeight: 500 }}>
            Let's build <span className="text-gradient italic">something that ships.</span>
          </h2>
          <p className="mt-6 text-lg text-body max-w-xl mx-auto">Tell me about your project. I'll send a fixed-price quote within 24 hours.</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary justify-center">
              Get a Live Quote <FiArrowRight />
            </Link>
            <Link to="/services" className="btn-secondary justify-center">Browse services</Link>
          </div>
        </motion.div>
      </section>

      {/* Next project */}
      <section className="section-container pb-0">
        <Link
          to={`/projects/${nextProject.slug}`}
          className="group flex items-center justify-between gap-6 rounded-btn border border-white/8 bg-surface-card hover:border-accent/30 transition-colors p-6 md:p-8"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-2">Next case study</p>
            <p className="font-display text-2xl md:text-3xl text-heading group-hover:text-accent transition-colors" style={{ fontWeight: 500 }}>{nextProject.title}</p>
          </div>
          <FiArrowRight className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all text-2xl shrink-0" />
        </Link>
      </section>
    </div>
  )
}
