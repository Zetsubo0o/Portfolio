import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import Tilt from './Tilt'

export default function ServiceCard({ service }) {
  const Icon = service.icon
  const to = service.slug ? `/services/${service.slug}` : '/services'

  return (
    <Tilt max={5} className="h-full">
      <Link
        to={to}
        className="block rounded-btn border border-white/8 bg-surface-card hover:border-accent/30 transition-colors p-7 h-full flex flex-col group"
      >
        {/* Icon + arrow */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-10 h-10 rounded-btn bg-accent-light border border-accent/20 flex items-center justify-center">
            <Icon className="text-accent text-lg" />
          </div>
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.25em] text-muted group-hover:text-accent transition-colors">
            Details
            <FiArrowUpRight className="group-hover:rotate-45 transition-transform" />
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl text-heading leading-tight mb-1.5" style={{ fontWeight: 500 }}>
          {service.title}
        </h3>

        {/* Tagline */}
        {service.tagline && (
          <p className="text-xs text-accent italic mb-4">
            {service.tagline}
          </p>
        )}

        {/* Description */}
        <p className="text-xs text-body leading-relaxed mb-6 line-clamp-3">
          {service.description}
        </p>

        {/* What's included */}
        {service.whatsIncluded && (
          <div className="mb-6 flex-grow">
            <p className="text-[10px] font-semibold text-muted uppercase tracking-[0.25em] mb-3">
              What's Included
            </p>
            <ul className="space-y-2">
              {service.whatsIncluded.slice(0, 3).map((item, i) => (
                <li key={i} className="text-xs text-body flex items-start gap-2 leading-relaxed">
                  <span className="text-accent mt-1 text-[7px]">●</span>
                  <span>{item}</span>
                </li>
              ))}
              {service.whatsIncluded.length > 3 && (
                <li className="text-[11px] text-muted pl-4">
                  +{service.whatsIncluded.length - 3} more
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Footer: live quote + timeline */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold text-muted uppercase tracking-[0.25em] mb-0.5">Pricing</p>
            <p className="text-xs text-accent italic" style={{ fontWeight: 500 }}>Get a live quote →</p>
          </div>
          {service.timeline && (
            <div className="text-right">
              <p className="text-[10px] font-semibold text-muted uppercase tracking-[0.25em] mb-0.5">Timeline</p>
              <p className="text-xs text-body">{service.timeline}</p>
            </div>
          )}
        </div>
      </Link>
    </Tilt>
  )
}
