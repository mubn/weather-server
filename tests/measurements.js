import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
chai.should();

describe("GET all measurements", () => {
  it("Should return measurements", (done) => {
    chai
      .request(app)
      .get("/measurements")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("POST /", () => {
  it("should save a measurement", (done) => {
    chai
      .request(app)
      .post("/measurements")
      .send({
        sensor: "7",
        temperature: "10",
        humidity: "92",
        pressure: "994",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("sensor", 7);
        done();
      });
  });
});
