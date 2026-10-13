import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Compass,
  Sparkles,
  CalendarDays,
} from "lucide-react";
import { Link } from "react-router-dom";

import MillenialNavigation from "./MillenialNavigation";
import { useAuth } from "../../../context/AuthContext";

export default function MillenialDashboard() {
  const { user } = useAuth();

  const userName = user?.name || "traveller";

  return (
    <main className="min-h-screen bg-[#f3f0e7] text-[#26332c]">

      <MillenialNavigation />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <p className="text-xs uppercase tracking-[0.25em] text-[#758276]">
            Your Travel Journal
          </p>

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight md:text-7xl">

            Your next journey,
            <br />

            <span className="italic text-[#758276]">
              {userName}.
            </span>

          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#667067]">
            Discover places worth your time, with thoughtful
            planning around weather, crowds and budget.
          </p>

        </motion.section>


        {/* Search */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12"
        >

          <Link
            to="/explore"
            className="flex max-w-3xl items-center justify-between border-b border-[#26332c]/20 py-5 transition-colors hover:border-[#26332c]"
          >

            <div className="flex items-center gap-4">

              <Compass
                size={20}
                className="text-[#758276]"
              />

              <span className="text-sm text-[#667067]">
                Search for a destination
              </span>

            </div>

            <ArrowUpRight size={20} />

          </Link>

        </motion.div>


        {/* Planning cards */}

        <section className="mt-20">

          <p className="text-xs uppercase tracking-[0.25em] text-[#758276]">
            Plan with intention
          </p>

          <div className="mt-7 grid gap-5 md:grid-cols-3">

            <JournalCard
              title="Explore places"
              text="Find destinations suited to your way of travelling."
              icon={<Compass size={20} />}
              to="/explore"
            />

            <JournalCard
              title="Plan a journey"
              text="Build an itinerary around your time and budget."
              icon={<CalendarDays size={20} />}
              to="/plan"
            />

            <JournalCard
              title="TravelMate AI"
              text="Let intelligent recommendations shape your trip."
              icon={<Sparkles size={20} />}
              to="/ai-assistant"
            />

          </div>

        </section>


        {/* Philosophy */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 border-y border-[#26332c]/10 py-16"
        >

          <p className="text-xs uppercase tracking-[0.25em] text-[#758276]">
            Know before you go
          </p>

          <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">

            Travel better.
            <br />

            <span className="italic text-[#758276]">
              Not simply more.
            </span>

          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-4">

            <Insight
              title="Weather"
              text="Know what the day has in store."
            />

            <Insight
              title="Crowds"
              text="Choose a better moment to visit."
            />

            <Insight
              title="Budget"
              text="Understand what your journey may cost."
            />

            <Insight
              title="Essentials"
              text="Know what is around you when you arrive."
            />

          </div>

        </motion.section>

      </main>

    </main>
  );
}


function JournalCard({
  title,
  text,
  icon,
  to,
}) {
  return (
    <Link to={to}>

      <motion.div
        whileHover={{ y: -4 }}
        className="group h-full border border-[#26332c]/10 bg-white/40 p-7 transition-all duration-300 hover:border-[#26332c]/25 hover:bg-white/70"
      >

        <div className="flex items-center justify-between">

          <div className="text-[#758276]">
            {icon}
          </div>

          <ArrowUpRight
            size={18}
            className="text-[#26332c]/30 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />

        </div>

        <h3 className="mt-8 font-serif text-2xl">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#667067]">
          {text}
        </p>

      </motion.div>

    </Link>
  );
}


function Insight({ title, text }) {
  return (
    <div className="border-t border-[#26332c]/10 pt-5">

      <h3 className="font-serif text-xl">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#667067]">
        {text}
      </p>

    </div>
  );
}
