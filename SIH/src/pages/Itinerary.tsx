import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Clock, MapPin, IndianRupee, Sparkles, AlertCircle } from 'lucide-react'
import { getSavedItinerary, saveItinerary, mockAIPlanner } from '../services/itinerary'
import { PlaceCard } from '../components'
import type { Itinerary as ItineraryType, ItineraryRequest, PriceRange } from '../domain/types'

const INTERESTS = ['history', 'nature', 'spiritual', 'food', 'photography', 'shopping', 'adventure']
const DURATIONS = [2, 4, 6, 8]
const BUDGETS: PriceRange[] = ['free', 'low', 'medium', 'high']

export function Itinerary() {
  const { t, i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const [step, setStep] = useState<'form' | 'loading' | 'result'>(() => {
    return getSavedItinerary() ? 'result' : 'form'
  })
  const [itinerary, setItinerary] = useState<ItineraryType | null>(() => getSavedItinerary())
  const [error, setError] = useState<string | null>(null)

  const [duration, setDuration] = useState(4)
  const [interests, setInterests] = useState<string[]>(['history', 'nature'])
  const [budget, setBudget] = useState<PriceRange>('low')

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleGenerate = async () => {
    setError(null)
    setStep('loading')

    const request: ItineraryRequest = { duration, interests, budget }

    try {
      const result = await mockAIPlanner.generate(request)
      setItinerary(result)
      saveItinerary(result)
      setStep('result')
    } catch {
      setError(t('common.error'))
      setStep('form')
    }
  }

  const handleReset = () => {
    setStep('form')
    setItinerary(null)
  }

  if (step === 'loading') {
    return (
      <div className="itinerary-page itinerary-page--loading">
        <div className="itinerary-loading">
          <Sparkles className="itinerary-loading__icon" size={48} />
          <p>{t('itinerary.generating')}</p>
          <div className="itinerary-loading__bar" />
        </div>
      </div>
    )
  }

  if (step === 'result' && itinerary) {
    return (
      <div className="itinerary-page itinerary-page--result">
        <div className="itinerary-header">
          <h1>{t('itinerary.yourPlan')}</h1>
          <button className="itinerary-reset" onClick={handleReset}>
            Create New
          </button>
        </div>

        <div className="itinerary-summary">
          <div className="itinerary-summary__item">
            <Clock size={18} />
            <span>{itinerary.duration} {t('itinerary.hoursShort')}</span>
          </div>
          <div className="itinerary-summary__item">
            <MapPin size={18} />
            <span>{itinerary.places.length} {t('itinerary.stops')}</span>
          </div>
          <div className="itinerary-summary__item">
            <IndianRupee size={18} />
            <span>{isHindi && itinerary.estimatedCostHi ? itinerary.estimatedCostHi : itinerary.estimatedCost}</span>
          </div>
        </div>

        <div className="itinerary-timeline">
          {itinerary.places.map((stop, idx) => (
            <div key={`${stop.place.id}-${idx}`} className="itinerary-stop">
              <div className="itinerary-stop__marker">
                <span>{stop.order}</span>
              </div>
              <div className="itinerary-stop__content">
                <PlaceCard place={stop.place} />
                <p className="itinerary-stop__duration">
                  {stop.duration} minutes
                  {stop.notes && ` • ${isHindi && stop.notesHi ? stop.notesHi : stop.notes}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="itinerary-note">
          <AlertCircle size={16} />
          <span>{t('itinerary.demoNote')}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="itinerary-page itinerary-page--form">
      <header className="itinerary-page__header">
        <h1>{t('itinerary.title')}</h1>
        <p>{t('itinerary.subtitle')}</p>
        <div className="itinerary-demo-badge">{t('itinerary.demo')}</div>
      </header>

      {error && (
        <div className="itinerary-error" role="alert">
          {error}
        </div>
      )}

      <form className="itinerary-form" onSubmit={e => { e.preventDefault(); handleGenerate() }}>
        {/* Duration */}
        <div className="itinerary-field">
          <label>{t('itinerary.duration')}</label>
          <div className="itinerary-options">
            {DURATIONS.map(d => (
              <button
                key={d}
                type="button"
                className={`itinerary-option ${duration === d ? 'itinerary-option--active' : ''}`}
                onClick={() => setDuration(d)}
              >
                {d} {t('itinerary.hours')}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="itinerary-field">
          <label>{t('itinerary.interests')}</label>
          <div className="itinerary-interests">
            {INTERESTS.map(interest => (
              <button
                key={interest}
                type="button"
                className={`itinerary-interest ${interests.includes(interest) ? 'itinerary-interest--active' : ''}`}
                onClick={() => toggleInterest(interest)}
              >
                {t(`interests.${interest}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="itinerary-field">
          <label>{t('itinerary.budget')}</label>
          <div className="itinerary-options">
            {BUDGETS.map(b => (
              <button
                key={b}
                type="button"
                className={`itinerary-option ${budget === b ? 'itinerary-option--active' : ''}`}
                onClick={() => setBudget(b)}
              >
                {t(`place.${b}`)}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="itinerary-submit"
          disabled={interests.length === 0}
        >
          {t('itinerary.generate')}
        </button>
      </form>

      <p className="itinerary-note">
        <AlertCircle size={14} />
        {t('itinerary.demoNote')}
      </p>
    </div>
  )
}
