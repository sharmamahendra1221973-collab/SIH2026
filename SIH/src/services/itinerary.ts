import type { Itinerary, ItineraryRequest, ItineraryStop, Place, PriceRange } from '../domain/types'
import { ATTRACTIONS, RESTAURANTS, getAllPlaces } from '../domain/bhopal'

const STORAGE_KEY = 'sih-itinerary'

// Interest to place tag mapping
const INTEREST_TAGS: Record<string, string[]> = {
  history: ['unesco', 'heritage', 'ancient', 'history', 'mosque', 'temple'],
  nature: ['lake', 'wildlife', 'nature', 'safari', 'park'],
  spiritual: ['temple', 'mosque', 'spiritual', 'buddhist'],
  food: ['restaurant', 'cafe', 'mughlai', 'sweets'],
  photography: ['photography', 'architecture', 'views', 'sunset'],
  shopping: ['mall', 'market', 'shopping'],
  adventure: ['safari', 'boating', 'adventure']
}

// Price priority (lower = more budget-friendly)
const PRICE_PRIORITY: Record<PriceRange, number> = {
  free: 0,
  low: 1,
  medium: 2,
  high: 3
}

export function generateItinerary(request: ItineraryRequest): Itinerary {
  const { duration, interests, budget } = request

  // Get places matching interests
  let places = filterPlacesByInterests(interests)

  // Sort by rating and budget fit
  places = sortPlacesByRelevance(places, budget)

  // Build itinerary stops
  const stops = buildStops(places, duration)

  // Calculate total time
  const totalMinutes = stops.reduce((sum, s) => sum + s.duration, 0)
  const totalHours = totalMinutes / 60

  // Estimate cost
  const cost = estimateCost(stops, budget)

  return {
    id: `itinerary-${Date.now()}`,
    title: `${duration}-Hour Bhopal Experience`,
    titleHi: `${duration}-घंटे का भोपाल अनुभव`,
    duration: totalHours,
    places: stops,
    estimatedCost: cost.en,
    estimatedCostHi: cost.hi
  }
}

function filterPlacesByInterests(interests: string[]): Place[] {
  if (interests.length === 0) {
    return [...ATTRACTIONS]
  }

  const matchingTags = new Set<string>()
  interests.forEach(interest => {
    const tags = INTEREST_TAGS[interest] || []
    tags.forEach(t => matchingTags.add(t))
  })

  const allPlaces = getAllPlaces().filter(p =>
    p.category === 'attraction' || p.category === 'restaurant'
  )

  return allPlaces.filter(p =>
    p.tags.some(t => matchingTags.has(t))
  )
}

function sortPlacesByRelevance(places: Place[], budget: PriceRange): Place[] {
  const budgetPriority = PRICE_PRIORITY[budget]

  return [...places].sort((a, b) => {
    // Prefer places within budget
    const aPrice = a.priceRange ? PRICE_PRIORITY[a.priceRange] : 4
    const bPrice = b.priceRange ? PRICE_PRIORITY[b.priceRange] : 4

    const aBudgetFit = Math.abs(aPrice - budgetPriority)
    const bBudgetFit = Math.abs(bPrice - budgetPriority)

    if (aBudgetFit !== bBudgetFit) {
      return aBudgetFit - bBudgetFit
    }

    // Then by rating
    return (b.rating || 0) - (a.rating || 0)
  })
}

function buildStops(places: Place[], durationHours: number): ItineraryStop[] {
  const stops: ItineraryStop[] = []
  const totalMinutes = durationHours * 60
  let usedMinutes = 0
  let order = 1

  // Always include lunch for trips 4+ hours
  const includeLunch = durationHours >= 4
  const lunchMinutes = 60

  if (includeLunch) {
    const restaurant = RESTAURANTS[0]
    stops.push({
      place: restaurant,
      duration: lunchMinutes,
      order: Math.ceil(durationHours / 2), // Middle of day
      notes: 'Lunch break',
      notesHi: 'दोपहर का भोजन'
    })
    usedMinutes += lunchMinutes
  }

  // Add attractions
  for (const place of places) {
    if (usedMinutes >= totalMinutes) break
    if (stops.find(s => s.place.id === place.id)) continue

    // Skip if not enough time
    const visitDuration = getVisitDuration(place.category)
    if (usedMinutes + visitDuration > totalMinutes) continue

    stops.push({
      place,
      duration: visitDuration,
      order,
      notes: getVisitNotes(place)
    })

    usedMinutes += visitDuration
    order++

    // Add travel time between stops (15 min average)
    usedMinutes += 15
  }

  // Sort by order
  return stops.sort((a, b) => a.order - b.order)
}

function getVisitDuration(category: Place['category']): number {
  switch (category) {
    case 'attraction': return 90
    case 'restaurant': return 60
    case 'hotel': return 30
    default: return 45
  }
}

function getVisitNotes(place: Place): string {
  if (place.category === 'attraction') {
    if (place.tags.includes('unesco')) return 'UNESCO site - allow extra time'
    if (place.tags.includes('sunset')) return 'Best visited in evening'
    if (place.tags.includes('wildlife')) return 'Best visited early morning'
  }
  return ''
}

function estimateCost(stops: ItineraryStop[], _budget: PriceRange): { en: string; hi: string } {
  const baseCosts: Record<PriceRange, number> = {
    free: 0,
    low: 200,
    medium: 500,
    high: 1500
  }

  let total = 0
  for (const stop of stops) {
    const price = stop.place.priceRange || 'medium'
    total += baseCosts[price]
  }

  // Add transport estimate
  total += stops.length * 100

  if (total === 0) {
    return { en: 'Free', hi: 'मुफ्त' }
  } else if (total < 500) {
    return { en: `₹${total} (Budget)`, hi: `₹${total} (किफायती)` }
  } else if (total < 1500) {
    return { en: `₹${total} (Moderate)`, hi: `₹${total} (मध्यम)` }
  } else {
    return { en: `₹${total} (Premium)`, hi: `₹${total} (प्रीमियम)` }
  }
}

export function saveItinerary(itinerary: Itinerary): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(itinerary))
}

export function getSavedItinerary(): Itinerary | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored) as Itinerary
  } catch {
    return null
  }
}

export function clearItinerary(): void {
  localStorage.removeItem(STORAGE_KEY)
}

// Mock AI interface for future backend integration
export interface AIPlannerService {
  generate(request: ItineraryRequest): Promise<Itinerary>
}

export const mockAIPlanner: AIPlannerService = {
  async generate(request: ItineraryRequest): Promise<Itinerary> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    return generateItinerary(request)
  }
}
