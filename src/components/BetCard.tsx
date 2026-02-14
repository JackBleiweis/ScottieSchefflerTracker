import type { Bet } from '../types/bet'
import { profitForBet } from '../lib/stats'
import { pendingBetStatus } from '../lib/betStatus'

function formatOdds(odds: number): string {
  if (odds > 0) return '+' + odds
  return String(odds)
}

function formatMoney(n: number): string {
  const sign = n >= 0 ? '+' : '−'
  return sign + '$' + Math.abs(n).toFixed(2)
}

function formatBetType(betType: string): string {
  const lower = betType.toLowerCase()
  if (lower === 'top 5') return 'Top 5 Finish'
  if (lower === 'top 10') return 'Top 10 Finish'
  if (lower === 'top 20') return 'Top 20 Finish'
  if (lower === 'winner') return 'Winner'
  return betType
}

type Props = { bet: Bet; currentPosition?: number | null }

export default function BetCard({ bet, currentPosition }: Props) {
  const profit = profitForBet(bet)
  const pendingStatus = bet.result === 'Pending' && currentPosition != null
    ? pendingBetStatus(currentPosition, bet.betType)
    : null
  const pendingMod =
    bet.result === 'Pending' && pendingStatus != null
      ? pendingStatus === 'winning'
        ? 'bet-card--pending--ahead'
        : 'bet-card--pending--behind'
      : ''

  return (
    <div className={`bet-card bet-card--${bet.result.toLowerCase()} ${pendingMod}`.trim()}>
      <div className="bet-card__header">
        <span className="bet-card__tournament">{bet.tournament}</span>
        <span className="bet-card__header-badges">
          {bet.result === 'Pending' && <span className="bet-card__live">Live</span>}
          {bet.result !== 'Pending' && (
            <span className={`bet-card__result bet-card__result--${bet.result.toLowerCase()}`}>
              {bet.result}
            </span>
          )}
        </span>
      </div>
      <div className="bet-card__body">
        <div className="bet-card__row">
          <span className="bet-card__label">Book</span>
          <span>{bet.book}</span>
        </div>
        <div className="bet-card__row">
          <span className="bet-card__label">Bet</span>
          <span>{formatBetType(bet.betType)}</span>
        </div>
        <div className="bet-card__row">
          <span className="bet-card__label">Odds</span>
          <span>{formatOdds(bet.odds)}</span>
        </div>
        <div className="bet-card__row">
          <span className="bet-card__label">Stake</span>
          <span>${bet.stake.toFixed(2)}</span>
        </div>
        <div className={`bet-card__row bet-card__profit ${pendingStatus != null ? (pendingStatus === 'winning' ? 'positive' : 'negative') : profit !== null ? (profit >= 0 ? 'positive' : 'negative') : 'positive'}`}>
          <span className="bet-card__label">{bet.result === 'Pending' ? 'Potential Profit' : 'Profit'}</span>
          <span>
            {bet.result === 'Pending'
              ? formatMoney(bet.odds > 0 ? bet.stake * (bet.odds / 100) : bet.stake * (100 / Math.abs(bet.odds)))
              : formatMoney(profit ?? 0)
            }
          </span>
        </div>
      </div>
    </div>
  )
}
