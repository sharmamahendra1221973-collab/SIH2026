# SIH Travel Assistant

Smart India Hackathon demo prototype — a mobile-first PWA for Bhopal travel discovery with QR entry, offline support, mock AI itinerary planning, emergency assistance, and English/Hindi localization.

## Quick Start

```bash
npm install
npm run dev        # → http://localhost:3000
```

## Commands

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run oxlint |
| `npm run typecheck` | TypeScript type checking |
| `npm test` | Run vitest tests |

## Demo Flow (for Judges)

1. Open the app → click **Enter Demo** on the entry screen
2. View the **Bhopal travel dashboard** with attractions, restaurants, hotels
3. **Explore places** — search, filter by category, switch to map view
4. **Turn off network** → browse cached places and emergency info offline
5. **Generate an itinerary** — set duration, interests, budget → AI creates a plan
6. **Open SOS / "I'm Lost"** — get location, nearby police/hospitals, emergency calls

## Architecture

```
src/
├── app/           # (routing in App.tsx)
├── components/    # BottomNav, Header, Map, PlaceCard, SOSButton, OfflineBanner
├── pages/         # Entry, Home, Explore, PlaceDetail, Itinerary, Help
├── domain/        # TypeScript types + Bhopal seed data
├── services/      # entry, location, offline, itinerary, storage
├── i18n/          # English + Hindi translations
└── styles/        # Global CSS (mobile-first)
```

## Key Features

- **QR/Deep-link Entry**: Parse `?band=X&dest=bhopal` URLs, manual entry fallback
- **Offline PWA**: Service worker caching, localStorage for places/emergency data
- **Map View**: Leaflet/OpenStreetMap with Bhopal coordinates, offline fallback
- **AI Itinerary**: Deterministic local planner with interest/budget/duration inputs
- **Emergency**: Geolocation, nearby hospitals/police, emergency call buttons
- **Localization**: Full English/Hindi support with language persistence

## Tech Stack

- React 19 + TypeScript + Vite
- react-router-dom v7 for routing
- Leaflet + react-leaflet for maps
- i18next + react-i18next for translations
- vite-plugin-pwa for service worker
- lucide-react for icons
- vitest for testing

## Scope (Current)

- Bhopal as initial destination
- Local demo data, no backend
- English/Hindi languages

## Scope (Future)

- NFC band support
- Live AI itinerary (Gemini/OpenAI backend)
- Real emergency dispatch integration
- Live map data and user accounts
