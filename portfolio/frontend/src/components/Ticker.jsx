const items = [
  'Now booking new projects — spots are limited',
  'Fixed-price quote within 24 hours, no commitment',
  'Custom builds delivered in weeks, not months',
  'Production-grade backends, SaaS & AI features',
  'Working across US · EU · APAC timezones',
  'Milestone-based billing — low risk, full transparency',
  'Free 15-minute discovery call to scope your idea',
]

/**
 * Announcement ticker pinned above the navbar.
 * Two identical halves scroll left forever (see .ticker-track in index.css).
 */
export default function Ticker() {
  const half = [...items, ...items, ...items]
  return (
    <div
      className="fixed top-0 inset-x-0 z-[60] h-9 overflow-hidden"
      style={{ background: 'rgb(var(--accent))' }}
      aria-hidden="true"
    >
      <div className="ticker-track flex items-center h-full w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center shrink-0">
            {half.map((t, i) => (
              <span
                key={i}
                className="flex items-center h-9 text-[11px] md:text-xs font-semibold tracking-wide whitespace-nowrap"
                style={{ color: 'rgb(var(--surface))' }}
              >
                <span className="px-5">{t}</span>
                <span className="opacity-50">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
