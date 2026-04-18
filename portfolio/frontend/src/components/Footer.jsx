import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Zetsubo0o', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/pranav-kumar15', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:kpranav715@gmail.com', label: 'Email' },
  ]

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <footer className="border-t border-white/5 mt-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top: photo + wordmark + summary + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center pb-14"
        >
          {/* Photo */}
          <div className="md:col-span-2">
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-white/10 bg-surface-card">
              <img src="/pranav.jpg" alt="Pranav Kumar" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Wordmark + summary */}
          <div className="md:col-span-6">
            <Link to="/" className="inline-flex items-baseline gap-0.5 group">
              <span className="font-display text-4xl md:text-5xl tracking-tight text-heading group-hover:text-accent transition-colors" style={{ fontWeight: 500 }}>
                Pranav Kumar
              </span>
            </Link>
            <p className="mt-4 text-body max-w-lg leading-relaxed">
              Full-stack engineer building production-grade backends, full-stack
              products, and algorithmic trading systems — for founders and global teams.
            </p>
          </div>

          {/* CTA */}
          <div className="md:col-span-4 flex md:justify-end">
            <Link
              to="/contact"
              className="group inline-flex flex-col items-start gap-2 rounded-btn border border-accent/20 bg-accent-light hover:bg-accent/15 hover:border-accent/40 transition-colors px-6 py-5 w-full md:w-auto"
            >
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Available for freelance
              </span>
              <span className="font-display text-xl md:text-2xl text-heading group-hover:text-accent transition-colors flex items-center gap-2" style={{ fontWeight: 500 }}>
                Let's work together
                <FiArrowUpRight className="group-hover:rotate-45 transition-transform" />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pt-14 border-t border-white/5">
          <div className="md:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-5">Explore</p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 max-w-sm">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-body hover:text-accent transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-5">Direct</p>
            <div className="space-y-2 text-sm">
              <a href="mailto:kpranav715@gmail.com" className="block text-body hover:text-accent transition-colors">
                kpranav715@gmail.com
              </a>
              <p className="text-muted pt-2">Based in India · IST (UTC+5:30)</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-5">Elsewhere</p>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 text-body hover:text-accent border border-white/10 rounded-btn hover:border-accent transition-colors"
                    aria-label={link.label}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted">
          <p>© {currentYear} Pranav Kumar. All rights reserved.</p>
          <p>Designed & built with React, Tailwind & Spring Boot.</p>
        </div>
      </div>
    </footer>
  )
}
