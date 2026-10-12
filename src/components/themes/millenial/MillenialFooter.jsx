import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MillenialFooter() {
  return (
    <footer className="border-t border-[#26332c]/10 bg-[#e8e4d9] px-6 py-16">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-12 md:grid-cols-[1.5fr_0.5fr_0.5fr]">

          {/* Brand */}
          <div>
            <p className="font-serif text-3xl">
              TravelMate
            </p>

            <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-[#26332c]/40">
              Travel Journal
            </p>

            <p className="mt-8 max-w-sm font-serif text-lg leading-relaxed text-[#26332c]/50">
              A smarter way to understand the places
              you want to experience.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#26332c]/40">
              Explore
            </p>

            <div className="mt-5 flex flex-col gap-3 text-sm">
              <Link
                to="/"
                className="transition-colors hover:text-[#718477]"
              >
                Home
              </Link>

              <Link
                to="/explore"
                className="transition-colors hover:text-[#718477]"
              >
                Destinations
              </Link>

              <Link
                to="/dashboard"
                className="transition-colors hover:text-[#718477]"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Contact / philosophy */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#26332c]/40">
              Philosophy
            </p>

            <p className="mt-5 font-serif leading-relaxed text-[#26332c]/55">
              Know before you go.
            </p>

            <ArrowUpRight
              size={18}
              className="mt-5 text-[#a28c5b]"
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-[#26332c]/10 pt-6 text-[9px] uppercase tracking-[0.25em] text-[#26332c]/35 md:flex-row">
          <p>
            © 2026 TravelMate
          </p>

          <p>
            Travel thoughtfully.
          </p>
        </div>
      </div>
    </footer>
  );
}
