//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();
chai.use(chaiHttp);

describe("/GET item details", () => {
  it("it should return item page", (done) => {
    chai
      .request("http://localhost:3000")
      .get("/item/:id")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("it should return error page", (done) => {
    chai
      .request("http://localhost:3000")
      .get("/item/:id")
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.text).to.not.be.null;
        if (res.text.includes("Return Main Page")) {
          expect(res.text).includes("Return Main Page");
        }
        done();
      });
  });
});