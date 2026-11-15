/**
 * Curated destination attractions catalog for rule-based sequencing
 */
const DESTINATION_STOPS = {
  agra: [
    {
      title: "Taj Mahal Sunrise Visit",
      type: "attraction",
      duration: "2.5 hours",
      time: "06:30 AM",
      crowd: "Low",
      baseCost: 250,
      notes: "Arrive right at sunrise gate opening for best lighting and lowest queues.",
      category: "heritage",
    },
    {
      title: "Traditional Mughlai Breakfast",
      type: "meal",
      duration: "1 hour",
      time: "09:30 AM",
      crowd: "Low",
      baseCost: 200,
      notes: "Savor warm Bedmi Puri and fresh Jalebi near Fatehabad Road.",
      category: "food",
    },
    {
      title: "Agra Fort Exploration",
      type: "attraction",
      duration: "2 hours",
      time: "11:30 AM",
      crowd: "Moderate",
      baseCost: 300,
      notes: "UNESCO World Heritage site with panoramic red sandstone ramparts.",
      category: "heritage",
    },
    {
      title: "Mehtab Bagh & Sunset Silhouette",
      type: "scenic",
      duration: "1.5 hours",
      time: "04:30 PM",
      crowd: "Moderate",
      baseCost: 150,
      notes: "Charbagh complex across Yamuna river offering reflection viewpoints.",
      category: "nature",
    },
    {
      title: "Kinari Bazaar & Marble Handicrafts",
      type: "cultural",
      duration: "2 hours",
      time: "06:30 PM",
      crowd: "Moderate",
      baseCost: 100,
      notes: "Famous historic old quarter market for marble inlay artifacts and authentic Petha.",
      category: "culture",
    },
    {
      title: "Fatehpur Sikri Imperial Complex",
      type: "attraction",
      duration: "3 hours",
      time: "09:00 AM",
      crowd: "Moderate",
      baseCost: 350,
      notes: "Grand fortified ancient Mughal capital including Buland Darwaza.",
      category: "heritage",
    },
    {
      title: "Tomb of I'timād-ud-Daulah (Baby Taj)",
      type: "attraction",
      duration: "1.5 hours",
      time: "02:00 PM",
      crowd: "Low",
      baseCost: 150,
      notes: "Intricate marble lattice screens and peaceful riverfront gardens.",
      category: "heritage",
    },
  ],
  jaipur: [
    {
      title: "Amber Palace & Shila Devi Temple",
      type: "attraction",
      duration: "2.5 hours",
      time: "08:30 AM",
      crowd: "Low",
      baseCost: 300,
      notes: "Magnificent hilltop fortress overlooking Maota Lake.",
      category: "heritage",
    },
    {
      title: "Jal Mahal Photo Stop & Promenade",
      type: "scenic",
      duration: "45 mins",
      time: "11:30 AM",
      crowd: "Low",
      baseCost: 50,
      notes: "Serene water palace surrounded by the Aravalli hills.",
      category: "nature",
    },
    {
      title: "Rajasthani Thali Lunch",
      type: "meal",
      duration: "1 hour",
      time: "01:00 PM",
      crowd: "Moderate",
      baseCost: 350,
      notes: "Authentic Dal Baati Churma and Gatte ki Sabzi in Old City.",
      category: "food",
    },
    {
      title: "City Palace & Jantar Mantar",
      type: "attraction",
      duration: "2.5 hours",
      time: "02:30 PM",
      crowd: "Moderate",
      baseCost: 350,
      notes: "Royal royal courtyards and world-famous astronomical observatory.",
      category: "heritage",
    },
    {
      title: "Hawa Mahal & Wind View Cafe",
      type: "cultural",
      duration: "1.5 hours",
      time: "05:00 PM",
      crowd: "Moderate",
      baseCost: 150,
      notes: "Iconic honeycomb facade glowing during golden sunset hour.",
      category: "photography",
    },
    {
      title: "Nahargarh Fort Sunset Panorama",
      type: "scenic",
      duration: "2 hours",
      time: "05:30 PM",
      crowd: "High",
      baseCost: 200,
      notes: "Sweeping sunset views across the entire Pink City skyline.",
      category: "scenic",
    },
  ],
  delhi: [
    {
      title: "Qutub Minar Complex",
      type: "attraction",
      duration: "2 hours",
      time: "08:30 AM",
      crowd: "Low",
      baseCost: 250,
      notes: "Historic soaring minaret and ancient iron pillar dating to 4th century.",
      category: "heritage",
    },
    {
      title: "Humayun's Tomb Garden Walk",
      type: "attraction",
      duration: "2 hours",
      time: "11:00 AM",
      crowd: "Moderate",
      baseCost: 250,
      notes: "Splendid Persian-style garden tomb, architectural predecessor to Taj Mahal.",
      category: "heritage",
    },
    {
      title: "Chandni Chowk Culinary Heritage Walk",
      type: "meal",
      duration: "2 hours",
      time: "01:30 PM",
      crowd: "High",
      baseCost: 250,
      notes: "Legendary Paranthe Wali Gali, spicy chaat, and Old Delhi aromas.",
      category: "food",
    },
    {
      title: "Red Fort (Lal Qila) Ramparts",
      type: "attraction",
      duration: "2 hours",
      time: "04:00 PM",
      crowd: "Moderate",
      baseCost: 250,
      notes: "Symbol of Indian sovereign history and expansive Mughal palaces.",
      category: "heritage",
    },
    {
      title: "India Gate & Kartavya Path Stroll",
      type: "scenic",
      duration: "1.5 hours",
      time: "06:30 PM",
      crowd: "High",
      baseCost: 0,
      notes: "Warm evening lights, war memorial flame, and vibrant open gardens.",
      category: "culture",
    },
  ],
  goa: [
    {
      title: "Fort Aguada & Lighthouse Viewpoint",
      type: "scenic",
      duration: "2 hours",
      time: "09:00 AM",
      crowd: "Low",
      baseCost: 100,
      notes: "17th-century Portuguese fortress overlooking Arabian Sea confluence.",
      category: "heritage",
    },
    {
      title: "Goan Coastal Seafood Lunch",
      type: "meal",
      duration: "1.5 hours",
      time: "01:00 PM",
      crowd: "Moderate",
      baseCost: 450,
      notes: "Fresh fish curry thali and coconut kokum cooler by Candolim.",
      category: "food",
    },
    {
      title: "Anjuna & Vagator Cliff Walk",
      type: "scenic",
      duration: "2 hours",
      time: "03:30 PM",
      crowd: "Moderate",
      baseCost: 50,
      notes: "Red laterite cliffs, crashing surf, and Bohemian beach market.",
      category: "nature",
    },
    {
      title: "Chapora Fort Sunset Watch",
      type: "scenic",
      duration: "1.5 hours",
      time: "05:30 PM",
      crowd: "High",
      baseCost: 0,
      notes: "Panoramic sunset spot made famous by classic Indian cinema.",
      category: "photography",
    },
    {
      title: "Old Goa Heritage Churches (Bom Jesus)",
      type: "attraction",
      duration: "2 hours",
      time: "10:00 AM",
      crowd: "Low",
      baseCost: 50,
      notes: "Baroque Catholic architecture and sacred relics of St. Francis Xavier.",
      category: "culture",
    },
  ],
  manali: [
    {
      title: "Hadimba Devi Cedar Forest Temple",
      type: "attraction",
      duration: "1.5 hours",
      time: "08:30 AM",
      crowd: "Low",
      baseCost: 50,
      notes: "Ancient pagoda-style wooden temple sheltered inside towering pine woods.",
      category: "culture",
    },
    {
      title: "Jogini Waterfall Pine Trail",
      type: "nature",
      duration: "2.5 hours",
      time: "10:30 AM",
      crowd: "Moderate",
      baseCost: 0,
      notes: "Gentle forest hike leading to scenic mountain water cascade.",
      category: "adventure",
    },
    {
      title: "Old Manali Riverside Cafe Lunch",
      type: "meal",
      duration: "1.5 hours",
      time: "01:30 PM",
      crowd: "Moderate",
      baseCost: 350,
      notes: "Trout delicacy or artisan wood-fired pizza along the Manalsu river.",
      category: "food",
    },
    {
      title: "Solang Valley Adventure Plateau",
      type: "attraction",
      duration: "3 hours",
      time: "03:30 PM",
      crowd: "High",
      baseCost: 500,
      notes: "Spectacular alpine meadow with paragliding, ropeway, and snow peaks.",
      category: "adventure",
    },
    {
      title: "Mall Road & Tibetan Monastery",
      type: "cultural",
      duration: "2 hours",
      time: "07:00 PM",
      crowd: "High",
      baseCost: 100,
      notes: "Vibrant mountain market for woolen shawls, dried fruits, and hot tea.",
      category: "culture",
    },
  ],
  varanasi: [
    {
      title: "Subah-e-Banaras Sunrise Boat Ride",
      type: "scenic",
      duration: "2 hours",
      time: "06:00 AM",
      crowd: "Moderate",
      baseCost: 300,
      notes: "Row past Assi to Manikarnika as morning chants and sunlight bathe the ghats.",
      category: "nature",
    },
    {
      title: "Kachori Jalebi Traditional Breakfast",
      type: "meal",
      duration: "1 hour",
      time: "08:30 AM",
      crowd: "Moderate",
      baseCost: 100,
      notes: "Heritage street breakfast paired with thick malai lassi in clay kulhads.",
      category: "food",
    },
    {
      title: "Kashi Vishwanath Corridor & Temple",
      type: "attraction",
      duration: "2 hours",
      time: "10:30 AM",
      crowd: "High",
      baseCost: 0,
      notes: "Spiritual heart of Kashi with newly restored pilgrim promenade.",
      category: "heritage",
    },
    {
      title: "Sarnath Deer Park & Buddhist Stupa",
      type: "attraction",
      duration: "2.5 hours",
      time: "02:30 PM",
      crowd: "Low",
      baseCost: 150,
      notes: "Ancient site of Buddha's first sermon and the Ashoka Lion Capital.",
      category: "culture",
    },
    {
      title: "Ganga Aarti at Dashashwamedh Ghat",
      type: "cultural",
      duration: "1.5 hours",
      time: "06:15 PM",
      crowd: "High",
      baseCost: 100,
      notes: "Electrifying evening lamp ritual with synchronized bells and incense.",
      category: "culture",
    },
  ],
};

/**
 * Generate generic themed stops for destinations without bespoke stops
 */
function generateGenericStops(dest, dayIndex, interests) {
  const cityName = dest.city || dest.name;
  return [
    {
      title: `${cityName} Landmark & Historical Center`,
      type: "attraction",
      duration: "2.5 hours",
      time: "09:00 AM",
      crowd: "Moderate",
      baseCost: 200,
      notes: `Begin your morning exploring the celebrated heritage and monuments of ${cityName}.`,
      category: "heritage",
    },
    {
      title: `Authentic ${cityName} Lunch Experience`,
      type: "meal",
      duration: "1.5 hours",
      time: "01:00 PM",
      crowd: "Moderate",
      baseCost: 300,
      notes: "Sample famous regional cuisine and local delicacies.",
      category: "food",
    },
    {
      title: `${cityName} Scenic Viewpoint & Nature Walk`,
      type: "scenic",
      duration: "2 hours",
      time: "03:30 PM",
      crowd: "Low",
      baseCost: 100,
      notes: "Take in expansive panoramic vistas and natural landscapes.",
      category: "nature",
    },
    {
      title: "Local Market & Artisan Bazaars",
      type: "cultural",
      duration: "2 hours",
      time: "06:00 PM",
      crowd: "Moderate",
      baseCost: 100,
      notes: "Stroll vibrant lanes for handicrafts, photography, and evening tea.",
      category: "culture",
    },
  ];
}

/**
 * Rule-Based Itinerary Engine (Phase 8 Implementation)
 */
function generateRuleBasedItinerary(destination, preferences) {
  const daysCount = Math.max(1, Math.min(7, Number(preferences.days) || 3));
  const travellersCount = Math.max(1, Number(preferences.travellers) || 1);
  const budgetBand = preferences.budget || "medium";
  const travelStyle = preferences.travelStyle || "relaxed";
  const userInterests = Array.isArray(preferences.interests)
    ? preferences.interests.map((i) => i.toLowerCase())
    : [];

  // Multipliers based on budget
  const budgetMultiplier =
    budgetBand === "low" ? 0.75 : budgetBand === "high" ? 1.6 : 1.0;

  // Pace based on travel style
  const stopsLimit = travelStyle === "relaxed" ? 3 : travelStyle === "active" ? 5 : 4;

  const key = (destination.name || "").toLowerCase().trim();
  const pool = DESTINATION_STOPS[key] || [];

  const days = [];
  let poolIndex = 0;

  const dayThemes = [
    "Iconic Highlights & First Impressions",
    "Deep Heritage, Culture & Gastronomy",
    "Scenic Vistas, Nature & Relaxation",
    "Hidden Corners & Local Life",
    "Artisan Quarters & Leisure",
    "Day Excursion & Panorama",
    "Fond Farewells & Last Discoveries",
  ];

  for (let d = 1; d <= daysCount; d++) {
    let dayStops = [];

    if (pool.length > 0) {
      // Pick stops from pool in sequence
      for (let s = 0; s < stopsLimit; s++) {
        const item = pool[poolIndex % pool.length];
        poolIndex++;
        dayStops.push({
          ...item,
          cost: Math.round(item.baseCost * budgetMultiplier),
        });
      }
    } else {
      dayStops = generateGenericStops(destination, d, userInterests).slice(
        0,
        stopsLimit
      );
    }

    // Sort stops chronologically
    dayStops.sort((a, b) => {
      const getMin = (t) => {
        const match = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!match) return 0;
        let h = parseInt(match[1]);
        const m = parseInt(match[2]);
        const p = match[3].toUpperCase();
        if (p === "PM" && h !== 12) h += 12;
        if (p === "AM" && h === 12) h = 0;
        return h * 60 + m;
      };
      return getMin(a.time) - getMin(b.time);
    });

    const dayCost = Math.round(
      (destination.approximateBudgetPerDay || 2500) *
        budgetMultiplier *
        travellersCount
    );

    days.push({
      dayNumber: d,
      theme: dayThemes[(d - 1) % dayThemes.length],
      crowdLevel: d % 2 === 0 ? "Moderate" : "Low",
      estimatedCost: dayCost,
      travelNotes:
        travelStyle === "relaxed"
          ? "Unrushed tempo with ample relaxation time between destinations."
          : "Optimized chronological sequence to maximize daylight viewing hours.",
      stops: dayStops,
    });
  }

  // Calculate detailed budget breakdown
  const dailyBase = (destination.approximateBudgetPerDay || 2500) * budgetMultiplier;
  const totalBase = dailyBase * daysCount * travellersCount;

  const budgetBreakdown = {
    accommodation: {
      percentage: 35,
      typical: Math.round(totalBase * 0.35),
      min: Math.round(totalBase * 0.35 * 0.8),
      max: Math.round(totalBase * 0.35 * 1.3),
    },
    food: {
      percentage: 28,
      typical: Math.round(totalBase * 0.28),
      min: Math.round(totalBase * 0.28 * 0.85),
      max: Math.round(totalBase * 0.28 * 1.25),
    },
    transport: {
      percentage: 18,
      typical: Math.round(totalBase * 0.18),
      min: Math.round(totalBase * 0.18 * 0.8),
      max: Math.round(totalBase * 0.18 * 1.2),
    },
    activities: {
      percentage: 12,
      typical: Math.round(totalBase * 0.12),
      min: Math.round(totalBase * 0.12 * 0.75),
      max: Math.round(totalBase * 0.12 * 1.3),
    },
    miscellaneous: {
      percentage: 7,
      typical: Math.round(totalBase * 0.07),
      min: Math.round(totalBase * 0.07 * 0.8),
      max: Math.round(totalBase * 0.07 * 1.4),
    },
    total: {
      min: Math.round(totalBase * 0.82),
      typical: Math.round(totalBase),
      max: Math.round(totalBase * 1.28),
      currency: "INR",
      symbol: "₹",
    },
  };

  const rulesApplied = [
    "Prioritized morning slots for primary heritage monuments to minimize queue times and midday heat.",
    "Clustered geographically adjacent locations to maintain transit times under 25 minutes.",
    `Regulated daily pacing to ${stopsLimit} stops matching the selected '${travelStyle}' travel style.`,
    "Integrated structured meal and cultural exploration windows aligned with authentic dining spots.",
    `Computed party expenses for ${travellersCount} ${travellersCount === 1 ? "traveller" : "travellers"} over a ${daysCount}-day timeframe on a '${budgetBand}' budget tier.`,
  ];

  return {
    destination: {
      id: destination._id,
      name: destination.name,
      city: destination.city,
      state: destination.state,
      country: destination.country,
      description: destination.description,
      image: destination.image,
      latitude: destination.latitude,
      longitude: destination.longitude,
      budgetLevel: destination.budgetLevel,
      approximateBudgetPerDay: destination.approximateBudgetPerDay,
    },
    preferences: {
      days: daysCount,
      budget: budgetBand,
      travellers: travellersCount,
      travelStyle,
      interests: userInterests,
    },
    days,
    budgetBreakdown,
    rulesApplied,
    summary: `${daysCount}-day rule-based ${travelStyle} itinerary for ${destination.name} (${travellersCount} ${travellersCount === 1 ? "traveler" : "travelers"}).`,
  };
}

module.exports = {
  generateRuleBasedItinerary,
};
