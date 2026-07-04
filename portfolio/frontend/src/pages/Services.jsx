import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiChevronDown } from 'react-icons/fi'
import ServiceCard from '../components/ServiceCard'
import { services, processSteps, generalFaqs } from '../data/services'
import usePageMeta from '../hooks/usePageMeta'
import SmileFlourish from '../components/SmileFlourish'

export default function Services() {
  usePageMeta(
    'Services — Pranav Kumar | SaaS, Backend, AI & Automation Development',
    'Freelance development services: custom SaaS applications, workflow automation, AI-powered features, backend & API development, and landing pages.'
  )
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="pt-20 pb-16">
      {/* Hero */}
      <section className="section-container">
        <div className="text-center max-w-4xl mx-auto">
          <p className="font-display italic text-accent text-lg md:text-xl mb-4">
            What I can build —
          </p>
          <h1 className="font-display text-heading leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 500 }}>
            Engineering help,
            <br />
            <span className="text-gradient italic">shipped with care.</span>
          </h1>
          <div className="flex justify-center"><SmileFlourish className="mt-4" /></div>
          <p className="mt-6 text-base text-body max-w-2xl mx-auto leading-relaxed">
            Fixed-scope freelance engagements — full-stack SaaS, backend APIs, AI features, automation, algorithmic trading, and legacy modernization. Every engagement follows a transparent five-step process with milestone check-ins.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted border border-white/10 rounded-btn px-3 py-1">Milestone-based</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted border border-white/10 rounded-btn px-3 py-1">Live quote in 24h</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted border border-white/10 rounded-btn px-3 py-1">Global timezones</span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} delay={i * 0.03} />
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section-container">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">How I work</p>
          <h2 className="font-display text-3xl md:text-5xl text-heading leading-tight" style={{ fontWeight: 500 }}>
            A five-step process, no surprises.
          </h2>
        </div>
        <div className="space-y-3">
          {processSteps.map((step, i) => (
            <div
              key={step.step}
              className="rounded-btn border border-white/8 bg-surface-card hover:border-accent/30 transition-colors p-5 md:p-6 flex gap-5 md:gap-8 items-start group"
            >
              <div className="font-display text-3xl md:text-4xl text-white/20 group-hover:text-accent transition-colors shrink-0 leading-none" style={{ fontWeight: 500 }}>
                {step.step}
              </div>
              <div className="flex-grow">
                <h3 className="font-display text-xl md:text-2xl text-heading mb-1.5 leading-tight" style={{ fontWeight: 500 }}>{step.title}</h3>
                <p className="text-sm text-body leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-container">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Frequently asked</p>
          <h2 className="font-display text-3xl md:text-4xl text-heading leading-tight mb-8" style={{ fontWeight: 500 }}>The practical stuff.</h2>
          <div className="space-y-3">
            {generalFaqs.map((faq, i) => (
              <div key={i} className="rounded-btn border border-white/8 bg-surface-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 text-left p-4 hover:bg-surface-muted/50 transition-colors"
                >
                  <span className="text-sm md:text-base text-heading font-medium">{faq.q}</span>
                  <FiChevronDown className={`text-muted shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-body leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-container">
        <div className="rounded-btn border border-white/10 bg-surface-card p-8 md:p-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-5">Ready to start?</p>
          <h2 className="font-display text-3xl md:text-5xl text-heading leading-[1.05] max-w-3xl mx-auto" style={{ fontWeight: 500 }}>
            Free 15-min discovery call.
            <br /><span className="text-gradient italic">No pitch, no obligation.</span>
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary justify-center">Schedule a call <FiArrowRight /></Link>
            <a href="mailto:kpranav715@gmail.com" className="btn-secondary justify-center">Email instead</a>
          </div>
        </div>
      </section>
    </div>
  )
}
