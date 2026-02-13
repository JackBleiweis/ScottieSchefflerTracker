import type { Bet } from '../types/bet'
import betsJson from './bets.json'

export const bets: Bet[] = betsJson as Bet[]
