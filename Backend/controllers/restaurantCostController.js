const {
  getRestaurantData,
  calculateFoodRange,
} = require("../services/restaurantCostService");

// ==========================================
// GET RESTAURANT COST FOR A CITY
// ==========================================

const getRestaurantCost = async (req, res) => {
  try {
    const { city } = req.params;

    // Make sure city was provided
    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City is required.",
      });
    }

    // Get restaurant data from WIB
    const restaurantData =
      await getRestaurantData(city);

    // If no real data is available
    if (!restaurantData.available) {
      return res.status(404).json({
        success: false,
        message:
          restaurantData.message ||
          "Restaurant pricing data is not available for this city.",
      });
    }

    // Calculate the actual food price range
    const foodRange =
      calculateFoodRange(
        restaurantData.restaurants
      );

    return res.status(200).json({
      success: true,

      city:
        restaurantData.city,

      food: foodRange,

      dataSource: {
        name: "WIB Open Data",
        license: "CC-BY-4.0",
      },
    });
  } catch (error) {
    console.error(
      "Restaurant cost error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to calculate restaurant cost.",
    });
  }
};

module.exports = {
  getRestaurantCost,
};
