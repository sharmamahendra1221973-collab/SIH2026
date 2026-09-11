import { useTranslation } from 'react-i18next'
import { Languages, Wifi, WifiOff } from 'lucide-react'
import { useOnlineStatus } from '../services/offline'
import { setLanguage, getLanguage } from '../services/storage'

export function Header() {
  const { t, i18n } = useTranslation()
  const status = useOnlineStatus()
  const currentLang = getLanguage()

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'hi' : 'en'
    setLanguage(newLang)
    i18n.changeLanguage(newLang)
  }

  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__title">SIH Travel</h1>
      </div>
      <div className="header__right">
        <div className="header__status" aria-live="polite">
          {status === 'online' ? (
            <Wifi size={18} aria-label={t('common.online')} />
          ) : (
            <WifiOff size={18} className="header__offline" aria-label={t('common.offline')} />
          )}
        </div>
        <button
          className="header__lang"
          onClick={toggleLanguage}
          aria-label={`Switch to ${currentLang === 'en' ? 'Hindi' : 'English'}`}
        >
          <Languages size={20} />
          <span>{currentLang === 'en' ? 'हि' : 'EN'}</span>
        </button>
      </div>
    </header>
  )
}
