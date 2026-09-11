import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { importLibrary, setOptions } from '@googlemaps/js-api-loader'
import type { Place, Coordinates } from '../domain/types'
import { BHOPAL_CENTER } from '../domain/bhopal'
import { useOnlineStatus } from '../services/offline'
import { useTranslation } from 'react-i18next'
import { PlaceImage } from './PlaceImage'

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
})

interface MapProps {
  center?: Coordinates
  places?: Place[]
  showUserLocation?: boolean
  height?: string
  zoom?: number
}

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

function MapController({ center }: { center: Coordinates }) {
  const map = useMap()
  useEffect(() => {
    map.setView([center.lat, center.lng], map.getZoom())
  }, [center, map])
  return null
}

function GoogleMap({
  center = BHOPAL_CENTER,
  places = [],
  showUserLocation = false,
  height = '100%',
  zoom = 13,
  userLocation,
  onError
}: MapProps & { userLocation: Coordinates | null; onError: () => void }) {
  const { t, i18n } = useTranslation()
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current || !googleMapsApiKey) return

    let cancelled = false
    setOptions({ key: googleMapsApiKey, v: 'weekly' })

    Promise.all([importLibrary('maps'), importLibrary('marker')]).then(([mapsLibrary, markerLibrary]) => {
      if (cancelled || !mapRef.current) return

      const map = new mapsLibrary.Map(mapRef.current, {
        center: { lat: center.lat, lng: center.lng },
        zoom,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true
      })
      const infoWindow = new mapsLibrary.InfoWindow()
      const markers: InstanceType<typeof markerLibrary.AdvancedMarkerElement>[] = []

      const addMarker = (location: Coordinates, title: string, content?: string) => {
        const marker = new markerLibrary.AdvancedMarkerElement({
          map,
          position: { lat: location.lat, lng: location.lng },
          title
        })
        if (content) {
          marker.addListener('click', () => {
            infoWindow.setContent(content)
            infoWindow.open({ map, anchor: marker })
          })
        }
        markers.push(marker)
      }

      if (showUserLocation && userLocation) {
        addMarker(userLocation, t('map.yourLocation'))
      }

      places.forEach(place => {
        const name = i18n.language === 'hi' && place.nameHi ? place.nameHi : place.name
        const address = i18n.language === 'hi' && place.addressHi ? place.addressHi : place.address
        addMarker(
          place.location,
          name,
          `<strong>${name}</strong><br />${address}`
        )
      })

      return () => markers.forEach(marker => { marker.map = null })
    }).catch(onError)

    return () => {
      cancelled = true
    }
  }, [center, i18n, places, showUserLocation, userLocation, zoom, onError, t])

  return <div ref={mapRef} className="google-map" style={{ height, width: '100%' }} />
}

export function Map({
  center = BHOPAL_CENTER,
  places = [],
  showUserLocation = false,
  height = '400px',
  zoom = 13
}: MapProps) {
  const { t, i18n } = useTranslation()
  const online = useOnlineStatus()
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    if (showUserLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      )
    }
  }, [showUserLocation])

  if (mapError || !online) {
    return (
      <div className="map-fallback" style={{ height }}>
        <p>{t('map.offlineFallback')}</p>
        {places.length > 0 && (
          <ul className="map-fallback__list">
            {places.slice(0, 5).map(p => (
              <li key={p.id}>{i18n.language === 'hi' && p.nameHi ? p.nameHi : p.name}</li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  if (googleMapsApiKey) {
    return (
      <div className="map-container" style={{ height }}>
        <GoogleMap
          center={center}
          places={places}
          showUserLocation={showUserLocation}
          height="100%"
          zoom={zoom}
          userLocation={userLocation}
          onError={() => setMapError(true)}
        />
      </div>
    )
  }

  return (
    <div className="map-container" style={{ height }}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          eventHandlers={{
            error: () => setMapError(true)
          }}
        />
        <MapController center={center} />
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>{t('map.yourLocation')}</Popup>
          </Marker>
        )}
        {places.map(place => (
          <Marker key={place.id} position={[place.location.lat, place.location.lng]}>
            <Popup>
              <PlaceImage src={place.images[0]} alt={i18n.language === 'hi' && place.nameHi ? place.nameHi : place.name} className="map-popup__image" />
              <strong>{i18n.language === 'hi' && place.nameHi ? place.nameHi : place.name}</strong>
              <br />
              {i18n.language === 'hi' && place.addressHi ? place.addressHi : place.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
