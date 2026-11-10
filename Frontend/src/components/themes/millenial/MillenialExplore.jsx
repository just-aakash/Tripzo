import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Compass,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../SearchBar";
import AttractionCard from "../../AttractionCard";
import { getNearbyAttractions } from "../../../api/travelApi";
import { useAuth } from "../../../context/AuthContext";
import MillenialNavigation from "./MillenialNavigation";

export default function MillenialExplore() {
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
    <main className="min-h-screen bg-[#f3f0e7] text-[#26332c]">
      <MillenialNavigation />

      {/* EDITORIAL HERO */}
      <section className="px-6 pb-20 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid gap-8 border-b border-[#26332c]/15 pb-12 md:grid-cols-[1fr_320px] md:items-end"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#26332c]/45">
                Travel Journal · Explore
              </p>

              <h1 className="mt-6 max-w-5xl font-serif text-6xl leading-[0.92] tracking-[-0.04em] md:text-8xl">
                Places worth
                <br />
                <span className="italic text-[#26332c]/45">
                  taking your time for.
                </span>
              </h1>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#26332c]/60">
              Search for a destination and discover the places,
              landmarks and experiences waiting nearby.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-12"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#26332c]/40">
                Begin your search
              </p>

              <Compass
                size={17}
                className="text-[#26332c]/35"
              />
            </div>

            <div className="border-y border-[#26332c]/15 py-4">
              <SearchBar onSelect={handleSelect} />
            </div>
          </motion.div>

        </div>
      </section>

      {/* SELECTED DESTINATION */}
      {location && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-y border-[#26332c]/15 bg-[#ebe7dc]"
        >
          <div className="mx-auto max-w-7xl px-6 py-12">

            <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">

              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#26332c]/40">
                  Your destination
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <MapPin
                    size={17}
                    className="text-[#6f806f]"
                  />

                  <h2 className="font-serif text-4xl md:text-5xl">
                    {location.name}
                  </h2>
                </div>

                <p className="mt-3 text-sm text-[#26332c]/50">
                  {location.admin1
                    ? `${location.admin1}, `
                    : ""}
                  {location.country}
                </p>
              </div>

              <button
                onClick={openDestination}
                className="group flex items-center gap-4 border-b border-[#26332c]/40 pb-2 text-sm uppercase tracking-[0.16em] transition-all duration-300 hover:border-[#26332c]"
              >
                Discover destination

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>

            </div>

          </div>
        </motion.section>
      )}

      {/* DISCOVERIES */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="mb-16 grid gap-6 md:grid-cols-[1fr_280px] md:items-end">

          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#26332c]/40">
              Nearby discoveries
            </p>

            <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.95] md:text-7xl">
              {location
                ? `Around ${location.name}.`
                : "Begin somewhere."}
            </h2>
          </div>

          <p className="text-sm leading-6 text-[#26332c]/50">
            {location
              ? "A collection of places and landmarks worth knowing about."
              : "Every journey begins with choosing a place to look closer."}
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="border-y border-[#26332c]/15 py-24 text-center">
            <div className="mx-auto mb-5 h-7 w-7 animate-spin rounded-full border border-[#26332c]/20 border-t-[#26332c]" />

            <p className="text-xs uppercase tracking-[0.2em] text-[#26332c]/40">
              Finding nearby places
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && places.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-y border-[#26332c]/15 py-20"
          >
            <div className="grid gap-8 md:grid-cols-[180px_1fr]">

              <p className="font-serif text-5xl text-[#26332c]/20">
                01
              </p>

              <div>
                <h3 className="font-serif text-3xl">
                  Somewhere is waiting.
                </h3>

                <p className="mt-4 max-w-lg text-sm leading-7 text-[#26332c]/55">
                  Search for a destination above and we'll
                  show you what's worth discovering around it.
                </p>
              </div>

            </div>
          </motion.div>
        )}

        {/* Results */}
        {!loading && places.length > 0 && (
          <div className="space-y-16">

            {places.map((place, index) => (
              <motion.article
                key={place.pageid || `${place.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                }}
                className="border-t border-[#26332c]/15 pt-8"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-serif text-2xl text-[#26332c]/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#26332c]/35">
                    Discovery
                  </span>
                </div>

                <div className="overflow-hidden">
                  <div className="transition-transform duration-500 hover:translate-y-[-3px]">
                    <AttractionCard place={place} />
                  </div>
                </div>
              </motion.article>
            ))}

          </div>
        )}

      </section>

      {/* CLOSING */}
      <section className="border-t border-[#26332c]/15 px-6 py-28">

        <div className="mx-auto max-w-7xl">

          <p className="text-[11px] uppercase tracking-[0.3em] text-[#26332c]/40">
            TravelMate Journal
          </p>

          <h2 className="mt-6 max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl">
            Travel is not about
            <span className="italic text-[#26332c]/45">
              {" "}seeing everything.
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-sm leading-7 text-[#26332c]/55">
            It is about noticing the right things.
          </p>

        </div>

      </section>

    </main>
  );
}
