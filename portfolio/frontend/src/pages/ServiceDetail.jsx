import { useMemo, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiCheck, FiClock, FiTarget, FiAward, FiChevronDown, FiMessageCircle } from 'react-icons/fi'
import { services } from '../data/services'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = useMemo(() => services.find((s) => s.slug === slug), [slug])
  const [openFaq, setOpenFaq] = useState(null)

  if (!service) return <Navigate to="/services" replace />

  const Icon = service.icon
  const currentIdx = services.findIndex((s) => s.slug === slug)
  const nextService = services[(currentIdx + 1) % services.length]

  return (
    <div className="pt-24 pb-20">
      {/* Back */}
      <section className="section-container pb-0">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors">
          <FiArrowLeft /> All services
        </Link>
      </section>

      {/* Hero */}
      <section className="section-container pt-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-btn bg-accent-light border border-accent/20 flex items-center justify-center">
                <Icon className="text-accent text-2xl" />
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Service</p>
            </div>
            <h1 className="font-display text-heading leading-[0.98] tracking-tight" style={{ fontSize: 'clamp(2.25rem, 6vw, 4.75rem)', fontWeight: 500 }}>
              {service.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-accent italic">{service.tagline}</p>
            <p className="mt-6 text-lg text-body leading-relaxed max-w-2xl">{service.description}</p>
          </div>

          {/* Summary card */}
          <div className="lg:col-span-4">
            <div className="rounded-btn border border-white/8 bg-surface-card p-6 space-y-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-1.5">Pricing</p>
                <p className="font-display text-3xl text-heading leading-tight italic" style={{ fontWeight: 500 }}>
                  Tailored to your <span className="text-gradient">scope</span>
                </p>
                <p className="text-xs text-muted mt-2 leading-relaxed">Every project is different. Tell me about yours and get a fixed-price quote.</p>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-start gap-3">
                <FiClock className="text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-0.5">Timeline</p>
                  <p className="text-sm text-heading">{service.timeline}</p>
                </div>
              </div>
              <Link to="/contact" state={{ service: service.title }} className="btn-primary justify-center w-full mt-2">
                Get a Live Quote <FiArrowRight />
              </Link>
              <p className="text-[11px] text-muted text-center">Free 15-min call · Quote within 24h</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* In plain English — non-technical benefits */}
      {service.plainBenefits && (
        <section className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2 mb-4">
              <FiMessageCircle className="text-accent" />
              <p className="text-xs uppercase tracking-[0.3em] text-accent">In plain English</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-heading leading-tight mb-10 max-w-2xl" style={{ fontWeight: 500 }}>
              What this actually means for you.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {service.plainBenefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="rounded-btn border border-white/8 bg-surface-card p-6 group hover:border-accent/30 transition-colors"
                >
                  <h3 className="font-display text-lg text-heading mb-3 leading-tight" style={{ fontWeight: 500 }}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-body leading-relaxed italic">
                    "{benefit.example}"
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* What's included + Tech + Ideal for */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">What's Included</p>
            <h2 className="font-display text-3xl md:text-4xl text-heading leading-tight mb-8" style={{ fontWeight: 500 }}>Everything you need — nothing you don't.</h2>
            <ul className="space-y-4">
              {service.whatsIncluded.map((item, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }} viewport={{ once: true }} className="flex items-start gap-4 text-body leading-relaxed">
                  <span className="mt-1 w-5 h-5 rounded-full bg-accent-light border border-accent/30 flex items-center justify-center shrink-0">
                    <FiCheck className="text-accent text-xs" />
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="lg:col-span-5 space-y-8">
            <div className="rounded-btn border border-white/8 bg-surface-card p-7">
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-5">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
                  <span key={tech} className="text-sm px-3 py-1.5 rounded-btn border border-white/8 text-body bg-white/[0.04]">{tech}</span>
                ))}
              </div>
            </div>
            {service.idealFor && (
              <div className="rounded-btn border border-white/8 bg-surface-card p-7">
                <div className="flex items-center gap-2 mb-5">
                  <FiTarget className="text-accent" />
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted">Ideal For</p>
                </div>
                <ul className="space-y-3">
                  {service.idealFor.map((item, i) => (
                    <li key={i} className="text-sm text-body leading-relaxed flex gap-3">
                      <span className="text-accent mt-1.5 text-[8px]">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Outcomes */}
      {service.outcomes && (
        <section className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2 mb-4">
              <FiAward className="text-accent" />
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Outcomes</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-heading leading-tight mb-10 max-w-2xl" style={{ fontWeight: 500 }}>
              What you walk away with.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {service.outcomes.map((outcome, i) => {
                const outcomeIcons = [FiTarget, FiCheck, FiAward]
                const OutcomeIcon = outcomeIcons[i % outcomeIcons.length]
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative rounded-btn border border-white/8 bg-surface-card hover:border-accent/40 transition-all duration-300 p-8 overflow-hidden"
                  >
                    {/* Glow background */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 rounded-btn bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                          <OutcomeIcon className="text-accent text-xl" />
                        </div>
                        <span className="font-display text-4xl text-accent/25 leading-none" style={{ fontWeight: 500 }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="text-body leading-relaxed text-[15px] group-hover:text-heading transition-colors duration-300">
                        {outcome}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </section>
      )}

      {/* FAQ */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Frequently Asked</p>
            <h2 className="font-display text-3xl md:text-4xl text-heading leading-tight mb-10" style={{ fontWeight: 500 }}>Questions clients usually ask.</h2>
            <div className="space-y-3">
              {service.faqs.map((faq, i) => (
                <div key={i} className="rounded-btn border border-white/8 bg-surface-card overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-6 text-left p-5 hover:bg-surface-muted/50 transition-colors">
                    <span className="text-base md:text-lg text-heading font-medium">{faq.q}</span>
                    <FiChevronDown className={`text-muted shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.2 }} className="px-5 pb-5 text-body leading-relaxed">
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* CTA */}
      <section className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="rounded-btn border border-white/10 bg-surface-card p-10 md:p-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">Ready when you are</p>
          <h2 className="font-display text-3xl md:text-5xl text-heading leading-[1.1] max-w-3xl mx-auto" style={{ fontWeight: 500 }}>
            Interested in <span className="text-gradient italic">{service.title.toLowerCase()}?</span>
          </h2>
          <p className="mt-6 text-lg text-body max-w-xl mx-auto">Book a free 15-minute call. You get a fixed-price quote within 24 hours — no pitch, no obligation.</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" state={{ service: service.title }} className="btn-primary justify-center">
              Discuss this service <FiArrowRight />
            </Link>
            <a href="mailto:kpranav715@gmail.com" className="btn-secondary justify-center">Email directly</a>
          </div>
        </motion.div>
      </section>

      {/* Next service */}
      <section className="section-container pb-0">
        <Link to={`/services/${nextService.slug}`} className="group flex items-center justify-between gap-6 rounded-btn border border-white/8 bg-surface-card hover:border-accent/30 transition-colors p-6 md:p-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-2">Next service</p>
            <p className="font-display text-2xl md:text-3xl text-heading group-hover:text-accent transition-colors" style={{ fontWeight: 500 }}>{nextService.title}</p>
          </div>
          <FiArrowRight className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all text-2xl shrink-0" />
        </Link>
      </section>
    </div>
  )
}
