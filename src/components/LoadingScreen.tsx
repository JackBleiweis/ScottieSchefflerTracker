import { useEffect, useRef, useState } from 'react'

const COVER_IMAGE = '/loading-cover.png'

type Props = {
  durationMs: number
  onComplete: () => void
}

export default function LoadingScreen({ durationMs, onComplete }: Props) {
  const [revealDone, setRevealDone] = useState(false)
  const [progress, setProgress] = useState(0)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const t = setTimeout(() => {
      setProgress(100)
      setRevealDone(true)
    }, durationMs)
    return () => clearTimeout(t)
  }, [durationMs])

  useEffect(() => {
    const start = startTimeRef.current
    let id: number
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(100, (elapsed / durationMs) * 100)
      setProgress(p)
      if (p < 100) id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [durationMs])

  useEffect(() => {
    if (!revealDone) return
    const t = setTimeout(onComplete, 300)
    return () => clearTimeout(t)
  }, [revealDone, onComplete])

  const progressText = progress >= 100 ? '100% loaded!' : `${Math.floor(progress)}% loaded...`

  return (
    <div className="loading-screen">
      <div className="loading-screen__frame">
        <div className="loading-screen__image-wrap">
          <img
            src={COVER_IMAGE}
            alt=""
            className="loading-screen__image"
          />
          <div
            className="loading-screen__shade"
            style={{
              animationDuration: `${durationMs}ms`,
            }}
          />
        </div>
      </div>
      <p className="loading-screen__progress">{progressText}</p>
    </div>
  )
}
