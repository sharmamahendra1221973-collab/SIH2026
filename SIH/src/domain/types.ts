export interface Coordinates {
  lat: number
  lng: number
}

export interface Place {
  id: string
  name: string
  nameHi?: string
  category: PlaceCategory
  description: string
  descriptionHi?: string
  location: Coordinates
  address: string
  addressHi?: string
  images: string[]
  rating?: number
  priceRange?: PriceRange
  openingHours?: string
  phone?: string
  tags: string[]
  tagsHi?: string[]
}

export type PlaceCategory =
  | 'attraction'
  | 'restaurant'
  | 'hotel'
  | 'hospital'
  | 'police'
  | 'atm'
  | 'transport'
  | 'safe-point'

export type PriceRange = 'free' | 'low' | 'medium' | 'high'

export interface EmergencyContact {
  id: string
  name: string
  nameHi?: string
  number: string
  description: string
  descriptionHi?: string
  icon: string
}

export interface TravelBand {
  id: string
  destination: string
  token: string
  expiresAt?: string
}

export interface Itinerary {
  id: string
  title: string
  titleHi?: string
  duration: number // hours
  places: ItineraryStop[]
  estimatedCost: string
  estimatedCostHi?: string
}

export interface ItineraryStop {
  place: Place
  duration: number // minutes
  order: number
  notes?: string
  notesHi?: string
}

export interface UserPreferences {
  language: 'en' | 'hi'
  savedPlaces: string[]
  lastKnownLocation?: Coordinates
}

export interface ItineraryRequest {
  duration: number // hours
  interests: string[]
  budget: PriceRange
}
