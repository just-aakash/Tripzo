const Destination = require("../models/Destination");

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

    // Basic planning response for now
    const plan = {
      destination: {
        id: destination._id,
        name: destination.name,
        city: destination.city,
        state: destination.state,
        country: destination.country,
        description: destination.description,
        image: destination.image,
        latitude: destination.latitude,
        longitude: destination.longitude,
      },

      preferences: {
        days: Number(days),
        budget,
        travellers: Number(travellers),
        travelStyle,
        interests: selectedInterests,
      },

      message:
        "Planning data received successfully. AI itinerary generation will be connected next.",
    };

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
