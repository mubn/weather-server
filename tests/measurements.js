import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";
import { Measurement } from "../models/measurement.js";
import mongoose from "mongoose";

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
    it("Should save a measurement", (done) => {
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
          res.body.should.have.property("temperature", 10);
          done();
        });
    });
  });

  describe("GET /", () => {
    it("Should return all measurements", (done) => {
      chai
        .request(app)
        .get("/measurements")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.length(1);
          let data = res.body[0];
          data.should.have.property("sensor", 7);
          data.should.have.property("temperature", 10);
          done();
        });
    });
  });

  describe("GET /:datefrom/:dateto", () => {
    it("Should return some measurements if exist date interval", (done) => {
      let dateto = Date.now();
      // The last day
      let datefrom = dateto - 24 * 60 * 60 * 1000;
      chai
        .request(app)
        .get("/measurements/" + datefrom + "/" + dateto)
        .end((err, res) => {
          res.should.have.status(200);
          let data = res.body[0];
          data.should.have.property("sensor", 7);
          data.should.have.property("temperature", 10);
          done();
        });
    });
  });
});
