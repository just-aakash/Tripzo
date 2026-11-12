import { Compass } from "lucide-react";

export default function GenZFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#080811] px-6 py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-cyan-400">
              <Compass size={18} />
            </div>

            <span className="text-xl font-bold">
              TravelMate
            </span>
          </div>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/40">
            Know before you go.
            Discover destinations with context,
            not just photos.
          </p>
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-white/30">
          Travel differently.
        </p>
      </div>
    </footer>
  );
}
