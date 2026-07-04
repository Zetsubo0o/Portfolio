import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import TechBadge from './TechBadge'
import Tilt from './Tilt'

export default function ProjectCard({ project }) {
  const to = project.slug ? `/projects/${project.slug}` : '/projects'

  return (
    <Tilt max={5} className="h-full">
      <Link
        to={to}
        className="block rounded-btn border border-white/8 bg-surface-card hover:border-accent/25 transition-all duration-300 p-6 md:p-7 h-full flex flex-col group"
      >
        {/* Header: number + badge + arrow */}
        <div className="flex items-center justify-between mb-5">
          <span className="font-display text-3xl text-surface-muted leading-none group-hover:text-accent transition-colors">
            {project.number}
          </span>
          <div className="flex items-center gap-3">
            {project.badge && (
              <span className="text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-btn border border-white/8 text-body">
                {project.badge}
              </span>
            )}
            <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.25em] text-muted group-hover:text-accent transition-colors">
              Case study
              <FiArrowUpRight className="group-hover:rotate-45 transition-transform" />
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl md:text-2xl text-heading leading-tight mb-2" style={{ fontWeight: 500 }}>
          {project.title}
        </h3>

        {/* Tagline */}
        {project.tagline && (
          <p className="text-xs text-muted leading-relaxed mb-4 italic">
            {project.tagline}
          </p>
        )}

        {/* Challenge + Solution side by side */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-[10px] font-semibold text-accent uppercase tracking-[0.25em] mb-1.5">
              Challenge
            </p>
            <p className="text-xs text-body leading-relaxed line-clamp-3">
              {project.challenge}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-accent uppercase tracking-[0.25em] mb-1.5">
              Solution
            </p>
            <p className="text-xs text-body leading-relaxed line-clamp-3">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4 mb-4">
            {project.metrics.map((m, i) => (
              <div key={i}>
                <div className="font-display text-lg text-heading leading-none" style={{ fontWeight: 500 }}>
                  {m.value}
                </div>
                <div className="text-[10px] text-muted mt-1 leading-tight">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.stack.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>

        {/* Read more indicator */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-accent italic" style={{ fontWeight: 500 }}>Read the full case study</span>
          <FiArrowUpRight className="text-accent text-sm group-hover:rotate-45 transition-transform" />
        </div>
      </Link>
    </Tilt>
  )
}
