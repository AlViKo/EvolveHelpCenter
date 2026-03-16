export interface CollectionSummary {
  title: string
  slug: string
  description: string
  icon: string
  audience: 'admin' | 'user'
  sort_order: number
  article_count: number
}

export interface ArticleSummary {
  title: string
  slug: string
  content_type: 'guide' | 'faq' | 'overview'
  visibility: 'user' | 'admin' | 'all'
  description: string
  author: string
  sort_order: number
  updated_at: string
}

export interface CollectionDetail extends CollectionSummary {
  articles: ArticleSummary[]
}

export interface ArticleDetail {
  title: string
  slug: string
  collection_slug: string
  collection_title: string
  content_type: string
  visibility: string
  description: string
  body_markdown: string
  author: string
  owner: string
  status: string
  sort_order: number
  tags: string[]
  created_at: string
  updated_at: string
  last_reviewed_at: string
}

export interface SearchResult {
  title: string
  slug: string
  description: string
  content_type: string
  visibility: string
  collection_slug: string
  collection_title: string
  audience: 'admin' | 'user'
}

export interface LandingResponse {
  admin_collections: CollectionSummary[]
  user_collections: CollectionSummary[]
}

export interface SearchResponse {
  results: SearchResult[]
  count: number
  query: string
}
