import { useEffect, useState } from 'react'

export interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

export function extractHeadings(markdown: string): TocEntry[] {
  const entries: TocEntry[] = []
  const regex = /^(#{2,3})\s+(.+)$/gm
  let match: RegExpExecArray | null
  while ((match = regex.exec(markdown)) !== null) {
    const level = match[1].length as 2 | 3
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
    entries.push({ id, text, level })
  }
  return entries
}

const MIN_HEADINGS = 3

export default function TableOfContents({ headings }: { headings: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>('')
  const [collapsed, setCollapsed] = useState(true)

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < MIN_HEADINGS) return null

  function handleClick(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
      setCollapsed(true)
    }
  }

  return (
    <>
      {/* Mobile: collapsible block above article */}
      <nav className="toc-mobile">
        <button
          className="toc-mobile-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          Table of contents
          <span className={`toc-chevron ${collapsed ? '' : 'open'}`}>&#9662;</span>
        </button>
        {!collapsed && (
          <ul className="toc-list">
            {headings.map((h) => (
              <li key={h.id} className={`toc-item toc-level-${h.level}`}>
                <button
                  className={`toc-link ${activeId === h.id ? 'active' : ''}`}
                  onClick={() => handleClick(h.id)}
                >
                  {h.text}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Desktop: sticky sidebar */}
      <nav className="toc-sidebar">
        <div className="toc-sidebar-title">Table of contents</div>
        <ul className="toc-list">
          {headings.map((h) => (
            <li key={h.id} className={`toc-item toc-level-${h.level}`}>
              <button
                className={`toc-link ${activeId === h.id ? 'active' : ''}`}
                onClick={() => handleClick(h.id)}
              >
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
