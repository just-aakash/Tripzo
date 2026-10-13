import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Wallet,
  Users,
  Compass,
  Sparkles,
  Cloud,
  Droplets,
  Wind,
  Eye,
  Thermometer,
  Umbrella,
  Clock,
  TrendingUp,
  CircleCheck,
  CalendarDays,
  Navigation,
  Heart,
} from "lucide-react";

import GenZNavigation from "./GenZNavigation";
import GenZFooter from "./GenZFooter";

import DestinationMap from "../../DestinationMap";
import NearbyEssentials from "../../NearbyEssentials";
import BudgetIntelligence from "../../BudgetIntelligence";


// =========================================================
// API
// =========================================================

const API_URL = "http://localhost:5000";


// =========================================================
// ANIMATION SETTINGS
// =========================================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};


// =========================================================
// MAIN COMPONENT
// =========================================================

export default function GenZDestination() {
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(
    location.state?.destination || null
  );

  const [loading, setLoading] = useState(
    !location.state?.destination
  );

  const [error, setError] = useState("");

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [weatherLoading, setWeatherLoading] = useState(false);


  // =======================================================
  // LOAD DESTINATION
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    const loadDestination = async () => {
      try {
        setLoading(true);
        setError("");

        /*
          If Explore/another page already supplied
          the complete destination object, use it
          immediately.
        */

        if (location.state?.destination) {
          if (!cancelled) {
            setDestination(
              location.state.destination
            );

            setLoading(false);
          }

          return;
        }

        if (!name) {
          throw new Error(
            "Destination not found."
          );
        }


        // ---------------------------------------------------
        // STEP 1
        // Search TravelMate destinations
        // ---------------------------------------------------

        const searchResponse = await fetch(
          `${API_URL}/api/destinations/search?q=${encodeURIComponent(
            name
          )}`
        );

        const searchData =
          await searchResponse.json();

        if (cancelled) {
          return;
        }

        if (
          searchResponse.ok &&
          searchData.destinations?.length > 0
        ) {
          setDestination(
            searchData.destinations[0]
          );

          return;
        }


        // ---------------------------------------------------
        // STEP 2
        // Discover destination dynamically
        // ---------------------------------------------------

        const discoverResponse =
          await fetch(
            `${API_URL}/api/destinations/discover?q=${encodeURIComponent(
              name
            )}`
          );

        const discoverData =
          await discoverResponse.json();

        if (cancelled) {
          return;
        }

        if (
          !discoverResponse.ok ||
          !discoverData.destinations?.length
        ) {
          throw new Error(
            "Destination not found."
          );
        }


        // ---------------------------------------------------
        // STEP 3
        // Use dynamically discovered destination
        // ---------------------------------------------------

        setDestination(
          discoverData.destinations[0]
        );

      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(
          "Destination loading error:",
          err
        );

        setError(
          err.message ||
            "Unable to load destination."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadDestination();

    return () => {
      cancelled = true;
    };
  }, [name, location.state]);


  // =======================================================
  // LOAD WEATHER
  // =======================================================

  useEffect(() => {
    if (
      destination?.latitude == null ||
      destination?.longitude == null
    ) {
      return;
    }

    let cancelled = false;

    const loadWeather = async () => {
      try {
        setWeatherLoading(true);

        const [
          currentResponse,
          forecastResponse,
        ] = await Promise.all([
          fetch(
            `${API_URL}/api/weather/${destination.latitude}/${destination.longitude}`
          ),

          fetch(
            `${API_URL}/api/weather/forecast/${destination.latitude}/${destination.longitude}`
          ),
        ]);

        const currentData =
          await currentResponse.json();

        const forecastData =
          await forecastResponse.json();

        if (cancelled) {
          return;
        }

        if (currentData.success) {
          setWeather(
            currentData.weather
          );
        } else {
          setWeather(null);
        }

        if (forecastData.success) {
          const forecastList =
            forecastData.forecast?.list ||
            forecastData.forecast ||
            [];

          setForecast(
            Array.isArray(forecastList)
              ? forecastList
              : []
          );
        } else {
          setForecast([]);
        }

      } catch (err) {
        if (!cancelled) {
          console.error(
            "Weather loading error:",
            err
          );

          setWeather(null);
          setForecast([]);
        }
      } finally {
        if (!cancelled) {
          setWeatherLoading(false);
        }
      }
    };

    loadWeather();

    return () => {
      cancelled = true;
    };
  }, [destination]);


  // =======================================================
  // DAILY FORECAST
  // =======================================================

  const dailyForecast = useMemo(() => {
    if (!forecast.length) {
      return [];
    }

    const days = {};

    forecast.forEach((item) => {
      if (!item?.dt) {
        return;
      }

      const date = new Date(
        item.dt * 1000
      );

      const key =
        date.toLocaleDateString(
          "en-IN",
          {
            weekday: "short",
            day: "numeric",
            month: "short",
          }
        );

      if (!days[key]) {
        days[key] = {
          date: key,

          temp: item.main?.temp,

          feelsLike:
            item.main?.feels_like,

          humidity:
            item.main?.humidity,

          description:
            item.weather?.[0]
              ?.description,

          icon:
            item.weather?.[0]?.icon,

          rain: item.pop
            ? Math.round(item.pop * 100)
            : 0,
        };
      }
    });

    return Object.values(days).slice(
      0,
      5
    );
  }, [forecast]);


  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#080811] text-white flex items-center justify-center">
        <div className="text-center">

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "linear",
            }}
            className="w-12 h-12 border-2 border-white/20 border-t-fuchsia-400 rounded-full mx-auto mb-5"
          />

          <p className="text-white/60">
            Loading your destination...
          </p>

        </div>
      </main>
    );
  }


  // =======================================================
  // ERROR
  // =======================================================

  if (error || !destination) {
    return (
      <main className="min-h-screen bg-[#080811] text-white flex items-center justify-center px-6">

        <div className="text-center max-w-md">

          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-400/20 flex items-center justify-center mx-auto mb-6">

            <Compass className="w-7 h-7 text-red-400" />

          </div>

          <h1 className="text-3xl font-bold mb-3">
            Destination not found
          </h1>

          <p className="text-white/50 mb-8">
            {error ||
              "We couldn't find the destination you're looking for."}
          </p>

          <button
            onClick={() =>
              navigate("/explore")
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition"
          >
            <ArrowLeft className="w-4 h-4" />

            Back to Explore
          </button>

        </div>

      </main>
    );
  }


  // =======================================================
  // DESTINATION PAGE
  // =======================================================

  return (
    <main className="min-h-screen bg-[#080811] text-white overflow-hidden">

      <GenZNavigation />


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[85vh] flex items-end overflow-hidden">

        <div className="absolute inset-0">

          <img
            src={
              destination.image ||
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2200&q=85"
            }
            alt={destination.name}
            className="w-full h-full object-cover scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#080811] via-[#080811]/45 to-black/10" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#080811]/80 via-transparent to-fuchsia-900/10" />

        </div>


        {/* Ambient glow */}

        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -50, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
          }}
          className="absolute top-32 right-10 w-72 h-72 bg-fuchsia-500/20 blur-[120px] rounded-full pointer-events-none"
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"
        />


        {/* Back button */}

        <div className="absolute top-28 left-6 md:left-10 z-20">

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/30 backdrop-blur-xl border border-white/15 text-sm hover:bg-white hover:text-black transition-all"
          >
            <ArrowLeft className="w-4 h-4" />

            Explore
          </Link>

        </div>


        {/* Hero content */}

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-20">

          <div className="max-w-7xl mx-auto">

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-5xl"
            >

              <div className="flex flex-wrap gap-2 mb-5">

                {(destination.categories || [])
                  .slice(0, 4)
                  .map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-xs uppercase tracking-wider"
                    >
                      {category}
                    </span>
                  ))}

              </div>


              <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-[-0.07em] leading-[0.82]">
                {destination.name}
              </h1>


              <div className="flex flex-wrap items-center gap-4 mt-7 text-white/70">

                <span className="flex items-center gap-2">

                  <MapPin className="w-4 h-4 text-fuchsia-400" />

                  {destination.city ||
                    destination.name}

                  {destination.state
                    ? `, ${destination.state}`
                    : ""}

                  {destination.country
                    ? `, ${destination.country}`
                    : ""}

                </span>


                {destination.approximateBudgetPerDay >
                  0 && (
                  <>
                    <span className="hidden md:block w-1 h-1 rounded-full bg-white/30" />

                    <span className="flex items-center gap-2">

                      <Wallet className="w-4 h-4 text-cyan-400" />

                      ₹
                      {Number(
                        destination.approximateBudgetPerDay
                      ).toLocaleString(
                        "en-IN"
                      )}
                      /day

                    </span>
                  </>
                )}

              </div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK INSIGHT STRIP
      ===================================================== */}

      <section className="relative z-10 -mt-8 px-6 md:px-12">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            <GenZQuickCard
              icon={<Wallet />}
              label="Budget"
              value={
                destination.budgetLevel ||
                "Medium"
              }
              color="text-emerald-400"
            />

            <GenZQuickCard
              icon={<Users />}
              label="Crowd"
              value={
                destination.crowdPreference ||
                "Medium"
              }
              color="text-fuchsia-400"
            />

            <GenZQuickCard
              icon={<Compass />}
              label="Experience"
              value="Explore"
              color="text-cyan-400"
            />

            <GenZQuickCard
              icon={<Sparkles />}
              label="TravelMate"
              value="Smart"
              color="text-yellow-400"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          CURRENT WEATHER
      ===================================================== */}

      <section className="px-6 md:px-12 py-20">

        <div className="max-w-7xl mx-auto">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            variants={fadeUp}
          >

            <div className="flex items-end justify-between mb-8">

              <div>

                <p className="text-fuchsia-400 uppercase tracking-[0.25em] text-xs font-semibold mb-3">
                  Right now
                </p>

                <h2 className="text-4xl md:text-6xl font-black tracking-tight">
                  What's the vibe?
                </h2>

              </div>

              <Cloud className="hidden md:block w-14 h-14 text-white/10" />

            </div>


            {weatherLoading ? (

              <div className="h-64 rounded-3xl bg-white/[0.04] border border-white/10 animate-pulse" />

            ) : weather ? (

              <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">

                <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 bg-gradient-to-br from-fuchsia-500/15 via-purple-500/10 to-cyan-500/10 border border-white/10">

                  <div className="absolute -right-20 -top-20 w-72 h-72 bg-fuchsia-500/10 blur-3xl rounded-full" />

                  <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">

                    <div>

                      <p className="text-white/50 text-sm mb-2">
                        {weather.name ||
                          destination.name}
                      </p>

                      <div className="flex items-center gap-4">

                        <span className="text-7xl md:text-8xl font-black tracking-tight">
                          {Math.round(
                            weather.main?.temp || 0
                          )}
                          °
                        </span>

                        <div>

                          <p className="text-lg capitalize">
                            {weather.weather?.[0]
                              ?.description ||
                              "Current conditions"}
                          </p>

                          <p className="text-white/40 text-sm mt-1">
                            Feels like{" "}
                            {Math.round(
                              weather.main
                                ?.feels_like || 0
                            )}
                            °
                          </p>

                        </div>

                      </div>

                    </div>

                    <div className="text-7xl">

                      {getWeatherEmoji(
                        weather.weather?.[0]?.main
                      )}

                    </div>

                  </div>

                </div>


                <div className="grid grid-cols-2 gap-3">

                  <WeatherStat
                    icon={<Droplets />}
                    label="Humidity"
                    value={`${weather.main?.humidity || 0}%`}
                  />

                  <WeatherStat
                    icon={<Wind />}
                    label="Wind"
                    value={`${Math.round(
                      (weather.wind?.speed || 0) *
                        3.6
                    )} km/h`}
                  />

                  <WeatherStat
                    icon={<Eye />}
                    label="Visibility"
                    value={`${(
                      (weather.visibility || 0) /
                      1000
                    ).toFixed(1)} km`}
                  />

                  <WeatherStat
                    icon={<Thermometer />}
                    label="Feels like"
                    value={`${Math.round(
                      weather.main?.feels_like || 0
                    )}°`}
                  />

                </div>

              </div>

            ) : (

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-white/50">
                Weather information is currently unavailable.
              </div>

            )}

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          FORECAST
      ===================================================== */}

      {dailyForecast.length > 0 && (

        <section className="px-6 md:px-12 pb-20">

          <div className="max-w-7xl mx-auto">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              variants={fadeUp}
            >

              <div className="flex items-center gap-3 mb-7">

                <CalendarDays className="w-5 h-5 text-cyan-400" />

                <h3 className="text-2xl font-bold">
                  Next few days
                </h3>

              </div>


              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">

                {dailyForecast.map(
                  (day, index) => (

                    <motion.div
                      key={`${day.date}-${index}`}
                      whileHover={{
                        y: -5,
                        scale: 1.02,
                      }}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 hover:bg-white/[0.06] transition"
                    >

                      <p className="text-sm text-white/50">
                        {day.date}
                      </p>

                      <div className="text-4xl mt-5 mb-4">
                        {getWeatherEmojiFromIcon(
                          day.icon
                        )}
                      </div>

                      <p className="text-3xl font-black">
                        {Math.round(
                          day.temp || 0
                        )}
                        °
                      </p>

                      <p className="text-sm text-white/50 capitalize mt-1">
                        {day.description ||
                          "Clear"}
                      </p>

                      <div className="flex items-center gap-1.5 mt-5 text-xs text-cyan-300">

                        <Umbrella className="w-3.5 h-3.5" />

                        {day.rain || 0}% rain

                      </div>

                    </motion.div>

                  )
                )}

              </div>

            </motion.div>

          </div>

        </section>

      )}


      {/* =====================================================
          WEATHER INSIGHT
      ===================================================== */}

      <WeatherInsight weather={weather} />


      {/* =====================================================
          MAP
      ===================================================== */}

      <section className="px-6 md:px-12 py-20">

        <div className="max-w-7xl mx-auto">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
          >

            <div className="mb-8">

              <p className="text-cyan-400 uppercase tracking-[0.25em] text-xs font-semibold mb-3">
                Explore the area
              </p>

              <h2 className="text-4xl md:text-6xl font-black tracking-tight">
                Everything around you.
              </h2>

              <p className="text-white/45 mt-3 max-w-2xl">
                Find attractions, restaurants,
                hospitals, pharmacies, ATMs,
                parking and more around{" "}
                {destination.name}.
              </p>

            </div>


            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03]">

              <DestinationMap
                latitude={
                  destination.latitude
                }
                longitude={
                  destination.longitude
                }
                destinationName={
                  destination.name
                }
              />

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          NEARBY ESSENTIALS
      ===================================================== */}

      <section className="px-6 md:px-12 py-20">

        <div className="max-w-7xl mx-auto">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
          >

            <NearbyEssentials
              latitude={
                destination.latitude
              }
              longitude={
                destination.longitude
              }
            />

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          ABOUT DESTINATION
      ===================================================== */}

      <section className="px-6 md:px-12 py-20">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
          >

            <p className="text-fuchsia-400 uppercase tracking-[0.25em] text-xs font-semibold mb-3">
              Before you go
            </p>

            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Know the
              <br />
              place.
            </h2>

          </motion.div>


          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="text-white/60 text-lg leading-8"
          >

            <p>
              {destination.description ||
                `Explore ${destination.name} with TravelMate.`}
            </p>


            <div className="flex flex-wrap gap-2 mt-8">

              {(destination.categories || [])
                .map((category) => (

                  <span
                    key={category}
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-white/60"
                  >
                    #{category}
                  </span>

                ))}

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          TRAVELMATE INTELLIGENCE
      ===================================================== */}

      <section className="px-6 md:px-12 py-24">

        <div className="max-w-7xl mx-auto">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
          >

            <div className="mb-10">

              <div className="flex items-center gap-3 mb-3">

                <Sparkles className="w-5 h-5 text-fuchsia-400" />

                <p className="text-fuchsia-400 uppercase tracking-[0.25em] text-xs font-semibold">
                  TravelMate Intelligence
                </p>

              </div>

              <h2 className="text-4xl md:text-6xl font-black">
                More than a
                <br />
                destination.
              </h2>

            </div>


            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

              <IntelligenceCard
                icon={<Cloud />}
                title="Weather aware"
                text="Understand how today's weather could affect your plans."
              />

              <IntelligenceCard
                icon={<Users />}
                title="Crowd aware"
                text="Find smarter visiting windows based on expected crowd patterns."
              />

              <IntelligenceCard
                icon={<Wallet />}
                title="Budget aware"
                text="Estimate how much your trip could realistically cost."
              />

              <IntelligenceCard
                icon={<Navigation />}
                title="Local aware"
                text="Discover important places and attractions around you."
              />

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          SMART VISITING TIME
      ===================================================== */}

      <SmartVisitingTime
        destination={destination}
        weather={weather}
      />


      {/* =====================================================
          CROWD INTELLIGENCE
      ===================================================== */}

      <CrowdIntelligence
        destination={destination}
      />


      {/* =====================================================
          BUDGET INTELLIGENCE
      ===================================================== */}

      <section className="px-6 md:px-12 py-24">

        <div className="max-w-7xl mx-auto">

          <BudgetIntelligence
            destination={destination}
          />

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="px-6 md:px-12 py-24">

        <div className="max-w-5xl mx-auto">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-500/15 via-purple-500/10 to-cyan-500/15 p-10 md:p-16 text-center"
          >

            <div className="absolute -top-20 -right-20 w-64 h-64 bg-fuchsia-500/20 blur-3xl rounded-full" />

            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full" />


            <div className="relative">

              <Heart className="w-8 h-8 mx-auto mb-6 text-fuchsia-400" />

              <h2 className="text-4xl md:text-6xl font-black">

                Ready to explore
                <br />
                {destination.name}?

              </h2>

              <p className="max-w-xl mx-auto mt-5 text-white/50">
                TravelMate helps you understand the
                destination before you actually get there.
              </p>

              <Link
                to="/explore"
                className="inline-flex items-center gap-2 mt-8 px-7 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition"
              >

                Explore more places

                <ArrowRight className="w-4 h-4" />

              </Link>

            </div>

          </motion.div>

        </div>

      </section>


      <GenZFooter />

    </main>
  );
}


// =========================================================
// QUICK CARD
// =========================================================

function GenZQuickCard({
  icon,
  label,
  value,
  color,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#11111c]/90 backdrop-blur-xl p-5">

      <div className={`${color} mb-3`}>
        {icon}
      </div>

      <p className="text-xs uppercase tracking-wider text-white/35">
        {label}
      </p>

      <p className="text-lg font-bold capitalize mt-1">
        {value}
      </p>

    </div>
  );
}


// =========================================================
// WEATHER STAT
// =========================================================

function WeatherStat({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">

      <div className="text-cyan-400 mb-3">
        {icon}
      </div>

      <p className="text-xs text-white/35 uppercase tracking-wider">
        {label}
      </p>

      <p className="text-xl font-bold mt-1">
        {value}
      </p>

    </div>
  );
}


// =========================================================
// WEATHER INSIGHT
// =========================================================

function WeatherInsight({ weather }) {
  if (!weather) {
    return null;
  }

  const temperature =
    Math.round(
      weather.main?.temp || 0
    );

  const rain = Boolean(
    weather.rain
  );

  const description =
    weather.weather?.[0]
      ?.description || "";

  let message =
    "Conditions look comfortable for exploring.";

  if (temperature >= 35) {
    message =
      "It's quite hot. Start early, stay hydrated and avoid long outdoor walks during peak afternoon.";
  } else if (temperature <= 12) {
    message =
      "It's chilly. Carry a light jacket and plan indoor activities around the colder hours.";
  } else if (rain) {
    message =
      "Rain is possible. Keep a compact umbrella and consider flexible indoor alternatives.";
  } else if (
    description
      .toLowerCase()
      .includes("cloud")
  ) {
    message =
      "Cloudy conditions can make outdoor sightseeing more comfortable.";
  }

  return (
    <section className="px-6 md:px-12 pb-20">

      <div className="max-w-7xl mx-auto">

        <div className="rounded-3xl border border-cyan-400/10 bg-cyan-400/[0.04] p-7 md:p-9 flex flex-col md:flex-row gap-6 items-start">

          <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center shrink-0">

            <Sparkles className="w-5 h-5 text-cyan-400" />

          </div>


          <div>

            <p className="text-cyan-400 text-xs uppercase tracking-[0.25em] font-semibold mb-2">
              TravelMate insight
            </p>

            <p className="text-white/70 text-lg leading-7">
              {message}
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}


// =========================================================
// INTELLIGENCE CARD
// =========================================================

function IntelligenceCard({
  icon,
  title,
  text,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="group rounded-3xl border border-white/10 bg-white/[0.035] p-7 hover:bg-white/[0.06] transition"
    >

      <div className="w-12 h-12 rounded-2xl bg-fuchsia-400/10 text-fuchsia-400 flex items-center justify-center mb-6 group-hover:scale-110 transition">
        {icon}
      </div>

      <h3 className="text-xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-white/45 leading-6">
        {text}
      </p>

    </motion.div>
  );
}


// =========================================================
// SMART VISITING TIME
// =========================================================

function SmartVisitingTime({
  destination,
  weather,
}) {
  const crowd =
    destination.crowdPreference ||
    "medium";

  let recommendation =
    "9:00 AM – 12:00 PM";

  let reason =
    "A balanced window for sightseeing and comfortable exploration.";

  if (crowd === "low") {
    recommendation =
      "7:00 AM – 10:00 AM";

    reason =
      "Earlier hours are generally better for a quieter experience.";
  }

  if (crowd === "high") {
    recommendation =
      "7:00 AM – 9:30 AM";

    reason =
      "Starting early can help you avoid the busiest sightseeing period.";
  }

  if (
    weather &&
    Math.round(
      weather.main?.temp || 0
    ) >= 35
  ) {
    recommendation =
      "7:00 AM – 10:00 AM";

    reason =
      "Earlier hours are recommended because temperatures can become uncomfortable later.";
  }

  return (
    <section className="px-6 md:px-12 py-24">

      <div className="max-w-7xl mx-auto">

        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500/10 via-fuchsia-500/10 to-purple-500/10 border border-white/10 p-8 md:p-12">

          <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 blur-[100px] rounded-full" />

          <div className="relative grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Clock className="w-5 h-5 text-orange-400" />

                <p className="text-orange-400 uppercase tracking-[0.25em] text-xs font-semibold">
                  Smart recommendation
                </p>

              </div>

              <h2 className="text-4xl md:text-6xl font-black leading-tight">
                When should
                <br />
                you go?
              </h2>

              <p className="text-white/45 mt-5 max-w-lg">
                TravelMate combines destination crowd
                preferences with current conditions to
                suggest a practical visiting window.
              </p>

            </div>


            <div className="rounded-3xl bg-black/20 border border-white/10 p-7 md:p-9">

              <p className="text-white/40 text-sm">
                Recommended window
              </p>

              <p className="text-4xl md:text-5xl font-black mt-2">
                {recommendation}
              </p>

              <div className="flex items-start gap-3 mt-6">

                <CircleCheck className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />

                <p className="text-white/55 leading-6">
                  {reason}
                </p>

              </div>

              <p className="text-xs text-white/30 mt-6">
                This is an intelligent estimate, not
                real-time crowd data.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


// =========================================================
// CROWD INTELLIGENCE
// =========================================================

function CrowdIntelligence({
  destination,
}) {
  const preference =
    destination.crowdPreference ||
    "medium";

  const periods = [
    {
      time: "Early morning",
      level: "Low",
      score:
        preference === "high"
          ? 35
          : 20,
      color: "bg-emerald-400",
    },

    {
      time: "Late morning",
      level: "Medium",
      score:
        preference === "low"
          ? 50
          : 65,
      color: "bg-yellow-400",
    },

    {
      time: "Afternoon",
      level: "High",
      score:
        preference === "low"
          ? 65
          : 85,
      color: "bg-orange-400",
    },

    {
      time: "Evening",
      level: "Medium",
      score:
        preference === "high"
          ? 75
          : 60,
      color: "bg-yellow-400",
    },
  ];

  return (
    <section className="px-6 md:px-12 py-24">

      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12">

          <div>

            <div className="flex items-center gap-3 mb-4">

              <Users className="w-5 h-5 text-fuchsia-400" />

              <p className="text-fuchsia-400 uppercase tracking-[0.25em] text-xs font-semibold">
                Crowd intelligence
              </p>

            </div>

            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Don't just
              <br />
              follow the crowd.
            </h2>

            <p className="text-white/45 mt-5 leading-7 max-w-lg">
              TravelMate estimates how busy different
              parts of the day could feel so you can make
              smarter sightseeing decisions.
            </p>

            <div className="flex items-center gap-2 mt-7 text-sm text-white/35">

              <TrendingUp className="w-4 h-4" />

              Model-based estimate

            </div>

          </div>


          <div className="space-y-4">

            {periods.map(
              (period) => (

                <div
                  key={period.time}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
                >

                  <div className="flex items-center justify-between mb-3">

                    <div>

                      <p className="font-semibold">
                        {period.time}
                      </p>

                      <p className="text-xs text-white/35 mt-1">
                        Expected crowd:{" "}
                        {period.level}
                      </p>

                    </div>

                    <span className="text-sm text-white/50">
                      {period.score}%
                    </span>

                  </div>


                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      whileInView={{
                        width: `${period.score}%`,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.8,
                      }}
                      className={`h-full rounded-full ${period.color}`}
                    />

                  </div>

                </div>

              )
            )}


            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-xs text-white/30">

              Crowd levels shown here are estimates
              based on destination characteristics and
              time-of-day patterns. They are not live
              crowd measurements.

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


// =========================================================
// WEATHER HELPERS
// =========================================================

function getWeatherEmoji(
  condition
) {
  if (!condition) {
    return "🌤️";
  }

  const value =
    condition.toLowerCase();

  if (value.includes("rain"))
    return "🌧️";

  if (value.includes("thunder"))
    return "⛈️";

  if (value.includes("snow"))
    return "❄️";

  if (value.includes("cloud"))
    return "☁️";

  if (value.includes("clear"))
    return "☀️";

  if (value.includes("mist"))
    return "🌫️";

  if (value.includes("fog"))
    return "🌫️";

  return "🌤️";
}


function getWeatherEmojiFromIcon(
  icon
) {
  if (!icon) {
    return "🌤️";
  }

  if (icon.startsWith("01"))
    return "☀️";

  if (icon.startsWith("02"))
    return "🌤️";

  if (icon.startsWith("03"))
    return "☁️";

  if (icon.startsWith("04"))
    return "☁️";

  if (icon.startsWith("09"))
    return "🌧️";

  if (icon.startsWith("10"))
    return "🌦️";

  if (icon.startsWith("11"))
    return "⛈️";

  if (icon.startsWith("13"))
    return "❄️";

  if (icon.startsWith("50"))
    return "🌫️";

  return "🌤️";
}
