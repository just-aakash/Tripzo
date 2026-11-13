const { getCrowdEstimation } = require("../services/crowdService");

const getCrowdByDestinationId = async (req, res) => {
  try {
    const { destinationId } = req.params;

    if (!destinationId) {
      return res.status(400).json({
        success: false,
        message: "Destination ID or name is required.",
      });
    }

    const crowd = await getCrowdEstimation(destinationId);

    return res.status(200).json({
      success: true,
      crowd,
    });
  } catch (error) {
    console.error("Get crowd estimation error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch crowd estimation.",
    });
  }
};

module.exports = {
  getCrowdByDestinationId,
};
