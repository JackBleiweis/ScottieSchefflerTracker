import type { Bet } from '../types/bet'

/** Profit from American odds: positive odds = stake * (odds/100), negative = stake * (100/|odds|) */
function profitFromAmericanOdds(stake: number, odds: number): number {
  if (odds > 0) return stake * (odds / 100)
  return stake * (100 / Math.abs(odds))
}

export function totalStaked(bets: Bet[]): number {
  return bets.reduce((sum, b) => sum + b.stake, 0)
}

export function totalProfitLoss(bets: Bet[]): number {
  return bets.reduce((sum, b) => {
    if (b.result === 'W') {
      const profit = b.profitLoss ?? profitFromAmericanOdds(b.stake, b.odds)
      return sum + profit
    }
    if (b.result === 'L') {
      const loss = b.profitLoss ?? -b.stake
      return sum + loss
    }
    if (b.result === 'Push') {
      return sum + (b.profitLoss ?? 0)
    }
    return sum
  }, 0)
}

export function roi(bets: Bet[]): number | null {
  const resolved = bets.filter(b => b.result === 'W' || b.result === 'L' || b.result === 'Push')
  if (resolved.length === 0) return null
  const staked = resolved.reduce((s, b) => s + b.stake, 0)
  if (staked === 0) return null
  const pl = totalProfitLoss(resolved)
  return (pl / staked) * 100
}

export interface RecordCounts {
  W: number
  L: number
  Push: number
  Pending: number
}

export function record(bets: Bet[]): RecordCounts {
  const r: RecordCounts = { W: 0, L: 0, Push: 0, Pending: 0 }
  for (const b of bets) r[b.result]++
  return r
}

export function profitForBet(bet: Bet): number | null {
  if (bet.result === 'W') return bet.profitLoss ?? profitFromAmericanOdds(bet.stake, bet.odds)
  if (bet.result === 'L') return bet.profitLoss ?? -bet.stake
  if (bet.result === 'Push') return bet.profitLoss ?? 0
  return null
}

/**
 * Return = amount you get back from the bookmaker.
 * W: stake + profit; L: 0; Push: stake; Pending: potential return (stake + profit if it wins).
 */
export function returnForBet(bet: Bet): number {
  if (bet.result === 'W') {
    const profit = bet.profitLoss ?? profitFromAmericanOdds(bet.stake, bet.odds)
    return bet.stake + profit
  }
  if (bet.result === 'L') return 0
  if (bet.result === 'Push') return bet.stake
  // Pending: potential return if it wins
  const potentialProfit = profitFromAmericanOdds(bet.stake, bet.odds)
  return bet.stake + potentialProfit
}
