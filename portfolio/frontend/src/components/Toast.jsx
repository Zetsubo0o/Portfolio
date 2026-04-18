import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiAlertCircle, FiX } from 'react-icons/fi'

export default function Toast({ toasts, onRemove }) {
  return (
    <AnimatePresence>
      {toasts.map((toast) => {
        const Icon = toast.type === 'success' ? FiCheck : FiAlertCircle
        const bgColor = toast.type === 'success' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'
        const iconColor = toast.type === 'success' ? 'text-green-400' : 'text-red-400'

        return (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg border bg-surface-card shadow-lg ${bgColor} max-w-sm z-50`}
          >
            <Icon className={`${iconColor} flex-shrink-0`} size={20} />
            <p className="text-sm text-body flex-grow">
              {toast.message}
            </p>
            <button
              onClick={() => onRemove(toast.id)}
              className="text-muted hover:text-heading transition-colors ml-2"
            >
              <FiX size={16} />
            </button>
          </motion.div>
        )
      })}
    </AnimatePresence>
  )
}
