import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function PageSearchBar({ initial = '' }: { initial?: string }) {
  const [q, setQ] = useState(initial)
  const navigate = useNavigate()

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    const trimmed = q.trim()
    if (trimmed.length >= 2) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    }
  }

  return (
    <form className="page-search" onSubmit={handleSearch}>
      <Search size={18} className="page-search-icon" />
      <input
        type="text"
        placeholder="Search for articles..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
    </form>
  )
}
