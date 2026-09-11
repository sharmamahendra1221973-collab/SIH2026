import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { QrCode, LogIn, MapPin } from 'lucide-react'
import { parseQRData, validateBand, checkURLForBand, createDemoBand, saveTravelBand, clearURLParams } from '../services/entry'

export function Entry() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'scan' | 'manual' | null>(null)
  const [bandId, setBandId] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check URL for band data
    const urlBand = checkURLForBand()
    if (urlBand) {
      const result = validateBand(urlBand)
      if (result.valid) {
        saveTravelBand(urlBand)
        clearURLParams()
        navigate('/home')
      } else {
        setError(result.error || 'invalid')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDemoEntry = async () => {
    setLoading(true)
    setError(null)

    // Simulate loading
    await new Promise(r => setTimeout(r, 500))

    const band = createDemoBand()
    saveTravelBand(band)
    navigate('/home')
  }

  const handleManualEntry = async () => {
    if (!bandId.trim()) {
      setError('invalid')
      return
    }

    setLoading(true)
    setError(null)

    const band = parseQRData(bandId.trim())
    if (!band) {
      setError('invalid')
      setLoading(false)
      return
    }

    const result = validateBand(band)
    if (!result.valid) {
      setError(result.error || 'invalid')
      setLoading(false)
      return
    }

    saveTravelBand(band)
    navigate('/home')
  }

  return (
    <div className="entry-page">
      <div className="entry-page__hero">
        <div className="entry-page__logo">
          <MapPin size={64} aria-hidden="true" />
        </div>
        <h1 className="entry-page__title">{t('entry.title')}</h1>
        <p className="entry-page__subtitle">{t('entry.subtitle')}</p>
      </div>

      {error && (
        <div className="entry-page__error" role="alert">
          {error === 'invalid' && t('entry.invalidQR')}
          {error === 'expired' && t('entry.expired')}
          {error === 'used' && t('entry.alreadyUsed')}
        </div>
      )}

      <div className="entry-page__actions">
        {mode === null && (
          <>
            <button
              className="entry-page__button entry-page__button--primary"
              onClick={() => setMode('scan')}
            >
              <QrCode size={24} aria-hidden="true" />
              {t('entry.scanQR')}
            </button>
            <button
              className="entry-page__button entry-page__button--secondary"
              onClick={handleDemoEntry}
            >
              <LogIn size={24} aria-hidden="true" />
              {t('entry.enterManually')}
            </button>
          </>
        )}

        {mode === 'scan' && (
          <div className="entry-page__scanner">
            <p className="entry-page__scanner-note">
              QR scanning requires camera access. For demo purposes, enter the band ID manually below.
            </p>
            <button
              className="entry-page__button entry-page__button--secondary"
              onClick={() => setMode('manual')}
            >
              Enter Band ID
            </button>
            <button
              className="entry-page__button entry-page__button--link"
              onClick={() => setMode(null)}
            >
              {t('common.back')}
            </button>
          </div>
        )}

        {mode === 'manual' && (
          <form className="entry-page__form" onSubmit={e => { e.preventDefault(); handleManualEntry() }}>
            <div className="entry-page__field">
              <label htmlFor="bandId">{t('entry.bandId')}</label>
              <input
                id="bandId"
                type="text"
                value={bandId}
                onChange={e => setBandId(e.target.value)}
                placeholder={t('entry.bandIdPlaceholder')}
                autoComplete="off"
              />
            </div>
            <div className="entry-page__field">
              <label htmlFor="destination">{t('entry.destination')}</label>
              <select id="destination" defaultValue="bhopal">
                <option value="bhopal">{t('entry.bhopal')}</option>
              </select>
            </div>
            <button
              type="submit"
              className="entry-page__button entry-page__button--primary"
              disabled={loading || !bandId.trim()}
            >
              {loading ? t('common.loading') : t('entry.startJourney')}
            </button>
            <button
              type="button"
              className="entry-page__button entry-page__button--link"
              onClick={() => setMode(null)}
            >
              {t('common.back')}
            </button>
          </form>
        )}
      </div>

      <p className="entry-page__demo-note">
        Demo Mode: Click "Enter Demo" to explore Bhopal features
      </p>
    </div>
  )
}
