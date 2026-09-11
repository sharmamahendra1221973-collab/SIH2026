import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Compass, Utensils, Bed, AlertTriangle, MapPin } from 'lucide-react'
import { ATTRACTIONS, RESTAURANTS, HOTELS } from '../domain/bhopal'
import { PlaceCard, SOSButton } from '../components'
import { useOnlineStatus } from '../services/offline'

export function Home() {
  const { t, i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'
  const online = useOnlineStatus()

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-page__hero">
        <div className="home-page__hero-content">
          <h1 className="home-page__greeting">
            {isHindi ? t('home.greetingHi') : t('home.greeting')}
          </h1>
          <p className="home-page__tagline">
            <MapPin size={16} aria-hidden="true" />
            {isHindi ? t('home.taglineHi') : t('home.tagline')}
          </p>
        </div>
        <SOSButton />
      </section>

      {/* Quick Actions */}
      <section className="home-page__quick-actions">
        <Link to="/explore" className="quick-action">
          <Compass size={24} aria-hidden="true" />
          <span>{t('nav.explore')}</span>
        </Link>
        <Link to="/explore?category=restaurant" className="quick-action">
          <Utensils size={24} aria-hidden="true" />
          <span>{t('home.restaurants')}</span>
        </Link>
        <Link to="/explore?category=hotel" className="quick-action">
          <Bed size={24} aria-hidden="true" />
          <span>{t('home.hotels')}</span>
        </Link>
        <Link to="/help" className="quick-action quick-action--emergency">
          <AlertTriangle size={24} aria-hidden="true" />
          <span>{t('home.emergency')}</span>
        </Link>
      </section>

      {/* Attractions */}
      <section className="home-page__section">
        <div className="section-header">
          <h2>{t('home.attractions')}</h2>
          <Link to="/explore?category=attraction" className="section-header__link">
            {t('home.seeAll')}
          </Link>
        </div>
        <div className="place-grid">
          {ATTRACTIONS.slice(0, 3).map(place => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>

      {/* Restaurants */}
      <section className="home-page__section">
        <div className="section-header">
          <h2>{t('home.restaurants')}</h2>
          <Link to="/explore?category=restaurant" className="section-header__link">
            {t('home.seeAll')}
          </Link>
        </div>
        <div className="place-grid">
          {RESTAURANTS.slice(0, 2).map(place => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>

      {/* Hotels */}
      <section className="home-page__section">
        <div className="section-header">
          <h2>{t('home.hotels')}</h2>
          <Link to="/explore?category=hotel" className="section-header__link">
            {t('home.seeAll')}
          </Link>
        </div>
        <div className="place-grid">
          {HOTELS.slice(0, 2).map(place => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>

      {/* Offline Notice */}
      {!online && (
        <div className="home-page__offline-notice">
          <p>Some features may be limited offline. Saved places and emergency info are available.</p>
        </div>
      )}
    </div>
  )
}
