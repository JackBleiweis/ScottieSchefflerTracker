import { Link } from 'react-router-dom'
import { GolfProvider } from '../context/GolfContext'
import ScottieTrackerBar from './ScottieTrackerBar'
import BreakingBanner from './BreakingBanner'

type LayoutProps = { children: React.ReactNode }

export default function Layout({ children }: LayoutProps) {
  return (
    <GolfProvider>
      <div className="layout">
        <BreakingBanner />
        <header className="header">
          <Link to="/" className="logo">The Scottie Scheffler Tracker</Link>
        </header>
        <ScottieTrackerBar />
        <main className="main">{children}</main>
      </div>
    </GolfProvider>
  )
}
