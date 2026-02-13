import { Link, useLocation } from 'react-router-dom'

type LayoutProps = { children: React.ReactNode }

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="logo">The Scottie Scheffler Tracker</Link>
        <nav className="nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Overview</Link>
          <Link to="/bets" className={location.pathname === '/bets' ? 'active' : ''}>All bets</Link>
        </nav>
      </header>
      <main className="main">{children}</main>
    </div>
  )
}
