process.env.NODE_ENV = "test";

import "mocha"
import * as chai from "chai";
import chaiHTTP = require("chai-http");
chai.use(chaiHTTP);

import app from "../../src/App"

const should = chai.should();

it('app module exists', () => {
  should.exist(app)
})

describe("/routes : index", () => {
  describe("GET /", () => {
    it("should throw an error", done => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.status.should.equal(404)
          res.type.should.equal('application/json')
          done()
        })
    });
  });
});
