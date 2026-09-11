import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Entry, Home, Explore, PlaceDetail, Itinerary, Help } from './pages'
import { Header, BottomNav, OfflineBanner } from './components'
import { useEffect } from 'react'
import { getStoredTravelBand } from './services/entry'
import { getLanguage } from './services/storage'
import { useTranslation } from 'react-i18next'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const band = getStoredTravelBand()
  if (!band) return <Navigate to="/" replace />
  return <>{children}</>
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      <OfflineBanner />
      <Header />
      <main className="app__main">{children}</main>
      <BottomNav />
    </div>
  )
}

export default function App() {
  const { i18n } = useTranslation()

  // Set initial language from localStorage
  useEffect(() => {
    const lang = getLanguage()
    i18n.changeLanguage(lang)
  }, [i18n])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/home" element={<ProtectedRoute><AppShell><Home /></AppShell></ProtectedRoute>} />
        <Route path="/explore" element={<ProtectedRoute><AppShell><Explore /></AppShell></ProtectedRoute>} />
        <Route path="/place/:id" element={<ProtectedRoute><AppShell><PlaceDetail /></AppShell></ProtectedRoute>} />
        <Route path="/itinerary" element={<ProtectedRoute><AppShell><Itinerary /></AppShell></ProtectedRoute>} />
        <Route path="/help" element={<ProtectedRoute><AppShell><Help /></AppShell></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
