import type { LandingResponse, CollectionDetail, ArticleDetail, SearchResponse } from './types.ts'

const BASE = '/api/v1/helpcenter'

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json() as Promise<T>
}

export function fetchLanding(role?: string): Promise<LandingResponse> {
  const params = role ? `?role=${role}` : ''
  return fetchJSON(`${BASE}/landing/${params}`)
}

export function fetchCollection(slug: string, role?: string): Promise<CollectionDetail> {
  const params = role ? `?role=${role}` : ''
  return fetchJSON(`${BASE}/collections/${slug}/${params}`)
}

export function fetchArticle(collectionSlug: string, articleSlug: string): Promise<ArticleDetail> {
  return fetchJSON(`${BASE}/collections/${collectionSlug}/${articleSlug}/`)
}

export function fetchSearch(query: string, role?: string): Promise<SearchResponse> {
  const params = new URLSearchParams({ q: query })
  if (role) params.set('role', role)
  return fetchJSON(`${BASE}/search/?${params.toString()}`)
}
