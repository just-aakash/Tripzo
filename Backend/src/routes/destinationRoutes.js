const express = require("express");

const {
  searchDestinations,
  getAllDestinations,
  getDestinationById,
  discoverDestination,
} = require("../controllers/destinationController");

const router = express.Router();

router.get(
  "/search",
  searchDestinations
);

router.get(
  "/discover",
  discoverDestination
);

router.get(
  "/",
  getAllDestinations
);

router.get(
  "/:id",
  getDestinationById
);

module.exports = router;
