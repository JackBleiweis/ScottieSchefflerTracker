export type Result = 'W' | 'L' | 'Pending' | 'Push'

export interface Bet {
  id: string
  book: string
  tournament: string
  betType: string
  odds: number
  stake: number
  result: Result
  profitLoss?: number
}

export type Bets = Bet[]
