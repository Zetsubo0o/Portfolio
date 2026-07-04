import { motion } from 'framer-motion'
import { SMILE } from '../theme.js'

/**
 * Route transition — a quick, clean fade (with a slight rise in SMILE mode).
 */
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: SMILE ? 12 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: SMILE ? -6 : 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
