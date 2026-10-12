import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../SearchBar";
import AttractionCard from "../../AttractionCard";
import { getNearbyAttractions } from "../../../api/travelApi";
import { useAuth } from "../../../context/AuthContext";

export default function GenZExplore() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSelect(place) {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: "/explore",
          message: "Please sign in to explore destinations.",
        },
      });
      return;
    }

    setLocation(place);

    try {
      setLoading(true);

      const attractions = await getNearbyAttractions(
        place.latitude,
        place.longitude
      );

      setPlaces(attractions);
    } catch (error) {
      console.error("Failed to load nearby attractions:", error);
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  }

  function openDestination() {
    if (!location) return;

    navigate(
      `/destination/${location.name
        .toLowerCase()
        .replaceAll(" ", "-")}`,
      {
        state: {
          location,
        },
      }
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#080811] text-white">

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[5%] top-[15%] h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[120px]" />
        <div className="absolute right-[5%] top-[30%] h-80 w-80 rounded-full bg-violet-500/20 blur-[130px]" />
        <div className="absolute bottom-[5%] left-[40%] h-72 w-72 rounded-full bg-cyan-400/10 blur-[130px]" />
      </div>

      {/* HERO */}
      <section className="relative min-h-[82vh] px-6 pb-24 pt-36">

        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2200&q=85"
            alt="Travel landscape"
            className="h-full w-full object-cover opacity-35"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#080811]/40 via-[#080811]/75 to-[#080811]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080811] via-transparent to-[#080811]/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/45"
          >
            <Sparkles size={14} />
            TravelMate Explore
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-7 max-w-5xl text-6xl font-black leading-[0.88] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-[9rem]"
          >
            FIND YOUR
            <br />

            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
              NEXT PLACE.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 max-w-xl text-base leading-7 text-white/55 md:text-lg"
          >
            Search a destination and discover what is around it.
            Attractions, places worth seeing and experiences you
            might have missed.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 max-w-3xl rounded-[28px] border border-white/10 bg-white/[0.07] p-3 shadow-2xl backdrop-blur-2xl"
          >
            <SearchBar onSelect={handleSelect} />
          </motion.div>

          {/* Selected destination */}
          {location && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 max-w-3xl overflow-hidden rounded-[28px] border border-white/10 bg-black/30 p-6 backdrop-blur-xl"
            >
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/35">
                    <MapPin size={13} />
                    Selected destination
                  </div>

                  <h2 className="mt-2 text-4xl font-bold tracking-tight">
                    {location.name}
                  </h2>

                  <p className="mt-2 text-sm text-white/45">
                    {location.admin1
                      ? `${location.admin1}, `
                      : ""}
                    {location.country}
                  </p>
                </div>

                <button
                  onClick={openDestination}
                  className="group flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)]"
                >
                  Explore destination

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

              </div>
            </motion.div>
          )}

        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 md:flex"
        >
          <Compass size={17} />
          Discover
        </motion.div>
      </section>

      {/* DISCOVERY SECTION */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">

        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/30">
              Nearby discoveries
            </p>

            <h2 className="mt-4 max-w-3xl text-5xl font-black tracking-[-0.04em] md:text-7xl">
              PLACES
              <br />
              <span className="text-white/30">
                YOU MIGHT LOVE.
              </span>
            </h2>
          </div>

          {location && (
            <div className="flex items-center gap-2 text-sm text-white/40">
              <MapPin size={15} />
              Around {location.name}
            </div>
          )}

        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-white/40">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-fuchsia-400" />
              <span className="text-sm">
                Finding places...
              </span>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && places.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.035] p-12 md:p-20"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px]" />

            <div className="relative max-w-xl">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20">
                <Compass size={25} />
              </div>

              <h3 className="text-3xl font-bold">
                Pick somewhere.
              </h3>

              <p className="mt-3 leading-7 text-white/40">
                Search for a city or destination above and
                TravelMate will start discovering interesting
                places around it.
              </p>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {!loading && places.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {places.map((place, index) => (
              <motion.div
                key={place.pageid || `${place.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group"
              >
                <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_25px_70px_rgba(124,92,255,0.15)]">
                  <AttractionCard place={place} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </section>

      {/* Bottom statement */}
      <section className="relative px-6 pb-32 pt-10">
        <div className="mx-auto max-w-7xl border-t border-white/10 pt-12">
          <p className="max-w-3xl text-3xl font-semibold leading-tight text-white/70 md:text-5xl">
            Don't just visit a place.
            <span className="text-white">
              {" "}
              Find the version of it that feels like yours.
            </span>
          </p>
        </div>
      </section>

    </main>
  );
}
