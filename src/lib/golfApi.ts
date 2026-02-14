/**
 * ESPN PGA Scoreboard – free, no API key
 * https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard
 */

const ESPN_SCOREBOARD = 'https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard'

export interface ScottieStandings {
  tournamentName: string
  position: number | null
  positionDisplay: string
  totalScore: number | null
  round: number | null
  holesThrough: number | null
}

export type ScottieStandingsResult = { ok: true; data: ScottieStandings } | { ok: false; error: string }

function isScottie(name: string): boolean {
  const n = (name || '').trim()
  return n.includes('Scheffler')
}

export async function getScottieStandings(): Promise<ScottieStandingsResult> {
  try {
    const res = await fetch(ESPN_SCOREBOARD)
    if (!res.ok) {
      return { ok: false, error: `ESPN: ${res.status}` }
    }
    const json = await res.json()
    const events = json.events
    if (!Array.isArray(events) || events.length === 0) {
      return { ok: false, error: 'No current event' }
    }

    const event = events[0]
    const tournamentName = event.name || event.shortName || 'PGA Tour'
    const competitions = event.competitions
    if (!Array.isArray(competitions) || competitions.length === 0) {
      return { ok: false, error: 'No leaderboard' }
    }

    const competitors = competitions[0].competitors || []
    const scottie = competitors.find(
      (c: { athlete?: { fullName?: string } }) => isScottie(c?.athlete?.fullName ?? '')
    )
    if (!scottie) {
      return { ok: false, error: 'Scottie not in this event' }
    }

    const order = scottie.order
    const position = typeof order === 'number' ? order : null
    const positionDisplay =
      position != null ? (position <= 10 ? `T${position}` : `#${position}`) : '—'

    let totalScore: number | null = null
    const scoreStr = scottie.score
    if (scoreStr != null && scoreStr !== '') {
      const parsed = parseInt(String(scoreStr).replace(/^\+/, ''), 10)
      if (!Number.isNaN(parsed)) totalScore = parsed
    }

    let round: number | null = null
    let holesThrough: number | null = null
    const linescores = scottie.linescores
    if (Array.isArray(linescores) && linescores.length > 0) {
      const inProgress = linescores.find((r: { linescores?: { value?: number }[] }) => {
        const holes = r?.linescores ?? []
        const completed = holes.filter((h: { value?: number }) => h?.value != null).length
        return completed > 0 && completed < 18
      })
      const roundData = inProgress ?? linescores[linescores.length - 1]
      const holeScores = roundData?.linescores ?? []
      const completedCount = holeScores.filter((h: { value?: number }) => h?.value != null).length
      round = roundData?.period ?? null
      holesThrough = completedCount > 0 ? completedCount : null
    }

    return {
      ok: true,
      data: {
        tournamentName,
        position,
        positionDisplay,
        totalScore,
        round,
        holesThrough,
      },
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return { ok: false, error: msg }
  }
}
