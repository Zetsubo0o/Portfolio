import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'

const MotionLink = motion(Link)

/**
 * Editorial full-width project row for the Home page.
 * Sized to match ServiceRow: hairline-separated, compact, one key metric inline.
 */
export default function ProjectRow({ project, index = 0 }) {
  const num = String(index + 1).padStart(2, '0')
  const metric = (project.metrics || [])[0]

  return (
    <MotionLink
      to={`/projects/${project.slug}`}
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
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-display text-xl md:text-2xl text-heading leading-tight group-hover:text-accent transition-colors" style={{ fontWeight: 500 }}>
            {project.title}
          </h3>
          {project.badge && (
            <span className="hidden lg:inline text-[10px] uppercase tracking-[0.2em] text-accent shrink-0">
              {project.badge}
            </span>
          )}
        </div>
        {project.tagline && (
          <p className="text-sm text-muted italic">{project.tagline}</p>
        )}
      </div>

      {/* One key metric */}
      <div className="hidden md:block md:col-span-3 text-right">
        {metric && (
          <>
            <p className="font-display text-xl text-heading leading-none" style={{ fontWeight: 500 }}>
              {metric.value}
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted mt-1">{metric.label}</p>
          </>
        )}
      </div>

      {/* Arrow */}
      <div className="hidden md:flex md:col-span-1 justify-end pr-1">
        <FiArrowUpRight className="text-muted group-hover:text-accent group-hover:rotate-45 transition-all text-xl shrink-0" />
      </div>
    </MotionLink>
  )
}
