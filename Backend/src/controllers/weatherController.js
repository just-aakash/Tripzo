const {
  getWeatherByCoordinates,
  getForecastByCoordinates,
} = require("../services/weatherService");

const getWeather = async (req, res) => {
  try {
    const { latitude, longitude } = req.params;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required.",
      });
    }

    const weather = await getWeatherByCoordinates(
      latitude,
      longitude
    );

    res.json({
      success: true,
      weather,
    });
  } catch (error) {
    console.error("Weather controller error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch weather information.",
    });
  }
};

const getForecast = async (req, res) => {
  try {
    const { latitude, longitude } = req.params;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message:
          "Latitude and longitude are required.",
      });
    }

    const forecast =
      await getForecastByCoordinates(
        latitude,
        longitude
      );

    res.json({
      success: true,
      forecast,
    });
  } catch (error) {
    console.error(
      "Forecast controller error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to fetch forecast information.",
    });
  }
};

module.exports = {
  getWeather,
  getForecast,
};
