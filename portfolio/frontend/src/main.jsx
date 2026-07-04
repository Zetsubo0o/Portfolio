import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SMILE } from './theme.js'
import './index.css'

// SMILE theme kill switch — flip SMILE in src/theme.js to false to revert.
if (SMILE) {
  const root = document.documentElement
  root.classList.add('smile')
  // Default mode comes from <html data-default-theme="…"> in index.html.
  // A visitor's saved toggle choice (localStorage "theme") overrides it.
  const def = root.getAttribute('data-default-theme') || 'dark'
  const saved = localStorage.getItem('theme') // 'light' | 'dark' | null
  const isLight = saved ? saved === 'light' : def === 'light'
  root.classList.toggle('light', isLight)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', isLight ? '#FFFAEE' : '#1A120C')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
