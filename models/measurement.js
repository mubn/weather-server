import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema({
  sensor: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
  },
  humidity: {
    type: Number,
  },
  pressure: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Measurement = mongoose.model("Measurement", measurementSchema);
