const express = require("express");
const {
  getCrowdByDestinationId,
} = require("../controllers/crowdController");

const router = express.Router();

router.get("/:destinationId", getCrowdByDestinationId);

module.exports = router;
