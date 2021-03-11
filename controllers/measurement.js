import { Measurement } from "../models/measurement.js";

export const getAllMeasurements = async (req, res) => {
  try {
    let measurements = await Measurement.find({});
    return res.send(measurements);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: false,
      error: { code: 1001, name: "An error occured" },
    });
  }
};

export const addMeasurement = async (req, res) => {
  try {
    let measurement = new Measurement({
      sensor: req.body.sensor,
      temperature: req.body.temperature,
      humidity: req.body.humidity,
      pressure: req.body.pressure,
    });
    await measurement.save();
    return res.send(measurement);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: false,
      error: { code: 1001, name: "An error occured" },
    });
  }
};

export const getMeasurements = async (req, res) => {
  let dateFrom = req.params.datefrom;
  let dateTo = req.params.dateto;

  if (dateFrom <= 1600000000000 || dateFrom > 1900000000000) {
    return res.status(400).send({
      status: false,
      error: { code: 1010, name: "Invalid date 'from'" },
    });
  } else if (dateTo <= 1600000000000 || dateTo > 1900000000000) {
    return res.status(400).send({
      status: false,
      error: { code: 1011, name: "Invalid date 'to'" },
    });
  } else if (dateTo < dateFrom) {
    return res.status(400).send({
      status: false,
      error: {
        code: 1012,
        name: "Invalid date. Date 'from' must be < than 'to'",
      },
    });
  }
  try {
    let measurements = await Measurement.find({
      date: { $gte: dateFrom, $lt: dateTo },
    });
    return res.send(measurements);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: false,
      error: { code: 1001, name: "An error occured" },
    });
  }
};
