import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import CollectionPage from './pages/CollectionPage.tsx'
import ArticlePage from './pages/ArticlePage.tsx'
import SearchPage from './pages/SearchPage.tsx'
import Layout from './components/Layout.tsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections/:slug" element={<CollectionPage />} />
        <Route path="/collections/:slug/:articleSlug" element={<ArticlePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  )
}
