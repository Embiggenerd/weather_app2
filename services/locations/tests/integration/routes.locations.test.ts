process.env.NODE_ENV = "test";

import * as chai from "chai";
const should = chai.should();
import chaiHttp = require("chai-http");
chai.use(chaiHttp);

import App from "../../src/App";
import knex from "../../src/db/connection";
const queries = require("../../src/db/queries");
const request = require("request-promise");
import { ResponseWithUser, ResponseFromUser } from "../../src/libs/types";

describe("Locations API Routes", () => {
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

  describe("GET /ping", () => {
    it('should return "pong"', () => {
      chai
        .request(App)
        .get("/locations/ping")
        .end((err, res) => {
          res.type.should.eql("text/html");
          res.text.should.eql("pong");
        });
    });
  });

  describe("GET /", () => {
    let token: string;

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

    it("should instruct unauthorized user to log in", done => {
      chai
        .request(App)
        .get("/locations/")
        .end((err, res) => {
          res.text.should.contain("Please log in");
          res.type.should.eql("application/json");
          done();
        });
      
    });

    it("should return location data for all users", done => {
      chai
        .request(App)
        .get("/locations/")
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          console.log("locRez", res.body, token)

          res.type.should.eql("application/json");
          res.body.status.should.eql("success");
          res.body.data.length.should.eql(2);
          res.body.data[0].id.should.eql(1);
          res.body.data[1].id.should.eql(2);
          done();
        });
    });
  });

  describe("GET /user", () => {
    let token: string;

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

    it("should instruct unauthorized user to log in", done => {
      chai
        .request(App)
        .get("/locations/user")
        .end((err, res) => {
          res.text.should.contain("Please log in");
          res.type.should.eql("application/json");
          done();
        });
    });

    it("should return location data for particular user", done => {
      chai
        .request(App)
        .get("/locations/user")
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          console.log("userLocsRes", res.body)
          res.type.should.eql("application/json");
          res.body.status.should.eql("success");
          res.body.data.length.should.eql(1);
          res.body.data[0].should.include.keys("lat", "long", "id");
          res.body.data[0].id.should.eql(1);
          res.body.data[0].lat.should.eql(40.7128);
          res.body.data[0].long.should.eql(74.006);
          done();
        });
    });
  });
  describe("GET /:id", () => {
    let token: string;

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

    it("should instruct unauthorized user to log in", done => {
      chai
        .request(App)
        .get("/locations/1")
        .end((err, res) => {
          res.text.should.contain("Please log in");
          res.type.should.eql("application/json");
          done();
        });
    });

    it("should return location data for location id", done => {
      chai
        .request(App)
        .get("/locations/1")
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          res.type.should.eql("application/json");
          res.body.status.should.eql("success");
          res.body.data.should.include.keys("lat", "long", "id");
          res.body.data.id.should.eql(1);
          res.body.data.lat.should.eql(40.7128);
          res.body.data.long.should.eql(74.006);
          done();
        });
    });
  });
  describe("POST /, PUT, DELETE /:id", () => {
    let token: string;

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

    it("should not return error after posting location", done => {
      chai
        .request(App)
        .post("/locations/")
        .send({
          lat: 50,
          long: 60
        })
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          res.type.should.eql("application/json");
          res.body.status.should.eql("success");
          chai
            .request(App)
            .get("/locations/")
            .set("authorization", "Bearer " + token)
            .end((err, res) => {
              console.log("postRes", res.body)
              res.body.data[2].should.include.keys("lat", "long", "id");
              res.body.data[2].id.should.eql(3);
              res.body.data[2].lat.should.eql(50);
              res.body.data[2].long.should.eql(60);
              done();
            });
        });
    });

    it("location data should be changed after putting new data", done => {
      chai
        .request(App)
        .put("/locations/2")
        .send({
          lat: 20,
          long: 30
        })
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          res.type.should.eql("application/json");
          res.body.status.should.eql("success");
          chai
            .request(App)
            .get("/locations/2")
            .set("authorization", "Bearer " + token)
            .end((err, res) => {
              console.log("putRes", res.body)
              if(err){console.log("putErr", err)}
              res.body.data.should.include.keys("lat", "long", "id");
              res.body.data.id.should.eql(2);
              res.body.data.lat.should.eql(20);
              res.body.data.long.should.eql(30);
              done();
            });
        });
    });

    it("delete request should delete data", done => {
      chai
        .request(App)
        .delete("/locations/2")
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          res.type.should.eql("application/json");
          res.body.status.should.eql("success");
          chai
            .request(App)
            .get("/locations/")
            .set("authorization", "Bearer " + token)
            .end((err, res) => {
              console.log("delRes", res.body)
              if(err){console.log("delErr", err)}
              res.body.data.length.should.eql(1)
              done();
            });
        });
    });
  });
});
