import type { TravelBand } from '../domain/types'

const STORAGE_KEY = 'sih-travel-band'
const DEMO_BAND_ID = 'DEMO-BHOPAL-2024'

export function parseQRData(data: string): TravelBand | null {
  try {
    const url = new URL(data)
    const band = url.searchParams.get('band')
    const destination = url.searchParams.get('dest') || 'bhopal'

    if (!band) return null

    return {
      id: band,
      destination: destination.toLowerCase(),
      token: url.searchParams.get('token') || ''
    }
  } catch {
    // Not a URL, try parsing as band ID directly
    if (data && data.length >= 6) {
      return {
        id: data.toUpperCase(),
        destination: 'bhopal',
        token: ''
      }
    }
    return null
  }
}

export function validateBand(band: TravelBand): { valid: boolean; error?: string } {
  // Demo mode always works
  if (band.id === DEMO_BAND_ID) {
    return { valid: true }
  }

  // Check expiration if present
  if (band.expiresAt) {
    const expDate = new Date(band.expiresAt)
    if (expDate < new Date()) {
      return { valid: false, error: 'expired' }
    }
  }

  // Basic validation
  if (band.id.length < 6) {
    return { valid: false, error: 'invalid' }
  }

  return { valid: true }
}

export function checkDuplicateUse(band: TravelBand): boolean {
  const used = localStorage.getItem(`${STORAGE_KEY}-used-${band.id}`)
  return used === 'true'
}

export function markBandUsed(band: TravelBand): void {
  localStorage.setItem(`${STORAGE_KEY}-used-${band.id}`, 'true')
}

export function saveTravelBand(band: TravelBand): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(band))
}

export function getStoredTravelBand(): TravelBand | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored) as TravelBand
  } catch {
    return null
  }
}

export function clearTravelBand(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function createDemoBand(): TravelBand {
  return {
    id: DEMO_BAND_ID,
    destination: 'bhopal',
    token: 'demo-token'
  }
}

export function getCurrentURL(): string {
  return window.location.href
}

export function checkURLForBand(): TravelBand | null {
  const url = new URL(window.location.href)
  const band = url.searchParams.get('band')
  const dest = url.searchParams.get('dest')

  if (band) {
    return {
      id: band,
      destination: dest?.toLowerCase() || 'bhopal',
      token: url.searchParams.get('token') || ''
    }
  }

  return null
}

export function clearURLParams(): void {
  const url = new URL(window.location.href)
  url.searchParams.delete('band')
  url.searchParams.delete('dest')
  url.searchParams.delete('token')
  window.history.replaceState({}, '', url.toString())
}
