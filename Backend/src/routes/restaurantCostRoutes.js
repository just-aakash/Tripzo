const express = require("express");

const {
  getRestaurantCost,
} = require("../controllers/restaurantCostController");

const router = express.Router();

router.get(
  "/:city",
  getRestaurantCost
);

module.exports = router;
