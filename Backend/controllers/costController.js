const Destination = require("../models/Destination");

const {
  calculateTripBudget,
} = require("../services/costService");

const {
  getRestaurantData,
  calculateFoodRange,
} = require("../services/restaurantCostService");

const axios = require("axios");

// ======================================================
// GET NEARBY PLACES
// ======================================================

const getNearbyPlaces = async (
  latitude,
  longitude
) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/places/nearby/${latitude}/${longitude}?radius=5000`
    );

    return response.data?.places || [];
  } catch (error) {
    console.error(
      "Nearby places request failed:",
      error.message
    );

    return [];
  }
};

// ======================================================
// GET DESTINATION COST
// GET /api/costs/:destinationId
// ======================================================

const getDestinationCost = async (
  req,
  res
) => {
  try {
    const { destinationId } =
      req.params;

    // ==================================================
    // 1. FIND DESTINATION
    // ==================================================

    const destination =
      await Destination.findById(
        destinationId
      );

    if (!destination) {
      return res.status(404).json({
        success: false,
        message:
          "Destination not found.",
      });
    }

    // ==================================================
    // 2. VALIDATE COORDINATES
    // ==================================================

    if (
      destination.latitude ===
        undefined ||
      destination.latitude === null ||
      destination.longitude ===
        undefined ||
      destination.longitude === null
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Destination does not have valid coordinates.",
      });
    }

    // ==================================================
    // 3. GET NEARBY OSM PLACES
    // ==================================================

    const nearbyPlaces =
      await getNearbyPlaces(
        destination.latitude,
        destination.longitude
      );

    console.log(
      `Cost calculation for ${destination.name}`
    );

    console.log(
      `Nearby places found: ${nearbyPlaces.length}`
    );

    // ==================================================
    // 4. GET REAL RESTAURANT DATA
    // ==================================================

    const city =
      destination.city ||
      destination.name;

    const restaurantData =
      await getRestaurantData(city);

    let foodRange = {
      available: false,
      minimum: null,
      typical: null,
      maximum: null,
      currency: "INR",
      restaurantsAnalyzed: 0,
    };

    if (
      restaurantData.available
    ) {
      foodRange =
        calculateFoodRange(
          restaurantData.restaurants
        );
    }

    // ==================================================
    // 5. CALCULATE EXISTING TRIP BUDGET
    // ==================================================

    const budget =
      calculateTripBudget({
        destination,
        nearbyPlaces,
        days:
          req.query.days || 1,
        travellers:
          req.query.travellers || 1,
      });

    // ==================================================
    // 6. REPLACE ESTIMATED FOOD COST
    //    WITH REAL RESTAURANT DATA
    // ==================================================

    if (foodRange.available) {
      const days = Math.max(
        1,
        Number(req.query.days) || 1
      );

      const travellers =
        Math.max(
          1,
          Number(
            req.query.travellers
          ) || 1
        );

      const minimumFood =
        foodRange.minimum *
        days *
        travellers;

      const typicalFood =
        foodRange.typical *
        days *
        travellers;

      const maximumFood =
        foodRange.maximum *
        days *
        travellers;

      // ----------------------------------------------
      // Update daily food values
      // ----------------------------------------------

      budget.daily.minimum =
        Math.round(
          budget.daily.minimum -
            budget.food +
            foodRange.minimum
        );

      budget.daily.typical =
        Math.round(
          budget.daily.typical -
            budget.food +
            foodRange.typical
        );

      budget.daily.maximum =
        Math.round(
          budget.daily.maximum -
            budget.food +
            foodRange.maximum
        );

      // ----------------------------------------------
      // Update food component
      // ----------------------------------------------

      budget.food = {
        minimum:
          foodRange.minimum,

        typical:
          foodRange.typical,

        maximum:
          foodRange.maximum,

        currency:
          foodRange.currency,

        restaurantsAnalyzed:
          foodRange.restaurantsAnalyzed,

        source:
          "WIB Open Data",
      };

      // ----------------------------------------------
      // Update complete trip food cost
      // ----------------------------------------------

      budget.trip.food = {
        minimum:
          minimumFood,

        typical:
          typicalFood,

        maximum:
          maximumFood,

        currency:
          foodRange.currency,
      };

      // ----------------------------------------------
      // Recalculate total trip budget
      // ----------------------------------------------

      const existingTrip =
        budget.trip;

      budget.trip.minimum =
        Math.round(
          budget.trip.minimum -
            budget.trip.minimumFood ||
            0
        );

      budget.trip.typical =
        Math.round(
          budget.trip.typical -
            budget.trip.typicalFood ||
            0
        );

      budget.trip.maximum =
        Math.round(
          budget.trip.maximum -
            budget.trip.maximumFood ||
            0
        );

      // Rebuild trip totals from
      // the daily budget.

      budget.trip.minimum =
        Math.round(
          budget.daily.minimum *
            days *
            travellers
        );

      budget.trip.typical =
        Math.round(
          budget.daily.typical *
            days *
            travellers
        );

      budget.trip.maximum =
        Math.round(
          budget.daily.maximum *
            days *
            travellers
        );

      delete budget.trip.minimumFood;
      delete budget.trip.typicalFood;
      delete budget.trip.maximumFood;
    }

    // ==================================================
    // 7. RESPONSE
    // ==================================================

    return res.status(200).json({
      success: true,

      destination: {
        id: destination._id,

        name:
          destination.name,

        city:
          destination.city,

        state:
          destination.state,

        country:
          destination.country,

        latitude:
          destination.latitude,

        longitude:
          destination.longitude,
      },

      budget,

      pricingData: {
        food: {
          available:
            foodRange.available,

          minimum:
            foodRange.minimum,

          typical:
            foodRange.typical,

          maximum:
            foodRange.maximum,

          currency:
            foodRange.currency,

          restaurantsAnalyzed:
            foodRange.restaurantsAnalyzed,

          source:
            foodRange.available
              ? "WIB Open Data"
              : null,
        },
      },

      dataSources: {
        destination:
          "TravelMate destination data",

        nearbyPlaces:
          "OpenStreetMap geographic data",

        food:
          foodRange.available
            ? "WIB Open Data"
            : "Unavailable for this city",

        calculation:
          "TravelMate Cost Engine",
      },
    });
  } catch (error) {
    console.error(
      "Destination cost error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to calculate destination cost.",
    });
  }
};

module.exports = {
  getDestinationCost,
};
