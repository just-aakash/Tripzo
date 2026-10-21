const express = require("express");

const {
  getDestinationCost,
} = require("../controllers/costController");

const router = express.Router();

router.get(
  "/:destinationId",
  getDestinationCost
);

module.exports = router;
