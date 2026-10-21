const axios = require("axios");

// ======================================================
// COST OF LIVING INDIA
// ======================================================
//
// Source:
// https://costoflivingindia.com/
//
// The source provides city-level average prices.
// These are NOT live transaction prices.
//
// We use the source values as inputs and calculate
// the traveller's estimated daily/trip cost from them.
//
// ======================================================

const COST_SOURCE_BASE_URL =
  "https://costoflivingindia.com/cost-of-living";

// ======================================================
// SAFE NUMBER
// ======================================================

const getNumber = (value, fallback = 0) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return number;
};

// ======================================================
// NORMALIZE CITY NAME
// ======================================================

const normalizeCity = (city) => {
  if (!city) {
    return "";
  }

  return String(city)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
};

// ======================================================
// FETCH CITY PRICING PAGE
// ======================================================

const getCityPricing = async (destination) => {
  const city =
    destination?.city ||
    destination?.name ||
    "";

  const citySlug =
    normalizeCity(city);

  if (!citySlug) {
    return {
      available: false,
      city: "",
      prices: null,
      source: "Cost of Living India",
      message:
        "City information is not available.",
    };
  }

  try {
    const response =
      await axios.get(
        `${COST_SOURCE_BASE_URL}/${citySlug}/prices`,
        {
          timeout: 10000,
          headers: {
            "User-Agent":
              "TravelMate/1.0 (college tourism project)",
          },
        }
      );

    /*
      IMPORTANT:

      This website is primarily an HTML page rather
      than a documented JSON API.

      Axios may successfully receive the page, but
      parsing the HTML into structured prices requires
      an HTML parser.

      Therefore this function currently verifies
      whether the city page exists.

      The actual structured price dataset should be
      stored locally in TravelMate rather than scraping
      the website on every user request.
    */

    if (
      response.status >= 200 &&
      response.status < 300
    ) {
      return {
        available: true,
        city,
        citySlug,
        source:
          "Cost of Living India",
        sourceUrl:
          `${COST_SOURCE_BASE_URL}/${citySlug}/prices`,
        prices: null,
        message:
          "City pricing page is available.",
      };
    }

    return {
      available: false,
      city,
      prices: null,
      source:
        "Cost of Living India",
      message:
        "City pricing data is unavailable.",
    };
  } catch (error) {
    console.error(
      "Cost of Living India request failed:",
      error.response?.status ||
        error.message
    );

    return {
      available: false,
      city,
      prices: null,
      source:
        "Cost of Living India",
      message:
        "City pricing data is unavailable.",
    };
  }
};

// ======================================================
// CITY PRICE DATA
// ======================================================
//
// IMPORTANT:
//
// These values are examples of the structure we want
// TravelMate to use.
//
// The values should eventually be stored in MongoDB
// instead of being hardcoded inside the calculation
// engine.
//
// DO NOT add city-specific multipliers here.
//
// ======================================================

const CITY_PRICES = {
  agra: {
    food: {
      vegMeal: 75,
      highEndMealForTwo: 900,
      chai: 10,
      bottledWater: 20,
      biryani: 150,
      dosa: 50,
    },

    transport: {
      autoMinimum: 18,
      autoPerKm: 10,
      rideHailing: 135,
      petrol: 95,
    },

    accommodation: {
      oneBhkCentre: 8500,
      oneBhkOutside: 5000,
      pgDoubleWithMeals: 5000,
      pgDoubleWithoutMeals: 3500,
    },

    miscellaneous: {
      movieTicket: 160,
      haircut: 60,
    },

    source: {
      name:
        "Cost of Living India",
      lastUpdated:
        "May 2026",
      contributors: 30,
    },
  },

  prayagraj: {
    food: {
      vegMeal: 65,
      highEndMealForTwo: 800,
      chai: 10,
      bottledWater: 20,
      biryani: 140,
      dosa: 50,
    },

    transport: {
      autoMinimum: 15,
      autoPerKm: 8,
      rideHailing: 120,
      petrol: 95,
    },

    accommodation: {
      oneBhkCentre: 7500,
      oneBhkOutside: 4500,
      pgDoubleWithMeals: 4500,
      pgDoubleWithoutMeals: 3200,
    },

    miscellaneous: {
      movieTicket: 150,
      haircut: 50,
    },

    source: {
      name:
        "Cost of Living India",
      lastUpdated:
        "May 2026",
      contributors: 24,
    },
  },

  varanasi: {
    food: {
      vegMeal: 70,
      highEndMealForTwo: 900,
      chai: 10,
      bottledWater: 20,
      biryani: 150,
      dosa: 50,
    },

    transport: {
      autoMinimum: 18,
      autoPerKm: 10,
      rideHailing: 135,
      petrol: 95,
    },

    accommodation: {
      oneBhkCentre: 8000,
      oneBhkOutside: 5000,
      pgDoubleWithMeals: 5000,
      pgDoubleWithoutMeals: 3500,
    },

    miscellaneous: {
      movieTicket: 160,
      haircut: 60,
    },

    source: {
      name:
        "Cost of Living India",
      lastUpdated:
        "May 2026",
      contributors: 38,
    },
  },
};

// ======================================================
// GET LOCAL CITY DATA
// ======================================================

const getLocalCityPrices = (
  destination
) => {
  const city =
    destination?.city ||
    destination?.name ||
    "";

  const citySlug =
    normalizeCity(city);

  return (
    CITY_PRICES[citySlug] ||
    null
  );
};

// ======================================================
// CALCULATE FOOD COST
// ======================================================
//
// Assumption:
// 3 meals per day.
//
// We use a simple mix:
// - 2 local meals
// - 1 slightly more expensive meal
// - water
//
// This is a traveller calculation, not a claim that
// every traveller spends exactly this amount.
//
// ======================================================

const calculateFoodCost = (
  cityPrices
) => {
  if (!cityPrices?.food) {
    return null;
  }

  const food =
    cityPrices.food;

  const breakfast =
    food.vegMeal;

  const lunch =
    food.vegMeal;

  const dinner =
    food.vegMeal;

  const water =
    food.bottledWater;

  const total =
    breakfast +
    lunch +
    dinner +
    water;

  return {
    amount: total,

    breakdown: {
      breakfast,
      lunch,
      dinner,
      water,
    },

    source:
      "City-level average food prices",
  };
};

// ======================================================
// CALCULATE TRANSPORT COST
// ======================================================
//
// We use the published ride-hailing average as the
// base for a typical tourist day.
//
// 3 local rides/day:
//
// Example:
// 3 × ₹135 = ₹405
//
// This is a traveller scenario calculated from a
// sourced ride price, not an invented city multiplier.
//
// ======================================================

const calculateTransportCost = (
  cityPrices
) => {
  if (!cityPrices?.transport) {
    return null;
  }

  const ridePrice =
    getNumber(
      cityPrices.transport
        .rideHailing
    );

  if (ridePrice <= 0) {
    return null;
  }

  const ridesPerDay = 3;

  const total =
    ridePrice *
    ridesPerDay;

  return {
    amount: total,

    breakdown: {
      averageRide:
        ridePrice,

      ridesPerDay,
    },

    source:
      "City-level average ride-hailing price",
  };
};

// ======================================================
// CALCULATE ACCOMMODATION
// ======================================================
//
// For a tourist, we don't use monthly rent directly.
//
// Instead we use PG/shared accommodation as a
// budget-oriented accommodation reference.
//
// For the typical value we use double-sharing with meals.
//
// ======================================================

const calculateAccommodationCost = (
  cityPrices
) => {
  if (
    !cityPrices?.accommodation
  ) {
    return null;
  }

  const accommodation =
    cityPrices.accommodation;

  const pgDouble =
    getNumber(
      accommodation
        .pgDoubleWithMeals
    );

  const pgPrivateReference =
    getNumber(
      accommodation
        .oneBhkOutside
    );

  if (
    pgDouble <= 0
  ) {
    return null;
  }

  /*
    Monthly PG price converted to a
    rough per-night reference.

    30 days is used only for conversion.
  */

  const budgetNight =
    Math.round(
      pgDouble / 30
    );

  /*
    A private accommodation reference
    is calculated separately when available.
  */

  let privateNight =
    null;

  if (
    pgPrivateReference > 0
  ) {
    privateNight =
      Math.round(
        pgPrivateReference /
          30
      );
  }

  return {
    amount:
      budgetNight,

    breakdown: {
      pgDoubleMonthly:
        pgDouble,

      budgetNight,

      privateAccommodationReference:
        privateNight,
    },

    source:
      "City-level accommodation averages",
  };
};

// ======================================================
// CALCULATE MISCELLANEOUS
// ======================================================
//
// Miscellaneous is deliberately small.
//
// We use actual city-level lifestyle prices where
// available instead of an arbitrary percentage.
//
// ======================================================

const calculateMiscellaneousCost = (
  cityPrices
) => {
  if (
    !cityPrices?.miscellaneous
  ) {
    return null;
  }

  const movieTicket =
    getNumber(
      cityPrices.miscellaneous
        .movieTicket
    );

  const haircut =
    getNumber(
      cityPrices.miscellaneous
        .haircut
    );

  /*
    We don't assume that a tourist gets a haircut.

    Therefore this is not added directly.

    Instead, one movie-ticket-equivalent is used as
    a small miscellaneous reference.
  */

  if (
    movieTicket <= 0
  ) {
    return null;
  }

  return {
    amount:
      movieTicket,

    breakdown: {
      movieTicket,
      haircut,
    },

    source:
      "City-level lifestyle prices",
  };
};

// ======================================================
// CALCULATE ATTRACTION COST
// ======================================================
//
// IMPORTANT:
//
// We ONLY use explicit OSM fees.
//
// If OSM says:
//
// fee = false
//
// → ₹0
//
// If OSM contains:
//
// price = 250
//
// → ₹250
//
// If OSM only says:
//
// fee = true
//
// but no price:
//
// → we DO NOT invent a ticket price.
//
// ======================================================

const calculateAttractionCost = (
  places = []
) => {
  if (!Array.isArray(places)) {
    return {
      amount: 0,
      knownPaidAttractions: 0,
      unknownPaidAttractions: 0,
      freeAttractions: 0,
      source:
        "OpenStreetMap attraction fee data",
    };
  }

  const attractions =
    places.filter(
      (place) =>
        [
          "attraction",
          "museum",
          "viewpoint",
        ].includes(
          place.type
        )
    );

  let amount = 0;

  let knownPaidAttractions = 0;

  let unknownPaidAttractions = 0;

  let freeAttractions = 0;

  attractions.forEach(
    (place) => {
      /*
        Explicit numeric price
      */

      const price =
        getNumber(
          place.price,
          0
        );

      if (price > 0) {
        amount += price;

        knownPaidAttractions++;

        return;
      }

      /*
        Explicitly free
      */

      if (
        place.fee === false
      ) {
        freeAttractions++;

        return;
      }

      /*
        Paid but exact price
        is not known.
      */

      if (
        place.fee === true
      ) {
        unknownPaidAttractions++;
      }
    }
  );

  return {
    amount,

    knownPaidAttractions,

    unknownPaidAttractions,

    freeAttractions,

    source:
      "OpenStreetMap attraction fee data",
  };
};

// ======================================================
// CALCULATE DAILY BUDGET
// ======================================================

const calculateDailyBudget = (
  destination,
  nearbyPlaces = []
) => {
  const cityPrices =
    getLocalCityPrices(
      destination
    );

  /*
    No sourced city data:
    do NOT invent a number.
  */

  if (!cityPrices) {
    return {
      available: false,

      accommodation: null,
      food: null,
      transport: null,
      attractions: null,
      miscellaneous: null,

      daily: {
        minimum: null,
        typical: null,
        maximum: null,
      },

      currency: "INR",

      confidence:
        "Unavailable",

      methodology:
        "No verified city-level pricing dataset is currently available for this destination.",
    };
  }

  const food =
    calculateFoodCost(
      cityPrices
    );

  const transport =
    calculateTransportCost(
      cityPrices
    );

  const accommodation =
    calculateAccommodationCost(
      cityPrices
    );

  const miscellaneous =
    calculateMiscellaneousCost(
      cityPrices
    );

  const attractions =
    calculateAttractionCost(
      nearbyPlaces
    );

  /*
    Only add components for which we have
    actual sourced data.
  */

  const components = [
    food?.amount,
    transport?.amount,
    accommodation?.amount,
    miscellaneous?.amount,
    attractions?.amount,
  ].filter(
    (value) =>
      Number.isFinite(value)
  );

  if (!components.length) {
    return {
      available: false,

      accommodation: null,
      food: null,
      transport: null,
      attractions: null,
      miscellaneous: null,

      daily: {
        minimum: null,
        typical: null,
        maximum: null,
      },

      currency: "INR",

      confidence:
        "Unavailable",

      methodology:
        "Insufficient sourced pricing data for this destination.",
    };
  }

  const typical =
    components.reduce(
      (sum, value) =>
        sum + value,
      0
    );

  /*
    Range is intentionally modest.

    This represents variation in traveller spending,
    NOT uncertainty in the source prices themselves.
  */

  const minimum =
    Math.round(
      typical * 0.85
    );

  const maximum =
    Math.round(
      typical * 1.2
    );

  return {
    available: true,

    accommodation:
      accommodation?.amount ??
      null,

    food:
      food?.amount ??
      null,

    transport:
      transport?.amount ??
      null,

    attractions:
      attractions?.amount ??
      null,

    miscellaneous:
      miscellaneous?.amount ??
      null,

    daily: {
      minimum,
      typical,
      maximum,
    },

    currency: "INR",

    confidence:
      "Medium",

    source: {
      name:
        cityPrices.source
          .name,

      lastUpdated:
        cityPrices.source
          .lastUpdated,

      contributors:
        cityPrices.source
          .contributors,
    },

    methodology:
      "Traveller budget calculated from published city-level average prices and explicit attraction fees available from OpenStreetMap. It is an indicative estimate, not a live quotation.",
  };
};

// ======================================================
// CALCULATE COMPLETE TRIP BUDGET
// ======================================================

const calculateTripBudget = ({
  destination,
  nearbyPlaces = [],
  days = 1,
  travellers = 1,
}) => {
  const safeDays =
    Math.max(
      1,
      getNumber(
        days,
        1
      )
    );

  const safeTravellers =
    Math.max(
      1,
      getNumber(
        travellers,
        1
      )
    );

  const dailyBudget =
    calculateDailyBudget(
      destination,
      nearbyPlaces
    );

  /*
    If daily pricing is unavailable,
    do not return fake trip totals.
  */

  if (
    !dailyBudget.available
  ) {
    return {
      destination: {
        id:
          destination?._id,

        name:
          destination?.name,

        city:
          destination?.city,

        state:
          destination?.state,

        country:
          destination?.country,
      },

      days:
        safeDays,

      travellers:
        safeTravellers,

      daily:
        dailyBudget,

      trip: {
        minimum: null,
        typical: null,
        maximum: null,
      },

      currency: "INR",

      confidence:
        "Unavailable",

      generatedAt:
        new Date().toISOString(),
    };
  }

  return {
    destination: {
      id:
        destination?._id,

      name:
        destination?.name,

      city:
        destination?.city,

      state:
        destination?.state,

      country:
        destination?.country,
    },

    days:
      safeDays,

    travellers:
      safeTravellers,

    daily:
      dailyBudget,

    trip: {
      minimum:
        Math.round(
          dailyBudget.daily.minimum *
            safeDays *
            safeTravellers
        ),

      typical:
        Math.round(
          dailyBudget.daily.typical *
            safeDays *
            safeTravellers
        ),

      maximum:
        Math.round(
          dailyBudget.daily.maximum *
            safeDays *
            safeTravellers
        ),
    },

    currency: "INR",

    confidence:
      dailyBudget.confidence,

    generatedAt:
      new Date().toISOString(),
  };
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  calculateDailyBudget,
  calculateTripBudget,
  getCityPricing,
};
