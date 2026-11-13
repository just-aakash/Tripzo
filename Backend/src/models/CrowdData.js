const mongoose = require("mongoose");

const crowdDataSchema = new mongoose.Schema(
  {
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
      index: true,
    },
    destinationName: {
      type: String,
      required: true,
      trim: true,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    dayType: {
      type: String,
      enum: ["weekday", "weekend", "holiday"],
      required: true,
    },
    hourSlot: {
      type: Number,
      required: true,
      min: 0,
      max: 23,
    },
    observedVisitorIndex: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    dataSource: {
      type: String,
      default: "Historical sample & tourism observations",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for querying crowd by destination, month and dayType
crowdDataSchema.index({ destinationId: 1, month: 1, dayType: 1 });

module.exports = mongoose.model("CrowdData", crowdDataSchema);
