//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();
chai.use(chaiHttp);

describe("/POST User", () => {
  it("it should POST a user", (done) => {
    let userData = {
      secretKey: process.env.secretKey,
      name: "Mert",
      email: "mert12sdfsdf@gmail.com",
      password: "pass123",
    };
    chai
      .request("http://localhost:3000")
      .post("/auth/signup")
      .set("content-type", "application/x-www-form-urlencoded")
      .type("form")
      .send(userData)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  //if email exist, return error
  it("it should return error page", (done) => {
    let userData = {
      secretKey: process.env.secretKey,
      name: "Batuhan Ege Şahin",
      email: "batuhanegesahin@gmail.com",
      password: "111111",
    };
    chai
      .request("http://localhost:3000")
      .post("/auth/signup")
      .set("content-type", "application/x-www-form-urlencoded")
      .type("form")
      .send(userData)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
