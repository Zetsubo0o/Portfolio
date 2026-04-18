import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RotatingText({ words, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [words, interval])

  return (
    <div className="h-12 md:h-16 flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="text-2xl md:text-4xl font-serif font-bold text-gray-300"
        >
          {words[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
