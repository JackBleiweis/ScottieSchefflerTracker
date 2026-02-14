import { useState, useMemo } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import LoadingScreen from './components/LoadingScreen'

function randomLoadSeconds(): number {
  return 2 + Math.floor(Math.random() * 6)
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const durationMs = useMemo(() => randomLoadSeconds() * 1000, [])

  if (loading) {
    return (
      <LoadingScreen
        durationMs={durationMs}
        onComplete={() => setLoading(false)}
      />
    )
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}
