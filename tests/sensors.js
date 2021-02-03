import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";
import { Measurement } from "../models/measurement.js";
import mongoose from "mongoose";

chai.use(chaiHttp);
chai.should();

describe("Test sensor data", () => {
  before(async () => {
    mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Start tests with empty database
    await Measurement.deleteMany({});

    let insert = await Measurement.insertMany([
      {
        sensor: {
          id: 7,
          position: "Basement",
        },
        temperature: 10,
        humidity: 92,
        pressure: 994,
      },
      {
        sensor: {
          id: 8,
          position: "Garden",
        },
        temperature: 5,
        humidity: 88,
        pressure: 1001,
      },
    ]);
  });

  after(async () => {
    // Cleanup after all tests
    await Measurement.deleteMany({});
    mongoose.disconnect();
  });

  describe("GET /", () => {
    it("Should return all sensors", (done) => {
      chai
        .request(app)
        .get("/sensors")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.length(2);
          done();
        });
    });
  });

  describe("DELETE /:sensorId", () => {
    it("Delete sensor", (done) => {
      chai
        .request(app)
        .delete("/sensors/7")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("deletedCount", 1);
          done();
        });
    });
  });
});
