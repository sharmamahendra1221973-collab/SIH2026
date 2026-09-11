import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, MapPin, Clock, Phone, Star, Heart, Navigation } from 'lucide-react'
import { getPlaceById } from '../domain/bhopal'
import { findNearbyPlaces } from '../services/location'
import { Map, PlaceCard, PlaceImage } from '../components'
import { isPlaceSaved, toggleSavedPlace } from '../services/storage'
import { getDirectionsUrl } from '../services/location'
import { useState, useMemo } from 'react'
import { BHOPAL_CENTER } from '../domain/bhopal'
import type { Place } from '../domain/types'

export function PlaceDetail() {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'
  const [saved, setSaved] = useState(id ? isPlaceSaved(id) : false)

  const place = id ? getPlaceById(id) : undefined

  const nearbyPlaces = useMemo(() => {
    if (!place) return []
    return findNearbyPlaces(place.location, undefined, 5).filter((p: Place & { distance: number }) => p.id !== place.id).slice(0, 4)
  }, [place])

  if (!place) {
    return (
      <div className="place-detail place-detail--not-found">
        <Link to="/explore" className="place-detail__back">
          <ArrowLeft size={20} /> {t('common.back')}
        </Link>
        <p>Place not found</p>
      </div>
    )
  }

  const name = isHindi && place.nameHi ? place.nameHi : place.name
  const description = isHindi && place.descriptionHi ? place.descriptionHi : place.description
  const address = isHindi && place.addressHi ? place.addressHi : place.address

  const handleSave = () => {
    setSaved(toggleSavedPlace(place.id))
  }

  const handleDirections = () => {
    const url = getDirectionsUrl(BHOPAL_CENTER, place.location)
    window.open(url, '_blank')
  }

  const handleCall = () => {
    if (place.phone) {
      window.location.href = `tel:${place.phone}`
    }
  }

  return (
    <div className="place-detail">
      {/* Header */}
      <header className="place-detail__header">
        <Link to="/explore" className="place-detail__back" aria-label={t('common.back')}>
          <ArrowLeft size={24} />
        </Link>
        <button
          className={`place-detail__save ${saved ? 'place-detail__save--saved' : ''}`}
          onClick={handleSave}
          aria-label={saved ? t('place.saved') : t('place.save')}
        >
          <Heart size={24} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </header>

      {/* Map Preview */}
      <div className="place-detail__map">
        <Map center={place.location} places={[place]} zoom={15} height="200px" />
      </div>

      {/* Content */}
      <div className="place-detail__content">
        <PlaceImage src={place.images[0]} alt={name} className="place-detail__image" />
        <div className="place-detail__title-row">
          <h1 className="place-detail__name">{name}</h1>
          <span className="place-detail__category">{place.category}</span>
        </div>

        {place.rating && (
          <div className="place-detail__rating">
            <Star size={16} fill="var(--color-warning)" aria-hidden="true" />
            <span>{place.rating.toFixed(1)}</span>
          </div>
        )}

        <p className="place-detail__description">{description}</p>

        <div className="place-detail__info">
          <div className="place-detail__info-item">
            <MapPin size={18} aria-hidden="true" />
            <span>{address}</span>
          </div>

          {place.openingHours && (
            <div className="place-detail__info-item">
              <Clock size={18} aria-hidden="true" />
              <span>{place.openingHours}</span>
            </div>
          )}

          {place.phone && (
            <button className="place-detail__info-item place-detail__info-item--clickable" onClick={handleCall}>
              <Phone size={18} aria-hidden="true" />
              <span>{place.phone}</span>
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="place-detail__actions">
          <button className="place-detail__action place-detail__action--primary" onClick={handleDirections}>
            <Navigation size={18} aria-hidden="true" />
            {t('place.directions')}
          </button>
          {place.phone && (
            <button className="place-detail__action" onClick={handleCall}>
              <Phone size={18} aria-hidden="true" />
              {t('place.call')}
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="place-detail__tags">
          {(isHindi && place.tagsHi ? place.tagsHi : place.tags).map(tag => (
            <span key={tag} className="place-detail__tag">{tag}</span>
          ))}
        </div>

        {/* Nearby */}
        {nearbyPlaces.length > 0 && (
          <section className="place-detail__nearby">
            <h2>{t('place.nearby')}</h2>
            <div className="place-detail__nearby-list">
              {nearbyPlaces.map(p => (
                <PlaceCard key={p.id} place={p} compact />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
