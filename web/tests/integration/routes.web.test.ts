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
  let token: String;

  before("get token from users", done => {
    const options = {
      method: "POST",
      uri: "http://users-service:3000/users/login",
      json: true,
      body: {
        username: "john",
        password: "lala"
      }
    };

    request(options)
      .then((res: ResponseFromUser) => {
        token = res.token;
        done();
      })
      .catch((err: Error) => {
        console.log("usersResErr:", err);
      });
  });

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
    it("Tells unauthorized user to log in", done => {
      chai
        .request(App)
        .get("/")
        .end((err, res) => {
          res.type.should.eql("text/html");
          res.text.should.contain('action="/login"');
          console.log("res.text", res.text)
          done();
        });
    });

    it("logs authorized user in", done => {
      chai
        .request(App)
        .get("/")
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          console.log("res.body", res.body);
          console.log("res.text2", res.text);
          res.text.should.contain('<h1>Locations</h1>')
          done()
        });
    });
  });
});
