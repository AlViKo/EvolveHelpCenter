import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { fetchSearch } from '../api.ts'
import type { SearchResult } from '../types.ts'
import PageSearchBar from '../components/PageSearchBar.tsx'
import { useConfig } from '../config.tsx'

export default function SearchPage() {
  const { t } = useConfig()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const [results, setResults] = useState<SearchResult[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setCount(0)
      setLoading(false)
      return
    }
    setLoading(true)
    fetchSearch(query).then((data) => {
      setResults(data.results)
      setCount(data.count)
      setLoading(false)
    })
  }, [query])

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page-container">
      <PageSearchBar initial={query} />
      <div className="search-header">
        <h1>{t.searchResults} &ldquo;{query}&rdquo;</h1>
        <div className="count">
          {count} {count === 1 ? t.article : t.articles} {t.found}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="empty-state">
          {t.noResults} &ldquo;{query}&rdquo;. {t.tryDifferent}{' '}
          <Link to="/">{t.browseAll}</Link>.
        </div>
      ) : (
        <div>
          {results.map((r) => (
            <div key={`${r.collection_slug}/${r.slug}`} className="search-result">
              <div className="search-result-title">
                <Link to={`/collections/${r.collection_slug}/${r.slug}`}>{r.title}</Link>
              </div>
              <div className="search-result-desc">{r.description}</div>
              <div className="search-result-meta">
                <Link to={`/collections/${r.collection_slug}`}>{r.collection_title}</Link>
                <span className={`badge ${r.audience === 'admin' ? 'badge-admin' : 'badge-learner'}`}>
                  {r.audience === 'admin' ? 'Admin' : 'Learner'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
