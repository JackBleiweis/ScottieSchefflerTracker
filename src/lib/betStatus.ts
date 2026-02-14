/**
 * For a pending bet, whether Scottie's current position makes it currently winning or losing.
 * - winning: position meets the bet (e.g. position 15 and "Top 20" → winning)
 * - losing: position does not meet the bet (e.g. position 34 and "Top 20" → losing)
 * - null: unknown (no position or unrecognized bet type)
 */
export function pendingBetStatus(
  position: number | null,
  betType: string
): 'winning' | 'losing' | null {
  if (position == null) return null
  const lower = betType.toLowerCase()
  let maxPosition: number
  if (lower === 'winner') {
    return position === 1 ? 'winning' : 'losing'
  }
  if (lower === 'top 5') maxPosition = 5
  else if (lower === 'top 10') maxPosition = 10
  else if (lower === 'top 20') maxPosition = 20
  else return null
  return position <= maxPosition ? 'winning' : 'losing'
}
