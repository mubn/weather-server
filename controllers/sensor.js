import { Measurement } from "../models/measurement.js";

export const getAllSensors = async (req, res) => {
  let sensors = await Measurement.distinct("sensor");
  return res.send(sensors);
};

export const deleteSensor = async (req, res) => {
  let sensor = await Measurement.deleteMany({
    "sensor.id": req.params.sensorId,
  });

  return res.send(sensor);
};
