import { useTranslation } from 'react-i18next'
import { AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SOSButton() {
  const { t } = useTranslation()

  return (
    <Link to="/help" className="sos-button" aria-label="Emergency SOS">
      <AlertTriangle size={28} aria-hidden="true" />
      <span className="sos-button__label">{t('home.sos')}</span>
    </Link>
  )
}
