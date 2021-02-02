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
    await Measurement.deleteMany({});
  });

  after(async () => {
    // Disconect after all tests
    await Measurement.deleteMany({});
  });

  describe("POST /", () => {
    it("Should save a measurement", (done) => {
      chai
        .request(app)
        .post("/measurements")
        .send({
          sensor: {
            id: 7,
            position: "Basement",
          },
          temperature: 10,
          humidity: 92,
          pressure: 994,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.nested.property("sensor.id", 7);
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
          data.should.have.nested.property("sensor.id", 7);
          data.should.have.property("temperature", 10);
          done();
        });
    });
  });

  describe("GET /:datefrom/:dateto", () => {
    it("Should return some measurements if exist in date interval", (done) => {
      let dateto = Date.now();
      // The last 24h
      let datefrom = dateto - 24 * 60 * 60 * 1000;
      chai
        .request(app)
        .get("/measurements/" + datefrom + "/" + dateto)
        .end((err, res) => {
          res.should.have.status(200);
          let data = res.body[0];
          data.should.have.nested.property("sensor.id", 7);
          data.should.have.property("temperature", 10);
          done();
        });
    });

    it("Should return empty body if no results in date interval", (done) => {
      let dateto = Date.now() - 24 * 60 * 60 * 1000;
      let datefrom = dateto - 24 * 60 * 60 * 1000 * 2;
      chai
        .request(app)
        .get("/measurements/" + datefrom + "/" + dateto)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.length(0);
          done();
        });
    });

    it("Should return an error if timestamp wrong", (done) => {
      let dateto = 1910000000000;
      let datefrom = 1590000000000;
      chai
        .request(app)
        .get("/measurements/" + datefrom + "/" + dateto)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.nested.property("error.code", 1010);
          done();
        });
    });

    it("Should return an error if timestamp wrong", (done) => {
      let dateto = 1910000000000;
      let datefrom = 1590000000000;
      chai
        .request(app)
        .get("/measurements/" + datefrom + "/" + dateto)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.nested.property("error.code", 1010);
          done();
        });
    });

    it("Should return an error if timestamp mismatch", (done) => {
      let dateto = 1600000000001;
      let datefrom = 1800000000000;
      chai
        .request(app)
        .get("/measurements/" + datefrom + "/" + dateto)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.nested.property("error.code", 1012);
          done();
        });
    });
  });
});
