import { describe, it, expect } from 'vitest'
import { calculateDistance, findNearbyPlaces } from '../src/services/location'
import { BHOPAL_CENTER } from '../src/domain/bhopal'

describe('Location Service', () => {
  it('calculates distance between coordinates', () => {
    const pointA = { lat: 23.2599, lng: 77.4126 } // BHOPAL_CENTER
    const pointB = { lat: 23.2625, lng: 77.3928 } // Taj-ul-Masajid

    const distance = calculateDistance(pointA, pointB)
    expect(distance).toBeGreaterThan(0)
    expect(distance).toBeLessThan(5) // Within 5km
  })

  it('returns 0 for same point', () => {
    const distance = calculateDistance(BHOPAL_CENTER, BHOPAL_CENTER)
    expect(distance).toBe(0)
  })

  it('finds nearby places from coordinates', () => {
    const places = findNearbyPlaces(BHOPAL_CENTER, 'attraction', 10)
    expect(places.length).toBeGreaterThan(0)
    places.forEach(p => {
      expect(p.distance).toBeLessThanOrEqual(10)
    })
  })

  it('sorts results by distance', () => {
    const places = findNearbyPlaces(BHOPAL_CENTER)
    for (let i = 1; i < places.length; i++) {
      expect(places[i].distance).toBeGreaterThanOrEqual(places[i - 1].distance)
    }
  })

  it('filters by category', () => {
    const attractions = findNearbyPlaces(BHOPAL_CENTER, 'attraction', 50)
    attractions.forEach(p => {
      expect(p.category).toBe('attraction')
    })
  })
})
