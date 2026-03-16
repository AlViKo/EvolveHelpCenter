import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { fetchLanding } from '../api.ts'
import type { CollectionSummary } from '../types.ts'
import CollectionIcon from '../components/CollectionIcon.tsx'

export default function HomePage() {
  const [adminCollections, setAdminCollections] = useState<CollectionSummary[]>([])
  const [userCollections, setUserCollections] = useState<CollectionSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchLanding().then((data) => {
      setAdminCollections(data.admin_collections)
      setUserCollections(data.user_collections)
      setLoading(false)
    })
  }, [])

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    const trimmed = q.trim()
    if (trimmed.length >= 2) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    }
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <>
      <div className="hero">
        <h1>Evolve Help Center</h1>
        <form className="hero-search" onSubmit={handleSearch}>
          <Search size={20} className="hero-search-icon" />
          <input
            type="text"
            placeholder="Search for articles..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>
      </div>

      <div className="content-wrapper">
        <section className="section">
          <h2 className="section-title">For Administrators</h2>
          <div className="cards-grid">
            {adminCollections.map((c) => (
              <CollectionCard key={c.slug} collection={c} />
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">For Learners</h2>
          <div className="cards-grid">
            {userCollections.map((c) => (
              <CollectionCard key={c.slug} collection={c} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

function CollectionCard({ collection }: { collection: CollectionSummary }) {
  return (
    <Link to={`/collections/${collection.slug}`} className="card">
      <div className="card-icon">
        <CollectionIcon name={collection.icon} size={20} />
      </div>
      <div className="card-title">{collection.title}</div>
      <div className="card-description">{collection.description}</div>
      <div className="card-meta">
        {collection.article_count} {collection.article_count === 1 ? 'article' : 'articles'}
      </div>
    </Link>
  )
}
