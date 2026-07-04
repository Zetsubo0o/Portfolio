import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://pranavkumar.dev'

/**
 * Sets per-route title, meta description, canonical and Open Graph tags.
 * Googlebot executes JS, so this gets each route indexed with its own
 * title/description instead of the single index.html defaults.
 */
export default function usePageMeta(title, description) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (title) document.title = title

    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector)
      if (el && value) el.setAttribute(attr, value)
    }

    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)

    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname}`
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:url"]', 'content', url)
  }, [title, description, pathname])
}
