const express = require("express");

const {
  getNearbyPlacesController,
} = require("../controllers/placesController");

const router = express.Router();

router.get(
  "/nearby/:latitude/:longitude",
  getNearbyPlacesController
);

module.exports = router;
