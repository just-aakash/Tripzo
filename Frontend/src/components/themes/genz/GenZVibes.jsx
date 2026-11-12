import { motion } from "framer-motion";

const vibes = [
  {
    title: "Chase the waves",
    subtitle: "Beach escapes",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Get lost",
    subtitle: "Mountain adventures",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Slow mornings",
    subtitle: "Peaceful escapes",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "After dark",
    subtitle: "City nights",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function GenZVibes() {
  return (
    <section className="bg-[#080811] px-6 py-28">
      <div className="mx-auto max-w-7xl">

        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-400">
              What's your mood?
            </p>

            <h2 className="mt-4 max-w-2xl text-5xl font-black tracking-tight md:text-7xl">
              Pick a vibe.
              <br />
              <span className="text-white/30">
                We'll find the place.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-white/40">
            Travel should match the way you feel.
            Choose an energy and let TravelMate
            help you discover somewhere worth going.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {vibes.map((vibe, index) => (
            <motion.div
              key={vibe.title}
              initial={{
                opacity: 0,
                y: 30,
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
                delay: index * 0.08,
              }}
              className="group relative min-h-[320px] overflow-hidden rounded-[2rem]"
            >
              <img
                src={vibe.image}
                alt={vibe.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 p-7">
                <p className="text-sm text-white/50">
                  {vibe.subtitle}
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {vibe.title}
                </h3>
              </div>

              <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs text-white/70 backdrop-blur-md">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
