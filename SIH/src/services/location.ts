import type { Coordinates, Place } from '../domain/types'
import { BHOPAL_CENTER, getAllPlaces } from '../domain/bhopal'

const STORAGE_KEY = 'sih-last-location'

export async function getCurrentLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        saveLastLocation(coords)
        resolve(coords)
      },
      (error) => {
        // Return Bhopal center as fallback
        if (error.code === error.PERMISSION_DENIED) {
          reject(new Error('PERMISSION_DENIED'))
        } else {
          resolve(BHOPAL_CENTER)
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    )
  })
}

export function saveLastLocation(coords: Coordinates): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(coords))
}

export function getLastLocation(): Coordinates | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored) as Coordinates
  } catch {
    return null
  }
}

export function calculateDistance(a: Coordinates, b: Coordinates): number {
  // Haversine formula for distance in km
  const R = 6371
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)

  const sinDLat = Math.sin(dLat / 2)
  const sinDLng = Math.sin(dLng / 2)

  const x = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))

  return R * c
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}

export function findNearbyPlaces(
  coords: Coordinates,
  category?: Place['category'],
  maxDistance: number = 10
): (Place & { distance: number })[] {
  const places = category
    ? getAllPlaces().filter(p => p.category === category)
    : getAllPlaces()

  return places
    .map(p => ({ ...p, distance: calculateDistance(coords, p.location) }))
    .filter(p => p.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
}

export function findNearestPlace(coords: Coordinates, category: Place['category']): Place | null {
  const nearby = findNearbyPlaces(coords, category, 50)
  return nearby[0] || null
}

export function formatCoordinates(coords: Coordinates): string {
  return `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`
}

export function getGoogleMapsUrl(coords: Coordinates): string {
  return `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
}

export function getDirectionsUrl(from: Coordinates, to: Coordinates): string {
  return `https://www.google.com/maps/dir/${from.lat},${from.lng}/${to.lat},${to.lng}`
}
