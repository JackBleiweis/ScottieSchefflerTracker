import type { Bet } from '../types/bet'
import BetCard from './BetCard'

type Props = { bets: Bet[] }

export default function BetList({ bets }: Props) {
  return (
    <div className="bet-list">
      <div className="bet-list__grid">
        {bets.map(bet => (
          <BetCard key={bet.id} bet={bet} />
        ))}
      </div>
      {bets.length === 0 && (
        <p className="bet-list__empty">No bets match the filters.</p>
      )}
    </div>
  )
}

