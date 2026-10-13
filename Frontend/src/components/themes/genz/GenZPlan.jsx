import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    label: "Culture",
    icon: Landmark,
  },
  {
    id: "food",
    label: "Food",
    icon: Utensils,
  },
  {
    id: "nature",
    label: "Nature",
    icon: Mountain,
  },
  {
    id: "beaches",
    label: "Beaches",
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
      "Take your time and enjoy fewer places.",
  },
  {
    id: "balanced",
    title: "Balanced",
    description:
      "A mix of sightseeing and downtime.",
  },
  {
    id: "packed",
    title: "See It All",
    description:
      "More places, more experiences.",
  },
];

export default function GenZPlan() {
  const navigate = useNavigate();

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

  // ---------------------------------------------------------
  // INTEREST SELECTION
  // ---------------------------------------------------------

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

  // ---------------------------------------------------------
  // DESTINATION SELECTION
  // ---------------------------------------------------------

  const handleDestinationChange = (
    selectedDestination
  ) => {
    setDestination(selectedDestination);

    setGenerated(false);
    setPlan(null);
    setError("");
  };

  // ---------------------------------------------------------
  // GENERATE PLAN
  // ---------------------------------------------------------

  const handleGenerate = async (event) => {
    event.preventDefault();

    setError("");
    setGenerated(false);
    setPlan(null);

    // Destination must be selected
    // from the search results.
    if (!destination) {
      setError(
        "Please select a destination from the search results."
      );

      return;
    }

    // Make sure the selected destination
    // has a MongoDB ID.
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

      // Backend returned an HTTP error
      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to generate travel plan."
        );
      }

      // Backend returned success:false
      if (!data.success) {
        throw new Error(
          data.message ||
            "Unable to generate travel plan."
        );
      }

      // -----------------------------------------------------
      // PLAN GENERATED SUCCESSFULLY
      // -----------------------------------------------------

      setPlan(data.plan);
      setGenerated(true);

      // -----------------------------------------------------
      // OPEN DESTINATION PAGE
      // -----------------------------------------------------
      //
      // We pass the complete destination object through
      // React Router state so GenZDestination.jsx can use
      // it immediately without searching for it again.
      //

      navigate(
        `/destination/${encodeURIComponent(
          destination.name
        )}`,
        {
          state: {
            destination,
          },
        }
      );
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
    <main className="min-h-screen overflow-hidden bg-[#080811] text-white">

      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[130px]" />

        <div className="absolute right-[-100px] top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />

        <div className="absolute bottom-[-150px] left-1/3 h-[450px] w-[450px] rounded-full bg-purple-500/10 blur-[140px]" />

      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="relative z-10 px-5 pb-12 pt-12 sm:px-8 lg:px-16 lg:pb-16 lg:pt-20">

        <div className="mx-auto max-w-6xl">

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-300">

              <Sparkles size={14} />

              TravelMate Planner

            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-8xl">

              Build a trip

              <br />

              <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                worth remembering.
              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
              Tell TravelMate what kind of trip
              you want. We'll use your
              destination, budget, interests and
              travel style to build your itinerary.
            </p>

          </motion.div>

        </div>
      </section>

      {/* =====================================================
          PLANNER
      ===================================================== */}

      <section className="relative z-10 px-5 pb-20 sm:px-8 lg:px-16">

        <div className="mx-auto max-w-6xl">

          <form
            onSubmit={handleGenerate}
            className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"
          >

            {/* =================================================
                MAIN FORM
            ================================================= */}

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl sm:p-8">

              {/* Destination */}

              <div className="mb-8">

                <label className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">

                  <MapPin size={14} />

                  Where are you going?

                </label>

                <PlannerDestinationSearch
                  value={destination}
                  onChange={
                    handleDestinationChange
                  }
                  theme="genz"
                />

              </div>

              {/* Error */}

              {error && (
                <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {/* =================================================
                  DURATION
              ================================================= */}

              <div className="mb-8">

                <label className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">

                  <CalendarDays size={14} />

                  How long?

                </label>

                <div className="grid grid-cols-4 gap-2">

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
                          className={`rounded-xl px-3 py-4 text-sm font-bold transition-all ${
                            active
                              ? "bg-gradient-to-r from-fuchsia-500/30 to-purple-500/30 text-white ring-1 ring-fuchsia-400/40"
                              : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:text-white"
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

              {/* =================================================
                  BUDGET
              ================================================= */}

              <div className="mb-8">

                <label className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">

                  <Wallet size={14} />

                  What's your budget style?

                </label>

                <div className="grid gap-2 sm:grid-cols-3">

                  {[
                    ["budget", "Budget"],
                    [
                      "comfortable",
                      "Comfortable",
                    ],
                    ["flexible", "Flexible"],
                  ].map(
                    ([value, label]) => {
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
                          className={`rounded-xl border px-4 py-4 text-left transition-all ${
                            active
                              ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                              : "border-white/10 bg-white/[0.03] text-white/45 hover:bg-white/[0.07]"
                          }`}
                        >

                          <div className="text-sm font-bold">
                            {label}
                          </div>

                          <div className="mt-1 text-[10px] text-white/30">

                            {value ===
                              "budget" &&
                              "Keep spending low"}

                            {value ===
                              "comfortable" &&
                              "Balanced experience"}

                            {value ===
                              "flexible" &&
                              "More freedom"}

                          </div>

                        </button>
                      );
                    }
                  )}

                </div>
              </div>

              {/* =================================================
                  TRAVELLERS
              ================================================= */}

              <div className="mb-8">

                <label className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">

                  <Users size={14} />

                  Travellers

                </label>

                <div className="flex items-center gap-3">

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
                    className="h-12 w-12 rounded-xl border border-white/10 bg-white/[0.04] text-xl text-white/60 transition hover:bg-white/10"
                  >
                    −
                  </button>

                  <div className="flex h-12 min-w-20 items-center justify-center rounded-xl border border-white/10 bg-black/20 px-5 font-bold">
                    {travellers}
                  </div>

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
                    className="h-12 w-12 rounded-xl border border-white/10 bg-white/[0.04] text-xl text-white/60 transition hover:bg-white/10"
                  >
                    +
                  </button>

                  <span className="text-sm text-white/35">
                    {travellers === 1
                      ? "traveller"
                      : "travellers"}
                  </span>

                </div>
              </div>

              {/* =================================================
                  INTERESTS
              ================================================= */}

              <div>

                <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                  What are you into?
                </label>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">

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
                          className={`relative flex min-h-24 flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                            active
                              ? "border-fuchsia-400/40 bg-fuchsia-400/10"
                              : "border-white/10 bg-white/[0.025] hover:bg-white/[0.07]"
                          }`}
                        >

                          {active && (
                            <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-400 text-black">
                              <Check
                                size={12}
                              />
                            </span>
                          )}

                          <Icon
                            size={20}
                            className={
                              active
                                ? "text-fuchsia-300"
                                : "text-white/30"
                            }
                          />

                          <span
                            className={`mt-4 text-xs font-medium ${
                              active
                                ? "text-white"
                                : "text-white/45"
                            }`}
                          >
                            {interest.label}
                          </span>

                        </button>
                      );
                    }
                  )}

                </div>

              </div>

            </div>

            {/* =================================================
                TRAVEL STYLE
            ================================================= */}

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-8">

              <div className="mb-7">

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                  Your travel personality
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  How do you want to travel?
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  This helps TravelMate decide
                  how packed or relaxed your
                  itinerary should be.
                </p>

              </div>

              <div className="space-y-3">

                {travelStyles.map(
                  (style) => {
                    const active =
                      travelStyle ===
                      style.id;

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
                        className={`relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all ${
                          active
                            ? "border-purple-400/40 bg-gradient-to-r from-purple-500/15 to-fuchsia-500/10"
                            : "border-white/10 bg-white/[0.025] hover:bg-white/[0.06]"
                        }`}
                      >

                        <div className="flex items-start justify-between gap-4">

                          <div>

                            <h3 className="font-bold">
                              {style.title}
                            </h3>

                            <p className="mt-2 text-xs leading-5 text-white/35">
                              {style.description}
                            </p>

                          </div>

                          {active && (
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-400 text-black">
                              <Check
                                size={14}
                              />
                            </div>
                          )}

                        </div>

                      </button>
                    );
                  }
                )}

              </div>

              {/* =================================================
                  GENERATE BUTTON
              ================================================= */}

              <button
                type="submit"
                disabled={loading}
                className={`group mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 px-6 py-5 text-sm font-bold text-white shadow-xl shadow-purple-500/10 transition-all ${
                  loading
                    ? "cursor-not-allowed opacity-70"
                    : "hover:scale-[1.01]"
                }`}
              >

                {loading ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />

                    Building your plan...
                  </>
                ) : (
                  <>
                    Generate my itinerary

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}

              </button>

              <p className="mt-4 text-center text-[10px] leading-5 text-white/25">
                TravelMate will use these
                preferences to create your
                personalized plan.
              </p>

            </div>

          </form>

        </div>
      </section>

      {/* =====================================================
          TRIP PREVIEW
      ===================================================== */}

      {generated &&
        destination &&
        plan && (
          <motion.section
            id="genz-plan-result"
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="relative z-10 px-5 pb-24 sm:px-8 lg:px-16"
          >

            <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-10">

              <div className="mb-8">

                <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">

                  <Sparkles size={14} />

                  Trip preview

                </div>

                <h2 className="text-3xl font-black sm:text-4xl">

                  Your{" "}

                  <span className="text-fuchsia-400">
                    {plan.preferences.days}-day
                  </span>{" "}

                  {plan.destination.name} trip

                </h2>

                <p className="mt-3 text-sm text-white/40">

                  {plan.preferences.travellers}{" "}
                  {plan.preferences.travellers ===
                  1
                    ? "traveller"
                    : "travellers"}

                  {" · "}

                  {
                    travelStyles.find(
                      (item) =>
                        item.id ===
                        plan.preferences
                          .travelStyle
                    )?.title
                  }

                  {" · "}

                  {plan.preferences.budget
                    .charAt(0)
                    .toUpperCase() +
                    plan.preferences.budget.slice(
                      1
                    )}{" "}
                  budget

                </p>

                {/* Selected interests */}

                {plan.preferences
                  .interests?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">

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
                            className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-fuchsia-300"
                          >
                            {interest?.label ||
                              interestId}
                          </span>
                        );
                      }
                    )}

                  </div>
                )}

              </div>

              {/* Backend confirmation */}

              <div className="mb-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-5">

                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                    <Check size={17} />
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-white">
                      Planning details received
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/35">
                      {plan.message}
                    </p>

                  </div>

                </div>

              </div>

              {/* Day cards */}

              <div className="grid gap-3 sm:grid-cols-3">

                {Array.from(
                  {
                    length:
                      plan.preferences.days,
                  },
                  (_, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-black/20 p-5"
                    >

                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/30">
                        Day {index + 1}
                      </p>

                      <h3 className="mt-3 font-bold">
                        {index === 0
                          ? "Arrival & first impressions"
                          : index ===
                            plan.preferences
                              .days -
                              1
                          ? "Last discoveries"
                          : "Explore & experience"}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-white/35">
                        AI-selected activities
                        will appear here when
                        the itinerary generation
                        engine is connected.
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
