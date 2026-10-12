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
  Sun,
  Navigation,
  Camera,
  Heart,
} from "lucide-react";

import MillenialNavigation from "./MillenialNavigation";
import MillenialFooter from "./MillenialFooter";

import DestinationMap from "../../DestinationMap";
import NearbyEssentials from "../../NearbyEssentials";
import BudgetIntelligence from "../../BudgetIntelligence";


// ---------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------

export default function MillenialDestination() {
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

  // -------------------------------------------------------
  // LOAD DESTINATION
  // -------------------------------------------------------

  useEffect(() => {
    const loadDestination = async () => {
      if (location.state?.destination) {
        setDestination(location.state.destination);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/destinations/search?q=${encodeURIComponent(
            name
          )}`
        );

        const data = await response.json();

        if (!response.ok || !data.destinations?.length) {
          throw new Error("Destination not found.");
        }

        setDestination(data.destinations[0]);
      } catch (err) {
        console.error("Destination loading error:", err);

        setError(
          err.message || "Unable to load destination."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDestination();
  }, [name, location.state]);

  // -------------------------------------------------------
  // LOAD WEATHER
  // -------------------------------------------------------

  useEffect(() => {
    if (!destination?.latitude || !destination?.longitude) {
      return;
    }

    const loadWeather = async () => {
      try {
        setWeatherLoading(true);

        const [currentResponse, forecastResponse] =
          await Promise.all([
            fetch(
              `http://localhost:5000/api/weather/${destination.latitude}/${destination.longitude}`
            ),

            fetch(
              `http://localhost:5000/api/weather/forecast/${destination.latitude}/${destination.longitude}`
            ),
          ]);

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        if (currentData.success) {
          setWeather(currentData.weather);
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
        }
      } catch (err) {
        console.error(
          "Weather loading error:",
          err
        );
      } finally {
        setWeatherLoading(false);
      }
    };

    loadWeather();
  }, [destination]);

  // -------------------------------------------------------
  // DAILY FORECAST
  // -------------------------------------------------------

  const dailyForecast = useMemo(() => {
    if (!forecast.length) {
      return [];
    }

    const days = {};

    forecast.forEach((item) => {
      const date = new Date(item.dt * 1000);

      const key = date.toLocaleDateString(
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
          feelsLike: item.main?.feels_like,
          humidity: item.main?.humidity,
          description:
            item.weather?.[0]?.description,
          icon: item.weather?.[0]?.icon,
          rain: item.pop
            ? Math.round(item.pop * 100)
            : 0,
        };
      }
    });

    return Object.values(days).slice(0, 5);
  }, [forecast]);

  // -------------------------------------------------------
  // LOADING
  // -------------------------------------------------------

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f3f0e7] text-[#26332c] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border border-[#26332c]/20 border-t-[#26332c] rounded-full animate-spin mx-auto mb-5" />

          <p className="text-[#26332c]/55 text-sm tracking-wide">
            Preparing your travel guide...
          </p>
        </div>
      </main>
    );
  }

  // -------------------------------------------------------
  // ERROR
  // -------------------------------------------------------

  if (error || !destination) {
    return (
      <main className="min-h-screen bg-[#f3f0e7] text-[#26332c] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 border border-[#26332c]/15 rounded-full flex items-center justify-center mx-auto mb-6">
            <Compass className="w-6 h-6" />
          </div>

          <h1 className="font-serif text-4xl mb-4">
            We couldn't find that place.
          </h1>

          <p className="text-[#26332c]/55 leading-7 mb-8">
            {error ||
              "The destination you requested could not be found."}
          </p>

          <button
            onClick={() => navigate("/explore")}
            className="inline-flex items-center gap-2 border border-[#26332c]/20 px-6 py-3 text-sm tracking-wide hover:bg-[#26332c] hover:text-[#f3f0e7] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Explore
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f0e7] text-[#26332c] overflow-hidden">
      <MillenialNavigation />

      {/* ===================================================
          EDITORIAL HERO
      =================================================== */}

      <section className="px-5 md:px-10 lg:px-16 pt-8">
        <div className="max-w-[1500px] mx-auto">
          {/* Breadcrumb */}

          <div className="flex items-center justify-between mb-7">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-sm text-[#26332c]/55 hover:text-[#26332c] transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to places
            </Link>

            <span className="hidden md:block text-xs uppercase tracking-[0.25em] text-[#26332c]/35">
              TravelMate / Destination
            </span>
          </div>

          {/* Hero image */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[55vh] md:h-[68vh] overflow-hidden"
          >
            <img
              src={
                destination.image ||
                "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2200&q=85"
              }
              alt={destination.name}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute left-6 md:left-12 bottom-7 md:bottom-12 text-white max-w-4xl">
              <p className="text-xs uppercase tracking-[0.3em] mb-4 text-white/75">
                {destination.country ||
                  "TravelMate destination"}
              </p>

              <h1 className="font-serif text-6xl md:text-8xl lg:text-[8rem] leading-[0.8] tracking-[-0.04em]">
                {destination.name}
              </h1>
            </div>
          </motion.div>

          {/* Location row */}

          <div className="border-b border-[#26332c]/15 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-[#26332c]/60">
              <MapPin className="w-4 h-4" />

              <span>
                {destination.city ||
                  destination.name}
                {destination.state
                  ? `, ${destination.state}`
                  : ""}
                {destination.country
                  ? `, ${destination.country}`
                  : ""}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {(destination.categories || [])
                .slice(0, 4)
                .map((category) => (
                  <span
                    key={category}
                    className="border border-[#26332c]/15 px-3 py-1 text-xs uppercase tracking-wider text-[#26332c]/55"
                  >
                    {category}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          INTRODUCTION
      =================================================== */}

      <section className="px-5 md:px-10 lg:px-16 py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[0.7fr_1.3fr] gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b7651] mb-5">
              A closer look
            </p>

            <h2 className="font-serif text-5xl md:text-6xl leading-tight">
              A place worth
              <br />
              experiencing slowly.
            </h2>
          </div>

          <div>
            <p className="text-xl md:text-2xl leading-9 text-[#26332c]/70">
              {destination.description}
            </p>

            <p className="mt-7 text-[#26332c]/50 leading-7">
              TravelMate brings together the practical
              details you need before visiting, so your
              time can be spent enjoying the destination
              rather than figuring it out.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================
          QUICK DETAILS
      =================================================== */}

      <section className="px-5 md:px-10 lg:px-16 pb-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="border-y border-[#26332c]/15 grid grid-cols-2 md:grid-cols-4">
            <EditorialDetail
              icon={<Wallet />}
              label="Daily budget"
              value={
                destination.approximateBudgetPerDay
                  ? `₹${destination.approximateBudgetPerDay.toLocaleString(
                      "en-IN"
                    )}`
                  : "Estimated"
              }
            />

            <EditorialDetail
              icon={<Users />}
              label="Crowd"
              value={
                destination.crowdPreference ||
                "Medium"
              }
            />

            <EditorialDetail
              icon={<Compass />}
              label="Style"
              value="Explore"
            />

            <EditorialDetail
              icon={<Camera />}
              label="TravelMate"
              value="Curated"
            />
          </div>
        </div>
      </section>

      {/* ===================================================
          WEATHER
      =================================================== */}

      <section className="px-5 md:px-10 lg:px-16 py-24 bg-[#e9e5d9]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-[0.65fr_1.35fr] gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8b7651] mb-4">
                Weather
              </p>

              <h2 className="font-serif text-5xl md:text-6xl leading-tight">
                What the
                <br />
                day feels like.
              </h2>

              <p className="text-[#26332c]/50 leading-7 mt-6">
                Check the current conditions before
                deciding how to spend your day.
              </p>
            </div>

            <div>
              {weatherLoading ? (
                <div className="h-64 border border-[#26332c]/10 bg-[#f3f0e7] animate-pulse" />
              ) : weather ? (
                <div className="border border-[#26332c]/15 bg-[#f3f0e7]">
                  <div className="p-8 md:p-10 border-b border-[#26332c]/10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div>
                        <p className="text-sm text-[#26332c]/45 mb-2">
                          {weather.name ||
                            destination.name}
                        </p>

                        <div className="flex items-end gap-5">
                          <span className="font-serif text-7xl md:text-8xl">
                            {Math.round(
                              weather.main?.temp || 0
                            )}
                            °
                          </span>

                          <div className="pb-3">
                            <p className="capitalize text-lg">
                              {weather.weather?.[0]
                                ?.description ||
                                "Current conditions"}
                            </p>

                            <p className="text-sm text-[#26332c]/45 mt-1">
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

                      <div className="text-6xl">
                        {getWeatherEmoji(
                          weather.weather?.[0]
                            ?.main
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4">
                    <WeatherEditorialStat
                      icon={<Droplets />}
                      label="Humidity"
                      value={`${weather.main?.humidity || 0}%`}
                    />

                    <WeatherEditorialStat
                      icon={<Wind />}
                      label="Wind"
                      value={`${Math.round(
                        (weather.wind?.speed || 0) *
                          3.6
                      )} km/h`}
                    />

                    <WeatherEditorialStat
                      icon={<Eye />}
                      label="Visibility"
                      value={`${(
                        (weather.visibility || 0) /
                        1000
                      ).toFixed(1)} km`}
                    />

                    <WeatherEditorialStat
                      icon={<Thermometer />}
                      label="Feels like"
                      value={`${Math.round(
                        weather.main?.feels_like || 0
                      )}°`}
                    />
                  </div>
                </div>
              ) : (
                <div className="border border-[#26332c]/15 p-8 text-[#26332c]/50">
                  Weather information is currently
                  unavailable.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          FORECAST
      =================================================== */}

      {dailyForecast.length > 0 && (
        <section className="px-5 md:px-10 lg:px-16 py-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <CalendarDays className="w-5 h-5 text-[#8b7651]" />

              <p className="text-xs uppercase tracking-[0.3em] text-[#8b7651]">
                Coming days
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 border-t border-l border-[#26332c]/15">
              {dailyForecast.map((day, index) => (
                <motion.div
                  key={`${day.date}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="border-r border-b border-[#26332c]/15 p-6 md:p-7"
                >
                  <p className="text-sm text-[#26332c]/45">
                    {day.date}
                  </p>

                  <div className="text-4xl my-7">
                    {getWeatherEmojiFromIcon(
                      day.icon
                    )}
                  </div>

                  <p className="font-serif text-4xl">
                    {Math.round(day.temp || 0)}°
                  </p>

                  <p className="capitalize text-sm text-[#26332c]/50 mt-2">
                    {day.description || "Clear"}
                  </p>

                  <div className="flex items-center gap-2 mt-5 text-xs text-[#26332c]/45">
                    <Umbrella className="w-3.5 h-3.5" />
                    {day.rain || 0}% rain
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================================================
          WEATHER INSIGHT
      =================================================== */}

      <MillenialWeatherInsight weather={weather} />

      {/* ===================================================
          MAP
      =================================================== */}

      <section className="px-5 md:px-10 lg:px-16 py-24 bg-[#26332c] text-[#f3f0e7]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-14 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#c8b58a] mb-4">
                Around the destination
              </p>

              <h2 className="font-serif text-5xl md:text-6xl leading-tight">
                Get to know
                <br />
                the neighbourhood.
              </h2>
            </div>

            <div className="flex items-end">
              <p className="text-[#f3f0e7]/55 leading-7 max-w-xl">
                Explore attractions, restaurants,
                hospitals, pharmacies, parking and
                other useful places around{" "}
                {destination.name}.
              </p>
            </div>
          </div>

          <div className="overflow-hidden border border-[#f3f0e7]/15">
            <DestinationMap
              latitude={destination.latitude}
              longitude={destination.longitude}
              destinationName={destination.name}
            />
          </div>
        </div>
      </section>

      {/* ===================================================
          NEARBY ESSENTIALS
      =================================================== */}

      <section className="px-5 md:px-10 lg:px-16 py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b7651] mb-4">
              Practical details
            </p>

            <h2 className="font-serif text-5xl md:text-6xl">
              Nearby essentials.
            </h2>
          </div>

          <NearbyEssentials
            latitude={destination.latitude}
            longitude={destination.longitude}
          />
        </div>
      </section>

      {/* ===================================================
          TRAVELMATE INTELLIGENCE
      =================================================== */}

      <section className="px-5 md:px-10 lg:px-16 py-24 bg-[#e9e5d9]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-[#8b7651]" />

                <p className="text-xs uppercase tracking-[0.3em] text-[#8b7651]">
                  TravelMate intelligence
                </p>
              </div>

              <h2 className="font-serif text-5xl md:text-6xl leading-tight">
                Plan with
                <br />
                context.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-[#26332c]/15 border border-[#26332c]/15">
              <EditorialInsight
                icon={<Cloud />}
                title="Weather aware"
                text="Understand how conditions can shape your day."
              />

              <EditorialInsight
                icon={<Users />}
                title="Crowd aware"
                text="Choose quieter windows for a more relaxed visit."
              />

              <EditorialInsight
                icon={<Wallet />}
                title="Budget aware"
                text="Build a realistic picture of your daily spending."
              />

              <EditorialInsight
                icon={<Navigation />}
                title="Local aware"
                text="Know what's around you before you arrive."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          SMART VISITING
      =================================================== */}

      <MillenialSmartVisiting
        destination={destination}
        weather={weather}
      />

      {/* ===================================================
          CROWD
      =================================================== */}

      <MillenialCrowdIntelligence
        destination={destination}
      />

      {/* ===================================================
          BUDGET
      =================================================== */}

      <section className="px-5 md:px-10 lg:px-16 py-24 bg-[#e9e5d9]">
        <div className="max-w-[1200px] mx-auto">
          <BudgetIntelligence
            destination={destination}
          />
        </div>
      </section>

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <section className="px-5 md:px-10 lg:px-16 py-28">
        <div className="max-w-[1000px] mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b7651] mb-6">
            Keep exploring
          </p>

          <h2 className="font-serif text-6xl md:text-8xl leading-[0.9]">
            There is always
            <br />
            somewhere else.
          </h2>

          <p className="max-w-xl mx-auto mt-7 text-[#26332c]/55 leading-7">
            Discover more places and let TravelMate help
            you understand what makes each one worth the
            journey.
          </p>

          <Link
            to="/explore"
            className="inline-flex items-center gap-3 mt-9 border border-[#26332c]/25 px-7 py-4 text-sm uppercase tracking-wider hover:bg-[#26332c] hover:text-[#f3f0e7] transition"
          >
            Explore destinations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <MillenialFooter />
    </main>
  );
}


// =========================================================
// EDITORIAL DETAIL
// =========================================================

function EditorialDetail({
  icon,
  label,
  value,
}) {
  return (
    <div className="p-5 md:p-7 border-r border-[#26332c]/15 last:border-r-0">
      <div className="text-[#8b7651] mb-4">
        {icon}
      </div>

      <p className="text-xs uppercase tracking-wider text-[#26332c]/40">
        {label}
      </p>

      <p className="font-serif text-xl capitalize mt-1">
        {value}
      </p>
    </div>
  );
}


// =========================================================
// WEATHER STAT
// =========================================================

function WeatherEditorialStat({
  icon,
  label,
  value,
}) {
  return (
    <div className="p-5 border-r border-[#26332c]/10 last:border-r-0">
      <div className="text-[#8b7651] mb-3">
        {icon}
      </div>

      <p className="text-xs uppercase tracking-wider text-[#26332c]/40">
        {label}
      </p>

      <p className="font-serif text-xl mt-1">
        {value}
      </p>
    </div>
  );
}


// =========================================================
// WEATHER INSIGHT
// =========================================================

function MillenialWeatherInsight({ weather }) {
  if (!weather) {
    return null;
  }

  const temperature = Math.round(
    weather.main?.temp || 0
  );

  const rain = weather.rain;
  const description =
    weather.weather?.[0]?.description || "";

  let message =
    "The conditions look pleasant for exploring.";

  if (temperature >= 35) {
    message =
      "Temperatures are high today. An early start will make outdoor sightseeing considerably more comfortable.";
  } else if (temperature <= 12) {
    message =
      "It is relatively cool today. Consider carrying a light layer, especially for the morning and evening.";
  } else if (rain) {
    message =
      "Rain may influence outdoor plans. Keep your schedule flexible and carry a compact umbrella.";
  } else if (
    description.toLowerCase().includes("cloud")
  ) {
    message =
      "Cloud cover should make outdoor sightseeing a little more comfortable.";
  }

  return (
    <section className="px-5 md:px-10 lg:px-16 py-16">
      <div className="max-w-[900px] mx-auto border-t border-b border-[#26332c]/15 py-8 flex gap-5">
        <Sparkles className="w-5 h-5 text-[#8b7651] shrink-0 mt-1" />

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#8b7651] mb-3">
            TravelMate note
          </p>

          <p className="font-serif text-2xl md:text-3xl leading-9">
            {message}
          </p>
        </div>
      </div>
    </section>
  );
}


// =========================================================
// EDITORIAL INSIGHT
// =========================================================

function EditorialInsight({
  icon,
  title,
  text,
}) {
  return (
    <div className="bg-[#f3f0e7] p-7 md:p-9">
      <div className="text-[#8b7651] mb-6">
        {icon}
      </div>

      <h3 className="font-serif text-2xl mb-3">
        {title}
      </h3>

      <p className="text-[#26332c]/55 leading-7">
        {text}
      </p>
    </div>
  );
}


// =========================================================
// SMART VISITING
// =========================================================

function MillenialSmartVisiting({
  destination,
  weather,
}) {
  const crowd =
    destination.crowdPreference || "medium";

  let recommendation = "9:00 AM – 12:00 PM";

  let reason =
    "A balanced window for sightseeing and comfortable exploration.";

  if (crowd === "low") {
    recommendation = "7:00 AM – 10:00 AM";

    reason =
      "Earlier hours are generally better for a quieter experience.";
  }

  if (crowd === "high") {
    recommendation = "7:00 AM – 9:30 AM";

    reason =
      "Starting early can help you avoid the busiest sightseeing period.";
  }

  if (
    weather &&
    Math.round(weather.main?.temp || 0) >= 35
  ) {
    recommendation = "7:00 AM – 10:00 AM";

    reason =
      "Earlier hours are recommended because temperatures can become uncomfortable later.";
  }

  return (
    <section className="px-5 md:px-10 lg:px-16 py-28">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[0.75fr_1.25fr] gap-16 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b7651] mb-5">
            A better time to visit
          </p>

          <h2 className="font-serif text-5xl md:text-6xl leading-tight">
            Timing matters.
          </h2>

          <p className="text-[#26332c]/55 leading-7 mt-6 max-w-md">
            TravelMate considers crowd patterns and
            weather conditions to suggest a more
            comfortable starting window.
          </p>
        </div>

        <div className="border border-[#26332c]/15 p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#26332c]/40">
            Suggested visiting window
          </p>

          <p className="font-serif text-5xl md:text-6xl mt-4">
            {recommendation}
          </p>

          <div className="border-t border-[#26332c]/15 mt-8 pt-6 flex gap-3">
            <CircleCheck className="w-5 h-5 text-[#687c58] mt-1 shrink-0" />

            <p className="text-[#26332c]/55 leading-7">
              {reason}
            </p>
          </div>

          <p className="text-xs text-[#26332c]/35 mt-6">
            This is an estimated recommendation, not
            live crowd data.
          </p>
        </div>
      </div>
    </section>
  );
}


// =========================================================
// CROWD INTELLIGENCE
// =========================================================

function MillenialCrowdIntelligence({
  destination,
}) {
  const preference =
    destination.crowdPreference || "medium";

  const periods = [
    {
      time: "Early morning",
      level: "Low",
      score:
        preference === "high" ? 35 : 20,
    },

    {
      time: "Late morning",
      level: "Medium",
      score:
        preference === "low" ? 50 : 65,
    },

    {
      time: "Afternoon",
      level: "High",
      score:
        preference === "low" ? 65 : 85,
    },

    {
      time: "Evening",
      level: "Medium",
      score:
        preference === "high" ? 75 : 60,
    },
  ];

  return (
    <section className="px-5 md:px-10 lg:px-16 py-28 bg-[#26332c] text-[#f3f0e7]">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[0.75fr_1.25fr] gap-16">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#c8b58a] mb-5">
            Crowd intelligence
          </p>

          <h2 className="font-serif text-5xl md:text-6xl leading-tight">
            Find a quieter
            <br />
            moment.
          </h2>

          <p className="text-[#f3f0e7]/50 leading-7 mt-6">
            A simple estimate of how busy different
            parts of the day may feel.
          </p>

          <div className="flex items-center gap-2 text-sm text-[#f3f0e7]/35 mt-7">
            <TrendingUp className="w-4 h-4" />
            Model-based estimate
          </div>
        </div>

        <div>
          {periods.map((period) => (
            <div
              key={period.time}
              className="border-t border-[#f3f0e7]/15 py-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-serif text-xl">
                    {period.time}
                  </p>

                  <p className="text-xs text-[#f3f0e7]/35 mt-1">
                    Expected crowd: {period.level}
                  </p>
                </div>

                <span className="text-sm text-[#f3f0e7]/45">
                  {period.score}%
                </span>
              </div>

              <div className="h-1 bg-[#f3f0e7]/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${period.score}%`,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                  className="h-full bg-[#c8b58a]"
                />
              </div>
            </div>
          ))}

          <div className="border-t border-[#f3f0e7]/15 pt-5 text-xs text-[#f3f0e7]/30 leading-6">
            These crowd levels are estimated from
            destination characteristics and time-of-day
            patterns. They are not live measurements.
          </div>
        </div>
      </div>
    </section>
  );
}


// =========================================================
// WEATHER HELPERS
// =========================================================

function getWeatherEmoji(condition) {
  if (!condition) {
    return "🌤️";
  }

  const value = condition.toLowerCase();

  if (value.includes("rain")) return "🌧️";
  if (value.includes("thunder")) return "⛈️";
  if (value.includes("snow")) return "❄️";
  if (value.includes("cloud")) return "☁️";
  if (value.includes("clear")) return "☀️";
  if (value.includes("mist")) return "🌫️";
  if (value.includes("fog")) return "🌫️";

  return "🌤️";
}

function getWeatherEmojiFromIcon(icon) {
  if (!icon) {
    return "🌤️";
  }

  if (icon.startsWith("01")) return "☀️";
  if (icon.startsWith("02")) return "🌤️";
  if (icon.startsWith("03")) return "☁️";
  if (icon.startsWith("04")) return "☁️";
  if (icon.startsWith("09")) return "🌧️";
  if (icon.startsWith("10")) return "🌦️";
  if (icon.startsWith("11")) return "⛈️";
  if (icon.startsWith("13")) return "❄️";
  if (icon.startsWith("50")) return "🌫️";

  return "🌤️";
}
