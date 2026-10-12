import { useEffect, useRef, useState } from "react";
import {
  LoaderCircle,
  MapPin,
  Search,
  X,
} from "lucide-react";

const API_URL = "http://localhost:5000";

export default function PlannerDestinationSearch({
  value,
  onChange,
  theme = "genz",
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  /*
    Used to make sure an older search response
    cannot overwrite a newer search.
  */
  const searchRequestRef = useRef(0);

  /*
    Show selected destination name in the input.
  */
  useEffect(() => {
    if (value?.name) {
      setQuery(value.name);
    }
  }, [value]);

  /*
    Close dropdown when clicking outside.
  */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
    Search destinations.

    First:
      Search our TravelMate database.

    If nothing is found:
      Automatically discover the destination
      using the backend discovery service.

    The user does not see which source was used.
  */
  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    /*
      Don't search again when the current
      destination is already selected.
    */
    if (
      value?.name &&
      trimmedQuery.toLowerCase() ===
        value.name.toLowerCase()
    ) {
      return;
    }

    const requestId =
      searchRequestRef.current + 1;

    searchRequestRef.current = requestId;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setOpen(true);
        setResults([]);

        /*
          --------------------------------
          STEP 1: Search TravelMate database
          --------------------------------
        */

        const localResponse =
          await fetch(
            `${API_URL}/api/destinations/search?q=${encodeURIComponent(
              trimmedQuery
            )}`
          );

        const localData =
          await localResponse.json();

        if (!localResponse.ok) {
          throw new Error(
            localData.message ||
              "Destination search failed."
          );
        }

        /*
          Ignore old request results.
        */
        if (
          requestId !==
          searchRequestRef.current
        ) {
          return;
        }

        const localResults =
          localData.destinations || [];

        /*
          If TravelMate already knows the
          destination, use those results.
        */
        if (localResults.length > 0) {
          setResults(localResults);
          return;
        }

        /*
          --------------------------------
          STEP 2: Automatic discovery
          --------------------------------
        */

        const discoveryResponse =
          await fetch(
            `${API_URL}/api/destinations/discover?q=${encodeURIComponent(
              trimmedQuery
            )}`
          );

        const discoveryData =
          await discoveryResponse.json();

        if (
          requestId !==
          searchRequestRef.current
        ) {
          return;
        }

        if (!discoveryResponse.ok) {
          throw new Error(
            discoveryData.message ||
              "Unable to find destination."
          );
        }

        const discoveredResults =
          discoveryData.destinations || [];

        setResults(discoveredResults);
      } catch (error) {
        if (
          requestId !==
          searchRequestRef.current
        ) {
          return;
        }

        console.error(
          "Destination search error:",
          error
        );

        setResults([]);
      } finally {
        if (
          requestId ===
          searchRequestRef.current
        ) {
          setLoading(false);
        }
      }
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [query, value]);

  /*
    Select destination.
  */
  const handleSelect = (destination) => {
    setQuery(destination.name);
    setOpen(false);
    onChange(destination);
  };

  /*
    Clear destination.
  */
  const clearDestination = () => {
    searchRequestRef.current += 1;

    setQuery("");
    setResults([]);
    setOpen(false);
    setLoading(false);

    onChange(null);
  };

  const isMillenial =
    theme === "millennial";

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      {/* Input */}
      <div
        className={
          isMillenial
            ? "relative border-b border-[#cfc7b8]"
            : "relative"
        }
      >
        <Search
          size={isMillenial ? 15 : 18}
          className={
            isMillenial
              ? "absolute left-0 top-1/2 -translate-y-1/2 text-[#8a8d87]"
              : "absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
          }
        />

        <input
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);

            /*
              If the user edits an already
              selected destination, clear the
              previous selection.
            */
            if (value) {
              onChange(null);
            }
          }}
          onFocus={() => {
            if (query.trim()) {
              setOpen(true);
            }
          }}
          placeholder={
            isMillenial
              ? "Where would you like to go?"
              : "Search Agra, Jaipur, Goa..."
          }
          className={
            isMillenial
              ? "w-full bg-transparent py-3 pl-7 pr-10 font-serif text-2xl text-[#29362e] outline-none placeholder:text-[#aaa397]"
              : "w-full rounded-2xl border border-white/10 bg-black/20 py-4 pl-12 pr-12 text-base text-white outline-none transition placeholder:text-white/25 focus:border-fuchsia-400/50 focus:bg-white/[0.06]"
          }
        />

        {query && (
          <button
            type="button"
            onClick={clearDestination}
            className={
              isMillenial
                ? "absolute right-0 top-1/2 flex -translate-y-1/2 items-center justify-center text-[#8a8d87] hover:text-[#29362e]"
                : "absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-white/30 hover:text-white"
            }
          >
            <X size={16} />
          </button>
        )}

        {loading && (
          <LoaderCircle
            size={16}
            className={
              isMillenial
                ? "absolute right-7 top-1/2 -translate-y-1/2 animate-spin text-[#8f7a4b]"
                : "absolute right-12 top-1/2 -translate-y-1/2 animate-spin text-fuchsia-300"
            }
          />
        )}
      </div>

      {/* Results */}
      {open && query.trim() && (
        <div
          className={
            isMillenial
              ? "absolute left-0 right-0 z-50 mt-3 border border-[#d5cdbf] bg-[#faf8f2] shadow-xl"
              : "absolute left-0 right-0 z-50 mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#12121c]/95 shadow-2xl shadow-black/40 backdrop-blur-xl"
          }
        >
          {loading ? (
            <div
              className={
                isMillenial
                  ? "flex items-center gap-3 px-5 py-5 text-xs text-[#81867f]"
                  : "flex items-center gap-3 px-5 py-5 text-xs text-white/40"
              }
            >
              <LoaderCircle
                size={15}
                className="animate-spin"
              />

              Finding destinations...
            </div>
          ) : results.length === 0 ? (
            <div
              className={
                isMillenial
                  ? "px-5 py-6 text-sm text-[#81867f]"
                  : "px-5 py-6 text-sm text-white/40"
              }
            >
              No destinations found.
            </div>
          ) : (
            <div>
              {results.map((destination) => (
                <button
                  type="button"
                  key={
                    destination._id ||
                    `${destination.name}-${destination.latitude}-${destination.longitude}`
                  }
                  onClick={() =>
                    handleSelect(destination)
                  }
                  className={
                    isMillenial
                      ? "flex w-full items-start gap-4 border-b border-[#e0d9cc] px-5 py-4 text-left transition last:border-b-0 hover:bg-[#eee9df]"
                      : "flex w-full items-start gap-4 border-b border-white/[0.06] px-5 py-4 text-left transition last:border-b-0 hover:bg-white/[0.07]"
                  }
                >
                  <div
                    className={
                      isMillenial
                        ? "mt-1 text-[#8f7a4b]"
                        : "mt-1 text-cyan-300"
                    }
                  >
                    <MapPin size={17} />
                  </div>

                  <div className="min-w-0">
                    <p
                      className={
                        isMillenial
                          ? "font-serif text-lg text-[#344139]"
                          : "font-semibold text-white"
                      }
                    >
                      {destination.name}
                    </p>

                    <p
                      className={
                        isMillenial
                          ? "mt-1 text-xs text-[#81867f]"
                          : "mt-1 text-xs text-white/35"
                      }
                    >
                      {[
                        destination.city,
                        destination.state,
                        destination.country,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>

                    {destination.categories
                      ?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {destination.categories
                          .slice(0, 3)
                          .map((category) => (
                            <span
                              key={category}
                              className={
                                isMillenial
                                  ? "border border-[#d5cdbf] px-2 py-1 text-[9px] uppercase tracking-wider text-[#81745d]"
                                  : "rounded-full bg-white/[0.05] px-2 py-1 text-[9px] uppercase tracking-wider text-white/35"
                              }
                            >
                              {category}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
