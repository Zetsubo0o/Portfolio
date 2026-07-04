import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'

const MotionLink = motion(Link)

export default function ServiceRow({ service, index = 0 }) {
  const to = service.slug ? `/services/${service.slug}` : '/services'
  const num = String(index + 1).padStart(2, '0')

  return (
    <MotionLink
      to={to}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="smile-row group grid grid-cols-12 gap-4 md:gap-6 items-center py-5 md:py-6 px-2 -mx-2 border-b border-white/8 hover:bg-white/[0.02] transition-colors"
    >
      {/* Number */}
      <div className="col-span-2 md:col-span-1">
        <span className="font-display text-base md:text-lg text-muted" style={{ fontWeight: 500 }}>
          {num}
        </span>
      </div>

      {/* Title + tagline */}
      <div className="col-span-10 md:col-span-7">
        <h3 className="font-display text-xl md:text-2xl text-heading leading-tight group-hover:text-accent transition-colors" style={{ fontWeight: 500 }}>
          {service.title}
        </h3>
        {service.tagline && (
          <p className="text-sm text-muted italic mt-1">{service.tagline}</p>
        )}
        {service.timeline && (
          <p className="md:hidden text-xs text-muted mt-1.5">{service.timeline}</p>
        )}
      </div>

      {/* Timeline */}
      <div className="hidden md:block md:col-span-3 text-right">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-1">Timeline</p>
        <p className="text-sm text-body">{service.timeline}</p>
      </div>

      {/* Plus */}
      <div className="hidden md:flex md:col-span-1 justify-end pr-1">
        <FiPlus className="text-accent text-2xl group-hover:rotate-90 transition-transform duration-300" />
      </div>
    </MotionLink>
  )
}
