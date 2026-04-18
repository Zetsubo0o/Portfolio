import { useEffect, useRef } from 'react'

export default function CursorBlob() {
  const blobRef = useRef(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const isTouchDevice = useRef(false)

  useEffect(() => {
    // Check if device is touch-enabled
    isTouchDevice.current =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches

    if (isTouchDevice.current) return

    const handleMouseMove = (e) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY

      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${e.clientX - 50}px, ${e.clientY - 50}px)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (isTouchDevice.current) return null

  return (
    <div
      ref={blobRef}
      className="fixed w-24 h-24 pointer-events-none z-10 mix-blend-screen"
      style={{
        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
        filter: 'blur(40px)',
        borderRadius: '50%',
        willChange: 'transform',
      }}
    />
  )
}
