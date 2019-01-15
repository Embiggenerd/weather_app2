process.env.NODE_ENV = "test";

import "mocha";
import * as chai from "chai";
import chaiHTTP = require("chai-http");
chai.use(chaiHTTP);

import app from "../../src/App";
const knex = require("../../src/db/connection");

const should = chai.should();

it("app module exists", () => {
  should.exist(app);
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
    return knex.migrate.rollback()
  })

  describe("POST /users/register", () => {
    it('should register a new user', (done) => {
      chai.request(app)
      .post('/users/register')
      .send({
        username: 'michael',
        password: 'herman'
      })
      .end((err, res) => {
        should.not.exist(err);
        //res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.should.include.keys('status', 'token');
        res.body.status.should.eql('success');
        done();
      });
    });
  })
});