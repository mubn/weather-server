import { Measurement } from "../models/measurement.js";

export const getAllMeasurements = async (req, res) => {
  let measurements = await Measurement.find({});
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

export const getMeasurements = async (req, res) => {
  let dateFrom = req.params.datefrom;
  let dateTo = req.params.dateto;
  let measurements = await Measurement.find({
    date: { $gte: dateFrom, $lt: dateTo },
  });
  return res.send(measurements);
};
