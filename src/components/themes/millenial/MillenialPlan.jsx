import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Wallet,
  Users,
  Sparkles,
  Backpack,
  Mountain,
  Utensils,
  Camera,
  Landmark,
  Waves,
  Check,
  LoaderCircle,
} from "lucide-react";

import PlannerDestinationSearch from "../../PlannerDestinationSearch";

const API_URL = "http://localhost:5000";

const interests = [
  {
    id: "culture",
    label: "Culture & Heritage",
    icon: Landmark,
  },
  {
    id: "food",
    label: "Food & Dining",
    icon: Utensils,
  },
  {
    id: "nature",
    label: "Nature",
    icon: Mountain,
  },
  {
    id: "beaches",
    label: "Coast & Beaches",
    icon: Waves,
  },
  {
    id: "photography",
    label: "Photography",
    icon: Camera,
  },
  {
    id: "adventure",
    label: "Adventure",
    icon: Backpack,
  },
];

const travelStyles = [
  {
    id: "relaxed",
    title: "Slow & Relaxed",
    description:
      "Fewer places, longer moments and plenty of time to wander.",
  },
  {
    id: "balanced",
    title: "Balanced",
    description:
      "A thoughtful mix of sightseeing, meals and time to rest.",
  },
  {
    id: "packed",
    title: "Full Days",
    description:
      "Make the most of your stay with a fuller itinerary.",
  },
];

export default function MillenialPlan() {
  const [destination, setDestination] =
    useState(null);

  const [days, setDays] = useState(3);

  const [budget, setBudget] =
    useState("comfortable");

  const [travellers, setTravellers] =
    useState(2);

  const [travelStyle, setTravelStyle] =
    useState("balanced");

  const [selectedInterests, setSelectedInterests] =
    useState([]);

  const [generated, setGenerated] =
    useState(false);

  const [plan, setPlan] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  const toggleInterest = (id) => {
    setSelectedInterests((current) =>
      current.includes(id)
        ? current.filter(
            (item) => item !== id
          )
        : [...current, id]
    );

    setGenerated(false);
    setPlan(null);
    setError("");
  };

  const handleDestinationChange = (
    selectedDestination
  ) => {
    setDestination(selectedDestination);

    setGenerated(false);
    setPlan(null);
    setError("");
  };

  const handleGenerate = async (event) => {
    event.preventDefault();

    setError("");
    setGenerated(false);
    setPlan(null);

    /*
     * User must select a real destination
     * from the MongoDB search results.
     */
    if (!destination) {
      setError(
        "Please select a destination from the search results."
      );

      return;
    }

    /*
     * Make sure the selected destination
     * contains its MongoDB ID.
     */
    if (!destination._id) {
      setError(
        "The selected destination is invalid. Please select it again."
      );

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/plan/generate`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            destinationId:
              destination._id,

            days: Number(days),

            budget,

            travellers:
              Number(travellers),

            travelStyle,

            interests:
              selectedInterests,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to generate travel plan."
        );
      }

      if (!data.success) {
        throw new Error(
          data.message ||
            "Unable to generate travel plan."
        );
      }

      /*
       * Store the response returned
       * by the backend.
       */
      setPlan(data.plan);

      setGenerated(true);

      /*
       * Scroll to the generated result.
       */
      setTimeout(() => {
        document
          .getElementById(
            "millenial-plan-result"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch (error) {
      console.error(
        "Plan generation error:",
        error
      );

      setError(
        error.message ||
          "Something went wrong while generating your plan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f0e7] text-[#29362e]">

      {/* Header */}
      <section className="border-b border-[#d8d0c2] px-5 pb-14 pt-14 sm:px-8 lg:px-16 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >

              <div className="mb-6 flex items-center gap-3">

                <span className="h-px w-12 bg-[#9b8754]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#81745d]">
                  TravelMate / Trip Planning
                </span>

              </div>

              <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">

                Plan a journey

                <br />

                <span className="italic text-[#8c7747]">
                  worth taking.
                </span>

              </h1>

            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
              }}
            >

              <p className="max-w-md text-sm leading-7 text-[#697169] sm:text-base">
                Tell us where you are going, how
                you like to travel and what matters
                most to you. TravelMate will use
                those details to shape a thoughtful
                itinerary.
              </p>

            </motion.div>

          </div>

        </div>
      </section>

      {/* Planner */}
      <section className="px-5 py-10 sm:px-8 lg:px-16 lg:py-16">

        <div className="mx-auto max-w-6xl">

          <form
            onSubmit={handleGenerate}
            className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]"
          >

            {/* Main details */}
            <div className="border border-[#d8d0c2] bg-[#faf8f2]">

              {/* Destination */}
              <div className="border-b border-[#d8d0c2] p-6 sm:p-8">

                <label className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#817a6c]">

                  <MapPin size={13} />

                  Destination

                </label>

                <PlannerDestinationSearch
                  value={destination}
                  onChange={
                    handleDestinationChange
                  }
                  theme="millennial"
                />

              </div>

              {/* Error */}
              {error && (
                <div className="border-b border-[#d8d0c2] bg-[#f5e9e5] px-6 py-4 text-xs text-[#8a5548] sm:px-8">
                  {error}
                </div>
              )}

              {/* Duration */}
              <div className="border-b border-[#d8d0c2] p-6 sm:p-8">

                <label className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#817a6c]">

                  <CalendarDays size={13} />

                  Length of stay

                </label>

                <div className="flex flex-wrap gap-2">

                  {[1, 3, 5, 7].map(
                    (value) => {
                      const active =
                        days === value;

                      return (
                        <button
                          type="button"
                          key={value}
                          onClick={() => {
                            setDays(value);
                            setGenerated(false);
                            setPlan(null);
                          }}
                          className={`border px-5 py-3 text-xs transition-all ${
                            active
                              ? "border-[#8f7a4b] bg-[#e9e3d5] text-[#344139]"
                              : "border-[#d5cdbf] text-[#777c74] hover:bg-[#f1ede4]"
                          }`}
                        >
                          {value}{" "}
                          {value === 1
                            ? "day"
                            : "days"}
                        </button>
                      );
                    }
                  )}

                </div>

              </div>

              {/* Budget */}
              <div className="border-b border-[#d8d0c2] p-6 sm:p-8">

                <label className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#817a6c]">

                  <Wallet size={13} />

                  Budget preference

                </label>

                <div className="grid border border-[#d5cdbf] sm:grid-cols-3">

                  {[
                    ["budget", "Considered"],
                    [
                      "comfortable",
                      "Comfortable",
                    ],
                    ["flexible", "Flexible"],
                  ].map(
                    ([value, label], index) => {
                      const active =
                        budget === value;

                      return (
                        <button
                          type="button"
                          key={value}
                          onClick={() => {
                            setBudget(value);
                            setGenerated(false);
                            setPlan(null);
                          }}
                          className={`border-b border-[#d5cdbf] px-4 py-4 text-left transition sm:border-b-0 ${
                            index !== 0
                              ? "sm:border-l"
                              : ""
                          } ${
                            active
                              ? "bg-[#e9e3d5]"
                              : "hover:bg-[#f4f0e8]"
                          }`}
                        >

                          <p className="font-serif text-base text-[#344139]">
                            {label}
                          </p>

                          <p className="mt-1 text-[10px] leading-4 text-[#8a8d87]">

                            {value ===
                              "budget" &&
                              "Keep things simple"}

                            {value ===
                              "comfortable" &&
                              "A balanced experience"}

                            {value ===
                              "flexible" &&
                              "Room for spontaneity"}

                          </p>

                        </button>
                      );
                    }
                  )}

                </div>

              </div>

              {/* Travellers */}
              <div className="border-b border-[#d8d0c2] p-6 sm:p-8">

                <label className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#817a6c]">

                  <Users size={13} />

                  Travellers

                </label>

                <div className="flex items-center gap-3">

                  {/* Decrease */}
                  <button
                    type="button"
                    onClick={() => {
                      setTravellers(
                        (current) =>
                          Math.max(
                            1,
                            current - 1
                          )
                      );

                      setGenerated(false);
                      setPlan(null);
                    }}
                    className="h-11 w-11 border border-[#d5cdbf] text-lg text-[#697169] transition hover:bg-[#e9e3d5]"
                  >
                    −
                  </button>

                  {/* Count */}
                  <div className="flex h-11 min-w-16 items-center justify-center border border-[#d5cdbf] bg-[#f4f0e8] px-4 font-serif">
                    {travellers}
                  </div>

                  {/* Increase */}
                  <button
                    type="button"
                    onClick={() => {
                      setTravellers(
                        (current) =>
                          Math.min(
                            20,
                            current + 1
                          )
                      );

                      setGenerated(false);
                      setPlan(null);
                    }}
                    className="h-11 w-11 border border-[#d5cdbf] text-lg text-[#697169] transition hover:bg-[#e9e3d5]"
                  >
                    +
                  </button>

                  <span className="text-xs text-[#8a8d87]">
                    {travellers === 1
                      ? "traveller"
                      : "travellers"}
                  </span>

                </div>

              </div>

              {/* Interests */}
              <div className="p-6 sm:p-8">

                <label className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#817a6c]">
                  Interests
                </label>

                <div className="grid border-l border-t border-[#d5cdbf] sm:grid-cols-3">

                  {interests.map(
                    (interest) => {
                      const Icon =
                        interest.icon;

                      const active =
                        selectedInterests.includes(
                          interest.id
                        );

                      return (
                        <button
                          type="button"
                          key={interest.id}
                          onClick={() =>
                            toggleInterest(
                              interest.id
                            )
                          }
                          className={`relative flex min-h-28 flex-col justify-between border-b border-r border-[#d5cdbf] p-4 text-left transition ${
                            active
                              ? "bg-[#e9e3d5]"
                              : "hover:bg-[#f4f0e8]"
                          }`}
                        >

                          {active && (
                            <span className="absolute right-3 top-3 text-[#8f7a4b]">
                              <Check size={15} />
                            </span>
                          )}

                          <Icon
                            size={17}
                            className={
                              active
                                ? "text-[#8f7a4b]"
                                : "text-[#8b8d86]"
                            }
                          />

                          <span className="font-serif text-sm text-[#465149]">
                            {interest.label}
                          </span>

                        </button>
                      );
                    }
                  )}

                </div>

              </div>

            </div>

            {/* Travel personality */}
            <div className="flex flex-col border border-[#d8d0c2] bg-[#e9e3d5] p-6 sm:p-8">

              <div>

                <div className="mb-5 flex items-center gap-3">

                  <span className="h-px w-8 bg-[#9b8754]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#81745d]">
                    Your travel style
                  </span>

                </div>

                <h2 className="font-serif text-3xl leading-tight text-[#29362e]">

                  How would you like
                  <br />
                  to experience it?

                </h2>

                <p className="mt-4 text-xs leading-6 text-[#71776f]">
                  Your pace influences how many
                  experiences TravelMate places
                  into each day.
                </p>

              </div>

              <div className="mt-8 space-y-2">

                {travelStyles.map(
                  (style) => {
                    const active =
                      travelStyle === style.id;

                    return (
                      <button
                        type="button"
                        key={style.id}
                        onClick={() => {
                          setTravelStyle(
                            style.id
                          );

                          setGenerated(false);
                          setPlan(null);
                        }}
                        className={`w-full border p-5 text-left transition ${
                          active
                            ? "border-[#9b8754] bg-[#f5f1e8]"
                            : "border-[#d0c7b7] bg-transparent hover:bg-[#f0ece3]"
                        }`}
                      >

                        <div className="flex items-start justify-between gap-4">

                          <div>

                            <h3 className="font-serif text-lg text-[#344139]">
                              {style.title}
                            </h3>

                            <p className="mt-2 text-[11px] leading-5 text-[#7b8179]">
                              {style.description}
                            </p>

                          </div>

                          {active && (
                            <Check
                              size={17}
                              className="shrink-0 text-[#8f7a4b]"
                            />
                          )}

                        </div>

                      </button>
                    );
                  }
                )}

              </div>

              {/* Generate */}
              <div className="mt-auto pt-8">

                <button
                  type="submit"
                  disabled={loading}
                  className={`group flex w-full items-center justify-center gap-3 bg-[#344139] px-6 py-5 text-xs font-semibold uppercase tracking-[0.15em] text-[#f5f1e8] transition ${
                    loading
                      ? "cursor-not-allowed opacity-60"
                      : "hover:bg-[#46564b]"
                  }`}
                >

                  {loading ? (
                    <>
                      <LoaderCircle
                        size={16}
                        className="animate-spin"
                      />

                      Preparing your journey
                    </>
                  ) : (
                    <>
                      Begin planning

                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>

                <p className="mt-4 text-center text-[10px] leading-5 text-[#8a8d87]">
                  Your preferences will guide
                  the TravelMate itinerary engine.
                </p>

              </div>

            </div>

          </form>

        </div>
      </section>

      {/* Trip preview */}
      {generated &&
        destination &&
        plan && (
          <motion.section
            id="millenial-plan-result"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="border-t border-[#d8d0c2] px-5 py-12 sm:px-8 lg:px-16 lg:py-16"
          >

            <div className="mx-auto max-w-6xl">

              <div className="grid gap-8 border-b border-[#d8d0c2] pb-8 md:grid-cols-[1fr_auto] md:items-end">

                <div>

                  <div className="mb-4 flex items-center gap-3">

                    <Sparkles
                      size={15}
                      className="text-[#9b8754]"
                    />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#81745d]">
                      Trip preview
                    </span>

                  </div>

                  <h2 className="font-serif text-4xl text-[#29362e] sm:text-5xl">

                    {plan.preferences.days}-day
                    journey through{" "}

                    <span className="italic text-[#8c7747]">
                      {plan.destination.name}
                    </span>

                  </h2>

                </div>

                <div className="text-left md:text-right">

                  <p className="text-xs text-[#81867f]">

                    {plan.preferences.travellers}{" "}

                    {plan.preferences.travellers ===
                    1
                      ? "traveller"
                      : "travellers"}

                  </p>

                  <p className="mt-1 text-xs capitalize text-[#81867f]">

                    {plan.preferences.budget}{" "}
                    budget ·{" "}

                    {
                      travelStyles.find(
                        (item) =>
                          item.id ===
                          plan.preferences
                            .travelStyle
                      )?.title
                    }

                  </p>

                </div>

              </div>

              {/* Backend confirmation */}
              <div className="mt-6 border border-[#d8d0c2] bg-[#faf8f2] p-5">

                <div className="flex items-start gap-3">

                  <Check
                    size={17}
                    className="mt-0.5 shrink-0 text-[#8f7a4b]"
                  />

                  <div>

                    <p className="font-serif text-base text-[#344139]">
                      Your planning details
                      have been received.
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#7b8179]">
                      {plan.message}
                    </p>

                  </div>

                </div>

              </div>

              {/* Selected interests */}
              {plan.preferences
                .interests?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">

                  {plan.preferences.interests.map(
                    (interestId) => {
                      const interest =
                        interests.find(
                          (item) =>
                            item.id ===
                            interestId
                        );

                      return (
                        <span
                          key={interestId}
                          className="border border-[#cfc5b3] bg-[#eee9df] px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-[#81745d]"
                        >
                          {interest?.label ||
                            interestId}
                        </span>
                      );
                    }
                  )}

                </div>
              )}

              {/* Day cards */}
              <div className="mt-8 grid gap-0 border-l border-t border-[#d8d0c2] sm:grid-cols-3">

                {Array.from(
                  {
                    length:
                      plan.preferences.days,
                  },
                  (_, index) => (
                    <div
                      key={index}
                      className="border-b border-r border-[#d8d0c2] bg-[#faf8f2] p-6"
                    >

                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a806d]">
                        Day {index + 1}
                      </p>

                      <h3 className="mt-4 font-serif text-xl text-[#344139]">

                        {index === 0
                          ? "Arrival & first impressions"
                          : index ===
                            plan.preferences
                              .days -
                              1
                          ? "A final day to remember"
                          : "Explore & experience"}

                      </h3>

                      <p className="mt-3 text-xs leading-6 text-[#7b8179]">
                        Your personalized
                        activities will appear here
                        once the TravelMate AI
                        itinerary engine is connected.
                      </p>

                    </div>
                  )
                )}

              </div>

            </div>

          </motion.section>
        )}

    </main>
  );
}
