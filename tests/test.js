import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
chai.should();

describe("GET /", function () {
  it("Should return a message", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.have.property("message");
        done();
      });
  });
});
