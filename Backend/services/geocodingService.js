const axios = require("axios");

const NOMINATIM_URL =
  "https://nominatim.openstreetmap.org/search";

const searchPlaces = async (query) => {
  try {
    const response = await axios.get(
      NOMINATIM_URL,
      {
        params: {
          q: query,
          format: "jsonv2",
          addressdetails: 1,
          limit: 8,
          layer: "address",
          featureType: "settlement",
        },

        headers: {
          "User-Agent":
            "TravelMate/1.0 (college tourism project)",
          "Accept-Language": "en",
        },

        timeout: 10000,
      }
    );

    return response.data || [];
  } catch (error) {
    console.error(
      "Nominatim search error:",
      error.response?.data ||
        error.message
    );

    throw new Error(
      "Unable to discover destination."
    );
  }
};

module.exports = {
  searchPlaces,
};
