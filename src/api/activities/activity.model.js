import mongoose from "mongoose";

import { activityTypes } from "./activity.definitions.js";

// List of allowed activities
const ActivitySchema = new mongoose.Schema(
  {
    when: {
      type: Date,
      required: [true, "Date must be provided."],
    },
    activityType: {
      type: String,
      required: [true, "Activity type must be provided."],
      enum: activityTypes,
    },
    title: {
      type: String,
      required: [true, "Title must be provided. 3 - 50 chars"],
      minlength: 3,
      maxlength: 50,
    },
    description: String,
    duration: Number, // Duration in seconds
    distance: {
      type: Number,
      required: [true, "Distance (m) must be provided."],
    },
    pace: Number, // Avg seconds per km
    elevation: Number,
    calories: Number,
    heartRate: Number,
    cadence: Number,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export default mongoose.model("Activity", ActivitySchema);
