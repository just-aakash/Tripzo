import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

// ==========================================
// CREATE CATEGORY ICON
// ==========================================

const createCategoryIcon = (emoji) => {
  return L.divIcon({
    className: "",
    html: `
      <div
        style="
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: white;
          border: 3px solid #07100e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        "
      >
        ${emoji}
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20],
  });
};

// ==========================================
// CATEGORY ICONS
// ==========================================

const categoryIcons = {
  hospital: createCategoryIcon("🏥"),
  pharmacy: createCategoryIcon("💊"),
  atm: createCategoryIcon("🏧"),
  restaurant: createCategoryIcon("🍽️"),
  parking: createCategoryIcon("🅿️"),
  police: createCategoryIcon("🚓"),
  attraction: createCategoryIcon("📸"),
  museum: createCategoryIcon("🏛️"),
  viewpoint: createCategoryIcon("🌄"),
};

// ==========================================
// DESTINATION ICON
// ==========================================

const destinationIcon = L.divIcon({
  className: "",
  html: `
    <div
      style="
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: #07100e;
        border: 4px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        box-shadow: 0 5px 18px rgba(0,0,0,0.35);
      "
    >
      📍
    </div>
  `,
  iconSize: [46, 46],
  iconAnchor: [23, 23],
  popupAnchor: [0, -24],
});

// ==========================================
// DESTINATION MAP
// ==========================================

export default function DestinationMap({
  latitude,
  longitude,
  destinationName,
}) {
  const [places, setPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [placesLoading, setPlacesLoading] =
    useState(false);

  const [placesError, setPlacesError] =
    useState("");

  // ========================================
  // FETCH NEARBY PLACES
  // ========================================

  useEffect(() => {
    if (
      latitude == null ||
      longitude == null
    ) {
      return;
    }

    const fetchNearbyPlaces = async () => {
      try {
        setPlacesLoading(true);
        setPlacesError("");

        const response = await fetch(
          `http://localhost:5000/api/places/nearby/${latitude}/${longitude}?radius=5000`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Unable to fetch nearby places."
          );
        }

        setPlaces(data.places || []);
      } catch (error) {
        console.error(
          "Nearby places fetch error:",
          error
        );

        setPlacesError(
          "Nearby places are currently unavailable."
        );
      } finally {
        setPlacesLoading(false);
      }
    };

    fetchNearbyPlaces();
  }, [latitude, longitude]);

  // ========================================
  // FILTER PLACES
  // ========================================

  const filteredPlaces =
    selectedCategory === "all"
      ? places
      : places.filter(
          (place) =>
            place.type === selectedCategory
        );

  // ========================================
  // AVAILABLE CATEGORIES
  // ========================================

  const categories = [
    {
      id: "all",
      label: "All",
      emoji: "✨",
    },
    {
      id: "hospital",
      label: "Hospitals",
      emoji: "🏥",
    },
    {
      id: "pharmacy",
      label: "Pharmacies",
      emoji: "💊",
    },
    {
      id: "atm",
      label: "ATMs",
      emoji: "🏧",
    },
    {
      id: "restaurant",
      label: "Restaurants",
      emoji: "🍽️",
    },
    {
      id: "parking",
      label: "Parking",
      emoji: "🅿️",
    },
    {
      id: "police",
      label: "Police",
      emoji: "🚓",
    },
    {
      id: "attraction",
      label: "Attractions",
      emoji: "📸",
    },
    {
      id: "museum",
      label: "Museums",
      emoji: "🏛️",
    },
    {
      id: "viewpoint",
      label: "Viewpoints",
      emoji: "🌄",
    },
  ];

  // ========================================
  // NO LOCATION
  // ========================================

  if (
    latitude == null ||
    longitude == null
  ) {
    return (
      <div className="flex h-[450px] items-center justify-center rounded-3xl bg-[#f5f3ed]">
        <div className="text-center">

          <p className="text-sm text-black/50">
            Map location is not available.
          </p>

        </div>
      </div>
    );
  }

  // ========================================
  // MAP
  // ========================================

  return (
    <div>

      {/* ====================================
          CATEGORY FILTERS
      ==================================== */}

      <div className="mb-5 flex gap-2 overflow-x-auto pb-2">

        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() =>
              setSelectedCategory(
                category.id
              )
            }
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm transition-all duration-300 ${
              selectedCategory ===
              category.id
                ? "bg-[#07100e] text-white"
                : "bg-[#f5f3ed] text-black/60 hover:bg-[#e9e6dc]"
            }`}
          >
            <span>
              {category.emoji}
            </span>

            <span>
              {category.label}
            </span>
          </button>
        ))}

      </div>

      {/* ====================================
          STATUS
      ==================================== */}

      {placesLoading && (
        <div className="mb-4 flex items-center gap-2 text-sm text-black/50">

          <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/10 border-t-black" />

          Finding nearby places...

        </div>
      )}

      {placesError && (
        <div className="mb-4 rounded-2xl bg-[#f5f3ed] p-4 text-sm text-black/50">
          {placesError}
        </div>
      )}

      {/* ====================================
          MAP
      ==================================== */}

      <div className="overflow-hidden rounded-3xl border border-black/5">

        <MapContainer
          center={[
            latitude,
            longitude,
          ]}
          zoom={13}
          scrollWheelZoom={true}
          className="h-[500px] w-full"
        >

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* DESTINATION */}

          <Marker
            position={[
              latitude,
              longitude,
            ]}
            icon={destinationIcon}
          >
            <Popup>

              <div className="min-w-[160px]">

                <strong>
                  {destinationName}
                </strong>

                <p className="mt-1 text-xs text-black/60">
                  Destination
                </p>

              </div>

            </Popup>
          </Marker>

          {/* NEARBY PLACES */}

          {filteredPlaces.map(
            (place) => {

              const icon =
                categoryIcons[
                  place.type
                ];

              if (!icon) {
                return null;
              }

              return (
                <Marker
                  key={place.id}
                  position={[
                    place.latitude,
                    place.longitude,
                  ]}
                  icon={icon}
                >

                  <Popup>

                    <div className="min-w-[200px]">

                      <h3 className="font-semibold">
                        {place.name}
                      </h3>

                      <p className="mt-1 text-xs capitalize text-black/50">
                        {place.type}
                      </p>

                      {place.distance !=
                        null && (
                        <p className="mt-2 text-xs text-black/60">
                          {place.distance} km
                          away
                        </p>
                      )}

                      {place.address && (
                        <p className="mt-2 text-xs leading-5 text-black/50">
                          {place.address}
                        </p>
                      )}

                      {place.phone && (
                        <p className="mt-2 text-xs text-black/60">
                          📞 {place.phone}
                        </p>
                      )}

                      {place.openingHours && (
                        <p className="mt-2 text-xs text-black/50">
                          🕐{" "}
                          {
                            place.openingHours
                          }
                        </p>
                      )}

                      {place.website && (
                        <a
                          href={
                            place.website
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-block text-xs font-medium underline"
                        >
                          Visit website
                        </a>
                      )}

                    </div>

                  </Popup>

                </Marker>
              );
            }
          )}

        </MapContainer>

      </div>

      {/* ====================================
          RESULTS SUMMARY
      ==================================== */}

      {!placesLoading && (
        <div className="mt-4 flex items-center justify-between text-xs text-black/40">

          <span>
            {filteredPlaces.length} nearby{" "}
            {selectedCategory ===
            "all"
              ? "places"
              : selectedCategory}
          </span>

          <span>
            Within 5 km
          </span>

        </div>
      )}

    </div>
  );
}
