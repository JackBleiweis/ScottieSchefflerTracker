import { totalStaked, totalProfitLoss, roi, record } from '../lib/stats'
import type { Bet } from '../types/bet'

function formatMoney(n: number): string {
  const sign = n >= 0 ? '' : '−'
  return sign + '$' + Math.abs(n).toFixed(2)
}

function formatPct(n: number): string {
  const sign = n >= 0 ? '+' : ''
  return sign + n.toFixed(1) + '%'
}

type Props = { bets: Bet[] }

export default function SummaryCards({ bets }: Props) {
  const staked = totalStaked(bets)
  const pl = totalProfitLoss(bets)
  const roiPct = roi(bets)
  const rec = record(bets)

  return (
    <div className="summary-cards">
      <div className="card">
        <span className="card-label">Total staked</span>
        <span className="card-value">{formatMoney(staked)}</span>
      </div>
      <div className={`card card--pl ${pl >= 0 ? 'positive' : 'negative'}`}>
        <span className="card-label">Profit / Loss</span>
        <span className="card-value">{formatMoney(pl)}</span>
      </div>
      <div className={`card ${roiPct !== null && roiPct >= 0 ? 'positive' : 'negative'}`}>
        <span className="card-label">ROI</span>
        <span className="card-value">{roiPct !== null ? formatPct(roiPct) : '—'}</span>
      </div>
      <div className="card">
        <span className="card-label">Record</span>
        <span className="card-value record">
          <span className="r-w">{rec.W}W</span>
          <span className="r-l">{rec.L}L</span>
          {rec.Push > 0 && <span className="r-push">{rec.Push}Push</span>}
          <span className="r-pending">{rec.Pending}Pending</span>
        </span>
      </div>
    </div>
  )
}
