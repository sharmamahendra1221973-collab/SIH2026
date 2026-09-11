import { useTranslation } from 'react-i18next'
import { WifiOff } from 'lucide-react'
import { useOnlineStatus } from '../services/offline'

export function OfflineBanner() {
  const { t } = useTranslation()
  const status = useOnlineStatus()

  if (status === 'online') return null

  return (
    <div className="offline-banner" role="alert" aria-live="assertive">
      <WifiOff size={18} aria-hidden="true" />
      <span>{t('common.offline')}</span>
    </div>
  )
}
