import { useMemo, useState } from 'react'
import { bets } from '../data'
import SummaryCards from '../components/SummaryCards'
import BetList from '../components/BetList'
import type { Bet } from '../types/bet'
import { useGolf } from '../context/GolfContext'

type ResultFilter = 'all' | 'W' | 'L' | 'Pending' | 'Push'

export default function Dashboard() {
  const { data: golfData } = useGolf()
  const currentPosition = golfData?.position ?? null
  const [resultFilter, setResultFilter] = useState<ResultFilter>('all')
  const [tournamentFilter, setTournamentFilter] = useState<string>('all')
  const [bookFilter, setBookFilter] = useState<string>('all')
  const [showLiveEmbed, setShowLiveEmbed] = useState(false)

  const tournaments = useMemo(() => [...new Set(bets.map(b => b.tournament))].sort(), [])
  const books = useMemo(() => [...new Set(bets.map(b => b.book))].sort(), [])

  const filteredBets = useMemo(() => {
    return [...bets]
      .filter(b => {
        if (resultFilter !== 'all' && b.result !== resultFilter) return false
        if (tournamentFilter !== 'all' && b.tournament !== tournamentFilter) return false
        if (bookFilter !== 'all' && b.book !== bookFilter) return false
        return true
      })
      .reverse()
  }, [resultFilter, tournamentFilter, bookFilter])

  if (bets.length === 0) {
    return (
      <div className="dashboard">
        <h1 className="dashboard__title">Overview</h1>
        <div className="empty-state">
          <p>No bets yet.</p>
          <p className="empty-state__hint">Add your bets in <code>src/data/bets.json</code> to see your summary here.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__title-row">
          <h1 className="dashboard__title">Overview</h1>
          {golfData ? (
            <button
              type="button"
              className="dashboard__live-btn"
              onClick={() => setShowLiveEmbed(prev => !prev)}
            >
              {showLiveEmbed ? 'Hide Live Scottie!' : 'Watch Live Scottie!'}
            </button>
          ) : (
            <span className="dashboard__no-tournament">No tournament underway</span>
          )}
        </div>
        <div className="dashboard__filters">
          <div className="filter-group">
            <label>Result</label>
            <select
              value={resultFilter}
              onChange={e => setResultFilter(e.target.value as ResultFilter)}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="W">Won</option>
              <option value="L">Lost</option>
              <option value="Pending">Pending</option>
              <option value="Push">Push</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Tournament</label>
            <select
              value={tournamentFilter}
              onChange={e => setTournamentFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All</option>
              {tournaments.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Book</label>
            <select
              value={bookFilter}
              onChange={e => setBookFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All</option>
              {books.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
      </header>
      <SummaryCards bets={bets} />
      {showLiveEmbed && (
        <div className="dashboard__embed">
          <iframe
            src="https://embedsports.me/pga-tour/at-t-pebble-beach-pro-am-scheffler-marquee-group-final-round-stream-2"
            title="PGA Tour stream"
            width="100%"
            height="100%"
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            allow="fullscreen"
            referrerPolicy="unsafe-url"
          />
        </div>
      )}
      <BetList bets={filteredBets} currentPosition={currentPosition} />
    </div>
  )
}
