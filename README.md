# Tripzo --- Smart Tourism & Trip Planning Platform

**Know before you go.**

Tripzo is a smart tourism and trip-planning web application designed to
help travellers make informed decisions before and during a trip. It
brings destination discovery, nearby tourist facilities, weather
information, travel preferences, and budget planning into one place.

The project focuses on practical travel information---not hotel or
flight bookings.

## About the Project

Planning a visit to an unfamiliar destination can involve searching
across multiple sources for attractions, local facilities, weather
conditions, expected expenses, and useful travel information. Tripzo
aims to make this process easier through a unified platform.

The application is being developed with two distinct visual themes:

-   **GenZ theme:** expressive visuals, animations, and interactive
    styling.
-   **Millenial theme:** a cleaner, minimal, and more restrained
    interface.

## Key Features

-   **Destination discovery:** explore destinations and view available
    destination information.
-   **Nearby places:** discover useful places such as hospitals,
    pharmacies, ATMs, restaurants, parking facilities, police stations,
    and attractions where data is available.
-   **Weather information:** weather-related destination information
    through the weather module.
-   **Budget planning:** estimate trip expenses using available
    destination and local price information.
-   **Trip preferences:** provide details such as trip duration, number
    of travellers, travel style, and interests.
-   **Trip planning:** a planning module intended to generate
    itineraries based on destination and user preferences.
-   **Map-based information:** display geographic information and nearby
    places.
-   **Authentication:** user registration and login, with protected
    application areas.

> **Data note:** External map and pricing data may be incomplete,
> unavailable, or approximate. Missing prices should not be interpreted
> as free. Crowd information should not be treated as live crowd
> measurements unless a verified live data source is connected.

## Technology Stack

### Frontend

-   React
-   Vite
-   React Router
-   Tailwind CSS
-   Framer Motion
-   Axios
-   Recharts
-   React Leaflet and Leaflet
-   Lucide React

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JSON Web Tokens (JWT)
-   bcryptjs
-   Axios
-   dotenv
-   CORS

### External Data Services

-   OpenStreetMap ecosystem (including Nominatim and Overpass, where
    available)
-   OpenWeather (when configured)

## Project Structure

The exact structure may evolve during development.

``` text
Tripzo/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── ...
│   └── package.json
│
└── README.md
```

If your frontend directory has a different name (for example, `client`),
use that directory name in the commands below.

## Getting Started

### Prerequisites

-   Node.js and npm
-   MongoDB Atlas account or a reachable MongoDB instance
-   API credentials for external services you want to enable

### 1. Clone the repository

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Tripzo
```

Replace the placeholder with your GitHub repository URL.

### 2. Install frontend dependencies

Open a terminal in the frontend directory:

``` bash
cd frontend
npm install
npm run dev
```

### 3. Install backend dependencies

Open another terminal at the project root:

``` bash
cd backend
npm install
npm start
```

The backend uses port `5000` by default unless another port is
configured.

## Environment Variables

Create a `.env` file inside the backend directory. A typical
configuration may look like this:

``` env
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENWEATHER_API_KEY=your_openweather_api_key
JWT_SECRET=your_long_random_secret
```

Only include variables that your code actually reads. Check your backend
configuration and service files for the exact variable names required by
your version.

**Security reminders:** - Never commit `.env` files, API keys, database
credentials, or JWT secrets to GitHub. - Add `.env` to `.gitignore`. -
If a secret has already been pushed publicly, revoke or rotate it.

## API Overview

The backend currently mounts these route groups:

  Prefix                   Purpose
  ------------------------ -----------------------------------
  `/api/auth`              Authentication
  `/api/destinations`      Destination data
  `/api/weather`           Weather-related endpoints
  `/api/places`            Nearby places
  `/api/plan`              Trip-planning requests
  `/api/costs`             Destination cost estimates
  `/api/restaurant-cost`   Restaurant cost-related endpoints

Exact endpoints, request bodies, and response formats are defined in the
backend route and controller files.

## Current Development Notes

Tripzo is an evolving project. Some modules may be partially implemented
or may use estimated/sample data while integrations are being completed.

-   **Budget estimates:** depend on the availability and quality of
    local pricing data. Treat results as indicative estimates, not
    guaranteed prices.
-   **Itinerary generation:** the planning API structure exists; connect
    and verify the AI itinerary-generation service before describing
    generated plans as AI-powered in a production release.
-   **Crowd information:** do not describe crowd levels as real-time
    unless a live and reliable crowd-data source is integrated and
    validated.
-   **Nearby places:** results depend on third-party map data and may be
    incomplete or outdated.
-   **Weather:** requires valid service configuration and should be
    checked for API availability.

## Future Scope

-   AI-generated day-wise itineraries tailored to user interests and
    trip constraints.
-   More reliable city-specific pricing sources and clearer per-person
    versus group cost breakdowns.
-   Verified crowd-level data and recommendations for less crowded
    visiting times.
-   Dynamic itinerary adjustments based on weather and changing
    conditions.
-   More destination coverage and richer tourist-facility information.
-   Improved validation, error handling, testing, and deployment.

## Team

  Name               Responsibility
  ------------------ ----------------------
  Lakshay Sharma     Backend development
  Akash Tiwari       Frontend development
  Vishnu Chaudhary   Database

## Contributing

This repository is currently maintained as an academic/team project. To
suggest an improvement, report an issue, or contribute code, open an
issue or pull request with a clear description.

## License

No license has been specified yet. Unless a license is added to this
repository, the project should not be assumed to be available for
unrestricted reuse.
