import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  Utensils,
  Car,
  Ticket,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

export default function MillenialBudgetIntelligence({
  destination,
}) {
  const [spendingMode, setSpendingMode] =
    useState("comfortable");

  const [days, setDays] = useState(3);

  const baseDaily =
    Number(destination?.approximateBudgetPerDay) || 0;

  const spendingModes = {
    budget: {
      label: "Budget",
      multiplier: 0.7,
      description: "A considered, economical approach",
    },

    comfortable: {
      label: "Comfortable",
      multiplier: 1,
      description: "A balanced way to experience the destination",
    },

    flexible: {
      label: "Flexible",
      multiplier: 1.3,
      description: "A little more room for memorable experiences",
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
        name: "Food & dining",
        percentage: 32,
        icon: Utensils,
      },

      {
        name: "Local transport",
        percentage: 20,
        icon: Car,
      },

      {
        name: "Attractions",
        percentage: 28,
        icon: Ticket,
      },

      {
        name: "Shopping & extras",
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
    low: "This destination is well suited to travellers who prefer to keep their spending considered and simple.",

    medium:
      "A comfortable budget should give you enough freedom to enjoy the destination without over-planning every expense.",

    high:
      "Allowing a little extra room in your budget can make premium experiences and spontaneous plans easier to enjoy.",
  };

  const budgetLevel =
    destination?.budgetLevel || "medium";

  return (
    <section className="relative overflow-hidden border border-[#d9d2c4] bg-[#f5f1e8] text-[#26332c]">
      <div className="relative z-10 p-6 sm:p-10 lg:p-12">
        {/* Editorial heading */}
        <div className="grid gap-8 border-b border-[#d8d0c2] pb-8 lg:grid-cols-[1fr_0.65fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#a28d55]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#81745d]">
                TravelMate / Budget Notes
              </span>
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-[#243129] sm:text-5xl">
              A considered
              <br />
              way to plan
              <br />
              <span className="italic text-[#8b7747]">
                your spend.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-[#687068] sm:text-base">
              An estimated travel budget for{" "}
              <span className="font-semibold text-[#34423a]">
                {destination?.name || "this destination"}
              </span>
              , designed to help you make thoughtful choices
              before you arrive.
            </p>
          </div>

          {/* Daily budget */}
          <div className="flex flex-col justify-end lg:border-l lg:border-[#d8d0c2] lg:pl-10">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#8b806d]">
              <Wallet size={14} />
              Estimated per day
            </div>

            <div className="font-serif text-4xl font-medium tracking-tight text-[#26332c] sm:text-5xl">
              {formatCurrency(dailyBudget)}
            </div>

            <p className="mt-3 max-w-sm text-xs leading-5 text-[#7a8179]">
              {currentMode.description}
            </p>
          </div>
        </div>

        {/* Spending style */}
        <div className="grid gap-8 border-b border-[#d8d0c2] py-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8b806d]">
              Your travel style
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#29362e]">
              Choose your pace
            </h3>

            <p className="mt-2 max-w-sm text-xs leading-5 text-[#7a8179]">
              The estimate adjusts according to how much freedom
              you would like in your daily spending.
            </p>
          </div>

          <div className="grid border border-[#d8d0c2] bg-[#faf8f2] sm:grid-cols-3">
            {Object.entries(spendingModes).map(
              ([key, mode], index) => {
                const active = spendingMode === key;

                return (
                  <button
                    key={key}
                    onClick={() => setSpendingMode(key)}
                    className={`relative px-5 py-5 text-left transition-all duration-300 ${
                      index !== 0
                        ? "border-t border-[#d8d0c2] sm:border-l sm:border-t-0"
                        : ""
                    } ${
                      active
                        ? "bg-[#e9e3d5]"
                        : "hover:bg-[#f1ede4]"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="millenial-budget-style"
                        className="absolute bottom-0 left-0 h-[2px] w-full bg-[#a28d55]"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    <p
                      className={`font-serif text-lg ${
                        active
                          ? "text-[#26332c]"
                          : "text-[#6f756e]"
                      }`}
                    >
                      {mode.label}
                    </p>

                    <p className="mt-2 text-[10px] leading-4 text-[#8a8d87]">
                      {mode.description}
                    </p>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Duration + total */}
        <div className="grid gap-8 border-b border-[#d8d0c2] py-8 md:grid-cols-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8b806d]">
              Length of stay
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[1, 3, 5, 7].map((value) => {
                const active = days === value;

                return (
                  <button
                    key={value}
                    onClick={() => setDays(value)}
                    className={`border px-5 py-3 text-xs transition-all duration-300 ${
                      active
                        ? "border-[#8f7b4b] bg-[#e9e3d5] text-[#344139]"
                        : "border-[#d5cdbf] bg-transparent text-[#777b74] hover:border-[#a9a08f] hover:bg-[#faf8f2]"
                    }`}
                  >
                    {value}{" "}
                    {value === 1 ? "day" : "days"}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:border-l md:border-[#d8d0c2] md:pl-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8b806d]">
              Estimated total
            </p>

            <div className="mt-3 flex items-end justify-between gap-4">
              <div className="font-serif text-3xl text-[#26332c] sm:text-4xl">
                {formatCurrency(totalBudget)}
              </div>

              <span className="pb-1 text-[10px] uppercase tracking-[0.15em] text-[#9a907e]">
                {days}{" "}
                {days === 1 ? "day" : "days"}
              </span>
            </div>
          </div>
        </div>

        {/* Spending breakdown */}
        <div className="py-8">
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8b806d]">
                The breakdown
              </p>

              <h3 className="mt-2 font-serif text-2xl text-[#29362e]">
                Where your budget goes
              </h3>
            </div>

            <p className="text-xs text-[#8a8d87]">
              Based on an estimated {days}-day stay
            </p>
          </div>

          <div className="border-t border-[#d8d0c2]">
            {breakdown.map((item, index) => {
              const Icon = item.icon;

              const amount = Math.round(
                totalBudget *
                  (item.percentage / 100)
              );

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-[#d8d0c2] py-5"
                >
                  <div className="flex h-9 w-9 items-center justify-center border border-[#d5cdbf] bg-[#faf8f2]">
                    <Icon
                      size={15}
                      className="text-[#8d7a4c]"
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="font-serif text-base text-[#344139]">
                        {item.name}
                      </span>

                      <span className="text-[10px] text-[#98988f]">
                        {item.percentage}%
                      </span>
                    </div>

                    <div className="h-[3px] bg-[#e1dbcf]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${item.percentage}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.08,
                        }}
                        className="h-full bg-[#9b8754]"
                      />
                    </div>
                  </div>

                  <div className="font-serif text-sm text-[#465149]">
                    {formatCurrency(amount)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Editorial recommendation */}
        <div className="grid gap-5 border-t border-[#d8d0c2] pt-7 sm:grid-cols-[auto_1fr]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#cfc5b3]">
            <Sparkles
              size={15}
              className="text-[#9b8754]"
            />
          </div>

          <div>
            <p className="font-serif text-lg text-[#344139]">
              A note from TravelMate
            </p>

            <p className="mt-2 max-w-2xl text-xs leading-6 text-[#727a72]">
              {recommendation[budgetLevel] ||
                recommendation.medium}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 border-t border-[#d8d0c2] pt-5">
          <p className="text-center text-[10px] leading-5 text-[#9a9b94]">
            Budget figures are approximate estimates based on
            destination-level information. Actual costs may vary
            depending on your choices, season and travel style.
          </p>
        </div>
      </div>
    </section>
  );
}
