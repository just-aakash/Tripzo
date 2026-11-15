const Destination = require("../models/Destination");
const {
  generateRuleBasedItinerary,
} = require("../services/itineraryService");

const generatePlan = async (req, res) => {
  try {
    const {
      destinationId,
      days,
      budget,
      travellers,
      travelStyle,
      interests,
    } = req.body;

    // Validate required fields
    if (
      !destinationId ||
      !days ||
      !budget ||
      !travellers ||
      !travelStyle
    ) {
      return res.status(400).json({
        success: false,
        message: "All planning details are required.",
      });
    }

    // Find destination in MongoDB
    const destination =
      await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found.",
      });
    }

    // Make sure interests is always an array
    const selectedInterests = Array.isArray(interests)
      ? interests
      : [];

    // Generate rule-based itinerary (Phase 8)
    const plan = generateRuleBasedItinerary(destination, {
      days,
      budget,
      travellers,
      travelStyle,
      interests: selectedInterests,
    });

    plan.message =
      "Your rule-based itinerary has been successfully generated based on travel preferences and timing constraints.";

    return res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error(
      "Generate plan error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to generate travel plan.",
    });
  }
};

module.exports = {
  generatePlan,
};
