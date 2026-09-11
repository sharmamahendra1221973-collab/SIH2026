import { describe, it, expect } from 'vitest'
import { generateItinerary } from '../src/services/itinerary'

describe('Itinerary Generation', () => {
  it('generates an itinerary with places', () => {
    const result = generateItinerary({
      duration: 4,
      interests: ['history', 'nature'],
      budget: 'low'
    })

    expect(result).toBeDefined()
    expect(result.id).toContain('itinerary-')
    expect(result.places.length).toBeGreaterThan(0)
    expect(result.duration).toBeGreaterThan(0)
    expect(result.estimatedCost).toBeTruthy()
  })

  it('generates longer itineraries for longer durations', () => {
    const short = generateItinerary({
      duration: 2,
      interests: ['history'],
      budget: 'medium'
    })

    const long = generateItinerary({
      duration: 8,
      interests: ['history'],
      budget: 'medium'
    })

    expect(long.places.length).toBeGreaterThanOrEqual(short.places.length)
  })

  it('returns different results for different interests', () => {
    const history = generateItinerary({
      duration: 4,
      interests: ['history'],
      budget: 'low'
    })

    const food = generateItinerary({
      duration: 4,
      interests: ['food'],
      budget: 'low'
    })

    // Different interests should produce different itineraries
    expect(history.places.map(s => s.place.id)).not.toEqual(food.places.map(s => s.place.id))
  })

  it('builds stops with reasonable durations', () => {
    const result = generateItinerary({
      duration: 4,
      interests: ['history'],
      budget: 'low'
    })

    for (const stop of result.places) {
      expect(stop.duration).toBeGreaterThan(0)
      expect(stop.duration).toBeLessThanOrEqual(180)
      expect(stop.place).toBeDefined()
    }
  })

  it('sorts stops by order', () => {
    const result = generateItinerary({
      duration: 6,
      interests: ['history', 'nature', 'food'],
      budget: 'medium'
    })

    for (let i = 1; i < result.places.length; i++) {
      expect(result.places[i].order).toBeGreaterThanOrEqual(result.places[i - 1].order)
    }
  })
})
