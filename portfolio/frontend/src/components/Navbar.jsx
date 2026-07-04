import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import ThemeToggle from './ThemeToggle'
import { SMILE } from '../theme.js'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const location = useLocation()

  useEffect(() => {
    // rAF-throttle + clamp: the nav style only ramps over the first 160px, so
    // once we're past it we stop re-rendering on every scroll frame.
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const y = Math.min(window.scrollY, 200)
        setScrollY((prev) => (Math.abs(prev - y) < 2 ? prev : y))
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  // Dynamic blur + opacity + shadow: ramp over the first 160px of scroll
  const p = Math.min(scrollY / 160, 1)
  const blur = 4 + p * 12 // 4px -> 16px
  const bgAlpha = 0.4 + p * 0.5 // 0.40 -> 0.90
  const borderAlpha = 0.1 + p * 0.14
  const shadow = p > 0.05 ? `0 10px 30px rgba(0,0,0,${0.12 + p * 0.18})` : 'none'

  return (
    <div className="fixed top-9 left-0 right-0 z-50 flex justify-center px-4 pt-3 md:pt-4">
      <motion.nav
        className="w-full max-w-5xl rounded-2xl overflow-hidden"
        style={{
          background: `rgb(var(--surface) / ${bgAlpha})`,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          border: `1px solid rgb(var(--accent) / ${borderAlpha})`,
          boxShadow: shadow,
        }}
      >
        <div className="px-5 md:px-6 h-16 flex items-center justify-between">
          {/* Left: photo + wordmark */}
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Home">
            <span className="avatar-ring inline-flex">
              <img
                src="/pranav.jpg"
                alt="Pranav"
                width="36"
                height="36"
                fetchpriority="high"
                decoding="async"
                className="h-9 w-9 rounded-full object-cover"
              />
            </span>
            <span
              className="font-display text-[22px] tracking-tight text-heading group-hover:text-accent transition-colors leading-none"
              style={{ fontWeight: 500 }}
            >
              Pranav{' '}
              {SMILE ? (
                <span className="smile-mark relative inline-block w-[0.5em] h-[0.9em] align-baseline">
                  <svg viewBox="0 0 20 20" className="absolute left-0 bottom-[0.06em] w-[0.62em] h-[0.62em] overflow-visible">
                    <circle className="mark-dot" cx="10" cy="14" r="2.8" fill="rgb(var(--accent))" />
                    <path className="mark-grin" pathLength="100" d="M3 8 C 7.5 17, 12.5 17, 17 8" stroke="rgb(var(--accent))" strokeWidth="2.6" strokeLinecap="round" fill="none" />
                  </svg>
                </span>
              ) : (
                <span className="text-accent">.</span>
              )}
            </span>
          </Link>

          {/* Right: nav links + controls */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative text-sm font-medium transition-colors py-1 ${
                    isActive(link.href) ? 'text-accent' : 'text-body hover:text-heading'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link to="/contact" className="btn-primary">
                Book a Call
              </Link>
            </div>
          </div>

          {/* Mobile: theme toggle + menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-heading"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/5"
            >
              <div className="px-5 py-4 space-y-3 flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className={`block py-2 font-medium transition-colors ${
                        isActive(link.href) ? 'text-accent' : 'text-body hover:text-heading'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="pt-2"
                >
                  <Link to="/contact" className="btn-primary justify-center w-full">
                    Book a Call
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  )
}
