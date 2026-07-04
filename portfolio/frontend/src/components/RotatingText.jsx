import { useState, useEffect } from 'react'

/**
 * Typewriter that types a phrase, pauses, deletes it, then moves to the next.
 * Used for the gold rotating subline in the hero.
 */
export default function RotatingText({
  words,
  typingSpeed = 55,
  deletingSpeed = 30,
  pause = 1600,
  className = '',
}) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index]

    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }

    if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }

    const t = setTimeout(
      () => setSubIndex((s) => s + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed
    )
    return () => clearTimeout(t)
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pause])

  return (
    <span className={className} aria-live="polite">
      {words[index].substring(0, subIndex)}
      <span className="text-accent/70 animate-pulse">|</span>
    </span>
  )
}
