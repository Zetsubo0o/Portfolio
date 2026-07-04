import { useEffect } from 'react'

/**
 * SMILE theme delight (UI only):
 *  - Magnetic buttons: .btn-primary / .btn-secondary gently lean toward the cursor.
 *  - Sets window.__smileHover while any button is hovered, so SmileScene widens the grin.
 * Mounted once globally (App) when SMILE is true. Skips touch devices.
 * REVERT: unmounts automatically when SMILE = false (see src/theme.js).
 */
export default function MagneticButtons() {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const SELECTOR = '.btn-primary, .btn-secondary'
    const strength = 0.32
    const maxShift = 14
    let current = null

    const reset = (el) => {
      if (!el) return
      el.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      el.style.transform = ''
    }

    const onMove = (e) => {
      const el = e.target.closest ? e.target.closest(SELECTOR) : null
      if (el !== current) {
        reset(current)
        current = el
        window.__smileHover = !!el
      }
      if (!el) return
      const r = el.getBoundingClientRect()
      let dx = (e.clientX - (r.left + r.width / 2)) * strength
      let dy = (e.clientY - (r.top + r.height / 2)) * strength
      dx = Math.max(-maxShift, Math.min(maxShift, dx))
      dy = Math.max(-maxShift, Math.min(maxShift, dy))
      el.style.transition = 'transform 0.12s ease-out'
      el.style.transform = `translate(${dx}px, ${dy}px)`
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      document.removeEventListener('mousemove', onMove)
      reset(current)
      window.__smileHover = false
    }
  }, [])

  return null
}
