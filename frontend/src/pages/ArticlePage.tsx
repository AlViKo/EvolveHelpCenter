import { useEffect, useState, useMemo, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { fetchArticle } from '../api.ts'
import type { ArticleDetail } from '../types.ts'
import PageSearchBar from '../components/PageSearchBar.tsx'
import { TocMobile, TocSidebar, extractHeadings } from '../components/TableOfContents.tsx'
import { useConfig } from '../config.tsx'

const VIDEO_PATTERNS: [RegExp, (m: RegExpMatchArray) => string][] = [
  [/^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/, (m) => `https://www.youtube.com/embed/${m[1]}`],
  [/^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/, (m) => `https://www.youtube.com/embed/${m[1]}`],
  [/^https?:\/\/(?:www\.)?vimeo\.com\/(\d+)/, (m) => `https://player.vimeo.com/video/${m[1]}`],
  [/^https?:\/\/(?:www\.)?loom\.com\/share\/([a-zA-Z0-9]+)/, (m) => `https://www.loom.com/embed/${m[1]}`],
]

function parseVideoEmbed(children: ReactNode): ReactNode | null {
  if (!children) return null
  const childArr = Array.isArray(children) ? children : [children]
  if (childArr.length !== 1) return null
  const child = childArr[0]

  // Check for a plain text URL or an <a> wrapping a URL
  let url: string | null = null
  if (typeof child === 'string') {
    url = child.trim()
  } else if (
    child &&
    typeof child === 'object' &&
    'props' in child &&
    child.type === 'a' &&
    typeof child.props.href === 'string' &&
    typeof child.props.children === 'string'
  ) {
    url = child.props.href.trim()
  }

  if (!url) return null

  for (const [pattern, toEmbed] of VIDEO_PATTERNS) {
    const match = url.match(pattern)
    if (match) {
      const embedUrl = toEmbed(match)
      return (
        <div className="md-video">
          <iframe
            src={embedUrl}
            title="Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    }
  }
  return null
}

function ArticleImage({ src, alt }: { src?: string; alt?: string }) {
  return (
    <figure className="md-figure">
      <img src={src} alt={alt || ''} loading="lazy" />
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  )
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

function HeadingRenderer({
  level,
  children,
}: {
  level: number
  children: ReactNode
}) {
  const text =
    typeof children === 'string'
      ? children
      : Array.isArray(children)
        ? children.map((c) => (typeof c === 'string' ? c : '')).join('')
        : ''
  const id = slugify(text)
  if (level === 1) return <h1 id={id}>{children}</h1>
  if (level === 2) return <h2 id={id}>{children}</h2>
  if (level === 3) return <h3 id={id}>{children}</h3>
  if (level === 4) return <h4 id={id}>{children}</h4>
  return <h5 id={id}>{children}</h5>
}

export default function ArticlePage() {
  const { t, locale } = useConfig()
  const { slug, articleSlug } = useParams<{ slug: string; articleSlug: string }>()
  const [article, setArticle] = useState<ArticleDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)

  useEffect(() => {
    if (!slug || !articleSlug) return
    setLoading(true)
    setFeedback(null)
    fetchArticle(slug, articleSlug).then((data) => {
      setArticle(data)
      setLoading(false)
    })
  }, [slug, articleSlug])

  const headings = useMemo(
    () => (article ? extractHeadings(article.body_markdown) : []),
    [article],
  )

  const hasToc = headings.length >= 3

  if (loading) return <div className="loading">Loading...</div>
  if (!article) return <div className="loading">Article not found.</div>

  const badgeClass =
    article.content_type === 'faq'
      ? 'badge badge-faq'
      : article.content_type === 'overview'
        ? 'badge badge-overview'
        : 'badge badge-guide'

  const markdownComponents = {
    h1: ({ children }: { children?: ReactNode }) => (
      <HeadingRenderer level={1}>{children}</HeadingRenderer>
    ),
    h2: ({ children }: { children?: ReactNode }) => (
      <HeadingRenderer level={2}>{children}</HeadingRenderer>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <HeadingRenderer level={3}>{children}</HeadingRenderer>
    ),
    img: ArticleImage,
    p: ({ children }: { children?: ReactNode }) => {
      const embed = parseVideoEmbed(children)
      if (embed) return embed
      // react-markdown wraps standalone images in <p>. Our img
      // component returns <figure> (block) — nesting that inside
      // <p> is invalid HTML, causing browsers to render a gap.
      // Detect: if any child was rendered by ArticleImage, unwrap.
      const childArr = Array.isArray(children) ? children : [children]
      const hasImage = childArr.some(
        (c) => c != null && typeof c === 'object' && 'type' in c && (c as any).type === ArticleImage
      )
      if (hasImage) return <>{children}</>
      return <p>{children}</p>
    },
  }

  return (
    <div className={`page-container ${hasToc ? 'page-container--with-toc' : ''}`}>
      <PageSearchBar />
      <nav className="breadcrumbs">
        <Link to="/">{t.allCollections}</Link>
        <span className="separator">&gt;</span>
        <Link to={`/collections/${article.collection_slug}`}>{article.collection_title}</Link>
        <span className="separator">&gt;</span>
        <span className="current">{article.title}</span>
      </nav>

      <div className="article-header">
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span className={badgeClass}>{article.content_type}</span>
          <span>{t.writtenBy} {article.author}</span>
          <span>&middot;</span>
          <span>{t.updatedOn} {formatDate(article.updated_at, locale)}</span>
        </div>
      </div>

      {hasToc && <TocMobile headings={headings} />}

      <div className="article-body-wrap">
        {hasToc && <TocSidebar headings={headings} />}
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{article.body_markdown}</ReactMarkdown>
        </div>

        <div className="feedback-widget">
          <p>{t.didThisAnswer}</p>
          <div className="feedback-buttons">
            <button
              className={`feedback-btn ${feedback === 'up' ? 'selected' : ''}`}
              onClick={() => setFeedback('up')}
            >
              <ThumbsUp size={16} /> {t.yes}
            </button>
            <button
              className={`feedback-btn ${feedback === 'down' ? 'selected' : ''}`}
              onClick={() => setFeedback('down')}
            >
              <ThumbsDown size={16} /> {t.no}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  const loc = locale === 'ru' ? 'ru-RU' : 'en-US'
  return d.toLocaleDateString(loc, { year: 'numeric', month: 'long', day: 'numeric' })
}
