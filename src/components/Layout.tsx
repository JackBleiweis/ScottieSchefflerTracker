import { Link } from 'react-router-dom'

type LayoutProps = { children: React.ReactNode }

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="logo">The Scottie Scheffler Tracker</Link>
      </header>
      <main className="main">{children}</main>
    </div>
  )
}
