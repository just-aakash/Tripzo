import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Loader2,
  ArrowUpRight,
} from "lucide-react";

import { searchLocations } from "../api/travelApi";

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const data = await searchLocations(query);

        // Remove duplicate locations
        const unique = [];
        const seen = new Set();

        for (const place of data) {
          const key = [
            place.name,
            place.country,
            place.latitude?.toFixed(3),
            place.longitude?.toFixed(3),
          ].join("-");

          if (!seen.has(key)) {
            seen.add(key);
            unique.push(place);
          }
        }

        setResults(unique.slice(0, 6));
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [query]);

  function selectPlace(place) {
    setQuery("");
    setResults([]);
    setFocused(false);

    onSelect(place);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!query.trim()) return;

    try {
      setLoading(true);

      const data = await searchLocations(query);

      if (data.length > 0) {
        selectPlace(data[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const showResults =
    focused &&
    query.trim().length >= 2 &&
    results.length > 0;

  return (
    <div className="relative z-[100] w-full max-w-3xl">

      {/* SEARCH BAR */}

      <form
        onSubmit={handleSubmit}
        className={`search-shell group flex items-center gap-4 rounded-full px-5 py-3 transition-all duration-500 ${
          focused
            ? "border-white/40 bg-[#08120f]/80 shadow-[0_25px_100px_rgba(0,0,0,0.45)]"
            : ""
        }`}
      >
        <Search
          size={21}
          className="shrink-0 text-white/50 transition group-focus-within:text-white"
        />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search any city, country or destination..."
          className="search-input text-sm md:text-base"
        />

        {loading && (
          <Loader2
            size={19}
            className="shrink-0 animate-spin text-white/50"
          />
        )}

        <button
          type="submit"
          className="hidden shrink-0 rounded-full bg-[#f4f1e7] px-7 py-3 text-sm font-medium text-[#101714] transition-all duration-300 hover:scale-[1.03] hover:bg-white md:block"
        >
          Explore
        </button>
      </form>


      {/* SEARCH RESULTS */}

      {showResults && (
        <div className="search-results-panel absolute left-0 right-0 top-[calc(100%+12px)] overflow-hidden rounded-[28px] border border-white/10 bg-[#07100e]/95 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl">

          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/35">
              Destinations
            </span>

            <span className="text-[10px] text-white/25">
              {results.length} results
            </span>
          </div>

          <div className="max-h-[360px] overflow-y-auto p-2">

            {results.map((place, index) => (
              <button
                key={`${place.id}-${place.latitude}-${place.longitude}`}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
                onClick={() => selectPlace(place)}
                className="search-result-item group flex w-full items-center gap-4 rounded-[22px] p-4 text-left transition-all duration-300 hover:bg-white/[0.07]"
              >

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] transition duration-300 group-hover:border-white/20 group-hover:bg-white/10">
                  <MapPin
                    size={17}
                    className="text-white/60 transition group-hover:text-white"
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-center gap-3">
                    <span className="truncate text-base font-medium text-white/90">
                      {place.name}
                    </span>

                    {index === 0 && (
                      <span className="rounded-full bg-white/10 px-2 py-1 text-[9px] uppercase tracking-wider text-white/40">
                        Top result
                      </span>
                    )}
                  </div>

                  <div className="mt-1 truncate text-xs text-white/40">
                    {[
                      place.admin1,
                      place.country,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </div>

                </div>

                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/70"
                />

              </button>
            ))}

          </div>
        </div>
      )}
    </div>
  );
}
