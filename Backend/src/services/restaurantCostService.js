const axios = require("axios");

const WIB_BASE_URL =
  "https://wibest.in/data/api/restaurants";

const normalizeCity = (city) => {
  if (!city) {
    return "";
  }

  return String(city)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
};

const getRestaurantData = async (city) => {
  const citySlug = normalizeCity(city);

  if (!citySlug) {
    return {
      available: false,
      restaurants: [],
      message: "City is required.",
    };
  }

  try {
    const response = await axios.get(
      `${WIB_BASE_URL}/${citySlug}.json`,
      {
        timeout: 10000,
      }
    );

    const data = response.data;

    return {
      available: true,
      city: data.city || city,
      count: data.count || 0,
      restaurants: data.data || [],
      source: data.source || "WIB Open Data",
      license: data.license || "CC-BY-4.0",
    };
  } catch (error) {
    console.error(
      "WIB restaurant data error:",
      error.response?.status ||
        error.message
    );

    return {
      available: false,
      restaurants: [],
      message:
        "Restaurant pricing data is not available for this city.",
    };
  }
};

const calculateFoodRange = (
  restaurants = []
) => {
  if (!restaurants.length) {
    return {
      available: false,
      minimum: null,
      maximum: null,
      typical: null,
      currency: "INR",
    };
  }

  const tiers = restaurants
    .map(
      (restaurant) =>
        restaurant.budget_tier
    )
    .filter(Boolean);

  if (!tiers.length) {
    return {
      available: false,
      minimum: null,
      maximum: null,
      typical: null,
      currency: "INR",
    };
  }

  let minimum = 500;
  let maximum = 2000;

  if (
    tiers.includes("under_500")
  ) {
    minimum = 500;
  }

  if (
    tiers.includes("above_2000")
  ) {
    maximum = 2500;
  }

  let typical;

  if (
    tiers.includes("500_to_2000")
  ) {
    typical = 1250;
  } else if (
    tiers.includes("under_500")
  ) {
    typical = 500;
  } else {
    typical = 2000;
  }

  return {
    available: true,
    minimum,
    typical,
    maximum,
    currency: "INR",
    restaurantsAnalyzed:
      restaurants.length,
  };
};

module.exports = {
  getRestaurantData,
  calculateFoodRange,
};
