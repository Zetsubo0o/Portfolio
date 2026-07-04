import { useRef } from 'react'

/**
 * Subtle 3D tilt-on-hover wrapper (cursor-following perspective).
 * Pure CSS transforms, no dependencies.
 */
export default function Tilt({ children, max = 7, className = '' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  )
}
