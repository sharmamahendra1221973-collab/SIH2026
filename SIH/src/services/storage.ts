import type { UserPreferences, Coordinates } from '../domain/types'

const PREFS_KEY = 'sih-preferences'
const SAVED_PLACES_KEY = 'sih-saved-places'

export function getUserPreferences(): UserPreferences {
  const stored = localStorage.getItem(PREFS_KEY)
  if (!stored) {
    return {
      language: 'en',
      savedPlaces: []
    }
  }
  try {
    return JSON.parse(stored) as UserPreferences
  } catch {
    return { language: 'en', savedPlaces: [] }
  }
}

export function saveUserPreferences(prefs: Partial<UserPreferences>): void {
  const current = getUserPreferences()
  const updated = { ...current, ...prefs }
  localStorage.setItem(PREFS_KEY, JSON.stringify(updated))
}

export function setLanguage(lang: 'en' | 'hi'): void {
  saveUserPreferences({ language: lang })
  localStorage.setItem('sih-lang', lang)
}

export function getLanguage(): 'en' | 'hi' {
  return getUserPreferences().language
}

export function savePlace(placeId: string): void {
  const saved = getSavedPlaces()
  if (!saved.includes(placeId)) {
    saved.push(placeId)
    localStorage.setItem(SAVED_PLACES_KEY, JSON.stringify(saved))
  }
}

export function unsavePlace(placeId: string): void {
  const saved = getSavedPlaces().filter(id => id !== placeId)
  localStorage.setItem(SAVED_PLACES_KEY, JSON.stringify(saved))
}

export function getSavedPlaces(): string[] {
  const stored = localStorage.getItem(SAVED_PLACES_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored) as string[]
  } catch {
    return []
  }
}

export function isPlaceSaved(placeId: string): boolean {
  return getSavedPlaces().includes(placeId)
}

export function toggleSavedPlace(placeId: string): boolean {
  if (isPlaceSaved(placeId)) {
    unsavePlace(placeId)
    return false
  } else {
    savePlace(placeId)
    return true
  }
}

export function saveLastKnownLocation(coords: Coordinates): void {
  saveUserPreferences({ lastKnownLocation: coords })
}

export function getLastKnownLocation(): Coordinates | undefined {
  return getUserPreferences().lastKnownLocation
}
