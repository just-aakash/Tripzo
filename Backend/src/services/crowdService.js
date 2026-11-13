const mongoose = require("mongoose");
const Destination = require("../models/Destination");
const CrowdData = require("../models/CrowdData");

/**
 * Hourly crowd distribution curves (8 AM to 8 PM)
 * Keyed by time of day
 */
const HOURLY_FACTORS = {
  8: { label: "8:00 AM", short: "8 AM", baseWeight: 0.35 },
  9: { label: "9:00 AM", short: "9 AM", baseWeight: 0.5 },
  10: { label: "10:00 AM", short: "10 AM", baseWeight: 0.7 },
  11: { label: "11:00 AM", short: "11 AM", baseWeight: 0.85 },
  12: { label: "12:00 PM", short: "12 PM", baseWeight: 0.95 },
  13: { label: "1:00 PM", short: "1 PM", baseWeight: 1.0 }, // Peak
  14: { label: "2:00 PM", short: "2 PM", baseWeight: 0.95 },
  15: { label: "3:00 PM", short: "3 PM", baseWeight: 0.9 },
  16: { label: "4:00 PM", short: "4 PM", baseWeight: 0.8 },
  17: { label: "5:00 PM", short: "5 PM", baseWeight: 0.7 },
  18: { label: "6:00 PM", short: "6 PM", baseWeight: 0.6 },
  19: { label: "7:00 PM", short: "7 PM", baseWeight: 0.45 },
  20: { label: "8:00 PM", short: "8 PM", baseWeight: 0.35 },
};

/**
 * Explainable Crowd Estimation Engine
 */
const getCrowdEstimation = async (destinationIdentifier) => {
  let destination = null;

  if (mongoose.Types.ObjectId.isValid(destinationIdentifier)) {
    destination = await Destination.findById(destinationIdentifier);
  }

  if (!destination) {
    destination = await Destination.findOne({
      name: { $regex: new RegExp(`^${destinationIdentifier}$`, "i") },
    });
  }

  if (!destination) {
    throw new Error("Destination not found");
  }

  const now = new Date();
  const currentHour = now.getHours();
  const currentMonth = now.getMonth() + 1; // 1-12
  const dayOfWeek = now.getDay(); // 0 = Sun, 6 = Sat
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // 1. Check historical observations in MongoDB
  const historicalRecords = await CrowdData.find({
    destinationId: destination._id,
    month: currentMonth,
    dayType: isWeekend ? "weekend" : "weekday",
  });

  const historicalMap = new Map();
  historicalRecords.forEach((rec) => {
    historicalMap.set(rec.hourSlot, rec.observedVisitorIndex);
  });

  // 2. Base intensity from destination crowdPreference
  let baseScore = 50;
  if (destination.crowdPreference === "low") baseScore = 32;
  else if (destination.crowdPreference === "high") baseScore = 78;

  // 3. Weekend factor (+22% on weekends)
  const weekendMultiplier = isWeekend ? 1.25 : 1.0;

  // 4. Seasonal factor (Peak tourist season Oct-March in India: +15%)
  const isPeakSeason = currentMonth >= 10 || currentMonth <= 3;
  const seasonalMultiplier = isPeakSeason ? 1.15 : 0.95;

  // 5. Generate hourly breakdown
  const hourlyCrowd = Object.entries(HOURLY_FACTORS).map(([hourStr, info]) => {
    const hourNum = Number(hourStr);
    let score;

    if (historicalMap.has(hourNum)) {
      score = historicalMap.get(hourNum);
    } else {
      score = Math.round(
        baseScore * info.baseWeight * weekendMultiplier * seasonalMultiplier
      );
    }

    score = Math.max(10, Math.min(100, score));

    let level = "Low";
    if (score >= 70) level = "High";
    else if (score >= 45) level = "Medium";

    return {
      hour: info.label,
      time: info.short,
      hourNumber: hourNum,
      crowdIndex: score,
      level,
      isPeak: score >= 75,
    };
  });

  // Weekday vs Weekend comparison
  const weekdayAvg = Math.round(baseScore * 0.7 * seasonalMultiplier);
  const weekendAvg = Math.round(baseScore * 0.7 * 1.25 * seasonalMultiplier);

  // Current moment score
  const activeHourIndex = hourlyCrowd.find((h) => h.hourNumber === currentHour);
  const currentScore = activeHourIndex
    ? activeHourIndex.crowdIndex
    : Math.round(baseScore * 0.65 * weekendMultiplier);

  let currentLevel = "Medium";
  if (currentScore >= 70) currentLevel = "High";
  else if (currentScore < 45) currentLevel = "Low";

  // Explainable factors
  const factors = [
    isWeekend
      ? "Weekend visitor surge (+25% typical increase in footfall)"
      : "Weekday schedule (moderate baseline local & tourist traffic)",
    isPeakSeason
      ? "High seasonal tourism window (favorable weather across regional sights)"
      : "Standard seasonal period with balanced off-peak accessibility",
    `Destination footfall profile: ${destination.crowdPreference?.toUpperCase() || "MODERATE"} historical popularity`,
    "Hourly distribution: peak density between 12:30 PM and 3:30 PM",
  ];

  // Best visiting windows
  const bestVisitingSlots = [
    {
      time: "07:30 AM – 10:00 AM",
      label: "Early Morning Window",
      crowdLevel: "Low",
      reason:
        "Shortest admission queues, clear lighting for photography, and pleasant ambient temperatures.",
    },
    {
      time: "05:00 PM – 07:00 PM",
      label: "Late Afternoon / Sunset",
      crowdLevel: "Medium",
      reason:
        "Cooler evening breeze and manageable crowds following the midday tour bus departures.",
    },
  ];

  return {
    destinationId: destination._id,
    destinationName: destination.name,
    city: destination.city,
    country: destination.country,
    currentCrowd: {
      score: currentScore,
      level: currentLevel,
      label:
        currentLevel === "Low"
          ? "Pleasant & Quiet"
          : currentLevel === "High"
          ? "Active & Busy"
          : "Moderate Activity",
    },
    dayComparison: {
      weekdayAvg: Math.min(100, weekdayAvg),
      weekendAvg: Math.min(100, weekendAvg),
      weekendSurgePercentage: Math.round(
        ((weekendAvg - weekdayAvg) / weekdayAvg) * 100
      ),
    },
    hourlyCrowd,
    bestVisitingSlots,
    factors,
    dataSource: "Tripzo Explainable Crowd Estimation Engine & Historical Sample Dataset",
  };
};

module.exports = {
  getCrowdEstimation,
};
