# WANDERA: TRAVELBAND (SIH2026)

A Smart India Hackathon 2026 project focused on a mobile-first travel assistant for Bhopal city exploration, itinerary planning, and emergency assistance.

WANDERA: TRAVELBAND is a demo-ready travel companion designed for tourists and visitors. The main app is located in the `SIH/` directory.

## Overview

The project aims to help travelers discover local attractions, restaurants, hotels, and landmarks in Bhopal through a guided mobile experience. It includes:

- place discovery and category-based browsing
- map-based navigation
- AI-inspired itinerary generation
- emergency support and location assistance
- offline-friendly PWA behavior
- English and Hindi localization
- demo-friendly flows for hackathon presentation

## Features

- QR / deep-link entry experience
- Bhopal travel dashboard with curated places
- Search and filters for destination discovery
- List and map views for exploring places
- Personalized itinerary generation based on duration, interests, and budget
- SOS / “I’m Lost” emergency flow
- Nearby hospital and police support information
- Easy offline access through PWA caching
- Full English and Hindi UI support

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Leaflet + React Leaflet
- i18next + react-i18next
- Lucide React
- Vitest
- vite-plugin-pwa

## Getting Started

Follow these steps to set up and run the WANDERA: TRAVELBAND application locally.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually bundled with Node.js)

### Installation & Setup

1. Clone or download the repository to your local machine.
2. Open your terminal and navigate to the project directory:
   ```bash
   cd SIH
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

### Running the Project

To launch the development server and run the application locally:

```bash
npm run dev
```

Once the server has started, you can access the application in your browser at the address provided in your terminal (typically `http://localhost:5173`).

### Building for Production

To create an optimized production build of the project:

```bash
npm run build
```

The compiled and bundled files will be generated in the `SIH/dist` directory, ready for deployment.

### Running Tests

To run the test suite and verify everything is working properly:

```bash
npm run test
```

## Repository Structure

SIH2026/
├── README.md               # Repository-level documentation
├── package.json            # Root package metadata
├── package-lock.json       # Root lockfile
├── SIH/                    # Main application directory
│   ├── README.md           # App-specific README
│   ├── package.json        # App dependencies and scripts
│   ├── package-lock.json   # App lockfile
│   ├── index.html          # HTML entry point
│   ├── vite.config.ts     # Vite config
│   ├── vitest.config.ts   # Vitest config
│   ├── tsconfig.json      # TypeScript config
│   ├── public/             # Static assets / PWA-related files
│   ├── src/                # React application source
│   └── tests/              # Test files
└── node_modules/           # Installed dependencies
