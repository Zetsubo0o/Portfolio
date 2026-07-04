import { useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { SMILE } from '../theme.js'

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains('light')
  )

  const toggle = () => {
    const next = !isLight
    setIsLight(next)
    document.documentElement.classList.toggle('light', next)
    localStorage.setItem('theme', next ? 'light' : 'dark')
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      const lightHex = SMILE ? '#FFFAEE' : '#FAF9F6'
      const darkHex = SMILE ? '#1A120C' : '#0A1628'
      meta.setAttribute('content', next ? lightHex : darkHex)
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className="p-2 rounded-lg border border-white/10 text-body hover:text-accent hover:border-accent/40 transition-colors"
    >
      {isLight ? <FiMoon size={16} /> : <FiSun size={16} />}
    </button>
  )
}
