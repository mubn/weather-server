import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
chai.should();

describe("GET /sensors", function () {
  it("Should return a message", (done) => {
    chai
      .request(app)
      .get("/sensors")
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.have.property("message", "GET sensors");
        done();
      });
  });
});

describe("POST /sensors", function () {
  it("Should return a message", (done) => {
    chai
      .request(app)
      .post("/sensors")
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.have.property("message", "POST sensors");
        done();
      });
  });
});

describe("PUT /sensors", function () {
  it("Should return a message", (done) => {
    chai
      .request(app)
      .put("/sensors/123")
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.have.property("message", "PUT sensors 123");
        done();
      });
  });
});

describe("DELETE /sensors", function () {
  it("Should return a message", (done) => {
    chai
      .request(app)
      .delete("/sensors/123")
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.have.property("message", "DELETE sensors 123");
        done();
      });
  });
});
