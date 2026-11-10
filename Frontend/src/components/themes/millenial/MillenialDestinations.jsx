import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const destinations = [
  {
    number: "01",
    name: "Jaipur",
    location: "Rajasthan, India",
    category: "Heritage",
    description:
      "A city of courtyards, old markets, quiet mornings and architecture shaped by centuries of history.",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "02",
    name: "Manali",
    location: "Himachal Pradesh, India",
    category: "Mountains",
    description:
      "A slower escape into pine forests, mountain roads and the changing rhythm of the Himalayas.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=90",
  },
  {
    number: "03",
    name: "Goa",
    location: "India",
    category: "Coast",
    description:
      "Beyond the beaches, discover old neighbourhoods, local cafés and quieter corners of the coast.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=90",
  },
];

export default function MillenialDestinations() {
  return (
    <section className="border-t border-[#26332c]/10 bg-[#eeeae0] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">

        {/* Section introduction */}
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#6d806f]">
              Destinations
            </p>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#26332c]/50">
              Places are more than landmarks. Take a
              closer look at the character, rhythm and
              atmosphere of somewhere new.
            </p>
          </div>

          <div>
            <h2 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.03em] md:text-7xl">
              Places with a story
              <span className="italic text-[#718477]">
                {" "}
                worth telling.
              </span>
            </h2>
          </div>
        </div>

        {/* Destination articles */}
        <div className="mt-20 space-y-20 md:mt-28 md:space-y-32">
          {destinations.map((destination, index) => (
            <motion.article
              key={destination.name}
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.8,
              }}
              className={`grid gap-8 lg:grid-cols-12 lg:items-center ${
                index % 2 !== 0
                  ? "lg:[&>div:first-child]:order-2"
                  : ""
              }`}
            >
              {/* Image */}
              <div className="relative lg:col-span-7">
                <div className="overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-[420px] w-full object-cover transition-transform duration-1000 hover:scale-[1.025] md:h-[520px]"
                  />
                </div>

                <div className="absolute bottom-4 left-4 bg-[#f3f0e7]/90 px-4 py-2 backdrop-blur-sm">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#26332c]/60">
                    {destination.category}
                  </p>
                </div>
              </div>

              {/* Text */}
              <div className="lg:col-span-5 lg:px-8">
                <div className="flex items-center gap-4">
                  <span className="font-serif text-sm text-[#a28c5b]">
                    {destination.number}
                  </span>

                  <div className="h-px w-10 bg-[#26332c]/20" />
                </div>

                <h3 className="mt-7 font-serif text-5xl leading-none md:text-6xl">
                  {destination.name}
                </h3>

                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#26332c]/40">
                  {destination.location}
                </p>

                <p className="mt-7 max-w-md font-serif text-lg leading-relaxed text-[#26332c]/65">
                  {destination.description}
                </p>

                <button
                  type="button"
                  className="group mt-8 flex items-center gap-3 border-b border-[#26332c]/30 pb-2 text-xs uppercase tracking-[0.2em] text-[#26332c]/70 transition-colors hover:border-[#26332c]"
                >
                  Discover

                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
