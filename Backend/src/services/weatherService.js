const axios = require("axios");

const getWeatherByCoordinates = async (latitude, longitude) => {
  try {
    console.log(
      "OpenWeather key loaded:",
      process.env.OPENWEATHER_API_KEY
        ? `YES (${process.env.OPENWEATHER_API_KEY.length} characters)`
        : "NO"
    );

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: latitude,
          lon: longitude,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Weather API error:",
      error.response?.data || error.message
    );

    throw new Error("Unable to fetch weather data");
  }
};

const getForecastByCoordinates = async (
  latitude,
  longitude
) => {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat: latitude,
          lon: longitude,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Forecast API error:",
      error.response?.data || error.message
    );

    throw new Error(
      "Unable to fetch forecast data"
    );
  }
};

module.exports = {
  getWeatherByCoordinates,
  getForecastByCoordinates
};
