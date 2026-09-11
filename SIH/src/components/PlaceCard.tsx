import { useTranslation } from 'react-i18next'
import { MapPin, Clock, Phone, Star, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Place } from '../domain/types'
import { isPlaceSaved, toggleSavedPlace } from '../services/storage'
import { useState } from 'react'
import { PlaceImage } from './PlaceImage'

interface PlaceCardProps {
  place: Place
  compact?: boolean
}

export function PlaceCard({ place, compact }: PlaceCardProps) {
  const { t, i18n } = useTranslation()
  const [saved, setSaved] = useState(isPlaceSaved(place.id))
  const isHindi = i18n.language === 'hi'

  const name = isHindi && place.nameHi ? place.nameHi : place.name
  const address = isHindi && place.addressHi ? place.addressHi : place.address

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSaved(toggleSavedPlace(place.id))
  }

  if (compact) {
    return (
      <Link to={`/place/${place.id}`} className="place-card place-card--compact">
        <PlaceImage src={place.images[0]} alt={name} className="place-card__image place-card__image--compact" />
        <div className="place-card__content">
          <h3 className="place-card__name">{name}</h3>
          <p className="place-card__address">
            <MapPin size={14} aria-hidden="true" />
            {address}
          </p>
        </div>
        <button
          className={`place-card__save ${saved ? 'place-card__save--saved' : ''}`}
          onClick={handleSave}
          aria-label={saved ? t('place.saved') : t('place.save')}
        >
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </Link>
    )
  }

  return (
    <Link to={`/place/${place.id}`} className="place-card">
      <PlaceImage src={place.images[0]} alt={name} className="place-card__image" />
      <div className="place-card__header">
        <h3 className="place-card__name">{name}</h3>
        <button
          className={`place-card__save ${saved ? 'place-card__save--saved' : ''}`}
          onClick={handleSave}
          aria-label={saved ? t('place.saved') : t('place.save')}
        >
          <Heart size={20} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      {place.rating && (
        <div className="place-card__rating">
          <Star size={14} fill="var(--color-warning)" aria-hidden="true" />
          <span>{place.rating.toFixed(1)}</span>
        </div>
      )}
      <p className="place-card__address">
        <MapPin size={14} aria-hidden="true" />
        {address}
      </p>
      {place.openingHours && (
        <p className="place-card__hours">
          <Clock size={14} aria-hidden="true" />
          {place.openingHours}
        </p>
      )}
      {place.phone && !compact && (
        <p className="place-card__phone">
          <Phone size={14} aria-hidden="true" />
          {place.phone}
        </p>
      )}
      <span className="place-card__category">{place.category}</span>
    </Link>
  )
}
