import { Measurement } from "../models/measurement.js";

export const getAllMeasurements = async (req, res) => {
  const measurements = await Measurement.find({});
  return res.send(measurements);
};

export const addMeasurement = async (req, res) => {
  let measurement = new Measurement({
    sensor: req.body.sensor,
    temperature: req.body.temperature,
    humidity: req.body.humidity,
    pressure: req.body.pressure,
  });
  await measurement.save();
  return res.send(measurement);
};
