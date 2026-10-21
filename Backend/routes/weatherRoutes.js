const express = require("express");

const {
  getWeather,
  getForecast,
} = require("../controllers/weatherController");

const router = express.Router();

router.get(
  "/:latitude/:longitude",
  getWeather
);

router.get(
  "/forecast/:latitude/:longitude",
  getForecast
);

module.exports = router;
