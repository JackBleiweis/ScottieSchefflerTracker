import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getScottieStandings, type ScottieStandings } from '../lib/golfApi'

type GolfContextValue = {
  data: ScottieStandings | null
  loading: boolean
  error: string | null
}

const GolfContext = createContext<GolfContextValue | null>(null)

export function GolfProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ScottieStandings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function fetchData() {
      try {
        const result = await getScottieStandings()
        if (cancelled) return
        if (result.ok) {
          setData(result.data)
          setError(null)
        } else {
          setData(null)
          setError(result.error)
        }
      } catch (e) {
        if (!cancelled) {
          setData(null)
          setError(e instanceof Error ? e.message : 'Request failed')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 60_000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return (
    <GolfContext.Provider value={{ data, loading, error }}>
      {children}
    </GolfContext.Provider>
  )
}

export function useGolf() {
  const ctx = useContext(GolfContext)
  if (ctx == null) throw new Error('useGolf must be used within GolfProvider')
  return ctx
}
