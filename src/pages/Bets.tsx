import { bets } from '../data'
import BetList from '../components/BetList'

export default function Bets() {
  if (bets.length === 0) {
    return (
      <div className="bets-page">
        <h1>All bets</h1>
        <div className="empty-state">
          <p>No bets yet.</p>
          <p className="empty-state__hint">Add your bets in <code>src/data/bets.json</code> to get started.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="bets-page">
      <h1>All bets</h1>
      <BetList bets={bets} />
    </div>
  )
}
