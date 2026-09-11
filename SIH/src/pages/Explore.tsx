import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, Map, List, X } from 'lucide-react'
import { getAllPlaces } from '../domain/bhopal'
import { Map as MapComponent, PlaceCard } from '../components'
import { useOnlineStatus } from '../services/offline'

type ViewMode = 'list' | 'map'

const CATEGORIES = ['all', 'attraction', 'restaurant', 'hotel', 'hospital', 'transport', 'atm'] as const

export function Explore() {
  const { t, i18n } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const online = useOnlineStatus()
  const isHindi = i18n.language === 'hi'

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  )
  const [viewMode, setViewMode] = useState<ViewMode>('list')

  const allPlaces = useMemo(() => getAllPlaces(), [])

  const filteredPlaces = useMemo(() => {
    let places = allPlaces

    // Filter by category
    if (selectedCategory !== 'all') {
      places = places.filter(p => p.category === selectedCategory)
    }

    // Filter by search
    if (search.trim()) {
      const query = search.toLowerCase()
      places = places.filter(p => {
        const name = isHindi && p.nameHi ? p.nameHi : p.name
        const tags = isHindi && p.tagsHi ? p.tagsHi : p.tags
        return (
          name.toLowerCase().includes(query) ||
          p.tags.some(tag => tag.toLowerCase().includes(query)) ||
          (tags && tags.some(tag => tag.toLowerCase().includes(query)))
        )
      })
    }

    return places
  }, [allPlaces, selectedCategory, search, isHindi])

  const categoryLabel = (cat: string): string => {
    const labels: Record<string, string> = {
      all: t('explore.all'),
      attraction: t('explore.attractions'),
      restaurant: t('explore.restaurants'),
      hotel: t('explore.hotels'),
      hospital: t('explore.hospitals'),
      transport: t('explore.transport'),
      atm: t('explore.atms')
    }
    return labels[cat] || cat
  }

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat)
    if (cat === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', cat)
    }
    setSearchParams(searchParams)
  }

  return (
    <div className="explore-page">
      {/* Search Bar */}
      <div className="explore-page__search">
        <Search size={20} className="explore-page__search-icon" aria-hidden="true" />
        <input
          type="search"
          placeholder={t('common.search')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="explore-page__search-input"
          aria-label={t('common.search')}
        />
        {search && (
          <button
            className="explore-page__search-clear"
            onClick={() => setSearch('')}
            aria-label={t('common.clear')}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="explore-page__categories" role="tablist">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            role="tab"
            aria-selected={selectedCategory === cat}
            className={`explore-page__category ${selectedCategory === cat ? 'explore-page__category--active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {categoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* View Toggle */}
      <div className="explore-page__toolbar">
        <span className="explore-page__count">
          {filteredPlaces.length} {filteredPlaces.length === 1 ? 'place' : 'places'}
        </span>
        <div className="explore-page__view-toggle">
          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
            aria-label={t('explore.listView')}
          >
            <List size={18} />
          </button>
          <button
            className={viewMode === 'map' ? 'active' : ''}
            onClick={() => setViewMode('map')}
            aria-label={t('explore.mapView')}
          >
            <Map size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'list' ? (
        <div className="explore-page__list">
          {filteredPlaces.length === 0 ? (
            <div className="explore-page__empty">
              <p>{t('explore.noResults')}</p>
            </div>
          ) : (
            filteredPlaces.map(place => <PlaceCard key={place.id} place={place} />)
          )}
        </div>
      ) : (
        <div className="explore-page__map">
          <MapComponent places={filteredPlaces} height="calc(100vh - 280px)" />
        </div>
      )}

      {/* Offline Notice */}
      {!online && viewMode === 'map' && (
        <div className="explore-page__offline">
          <p>Map tiles may not load offline. List view works fully.</p>
        </div>
      )}
    </div>
  )
}
