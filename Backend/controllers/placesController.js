const {
  getNearbyPlaces,
} = require("../services/placesService");


// ==========================================
// GET NEARBY PLACES
// ==========================================

const getNearbyPlacesController = async (
  req,
  res
) => {
  try {
    const {
      latitude,
      longitude,
    } = req.params;

    const radius =
      Number(req.query.radius) || 5000;

    // --------------------------------------
    // Validate coordinates
    // --------------------------------------

    if (
      !latitude ||
      !longitude ||
      Number.isNaN(Number(latitude)) ||
      Number.isNaN(Number(longitude))
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Valid latitude and longitude are required.",
      });
    }

    // --------------------------------------
    // Get nearby places
    // --------------------------------------

    const places =
      await getNearbyPlaces(
        Number(latitude),
        Number(longitude),
        radius
      );

    // --------------------------------------
    // Group by category
    // --------------------------------------

    const grouped = {
      hospitals: [],
      pharmacies: [],
      atms: [],
      restaurants: [],
      parking: [],
      police: [],
      attractions: [],
      museums: [],
      viewpoints: [],
    };

    places.forEach((place) => {
      switch (place.type) {
        case "hospital":
          grouped.hospitals.push(place);
          break;

        case "pharmacy":
          grouped.pharmacies.push(place);
          break;

        case "atm":
          grouped.atms.push(place);
          break;

        case "restaurant":
          grouped.restaurants.push(place);
          break;

        case "parking":
          grouped.parking.push(place);
          break;

        case "police":
          grouped.police.push(place);
          break;

        case "attraction":
          grouped.attractions.push(place);
          break;

        case "museum":
          grouped.museums.push(place);
          break;

        case "viewpoint":
          grouped.viewpoints.push(place);
          break;

        default:
          break;
      }
    });

    res.json({
      success: true,

      count: places.length,

      radius,

      places,

      grouped,
    });
  } catch (error) {
    console.error(
      "Nearby places controller error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch nearby places.",
    });
  }
};


module.exports = {
  getNearbyPlacesController,
};
