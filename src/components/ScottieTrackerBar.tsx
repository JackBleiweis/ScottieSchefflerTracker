import { useGolf } from '../context/GolfContext'

export default function ScottieTrackerBar() {
  const { data, loading, error: errorMessage } = useGolf()

  if (loading && !data) {
    return (
      <div className="scottie-bar">
        <div className="scottie-bar__photo">
          <img src="/favicon.png" alt="Scottie Scheffler" />
        </div>
        <div className="scottie-bar__name">Scottie Scheffler</div>
        <div className="scottie-bar__live scottie-bar__live--muted">Loading…</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="scottie-bar">
        <div className="scottie-bar__photo">
          <img src="/favicon.png" alt="Scottie Scheffler" />
        </div>
        <div className="scottie-bar__name">Scottie Scheffler</div>
        <div className="scottie-bar__live scottie-bar__live--muted" title={errorMessage ?? undefined}>
          {errorMessage ?? 'No tournament standings'}
        </div>
      </div>
    )
  }

  return (
    <div className="scottie-bar">
      <div className="scottie-bar__photo">
        <img src="/favicon.png" alt="Scottie Scheffler" />
      </div>
      <div className="scottie-bar__name">Scottie Scheffler</div>
      <div className="scottie-bar__meta">
        <span className="scottie-bar__tournament">{data.tournamentName}</span>
        {data.round != null && (
          <span className="scottie-bar__round">Round {data.round}</span>
        )}
        {data.holesThrough != null && (
          <span className="scottie-bar__holes">Through {data.holesThrough} {data.holesThrough === 1 ? 'hole' : 'holes'}</span>
        )}
        {data.totalScore != null && (
          <span className="scottie-bar__score">{data.totalScore >= 0 ? '+' : ''}{data.totalScore}</span>
        )}
        <span
          className={`scottie-bar__position ${data.position != null ? (data.position <= 20 ? 'scottie-bar__position--good' : 'scottie-bar__position--bad') : ''}`}
        >
          Position {data.positionDisplay}
        </span>

      </div>
    </div>
  )
}
