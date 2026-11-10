import { useState } from "react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../SearchBar";
import { useAuth } from "../../../context/AuthContext";

export default function MillenialOpening() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [location, setLocation] = useState(null);

  function handleSelect(place) {
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
  }

  function exploreDestination() {
    if (!location) {
      navigate("/explore");
      return;
    }

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
    <section className="px-6 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="mx-auto max-w-7xl">

        {/* Editorial heading */}
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#6d806f]">
              The TravelMate Journal
            </p>

            <h1 className="mt-6 max-w-5xl font-serif text-6xl leading-[0.9] tracking-[-0.04em] text-[#26332c] sm:text-7xl md:text-8xl">
              Travel slowly.
              <br />
              <span className="italic text-[#718477]">
                See deeply.
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="max-w-md lg:pb-2 lg:pl-8"
          >
            <p className="font-serif text-xl leading-relaxed text-[#26332c]/70">
              A thoughtful way to discover where to go,
              when to go and what makes a place worth
              remembering.
            </p>

            <div className="mt-7 h-px w-16 bg-[#a28c5b]" />
          </motion.div>
        </div>

        {/* Main photograph */}
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.25,
          }}
          className="relative mt-16 overflow-hidden md:mt-20"
        >
          <div className="relative h-[55vh] min-h-[430px]">
            <img
              src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=90"
              alt="Scenic travel destination"
              className="h-full w-full object-cover transition-transform duration-[1400ms] hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Image caption */}
            <div className="absolute bottom-6 left-6 text-white md:bottom-8 md:left-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">
                Issue No. 01
              </p>

              <p className="mt-2 font-serif text-lg">
                Somewhere worth going.
              </p>
            </div>

            <div className="absolute bottom-6 right-6 hidden text-right text-white md:block md:bottom-8 md:right-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                TravelMate
              </p>

              <p className="mt-1 text-xs text-white/70">
                Know before you go.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search / planning area */}
        <div className="mt-12 grid gap-8 border-y border-[#26332c]/10 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#6d806f]">
              Begin your journey
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              Where will you go?
            </h2>
          </div>

          <div>
            <div className="border border-[#26332c]/15 bg-white/50 p-2">
              <SearchBar onSelect={handleSelect} />
            </div>

            <p className="mt-3 text-xs text-[#26332c]/40">
              Search a city or destination to start planning.
            </p>
          </div>
        </div>

        {/* Selected destination */}
        {location && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            className="mt-8 overflow-hidden border border-[#26332c]/15 bg-[#ebe7dc]"
          >
            <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">

              <div className="flex items-center gap-4">
                <MapPin
                  size={18}
                  className="text-[#718477]"
                />

                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#26332c]/40">
                    Selected destination
                  </p>

                  <h3 className="mt-1 font-serif text-3xl">
                    {location.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={exploreDestination}
                className="group flex items-center gap-3 self-start border-b border-[#26332c]/50 pb-2 text-sm md:self-auto"
              >
                Explore destination

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </div>
          </motion.div>
        )}

        {/* Scroll indicator */}
        <div className="mt-12 hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#26332c]/35 md:flex">
          <ArrowDown size={13} />
          Continue reading
        </div>
      </div>
    </section>
  );
}
