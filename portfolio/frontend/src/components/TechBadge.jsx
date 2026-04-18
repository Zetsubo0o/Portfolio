export default function TechBadge({ tech }) {
  return (
    <span className="px-3 py-1 text-xs font-medium bg-white/[0.04] border border-white/8 text-body rounded-full hover:border-accent/40 hover:text-heading transition-colors">
      {tech}
    </span>
  )
}
