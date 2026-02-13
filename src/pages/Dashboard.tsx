import { useMemo } from 'react'
import { bets } from '../data'
import SummaryCards from '../components/SummaryCards'
import BetCard from '../components/BetCard'

export default function Dashboard() {
  const pendingBets = useMemo(() => bets.filter(b => b.result === 'Pending'), [])

  if (bets.length === 0) {
    return (
      <div className="dashboard">
        <h1>Overview</h1>
        <div className="empty-state">
          <p>No bets yet.</p>
          <p className="empty-state__hint">Add your bets in <code>src/data/bets.json</code> to see your summary here.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="dashboard">
      <h1>Overview</h1>
      <SummaryCards bets={bets} />
      {pendingBets.length > 0 && (
        <section className="dashboard-pending">
          <h2>Current pending bets</h2>
          <div className="dashboard-pending__grid">
            {pendingBets.map(bet => (
              <BetCard key={bet.id} bet={bet} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
