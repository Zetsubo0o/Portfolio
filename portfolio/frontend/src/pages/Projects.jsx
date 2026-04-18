import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Selected Work</p>
          <h1 className="font-display text-heading leading-[0.95] tracking-tight max-w-4xl" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 500 }}>
            Case studies <span className="text-gradient italic">with receipts.</span>
          </h1>
          <p className="mt-8 text-lg text-body max-w-2xl leading-relaxed">
            A closer look at recent work — the problem, the system I designed, and the measurable outcomes. Every number below is from a real, shipped project.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Bottom band */}
      <section className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-btn overflow-hidden border border-white/8">
          <div className="bg-surface-card p-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-accent mb-3">Focus areas</p>
            <p className="text-body leading-relaxed">Full-stack SaaS, backend APIs, AI features, automation workflows, and polished landing pages.</p>
          </div>
          <div className="bg-surface-card p-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-accent mb-3">Currently building</p>
            <p className="text-body leading-relaxed">Production SaaS features, AI-powered automations, and high-performance APIs for growing teams.</p>
          </div>
          <div className="bg-surface-card p-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-accent mb-3">Open to</p>
            <p className="text-body leading-relaxed">Freelance engagements, contract work, and fractional engineering roles with high-leverage teams.</p>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="rounded-btn border border-white/10 bg-surface-card p-10 md:p-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">Let's collaborate</p>
          <h2 className="font-display text-4xl md:text-6xl text-heading leading-[1.05] max-w-3xl mx-auto" style={{ fontWeight: 500 }}>
            Have a similar challenge?
            <br /><span className="text-gradient italic">Let's talk.</span>
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary justify-center">Start a conversation <FiArrowRight /></Link>
            <a href="mailto:kpranav715@gmail.com" className="btn-secondary justify-center">Email directly</a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
