import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  Utensils,
  Car,
  Ticket,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function GenZBudgetIntelligence({ destination }) {
  const [spendingMode, setSpendingMode] = useState("comfortable");
  const [days, setDays] = useState(3);

  const baseDaily = Number(destination?.approximateBudgetPerDay) || 0;

  const spendingModes = {
    budget: {
      label: "Budget",
      multiplier: 0.7,
      description: "Keep it affordable",
    },
    comfortable: {
      label: "Comfortable",
      multiplier: 1,
      description: "Balanced travel",
    },
    flexible: {
      label: "Flexible",
      multiplier: 1.3,
      description: "More freedom",
    },
  };

  const currentMode = spendingModes[spendingMode];

  const dailyBudget = Math.round(
    baseDaily * currentMode.multiplier
  );

  const totalBudget = dailyBudget * days;

  const breakdown = useMemo(() => {
    return [
      {
        name: "Food",
        percentage: 32,
        icon: Utensils,
      },
      {
        name: "Transport",
        percentage: 20,
        icon: Car,
      },
      {
        name: "Attractions",
        percentage: 28,
        icon: Ticket,
      },
      {
        name: "Shopping & Misc.",
        percentage: 20,
        icon: ShoppingBag,
      },
    ];
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const recommendation = {
    low: "This destination can work really well for budget-conscious travellers.",
    medium:
      "A comfortable budget gives you a good balance between experiences and spending.",
    high:
      "Keep some extra budget available so you can enjoy premium experiences without worrying.",
  };

  const budgetLevel = destination?.budgetLevel || "medium";

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b14] p-5 text-white shadow-2xl sm:p-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-500/15 blur-[110px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[80px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1.5 text-xs font-medium text-fuchsia-300">
              <Sparkles size={13} />
              TRAVELMATE INTELLIGENCE
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Plan your{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                spend.
              </span>
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/55 sm:text-base">
              A smart estimate for exploring{" "}
              <span className="font-semibold text-white/80">
                {destination?.name || "this destination"}
              </span>
              .
            </p>
          </div>

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-lg">
            <Wallet className="text-fuchsia-300" size={25} />
          </div>
        </div>

        {/* Spending mode */}
        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Travel style
          </p>

          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.035] p-2">
            {Object.entries(spendingModes).map(
              ([key, mode]) => {
                const active = spendingMode === key;

                return (
                  <button
                    key={key}
                    onClick={() => setSpendingMode(key)}
                    className={`relative rounded-xl px-3 py-3 text-left transition-all duration-300 ${
                      active
                        ? "bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 text-white shadow-lg"
                        : "text-white/45 hover:bg-white/5 hover:text-white/80"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="budget-mode"
                        className="absolute inset-0 rounded-xl border border-fuchsia-400/30"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    <div className="relative">
                      <div className="text-sm font-bold">
                        {mode.label}
                      </div>

                      <div className="mt-1 hidden text-[10px] text-white/40 sm:block">
                        {mode.description}
                      </div>
                    </div>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Main budget */}
        <div className="mb-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            key={`${spendingMode}-${days}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.025] p-6"
          >
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-3xl" />

            <div className="relative">
              <div className="mb-2 flex items-center gap-2 text-sm text-white/45">
                <Wallet size={16} />
                Estimated daily spend
              </div>

              <div className="mb-5 text-4xl font-black tracking-tight sm:text-5xl">
                {formatCurrency(dailyBudget)}
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-300">
                <TrendingUp size={14} />
                {currentMode.description}
              </div>

              <div className="mt-6 h-px bg-white/10" />

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/35">
                    {days}-day estimate
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {formatCurrency(totalBudget)}
                  </p>
                </div>

                <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/5 px-3 py-2 text-xs text-cyan-300">
                  Estimated
                </div>
              </div>
            </div>
          </motion.div>

          {/* Duration */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Trip duration
            </p>

            <div className="grid grid-cols-2 gap-2">
              {[1, 3, 5, 7].map((value) => {
                const active = days === value;

                return (
                  <button
                    key={value}
                    onClick={() => setDays(value)}
                    className={`rounded-xl px-4 py-4 text-sm font-bold transition-all duration-300 ${
                      active
                        ? "bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-cyan-200 ring-1 ring-cyan-400/30"
                        : "bg-white/[0.035] text-white/45 hover:bg-white/[0.07] hover:text-white"
                    }`}
                  >
                    {value} {value === 1 ? "Day" : "Days"}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-white/5 bg-black/20 p-4">
              <p className="text-xs leading-5 text-white/40">
                Adjust the duration to instantly see how your
                estimated total changes.
              </p>
            </div>
          </div>
        </div>

        {/* Spending breakdown */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold">
              Where your money goes
            </h3>

            <p className="mt-1 text-xs text-white/40">
              Estimated spending distribution
            </p>
          </div>

          <div className="space-y-5">
            {breakdown.map((item, index) => {
              const Icon = item.icon;

              const amount = Math.round(
                totalBudget * (item.percentage / 100)
              );

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.08,
                  }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
                        <Icon size={16} className="text-cyan-300" />
                      </div>

                      <div>
                        <p className="text-sm font-medium">
                          {item.name}
                        </p>

                        <p className="text-[10px] text-white/35">
                          {item.percentage}% of total
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-bold text-white/80">
                      {formatCurrency(amount)}
                    </p>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${item.percentage}%`,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.08,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded-2xl border border-fuchsia-400/10 bg-gradient-to-r from-fuchsia-500/[0.08] to-cyan-500/[0.05] p-4"
        >
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-fuchsia-400/10">
              <Sparkles
                size={16}
                className="text-fuchsia-300"
              />
            </div>

            <div>
              <p className="text-sm font-semibold">
                TravelMate tip
              </p>

              <p className="mt-1 text-xs leading-5 text-white/45">
                {recommendation[budgetLevel] ||
                  recommendation.medium}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <p className="mt-5 text-center text-[10px] leading-5 text-white/25">
          Budget figures are approximate estimates based on
          destination-level data. Actual spending may vary.
        </p>
      </div>
    </section>
  );
}
