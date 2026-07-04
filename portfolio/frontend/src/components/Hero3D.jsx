import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * 3D hero backdrop: gold wireframe torus knot + drifting particles,
 * slow rotation with mouse parallax. Colors follow the theme's --accent
 * CSS variable (updates live when the theme toggles).
 *
 * REVERT: delete this file, remove the Hero3D import/usage in Home.jsx,
 * and run `npm uninstall three`. Nothing else depends on it.
 */
export default function Hero3D() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 100)
    camera.position.z = 11

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
    el.appendChild(renderer.domElement)

    const accent = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim()
        .split(/\s+/)
        .map(Number)
      return new THREE.Color(v[0] / 255, v[1] / 255, v[2] / 255)
    }

    // SMILE theme sits on a light backdrop, so the wireframe needs a touch more presence
    const isSmile = () => document.documentElement.classList.contains('smile')
    const knotOpacity = () => (isSmile() ? 0.16 : 0.08)
    const pointOpacity = () => (isSmile() ? 0.5 : 0.35)

    const knotGeo = new THREE.TorusKnotGeometry(2.3, 0.65, 140, 18)
    const knotMat = new THREE.MeshBasicMaterial({
      color: accent(),
      wireframe: true,
      transparent: true,
      opacity: knotOpacity(),
    })
    const knot = new THREE.Mesh(knotGeo, knotMat)
    scene.add(knot)

    const N = 320
    const positions = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const r = 4 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi) - 2
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pMat = new THREE.PointsMaterial({
      color: accent(),
      size: 0.035,
      transparent: true,
      opacity: pointOpacity(),
    })
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
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // Re-tint when the light/dark class flips on <html>
    const observer = new MutationObserver(() => {
      const c = accent()
      knotMat.color = c
      pMat.color = c
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    let raf
    const clock = new THREE.Clock()
    const tick = () => {
      const t = clock.getElapsedTime()
      knot.rotation.x = t * 0.07 + my * 0.35
      knot.rotation.y = t * 0.11 + mx * 0.55
      points.rotation.y = t * 0.02 + mx * 0.2
      points.rotation.x = my * 0.15
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      knotGeo.dispose()
      knotMat.dispose()
      pGeo.dispose()
      pMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={ref} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
}
