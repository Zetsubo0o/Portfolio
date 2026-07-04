import { useEffect, useRef } from 'react'

/**
 * SMILE theme signature delight — a lightweight canvas particle layer that:
 *  - trails a soft golden spark behind the cursor as it moves, and
 *  - bursts a small shower of gold sparks on every click.
 *
 * One full-screen fixed canvas, pointer-events: none, so it never blocks UI.
 * Tuned to be cheap: capped DPR, throttled trail, rAF runs only while there
 * are live particles. Skips touch devices and respects prefers-reduced-motion.
 * Reads the live --accent / --accent-secondary tokens so it re-tints with the
 * theme flip. Mounted once globally (App) when SMILE is true.
 * REVERT: unmounts automatically when SMILE = false (see src/theme.js).
 */
export default function SmileCursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const readColor = (name) => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim()
        .split(/\s+/)
        .map(Number)
      return v.length === 3 ? `${v[0]}, ${v[1]}, ${v[2]}` : '249, 130, 40'
    }
    let accent = readColor('--accent')
    let gold = readColor('--accent-secondary')
    const themeObserver = new MutationObserver(() => {
      accent = readColor('--accent')
      gold = readColor('--accent-secondary')
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    /** @type {Array<any>} */
    const particles = []
    let raf = null

    const spawnSpark = (x, y, opts = {}) => {
      const ang = opts.angle ?? Math.random() * Math.PI * 2
      const spd = opts.speed ?? Math.random() * 1.2
      particles.push({
        type: 'spark',
        x,
        y,
        vx: Math.cos(ang) * spd + (opts.vx || 0),
        vy: Math.sin(ang) * spd + (opts.vy || 0),
        life: 1,
        decay: opts.decay ?? 0.02 + Math.random() * 0.02,
        size: opts.size ?? 1.5 + Math.random() * 2.5,
        color: Math.random() > 0.5 ? accent : gold,
        gravity: opts.gravity ?? 0,
      })
    }

    const ensureLoop = () => {
      if (raf == null) raf = requestAnimationFrame(tick)
    }

    // Gentle sparkle trail — throttled so it stays subtle.
    let lastTrail = 0
    const onMove = (e) => {
      const now = performance.now()
      if (now - lastTrail < 38) return
      lastTrail = now
      spawnSpark(e.clientX, e.clientY, {
        speed: 0.4 + Math.random() * 0.4,
        decay: 0.03 + Math.random() * 0.02,
        size: 1 + Math.random() * 2,
      })
      ensureLoop()
    }

    // Click burst — a small, tasteful shower of gold sparks.
    const onDown = (e) => {
      const n = 10
      for (let i = 0; i < n; i++) {
        const ang = (Math.PI * 2 * i) / n + Math.random() * 0.4
        spawnSpark(e.clientX, e.clientY, {
          angle: ang,
          speed: 2 + Math.random() * 3,
          decay: 0.02 + Math.random() * 0.015,
          size: 2 + Math.random() * 2.5,
          gravity: 0.08,
        })
      }
      ensureLoop()
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.vy += p.gravity
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        const a = Math.max(0, p.life)
        ctx.beginPath()
        ctx.fillStyle = `rgba(${p.color}, ${a})`
        ctx.shadowBlur = 10
        ctx.shadowColor = `rgba(${p.color}, ${a})`
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      if (particles.length > 0) {
        raf = requestAnimationFrame(tick)
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        raf = null
      }
    }

    return () => {
      if (raf != null) cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('pointerdown', onDown)
      themeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[60]"
      aria-hidden="true"
    />
  )
}
