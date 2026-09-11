import { describe, it, expect } from 'vitest'
import { getAllPlaces, getPlacesByCategory, getPlaceById, EMERGENCY_CONTACTS, ATTRACTIONS } from '../src/domain/bhopal'

describe('Bhopal Data', () => {
  it('has attractions', () => {
    expect(ATTRACTIONS.length).toBeGreaterThan(0)
  })

  it('gets all places', () => {
    const places = getAllPlaces()
    expect(places.length).toBeGreaterThan(10)
  })

  it('filters by category', () => {
    const hospitals = getPlacesByCategory('hospital')
    expect(hospitals.length).toBeGreaterThan(0)
    hospitals.forEach(p => {
      expect(p.category).toBe('hospital')
    })
  })

  it('finds place by id', () => {
    const place = getPlaceById('taj-ul-masajid')
    expect(place).toBeDefined()
    expect(place?.name).toBe('Taj-ul-Masajid')
  })

  it('returns undefined for unknown id', () => {
    expect(getPlaceById('nonexistent')).toBeUndefined()
  })

  it('has emergency contacts', () => {
    expect(EMERGENCY_CONTACTS.length).toBeGreaterThanOrEqual(5)
    EMERGENCY_CONTACTS.forEach(c => {
      expect(c.number).toBeTruthy()
      expect(c.name).toBeTruthy()
    })
  })

  it('all places have required fields', () => {
    getAllPlaces().forEach(place => {
      expect(place.id).toBeTruthy()
      expect(place.name).toBeTruthy()
      expect(place.category).toBeTruthy()
      expect(place.location.lat).toBeGreaterThan(20)
      expect(place.location.lat).toBeLessThan(30)
      expect(place.location.lng).toBeGreaterThan(70)
      expect(place.location.lng).toBeLessThan(90)
    })
  })
})
