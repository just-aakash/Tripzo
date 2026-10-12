import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const destinations = [
  {
    name: "Goa",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    tag: "Beach energy",
  },
  {
    name: "Manali",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85",
    tag: "Mountain mode",
  },
  {
    name: "Jaipur",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85",
    tag: "Culture trip",
  },
];

export default function GenZDestinations() {
  return (
    <section className="relative overflow-hidden bg-[#10101b] px-6 py-32">

      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Trending escapes
          </p>

          <h2 className="mt-4 text-5xl font-black tracking-tight md:text-8xl">
            Places worth
            <br />
            <span className="text-white/30">
              getting lost in.
            </span>
          </h2>
        </div>

        <div className="space-y-8">
          {destinations.map((destination, index) => (
            <motion.article
              key={destination.name}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -40 : 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{ duration: 0.7 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10"
            >
              <div className="relative h-[420px]">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" />

                <div className="absolute inset-0 flex items-end p-8 md:p-12">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                      {destination.tag}
                    </p>

                    <h3 className="mt-3 text-5xl font-black md:text-7xl">
                      {destination.name}
                    </h3>

                    <p className="mt-2 text-white/60">
                      {destination.country}
                    </p>
                  </div>
                </div>

                <button className="absolute right-7 top-7 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={22} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
