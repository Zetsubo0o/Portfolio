import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * SMILE theme 3D backdrop — a refined, luminous smile drawn as a thin light
 * stroke (soft bloom halo + orange body + fine gold core), with drifting
 * light-dust. Elegant and subtle, never heavy. Mounted once globally (App).
 * Reads --accent / --accent-secondary and re-tints on the theme flip.
 *
 * REVERT: renders only when SMILE is true (src/theme.js). SMILE = false unmounts it.
 */
export default function SmileScene() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    const w = () => el.clientWidth
    const h = () => el.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w() / h(), 0.1, 100)
    camera.position.z = 14

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(w(), h())
    el.appendChild(renderer.domElement)

    const cssColor = (name) => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim()
        .split(/\s+/)
        .map(Number)
      return new THREE.Color(v[0] / 255, v[1] / 255, v[2] / 255)
    }
    const accent = () => cssColor('--accent')
    const gold = () => cssColor('--accent-secondary')

    // Smile curve (dips in the middle, ends turn up = a grin).
    const makeCurve = (width, lift) => {
      const pts = []
      const seg = 48
      for (let i = 0; i <= seg; i++) {
        const t = i / seg
        pts.push(new THREE.Vector3((t - 0.5) * width, -Math.sin(t * Math.PI) * lift, 0))
      }
      return new THREE.CatmullRomCurve3(pts)
    }
    const tube = (curve, radius) => new THREE.TubeGeometry(curve, 120, radius, 18, false)

    const mainCurve = makeCurve(11, 3.0)
    const echoCurve = makeCurve(12.4, 3.4)

    const smile = new THREE.Group()
    smile.position.y = 1.0 // nest content inside the grin

    const accentMats = []
    const goldMats = []
    const addTube = (curve, radius, color, op, bucket) => {
      const mat = new THREE.MeshBasicMaterial({
        color: color(),
        transparent: true,
        opacity: op,
        depthWrite: false,
      })
      bucket.push(mat)
      smile.add(new THREE.Mesh(tube(curve, radius), mat))
      return mat
    }

    // Thin, layered light stroke — a soft bloom, a slim orange body, and a fine gold core.
    const haloMat = addTube(mainCurve, 0.42, accent, 0.09, accentMats) // outer glow bloom
    addTube(mainCurve, 0.19, accent, 0.14, accentMats)                 // inner glow
    addTube(mainCurve, 0.08, accent, 0.4, accentMats)                  // orange body
    addTube(mainCurve, 0.032, gold, 0.85, goldMats)                    // fine gold core
    addTube(echoCurve, 0.025, accent, 0.2, accentMats)                 // whisper-thin echo

    const group = new THREE.Group()
    group.add(smile)
    scene.add(group)

    // Warm light-dust particles.
    const N = 200
    const positions = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pMat = new THREE.PointsMaterial({ color: accent(), size: 0.055, transparent: true, opacity: 0.45 })
    const points = new THREE.Points(pGeo, pMat)
    scene.add(points)

    let mx = 0
    let my = 0
    const onMouse = (e) => {
      mx = e.clientX / window.innerWidth - 0.5
      my = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const onResize = () => {
      camera.aspect = w() / h()
      camera.updateProjectionMatrix()
      renderer.setSize(w(), h())
    }
    window.addEventListener('resize', onResize)

    const observer = new MutationObserver(() => {
      const a = accent()
      const g = gold()
      accentMats.forEach((m) => (m.color = a))
      goldMats.forEach((m) => (m.color = g))
      pMat.color = a
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    let raf = null
    let visible = true
    let curGrin = 1
    const baseY = 1.0
    const clock = new THREE.Clock()

    // Pause the render loop entirely while the hero is scrolled out of view —
    // no point burning GPU on a smile nobody can see.
    const visObserver = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting
        if (visible && raf == null) tick()
      },
      { threshold: 0 }
    )
    visObserver.observe(el)

    const tick = () => {
      if (!visible) {
        raf = null
        return
      }
      const t = clock.getElapsedTime()
      group.rotation.x = my * 0.09
      group.rotation.y = mx * 0.11
      group.position.y = baseY + Math.sin(t * 0.5) * 0.16

      // Smile widens toward the cursor + on button hover.
      const hoverBoost = window.__smileHover ? 0.22 : 0
      const targetGrin = 1.08 - my * 0.44 + hoverBoost + Math.sin(t * 0.5) * 0.03
      curGrin += (targetGrin - curGrin) * 0.06
      group.scale.y = curGrin

      // Gentle breathing bloom.
      haloMat.opacity = 0.07 + (Math.sin(t * 0.8) * 0.5 + 0.5) * 0.06

      points.rotation.y = t * 0.01 + mx * 0.09
      points.rotation.x = my * 0.07
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      if (raf != null) cancelAnimationFrame(raf)
      observer.disconnect()
      visObserver.disconnect()
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose()
        if (o.material) o.material.dispose()
      })
      pGeo.dispose()
      pMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={ref} className="smile-scene-layer absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />
}
