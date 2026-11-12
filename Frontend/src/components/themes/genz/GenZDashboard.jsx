import { motion } from "framer-motion";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import GenZNavigation from "./GenZNavigation";
import { useAuth } from "../../../context/AuthContext";

export default function GenZDashboard() {
  const { user } = useAuth();

  const userName = user?.name || "traveler";

  return (
    <main className="min-h-screen overflow-hidden bg-[#080811] text-white">

      <GenZNavigation />

      <section className="relative min-h-screen px-6 pb-20 pt-36">

        {/* Ambient background */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-[140px]" />

          <div className="absolute right-[-10%] top-[25%] h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[140px]" />

          <div className="absolute bottom-[-10%] left-[30%] h-[450px] w-[450px] rounded-full bg-purple-500/15 blur-[140px]" />

        </div>


        {/* Main content */}

        <div className="relative z-10 mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-fuchsia-300">
              Your TravelMate
            </p>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] md:text-8xl">

              WHERE ARE WE
              <br />

              <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
                GOING, {userName.toUpperCase()}?
              </span>

            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/50 md:text-lg">
              Discover places based on weather, crowds, budget and
              the way you actually like to travel.
            </p>

          </motion.div>


          {/* Search */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-12"
          >

            <Link
              to="/explore"
              className="group flex max-w-3xl items-center gap-4 rounded-full border border-white/10 bg-white/[0.06] px-6 py-5 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-400/40 hover:bg-white/[0.1]"
            >

              <Compass
                size={21}
                className="text-fuchsia-300"
              />

              <span className="flex-1 text-sm text-white/50">
                Where do you want to go?
              </span>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={18} />
              </div>

            </Link>

          </motion.div>


          {/* Quick actions */}

          <div className="mt-16 grid gap-5 md:grid-cols-3">

            <DashboardCard
              title="Explore places"
              description="Find your next destination."
              icon={<Compass size={22} />}
              to="/explore"
            />

            <DashboardCard
              title="Plan your trip"
              description="Build your perfect itinerary."
              icon={<Sparkles size={22} />}
              to="/plan"
            />

            <DashboardCard
              title="TravelMate AI"
              description="Ask AI where you should go."
              icon={<Sparkles size={22} />}
              to="/ai-assistant"
            />

          </div>

        </div>

      </section>

    </main>
  );
}


function DashboardCard({
  title,
  description,
  icon,
  to,
}) {
  return (
    <Link to={to}>

      <motion.div
        whileHover={{
          y: -8,
          scale: 1.01,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
        }}
        className="group h-full rounded-[28px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-400/30 hover:bg-white/[0.08]"
      >

        <div className="flex items-center justify-between">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-cyan-400/10 text-fuchsia-300">
            {icon}
          </div>

          <ArrowRight
            size={18}
            className="text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
          />

        </div>

        <h2 className="mt-7 text-xl font-semibold">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-white/40">
          {description}
        </p>

      </motion.div>

    </Link>
  );
}
