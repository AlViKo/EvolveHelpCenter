import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            <img src="/evolve-logo.svg" alt="Evolve" className="logo-img" />
          </Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <Link to="/" className="footer-logo">
            <img src="/evolve-logo.svg" alt="Evolve" className="footer-logo-img" />
          </Link>
          <span className="footer-text">
            &copy; {new Date().getFullYear()} Evolve. All rights reserved.
          </span>
        </div>
      </footer>
    </>
  )
}
