process.env.NODE_ENV = "test";
const crypto = require("crypto");


const request = require("request-promise");
import "mocha";
import * as chai from "chai";
const should = chai.should();
import chaiHttp = require("chai-http");
chai.use(chaiHttp);

import App from "../../src/App";
import { ResponseWithUser, ResponseFromUser } from "../../src/types";
describe("Web API Routes", () => {
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

    it("Reponds with appropriate error to wrong password", done => {
      agent
        .post("/login")
        .send({ username: "john", password: "wrong password" })
        .end((err, res) => {
          res.text.should.contain("Error: Incorrect password");
          done();
        });
    });
    it("Responds with appropriate error to unregistered user", done => {
      agent
        .post("/login")
        .send({ username: "juan", password: "lolo" })
        .end((err, res) => {
          res.text.should.contain("Error: No such user");
          done();
        });
    });
    it("Responds with locations page to registered user", done => {
      agent
        .post("/login")
        .send({ username: "john", password: "lala" })
        .end((err, res) => {
          // console.log("webLoginResRes", res.text)

          res.text.should.contain("<h1>Locations</h1>");
          done();
        });
    });
  });
  describe("GET /register", () => {
    const agent = chai.request.agent(App);

    it("Displays registration page to users not logged in", done => {
      agent.get("/register").end((err, res) => {
        res.text.should.contain("<h1>Register</h1>");
        done();
      });
    });
    it("Should not display registration page to logged in users", done => {
      agent
        .post("/login")
        .send({ username: "john", password: "lala" })
        .end(() => {
          agent.get("/register").end((err, res) => {
            res.text.should.contain("<h1>Locations</h1>");
            res.text.should.not.contain("<h1>Register</h1>");
            done();
          });
        });
    });
  });
  describe("POST /register", () => {
    const agent = chai.request.agent(App);
    const username = crypto.randomBytes(20).toString('hex');

    it("Should display appropriate error when username is not available", done => {
      chai
        .request(App)
        .post("/register")
        .send({ username: "john", password: "lala" })
        .end((err, res) => {
          res.text.should.contain("<p>Username not available</p>");
          done();
        });
    });
    it("Should show locations if registered with unique username", done => {
      agent
        .post("/register")
        .send({ username, password: "bag" })
        .end((err, res) => {
          res.text.should.contain("<h1>Locations</h1>");
          done();
        });
    });
  });
  describe("GET /logout", () => {
    const agent = chai.request.agent(App);
    it("Should logout a logged in user", done => {
      agent
        .post("/login")
        .send({ username: "john", password: "lala" })
        .end((err, res) => {
          res.text.should.contain("<h1>Locations</h1>");
          agent.get("/logout").end((err, res) => {
            res.text.should.not.contain("<h1>Locations</h1>");
            done()
          });
        });
    });
  });
  
});
