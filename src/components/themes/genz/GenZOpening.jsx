import { useEffect, useState } from "react";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import SearchBar from "../../SearchBar";
import { useAuth } from "../../../context/AuthContext";

export default function GenZOpening() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [location, setLocation] = useState(null);
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

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
    <section className="relative min-h-screen overflow-hidden">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=90')",
          transform: `translate(${mouse.x * 0.002 - 1}px, ${mouse.y * 0.002 - 1}px) scale(1.04)`,
        }}
      />

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Gradient atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-transparent to-pink-700/30" />

      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-3xl"
        style={{
          left: mouse.x,
          top: mouse.y,
        }}
      />

      {/* Main content */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-20 pt-32">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <div className="mb-6 flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/60">
            <Sparkles size={16} />
            Travel without the ordinary
          </div>

          <h1 className="max-w-5xl text-6xl font-black leading-[0.85] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-[10rem]">
            GO
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
              {" "}
              SOMEWHERE.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl">
            Don't just choose a destination.
            Discover when to go, what to expect,
            what it will cost and what is waiting
            around the corner.
          </p>
        </motion.div>

        {/* Floating search */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="mt-12 max-w-3xl"
        >
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-2xl">
            <SearchBar onSelect={handleSelect} />
          </div>

          <p className="mt-4 px-2 text-sm text-white/40">
            Search a city, destination or place to begin.
          </p>
        </motion.div>

        {/* Selected location */}
        {location && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="mt-8 flex max-w-2xl flex-col gap-4 rounded-3xl border border-white/15 bg-black/30 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <MapPin size={20} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Your next place
                </p>

                <h3 className="mt-1 text-xl font-semibold">
                  {location.name}
                </h3>
              </div>
            </div>

            <button
              onClick={exploreDestination}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105"
            >
              Explore
            </button>
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/40 md:flex"
        >
          Scroll to explore
          <ArrowDown size={14} />
        </motion.div>
      </div>
    </section>
  );
}
