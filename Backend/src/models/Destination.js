const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },

    categories: [
      {
        type: String,
        trim: true,
      },
    ],

    budgetLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    approximateBudgetPerDay: {
      type: Number,
      default: 0,
    },

    crowdPreference: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    latitude: {
      type: Number,
    },

    longitude: {
      type: Number,
    },

    popular: {
      type: Boolean,
      default: false,
    },

    // New fields
    source: {
      type: String,
      enum: ["travelmate", "openstreetmap"],
      default: "travelmate",
    },

    osmType: {
      type: String,
      trim: true,
    },

    osmId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "Destination",
    destinationSchema
  );
