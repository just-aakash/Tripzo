import { ArrowUpRight, Compass, Wallet, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

const planningOptions = [
  {
    icon: Compass,
    title: "Travel style",
    text: "Find experiences that match the way you like to travel.",
  },
  {
    icon: Wallet,
    title: "Your budget",
    text: "Understand what a destination may cost before you arrive.",
  },
  {
    icon: Users,
    title: "Your company",
    text: "Plan around whether you're travelling solo, as a couple or with friends.",
  },
];

export default function MillenialPlanning() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  function startPlanning() {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: "/explore",
          message: "Please sign in to start planning your trip.",
        },
      });

      return;
    }

    navigate("/explore");
  }

  return (
    <section className="border-t border-[#26332c]/10 bg-[#f3f0e7] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Left editorial block */}
          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#6d806f]">
              Plan with intention
            </p>

            <h2 className="mt-6 max-w-xl font-serif text-5xl leading-[0.95] tracking-[-0.03em] md:text-7xl">
              Before the
              <br />
              journey begins,
              <br />
              <span className="italic text-[#718477]">
                know more.
              </span>
            </h2>

            <p className="mt-8 max-w-md font-serif text-lg leading-relaxed text-[#26332c]/55">
              TravelMate brings together the details
              that usually take hours to research.
              Weather, crowds, costs, places to visit
              and everything around them.
            </p>

            <button
              onClick={startPlanning}
              className="group mt-10 flex items-center gap-4 border-b border-[#26332c]/40 pb-3 text-sm"
            >
              Begin planning

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </button>
          </motion.div>

          {/* Right information */}
          <div className="border-t border-[#26332c]/15">
            {planningOptions.map((option, index) => {
              const Icon = option.icon;

              return (
                <motion.div
                  key={option.title}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  className="grid gap-5 border-b border-[#26332c]/15 py-8 md:grid-cols-[60px_1fr]"
                >
                  <div className="flex h-10 w-10 items-center justify-center border border-[#26332c]/15 text-[#718477]">
                    <Icon size={17} strokeWidth={1.5} />
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-5">
                      <h3 className="font-serif text-2xl">
                        {option.title}
                      </h3>

                      <span className="text-[10px] tracking-[0.2em] text-[#26332c]/30">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#26332c]/50">
                      {option.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Closing quote */}
        <div className="mt-24 border-y border-[#26332c]/10 py-12 text-center md:mt-32">
          <p className="font-serif text-2xl italic text-[#26332c]/65 md:text-4xl">
            “The best journeys are not rushed.”
          </p>

          <p className="mt-4 text-[9px] uppercase tracking-[0.35em] text-[#26332c]/35">
            TravelMate
          </p>
        </div>
      </div>
    </section>
  );
}
