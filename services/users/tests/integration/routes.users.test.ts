process.env.NODE_ENV = "test";

import * as chai from "chai";
import chaiHTTP = require("chai-http");
import "mocha"
chai.use(chaiHTTP);

import app from "../../src/App";
const knex = require("../../src/db/connection");

const should = chai.should();

it("app module exists", (done) => {
  should.exist(app);
  done()
});

describe("routes: users", () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => {
        return knex.migrate.latest();
      })
      .then(() => {
        return knex.seed.run();
      });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe("POST /users/register", () => {
    it("should register a new user", done => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          username: "igor",
          password: "blahblah"
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.should.include.keys("status", "token");
          res.body.status.should.eql("success");
          done();
        });
    });
  });

  describe("POST /users/login", () => {
    it("should login a user", done => {
      chai
        .request(app)
        .post("/users/login")
        .send({
          username: "john",
          password: "lala"
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.should.include.keys("status", "token");
          res.body.status.should.eql("success");
          should.exist(res.body.token);
          done();
        });
    });

    it("should not login an unregistered user", done => {
      chai
        .request(app)
        .post("/users/login")
        .send({
          username: "michael",
          password: "johnson123"
        })
        .end((err, res) => {
          res.status.should.eql(500);
          res.type.should.eql("application/json");
          res.body.status.should.eql("error");
          done();
        });
    });

    it("should not login a valid user with incorrect password", done => {
      chai
        .request(app)
        .post("/users/login")
        .send({
          username: "john",
          password: "incorrect"
        })
        .end((err, res) => {
          res.status.should.eql(500);
          res.type.should.eql("application/json");
          res.body.status.should.eql("error");
          done();
        });
    });
  });

  describe("GET /users/user", () => {
    it("should return a success", done => {
      chai
        .request(app)
        .post("/users/login")
        .send({
          username: "john",
          password: "lala"
        })
        .end((error, response) => {
          should.not.exist(error);
          chai
            .request(app)
            .get("/users/user")
            .set("authorization", "Bearer " + response.body.token)
            .end((err, res) => {
              res.status.should.eql(200);
              res.type.should.eql("application/json");
              res.body.should.include.keys("status", "user");
              res.body.status.should.eql("success");
              should.exist(res.body.user);
              done();
            });
        });
    });

    it("should throw an error if a user is not logged in", done => {
      chai
        .request(app)
        .get("/users/user")
        .end((err, res) => {
          res.status.should.eql(400);
          res.type.should.eql("application/json");
          res.body.status.should.eql("Please log in");
          done();
        });
    });
  });
});
