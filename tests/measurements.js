import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";
import { Measurement } from "../models/measurement.js";
import mongoose from "mongoose";
import { response } from "express";

chai.use(chaiHttp);
chai.should();

describe("Test measurement data", () => {
  before(async () => {
    // Start tests with empty database
    console.log("before");
    await Measurement.deleteMany({});
  });

  after(async () => {
    // Disconect after all tests
    console.log("after");
    mongoose.disconnect();
  });

  describe("POST /", () => {
    it("should save a measurement", (done) => {
      chai
        .request(app)
        .post("/measurements")
        .send({
          sensor: 7,
          temperature: 10,
          humidity: 92,
          pressure: 994,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("sensor", 7);
          done();
        });
    });
  });

  describe("GET /", () => {
    it("Should return measurements", (done) => {
      chai
        .request(app)
        .get("/measurements")
        .end((err, res) => {
          const data = res.body[0];
          res.should.have.status(200);
          res.body.should.have.length(1);
          data.should.have.property("sensor", 7);
          data.should.have.property("temperature", 10);
          done();
        });
    });
  });
});
