import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
chai.should();

describe("GET measurements", function () {
  it("Should return a message", (done) => {
    chai
      .request(app)
      .get("/sensors/123/measurements/1611356869/1611356856")
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.have.property(
          "message",
          "GET measurements from 1611356869 to 1611356856"
        );
        done();
      });
  });
});

describe("POST measurements", function () {
  it("Should return a message", (done) => {
    chai
      .request(app)
      .post("/sensors/123/measurements")
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.have.property("message", "POST measurement");
        done();
      });
  });
});
