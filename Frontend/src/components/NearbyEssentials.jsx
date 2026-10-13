import { useEffect, useState } from "react";

import {
  Hospital,
  Pill,
  Utensils,
  Landmark,
  ParkingCircle,
  Shield,
  CreditCard,
  Camera,
  ArrowUpRight,
  MapPin,
} from "lucide-react";


// ==========================================
// CATEGORY CONFIGURATION
// ==========================================

const categories = [
  {
    id: "hospitals",
    label: "Hospitals",
    singular: "hospital",
    icon: Hospital,
    emoji: "🏥",
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    singular: "pharmacy",
    icon: Pill,
    emoji: "💊",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    singular: "restaurant",
    icon: Utensils,
    emoji: "🍽️",
  },
  {
    id: "attractions",
    label: "Attractions",
    singular: "attraction",
    icon: Camera,
    emoji: "📸",
  },
  {
    id: "museums",
    label: "Museums",
    singular: "museum",
    icon: Landmark,
    emoji: "🏛️",
  },
  {
    id: "parking",
    label: "Parking",
    singular: "parking",
    icon: ParkingCircle,
    emoji: "🅿️",
  },
  {
    id: "police",
    label: "Police",
    singular: "police",
    icon: Shield,
    emoji: "🚓",
  },
  {
    id: "atms",
    label: "ATMs",
    singular: "atm",
    icon: CreditCard,
    emoji: "🏧",
  },
];


// ==========================================
// COMPONENT
// ==========================================

export default function NearbyEssentials({
  latitude,
  longitude,
}) {
  const [places, setPlaces] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // ========================================
  // FETCH PLACES
  // ========================================

  useEffect(() => {
    if (
      latitude == null ||
      longitude == null
    ) {
      return;
    }


    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError("");


        const response = await fetch(
          `http://localhost:5000/api/places/nearby/${latitude}/${longitude}?radius=2000`
        );


        const data =
          await response.json();


        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Unable to fetch nearby places."
          );
        }


        setPlaces(
          data.places || []
        );

      } catch (error) {

        console.error(
          "Nearby essentials error:",
          error
        );

        setError(
          "Nearby information is currently unavailable."
        );

      } finally {

        setLoading(false);

      }
    };


    fetchPlaces();

  }, [latitude, longitude]);


  // ========================================
  // GET PLACES FOR CATEGORY
  // ========================================

  const getCategoryPlaces = (
    category
  ) => {

    return places.filter(
      (place) =>
        place.type ===
        category.singular
    );

  };


  // ========================================
  // NO LOCATION
  // ========================================

  if (
    latitude == null ||
    longitude == null
  ) {
    return null;
  }


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">

        <div className="rounded-[2rem] bg-white p-8 shadow-sm">

          <p className="text-xs uppercase tracking-[0.2em] text-black/35">
            Travel essentials
          </p>

          <h2 className="mt-2 text-3xl font-semibold">
            What&apos;s around you
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">

            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="h-28 animate-pulse rounded-2xl bg-[#f5f3ed]"
                />
              )
            )}

          </div>

        </div>

      </section>
    );
  }


  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">

        <div className="rounded-[2rem] bg-white p-8 shadow-sm">

          <p className="text-xs uppercase tracking-[0.2em] text-black/35">
            Travel essentials
          </p>

          <h2 className="mt-2 text-3xl font-semibold">
            What&apos;s around you
          </h2>

          <p className="mt-5 rounded-2xl bg-[#f5f3ed] p-5 text-sm text-black/50">
            {error}
          </p>

        </div>

      </section>
    );
  }


  // ========================================
  // MAIN UI
  // ========================================

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">

      <div className="rounded-[2rem] bg-white p-7 shadow-sm md:p-9">

        {/* HEADER */}

        <div className="max-w-2xl">

          <p className="text-xs uppercase tracking-[0.2em] text-black/35">
            Travel essentials
          </p>

          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
            What&apos;s around you
          </h2>

          <p className="mt-3 text-sm leading-7 text-black/50">
            Everything useful you may need while
            exploring this destination, from
            hospitals and pharmacies to food,
            parking and attractions.
          </p>

        </div>


        {/* CATEGORY CARDS */}

        <div className="mt-8 grid gap-4 md:grid-cols-2">

          {categories.map(
            (category) => {

              const categoryPlaces =
                getCategoryPlaces(
                  category
                );

              const Icon =
                category.icon;

              const nearest =
                categoryPlaces[0];


              return (
                <div
                  key={category.id}
                  className="group rounded-2xl border border-black/5 bg-[#faf9f5] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >

                  {/* TOP */}

                  <div className="flex items-start justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                        {category.emoji}
                      </div>

                      <div>

                        <h3 className="font-semibold text-black/80">
                          {category.label}
                        </h3>

                        <p className="mt-0.5 text-xs text-black/40">
                          {categoryPlaces.length} nearby
                        </p>

                      </div>

                    </div>


                    <Icon
                      size={18}
                      strokeWidth={1.7}
                      className="text-black/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />

                  </div>


                  {/* NEAREST PLACE */}

                  {nearest ? (
                    <div className="mt-5 border-t border-black/5 pt-4">

                      <p className="truncate text-sm font-medium text-black/75">
                        {nearest.name}
                      </p>


                      <div className="mt-2 flex items-center gap-3 text-xs text-black/40">

                        {nearest.distance !=
                          null && (
                          <span className="flex items-center gap-1">
                            <MapPin
                              size={12}
                            />

                            {nearest.distance} km
                          </span>
                        )}

                        {nearest.address && (
                          <span className="truncate">
                            {
                              nearest.address
                            }
                          </span>
                        )}

                      </div>

                    </div>
                  ) : (
                    <div className="mt-5 border-t border-black/5 pt-4">

                      <p className="text-xs text-black/35">
                        No places found nearby
                      </p>

                    </div>
                  )}


                  {/* VIEW */}

                  {nearest && (
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium text-black/50 transition-colors group-hover:text-black">

                      View on map

                      <ArrowUpRight
                        size={13}
                      />

                    </div>
                  )}

                </div>
              );
            }
          )}

        </div>


        {/* FOOTER */}

        <div className="mt-7 flex items-center gap-2 text-xs text-black/35">

          <MapPin size={13} />

          <span>
            Showing useful places within 2 km
          </span>

        </div>

      </div>

    </section>
  );
}
