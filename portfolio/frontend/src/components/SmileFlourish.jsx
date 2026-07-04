import { SMILE } from '../theme.js'

/**
 * A small smile-arc that draws itself on — the SMILE signature under a heading.
 * Renders nothing unless the SMILE theme is active. (.smile-arc adds the
 * draw animation + glow in index.css.)
 */
export default function SmileFlourish({ className = '' }) {
  if (!SMILE) return null
  return (
    <svg
      className={`smile-arc ${className}`}
      width="150"
      height="24"
      viewBox="0 0 200 24"
      fill="none"
      aria-hidden="true"
    >
      <path pathLength="100" d="M6 6 C 60 30, 140 30, 194 6" stroke="rgb(var(--accent))" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}
