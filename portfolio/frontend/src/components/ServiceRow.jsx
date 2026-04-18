import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'

export default function ServiceRow({ service, index = 0 }) {
  const Icon = service.icon
  const to = service.slug ? `/services/${service.slug}` : '/services'
  const num = String(index + 1).padStart(2, '0')

  return (
    <div>
      <Link
        to={to}
        className="group block rounded-btn border border-white/8 bg-surface-card hover:border-accent/30 hover:bg-white/[0.02] transition-all duration-300 p-6 md:p-8"
      >
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-center">
          {/* Number */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-xl md:text-2xl text-white/25 group-hover:text-accent transition-colors" style={{ fontWeight: 500 }}>
              {num}
            </span>
          </div>

          {/* Icon */}
          <div className="col-span-2 md:col-span-1 flex justify-start">
            <div className="w-11 h-11 rounded-btn bg-accent-light border border-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Icon className="text-accent text-lg" />
            </div>
          </div>

          {/* Title + tagline */}
          <div className="col-span-8 md:col-span-5">
            <h3 className="font-display text-xl md:text-2xl text-heading leading-tight" style={{ fontWeight: 500 }}>
              {service.title}
            </h3>
            {service.tagline && (
              <p className="text-sm text-muted italic mt-1">{service.tagline}</p>
            )}
          </div>

          {/* Timeline + arrow */}
          <div className="hidden md:flex col-span-5 items-center justify-end gap-6">
            {service.timeline && (
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-1">Timeline</p>
                <p className="text-sm text-body">{service.timeline}</p>
              </div>
            )}
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted group-hover:text-accent transition-colors">
              Details
              <FiArrowUpRight className="group-hover:rotate-45 transition-transform" />
            </span>
          </div>

          {/* Mobile arrow */}
          <div className="md:hidden col-span-12 flex items-center justify-between pt-2 mt-2 border-t border-white/5">
            {service.timeline && (
              <span className="text-xs text-muted">{service.timeline}</span>
            )}
            <span className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-accent">
              Details
              <FiArrowUpRight />
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
