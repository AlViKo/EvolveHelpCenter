import { Link, Outlet } from 'react-router-dom'
import { useConfig } from '../config.tsx'
import BackToTop from './BackToTop.tsx'

export default function Layout() {
  const { brand } = useConfig()
  const logo = brand === 'ru' ? '/evolve-logo-ru.svg' : '/evolve-logo.svg'
  const alt = brand === 'ru' ? 'Эволв' : 'Evolve'

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            <img src={logo} alt={alt} className="logo-img" />
          </Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <Link to="/" className="footer-logo">
            <img src={logo} alt={alt} className="footer-logo-img" />
          </Link>
          <span className="footer-text">
            &copy; {new Date().getFullYear()} {alt}. All rights reserved.
          </span>
        </div>
      </footer>
      <BackToTop />
    </>
  )
}
