import { NavLink } from 'react-router-dom'
import { Home, Compass, Calendar, HelpCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function BottomNav() {
  const { t } = useTranslation()

  const links = [
    { to: '/', icon: Home, label: t('nav.home') },
    { to: '/explore', icon: Compass, label: t('nav.explore') },
    { to: '/itinerary', icon: Calendar, label: t('nav.itinerary') },
    { to: '/help', icon: HelpCircle, label: t('nav.help') }
  ]

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
          aria-label={label}
        >
          <Icon size={24} aria-hidden="true" />
          <span className="bottom-nav__label">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
