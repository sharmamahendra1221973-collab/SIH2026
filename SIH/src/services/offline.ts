import { useState, useEffect } from 'react'

export type OnlineStatus = 'online' | 'offline'

export function useOnlineStatus(): OnlineStatus {
  const [status, setStatus] = useState<OnlineStatus>(
    navigator.onLine ? 'online' : 'offline'
  )

  useEffect(() => {
    const handleOnline = () => setStatus('online')
    const handleOffline = () => setStatus('offline')

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return status
}

export function useOfflineReady(): boolean {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => setIsReady(true))
    }
  }, [])

  return isReady
}

export async function cachePlaceData(places: unknown[]): Promise<void> {
  const cache = await caches.open('sih-places-v1')
  const response = new Response(JSON.stringify(places))
  await cache.put('/api/places', response)
}

export async function getCachedPlaceData(): Promise<unknown[] | null> {
  try {
    const cache = await caches.open('sih-places-v1')
    const response = await cache.match('/api/places')
    if (!response) return null
    return response.json()
  } catch {
    return null
  }
}

export function useOfflineData<T>(
  key: string,
  fetcher: () => Promise<T>
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(() => {
    const cached = localStorage.getItem(`sih-cache-${key}`)
    return cached ? JSON.parse(cached) : null
  })
  const [loading, setLoading] = useState(!data)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        setLoading(true)
        // Try localStorage first if offline
        const cached = localStorage.getItem(`sih-cache-${key}`)
        if (cached && !navigator.onLine) {
          if (!cancelled) setData(JSON.parse(cached))
          setLoading(false)
          return
        }
        // Fetch fresh data
        const fresh = await fetcher()
        if (!cancelled) {
          setData(fresh)
          localStorage.setItem(`sih-cache-${key}`, JSON.stringify(fresh))
          setError(null)
        }
      } catch (e) {
        // Fall back to cache
        const cached = localStorage.getItem(`sih-cache-${key}`)
        if (!cancelled) {
          if (cached) setData(JSON.parse(cached))
          else setError(e instanceof Error ? e : new Error('Failed to load'))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [key, fetcher])

  return { data, loading, error }
}
