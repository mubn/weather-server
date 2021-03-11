import { Measurement } from "../models/measurement.js";

export const getAllSensors = async (req, res) => {
  try {
    let sensors = await Measurement.distinct("sensor");
    return res.send(sensors);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: false,
      error: { code: 1001, name: "An error occured" },
    });
  }
};

export const deleteSensor = async (req, res) => {
  try {
    let sensor = await Measurement.deleteMany({
      "sensor.id": req.params.sensorId,
    });
    return res.send(sensor);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: false,
      error: { code: 1001, name: "An error occured" },
    });
  }
};
