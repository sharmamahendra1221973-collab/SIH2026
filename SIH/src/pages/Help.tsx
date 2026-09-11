import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, MapPin, Shield, Hospital, Building, Navigation, Share2, AlertCircle } from 'lucide-react'
import { EMERGENCY_CONTACTS } from '../domain/bhopal'
import { getCurrentLocation, findNearestPlace, formatCoordinates, getGoogleMapsUrl } from '../services/location'
import { Map, PlaceCard } from '../components'
import type { Coordinates } from '../domain/types'

export function Help() {
  const { t, i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [gettingLocation, setGettingLocation] = useState(false)

  const handleGetLocation = async () => {
    setGettingLocation(true)
    setLocationError(null)

    try {
      const coords = await getCurrentLocation()
      setUserLocation(coords)
    } catch (e) {
      if (e instanceof Error && e.message === 'PERMISSION_DENIED') {
        setLocationError(t('help.locationPermission'))
      } else {
        setLocationError(t('help.locationUnknown'))
      }
    } finally {
      setGettingLocation(false)
    }
  }

  useEffect(() => {
    handleGetLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`
  }

  const handleShareLocation = () => {
    if (!userLocation) return

    const url = getGoogleMapsUrl(userLocation)
    const text = `My location: ${formatCoordinates(userLocation)}`

    if (navigator.share) {
      navigator.share({ url, text }).catch(() => {})
    } else {
      navigator.clipboard.writeText(`${text}\n${url}`)
      alert('Location copied to clipboard')
    }
  }

  const nearestPolice = userLocation ? findNearestPlace(userLocation, 'police') : null
  const nearestHospital = userLocation ? findNearestPlace(userLocation, 'hospital') : null
  const nearestSafePoint = userLocation ? findNearestPlace(userLocation, 'safe-point') : null

  return (
    <div className="help-page">
      {/* I'm Lost Section */}
      <section className="help-section help-section--lost">
        <div className="lost-mode">
          <h1 className="lost-mode__title">{t('help.imLostTitle')}</h1>
          <p className="lost-mode__desc">{t('help.imLostDesc')}</p>

          {/* Location Status */}
          <div className="lost-mode__location">
            {gettingLocation ? (
              <p className="lost-mode__status">{t('help.gettingLocation')}</p>
            ) : userLocation ? (
              <div className="lost-mode__coords">
                <MapPin size={18} />
                <span>{formatCoordinates(userLocation)}</span>
              </div>
            ) : locationError ? (
              <p className="lost-mode__error">{locationError}</p>
            ) : (
              <button className="lost-mode__get-location" onClick={handleGetLocation}>
                <Navigation size={18} />
                Get My Location
              </button>
            )}
          </div>

          {/* Actions */}
          {userLocation && (
            <div className="lost-mode__actions">
              <button className="lost-mode__action" onClick={handleShareLocation}>
                <Share2 size={18} />
                {t('help.shareLocation')}
              </button>
              <button className="lost-mode__action lost-mode__action--emergency" onClick={() => handleCall('100')}>
                <Phone size={18} />
                {t('help.callEmergency')}
              </button>
            </div>
          )}

          {/* Map */}
          {userLocation && (
            <div className="lost-mode__map">
              <Map
                center={userLocation}
                places={[nearestPolice, nearestHospital, nearestSafePoint].filter((p): p is NonNullable<typeof p> => p !== null)}
                showUserLocation
                height="250px"
                zoom={14}
              />
            </div>
          )}
        </div>
      </section>

      {/* Nearby Help */}
      {userLocation && (
        <section className="help-section">
          <h2>{t('help.nearby')}</h2>

          {nearestPolice && (
            <div className="nearby-card">
              <Shield size={24} />
              <div>
                <h3>{t('help.policeStation')}</h3>
                <PlaceCard place={nearestPolice} compact />
              </div>
            </div>
          )}

          {nearestHospital && (
            <div className="nearby-card">
              <Hospital size={24} />
              <div>
                <h3>{t('help.hospital')}</h3>
                <PlaceCard place={nearestHospital} compact />
              </div>
            </div>
          )}

          {nearestSafePoint && (
            <div className="nearby-card">
              <Building size={24} />
              <div>
                <h3>{t('help.findSafePoint')}</h3>
                <PlaceCard place={nearestSafePoint} compact />
              </div>
            </div>
          )}
        </section>
      )}

      {/* Emergency Contacts */}
      <section className="help-section">
        <h2>{t('help.emergencyTitle')}</h2>
        <p className="help-section__desc">{t('help.emergencyDesc')}</p>

        <div className="emergency-contacts">
          {EMERGENCY_CONTACTS.map(contact => {
            const name = isHindi && contact.nameHi ? contact.nameHi : contact.name
            const description = isHindi && contact.descriptionHi ? contact.descriptionHi : contact.description

            return (
              <button
                key={contact.id}
                className="emergency-contact"
                onClick={() => handleCall(contact.number)}
              >
                <div className="emergency-contact__icon">
                  <Phone size={24} />
                </div>
                <div className="emergency-contact__info">
                  <span className="emergency-contact__name">{name}</span>
                  <span className="emergency-contact__number">{contact.number}</span>
                  <span className="emergency-contact__desc">{description}</span>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Offline Notice */}
      <div className="help-offline">
        <AlertCircle size={16} />
        <span>{t('help.offlineNote')}</span>
      </div>
    </div>
  )
}
