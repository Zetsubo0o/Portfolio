import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiDownload, FiArrowRight } from 'react-icons/fi'
import { skills } from '../data/skills'
import usePageMeta from '../hooks/usePageMeta'
import SmileFlourish from '../components/SmileFlourish'

export default function About() {
  usePageMeta(
    'About — Pranav Kumar, Software Engineer & Freelance Consultant',
    'Full-stack engineer with a production-first mindset. Java, Spring Boot, React, and microservices experience across banking and SaaS systems.'
  )
  return (
    <div className="pt-20 pb-20">
      {/* Hero with photo */}
      <section className="section-container pt-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">About</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 items-start">
            <div className="md:col-span-3">
              <h1 className="font-display text-heading leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(2.25rem, 6.5vw, 5rem)', fontWeight: 500 }}>
                Full-stack engineer.
                <br />
                <span className="text-gradient italic">Production-first.</span>
              </h1>
              <SmileFlourish className="mt-4" />
              <p className="mt-8 text-lg text-body leading-relaxed max-w-2xl">
                I build elegant, scalable systems for teams that care about what ships. My core stack is enterprise Java — Spring Boot, microservices, multi-country banking integrations — but the work I enjoy most is where engineering moves a real number: cost down, uptime up, revenue unblocked.
              </p>
              <p className="mt-5 text-lg text-body leading-relaxed max-w-2xl">
                Outside of client work, I ship custom backends, landing pages, and full-stack products for founders. Whether it's a SaaS MVP or a complex API integration — I'm happy to talk about either.
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="relative rounded-btn overflow-hidden border border-white/10 bg-surface-card aspect-[3/4] max-w-xs md:ml-auto">
                <img src="/pranav.jpg" alt="Pranav Kumar" loading="lazy" className="w-full h-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-surface/50 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Technologies I Work With */}
      <section className="section-container">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Technologies</p>
        <h2 className="font-display text-4xl md:text-5xl text-heading leading-tight mb-14 max-w-3xl" style={{ fontWeight: 500 }}>
          Tools I work with <span className="text-gradient italic">daily.</span>
        </h2>
        <div className="space-y-10">
          {skills.map((group, gi) => (
            <motion.div key={group.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: gi * 0.08 }} viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-5 gap-6 border-t border-white/5 pt-10">
              <div className="md:col-span-1">
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-2">{String(gi + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-xl text-heading leading-tight" style={{ fontWeight: 500 }}>{group.category}</h3>
              </div>
              <div className="md:col-span-4 flex flex-wrap gap-2">
                {group.items.map((skill) => {
                  const Icon = skill.icon
                  return (
                    <span key={skill.name} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/[0.03] hover:bg-white/[0.05] hover:border-accent/40 transition-colors text-sm text-body">
                      <Icon className="text-accent text-base" />
                      {skill.name}
                    </span>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="rounded-btn border border-white/10 bg-surface-card p-10 md:p-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">Want the short version?</p>
          <h2 className="font-display text-4xl md:text-5xl text-heading leading-[1.05] max-w-3xl mx-auto" style={{ fontWeight: 500 }}>
            Grab the resume,
            <br />
            or <span className="text-gradient italic">start a project.</span>
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/PranavKumar_SoftwareEngineer.pdf" download className="btn-primary justify-center">
              <FiDownload /> Download resume
            </a>
            <Link to="/contact" className="btn-secondary justify-center">
              Start a project <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
