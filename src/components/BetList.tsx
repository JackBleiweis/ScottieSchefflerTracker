import { useMemo, useState } from 'react'
import type { Bet } from '../types/bet'
import BetCard from './BetCard'

type ResultFilter = 'all' | 'W' | 'L' | 'Pending' | 'Push'

type Props = { bets: Bet[] }

export default function BetList({ bets }: Props) {
  const [resultFilter, setResultFilter] = useState<ResultFilter>('all')
  const [tournamentFilter, setTournamentFilter] = useState<string>('all')
  const [bookFilter, setBookFilter] = useState<string>('all')

  const tournaments = useMemo(() => [...new Set(bets.map(b => b.tournament))].sort(), [bets])
  const books = useMemo(() => [...new Set(bets.map(b => b.book))].sort(), [bets])

  const filtered = useMemo(() => {
    return bets.filter(b => {
      if (resultFilter !== 'all' && b.result !== resultFilter) return false
      if (tournamentFilter !== 'all' && b.tournament !== tournamentFilter) return false
      if (bookFilter !== 'all' && b.book !== bookFilter) return false
      return true
    })
  }, [bets, resultFilter, tournamentFilter, bookFilter])

  return (
    <div className="bet-list">
      <div className="bet-list__filters">
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
      <div className="bet-list__grid">
        {filtered.map(bet => (
          <BetCard key={bet.id} bet={bet} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="bet-list__empty">No bets match the filters.</p>
      )}
    </div>
  )
}
