import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiClock, FiGlobe } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import Toast from '../components/Toast'
import usePageMeta from '../hooks/usePageMeta'
import SmileFlourish from '../components/SmileFlourish'

// EmailJS configuration — replace these with your actual IDs from https://dashboard.emailjs.com
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Germany',
  'France', 'Netherlands', 'Singapore', 'Australia', 'United Arab Emirates', 'Other',
]

const BUDGET_RANGES = [
  'Under $1K',
  '$1K – $5K',
  '$5K – $15K',
  '$15K – $50K',
  '$50K+',
  "Let's discuss",
]

export default function Contact() {
  usePageMeta(
    'Contact — Pranav Kumar | Book a Call or Send a Project Brief',
    'Get a quote within 24 hours. Book a call or send a brief for SaaS, backend, AI, or automation work. Available across US, EU, and APAC timezones.'
  )
  const location = useLocation()
  const serviceFromState = location.state?.service || ''

  const [formData, setFormData] = useState({
    name: '', email: '', country: '', phone: '', budget: '',
    subject: serviceFromState ? `Inquiry: ${serviceFromState}` : '',
    message: '',
  })

  useEffect(() => {
    if (serviceFromState) {
      setFormData((prev) => ({ ...prev, subject: `Inquiry: ${serviceFromState}` }))
    }
  }, [serviceFromState])

  const [toasts, setToasts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const addToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), 5000)
  }
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Frontend validation matching backend requirements
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      addToast('Please fill in all required fields', 'error'); return
    }
    if (formData.name.trim().length < 2) {
      addToast('Name must be at least 2 characters', 'error'); return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      addToast('Please enter a valid email', 'error'); return
    }
    if (formData.subject.trim().length < 5) {
      addToast('Subject must be at least 5 characters', 'error'); return
    }
    if (formData.message.trim().length < 10) {
      addToast('Message must be at least 10 characters', 'error'); return
    }
    setIsLoading(true)
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        country: formData.country || 'Not specified',
        phone: formData.phone || 'Not provided',
        budget: formData.budget || 'Not specified',
        subject: formData.subject,
        message: formData.message,
      }
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      addToast("Message sent! I'll get back to you within 24 hours.", 'success')
      setFormData({ name: '', email: '', country: '', phone: '', budget: '', subject: '', message: '' })
    } catch (err) {
      console.error('Contact form error:', err)
      addToast('Unable to send message right now. Please email me directly at kpranav715@gmail.com', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText('kpranav715@gmail.com').then(() => {
      addToast('Email address copied to clipboard!', 'success')
    }).catch(() => {
      addToast('kpranav715@gmail.com', 'success')
    })
  }

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Zetsubo0o', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/pranav-kumar15', label: 'LinkedIn' },
    { icon: FiMail, href: '#', label: 'Copy Email', onClick: handleCopyEmail },
  ]

  const inputClass = 'w-full px-4 py-3 bg-surface-card border border-white/10 rounded-btn focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-colors text-heading placeholder:text-muted/60'

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="section-container mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Contact</p>
          <h1 className="font-display text-heading leading-[0.98] tracking-tight max-w-4xl" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 500 }}>
            Let's build <span className="text-gradient italic">something worth shipping.</span>
          </h1>
          <SmileFlourish className="mt-4" />
          <p className="mt-8 text-lg text-body max-w-2xl leading-relaxed">
            Have a project in mind or want to talk through an idea? Send a quick message or book a 30-minute call below.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
            <span className="inline-flex items-center gap-2"><FiClock className="text-accent" /> Replies within 24 hours</span>
            <span className="inline-flex items-center gap-2"><FiGlobe className="text-accent" /> Working globally (IST · UTC+5:30)</span>
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Available for new work
            </span>
          </div>
        </motion.div>
      </section>

      {/* Form + Cal */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="font-display text-3xl font-bold text-heading mb-8">Send a message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-body">Name <span className="text-accent">*</span></label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-body">Email <span className="text-accent">*</span></label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium mb-2 text-body">Country <span className="text-muted text-xs">(optional)</span></label>
                  <select id="country" name="country" value={formData.country} onChange={handleChange} className={`${inputClass} appearance-none`}>
                    <option value="">Select a country</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-body">Phone <span className="text-muted text-xs">(optional)</span></label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+1 555 123 4567" />
                </div>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-2 text-body">Budget range <span className="text-muted text-xs">(optional)</span></label>
                <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className={`${inputClass} appearance-none`}>
                  <option value="">Select a budget range</option>
                  {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <p className="mt-1.5 text-xs text-muted">Helps me scope the right engagement — no commitment.</p>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-body">Subject <span className="text-accent">*</span></label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className={inputClass} placeholder="Project inquiry" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-body">Message <span className="text-accent">*</span></label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} className={`${inputClass} resize-none`} placeholder="Tell me about your project — goals, scope, timeline, current stack..." />
              </div>
              <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? 'Sending...' : 'Send message'}
              </button>
              <p className="text-xs text-muted text-center">By sending a message you agree to be contacted by email. I do not share your information.</p>
            </form>

            <div className="mt-12 pt-8 border-t border-white/5">
              <h3 className="text-sm uppercase tracking-[0.25em] text-muted mb-4">Or reach out directly</h3>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.onClick ? undefined : '_blank'}
                      rel={link.onClick ? undefined : 'noopener noreferrer'}
                      onClick={link.onClick}
                      className="p-3 bg-surface-card border border-white/10 rounded-btn hover:border-accent/30 hover:text-accent transition-colors cursor-pointer"
                      aria-label={link.label}
                      title={link.label}
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="font-display text-3xl font-bold text-heading mb-8">Book a call</h2>
            <div className="rounded-btn overflow-hidden border border-white/10" style={{ minHeight: '700px', background: '#ffffff' }}>
              <iframe
                src="https://calendly.com/kpranav715/30min?hide_gdpr_banner=1&hide_event_type_details=1"
                width="100%"
                height="700"
                frameBorder="0"
                title="Book a 30-minute call"
                loading="lazy"
                scrolling="no"
                style={{ border: 'none' }}
              />
            </div>
            <p className="text-sm text-muted mt-4 text-center">30-minute discovery call · Google Meet link sent automatically</p>
          </motion.div>
        </div>
      </section>

      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
