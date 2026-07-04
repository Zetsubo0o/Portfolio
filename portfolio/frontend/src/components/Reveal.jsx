import { motion } from 'framer-motion'

/**
 * Elegant scroll-reveal: children rise + fade in once as they enter the viewport.
 * A consistent, premium entrance used across section headers.
 */
export default function Reveal({ children, y = 26, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
