import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { fetchCollection } from '../api.ts'
import type { CollectionDetail } from '../types.ts'
import CollectionIcon from '../components/CollectionIcon.tsx'
import PageSearchBar from '../components/PageSearchBar.tsx'

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>()
  const [collection, setCollection] = useState<CollectionDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    fetchCollection(slug).then((data) => {
      setCollection(data)
      setLoading(false)
    })
  }, [slug])

  if (loading) return <div className="loading">Loading...</div>
  if (!collection) return <div className="loading">Collection not found.</div>

  return (
    <div className="page-container">
      <PageSearchBar />
      <nav className="breadcrumbs">
        <Link to="/">All Collections</Link>
        <span className="separator">&gt;</span>
        <span className="current">{collection.title}</span>
      </nav>

      <div className="collection-header">
        <div className="collection-icon">
          <CollectionIcon name={collection.icon} size={24} />
        </div>
        <h1>{collection.title}</h1>
        <p>{collection.description}</p>
        <div className="meta">
          {collection.article_count} {collection.article_count === 1 ? 'article' : 'articles'}
        </div>
      </div>

      {collection.articles.length === 0 ? (
        <div className="empty-state">Articles coming soon. Check back later.</div>
      ) : (
        <ul className="article-list">
          {collection.articles.map((article) => (
            <li key={article.slug} className="article-list-item">
              <Link to={`/collections/${slug}/${article.slug}`}>
                <span>{article.title}</span>
                <ChevronRight size={16} className="chevron" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
