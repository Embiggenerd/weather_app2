process.env.NODE_ENV = "test";

const request = require("request-promise");
import "mocha";
import * as chai from "chai";
const should = chai.should();
import chaiHttp = require("chai-http");
chai.use(chaiHttp);

import App from "../../src/App";
import { ResponseWithUser, ResponseFromUser } from "../../src/types";
describe("Web API Routes", () => {
  // let token: String;

  // before("get token from users", done => {
  //   const options = {
  //     method: "POST",
  //     uri: "http://users-service:3000/users/login",
  //     json: true,
  //     body: {
  //       username: "john",
  //       password: "lala"
  //     }
  //   };

  //   request(options)
  //     .then((res: ResponseFromUser) => {
  //       token = res.token;
  //       done();
  //     })
  //     .catch((err: Error) => {
  //       console.log("usersResErr:", err);
  //     });
  // });

  describe("GET /ping", () => {
    it("Returns a pong", done => {
      chai
        .request(App)
        .get("/ping")
        .end((err, res) => {
          res.type.should.eql("text/html");
          res.text.should.eql("pong");
          done();
        });
    });
  });

  describe("GET /", () => {
    const agent = chai.request.agent(App);

    it("Tells unauthorized user to log in", done => {
      agent.get("/").end((err, res) => {
        res.type.should.eql("text/html");
        res.text.should.contain('action="/login"');
        done();
      });
    });

    it("logs authorized user in, displays locations", done => {
      agent
        .post("/login")
        .send({ username: "john", password: "lala" })
        .end((err, res) => {
          res.text.should.contain("<h1>Locations</h1>");
          res.text.should.contain("<td>40.7128</td>");
          res.text.should.contain("<td>74.006</td>");
          done();
        });
    });
  });
  describe("POST /login", () => {
    const agent = chai.request.agent(App);

    it("Reponds with error to wrong password", done => {
      agent
        .post("/login")
        .send({ username: "john", password: "wrong password" })
        .end((err, res) => {
          console.log("loginError",res.text)
          res.text.should.contain("Please try again")
          done()
        })
    });
  });
});
