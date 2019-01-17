process.env.NODE_ENV = "test";

import * as chai from "chai";
const should = chai.should();
const bcrypt = require("bcryptjs");


// const helpers = require("../../src/libs/auth/helpers");
// const { comparePass, createUser, getUser } = helpers
// const authHelpers = new helpers()

import { Helpers }  from "../../src/libs/auth/helpers"


console.log('Helpers', Helpers)
const authHelpers = Helpers

console.log("comparePass", comparePass)
console.log("getUser", getUser)
console.log("createUser", createUser)

describe("auth : helpers", () => {
  describe("comparePass()", () => {
    it("should return true if the password is correct", done => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("test", salt);
      const results = authHelpers.comparePass("test", hash);
      should.exist(results);
      results.should.eql(true);
      done();
    });
    it("should return false if the password is correct", done => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("test", salt);
      const results = authHelpers.comparePass("testing", hash);
      should.exist(results);
      results.should.eql(false);
      done();
    });
    it("should return false if the password empty", done => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("test", salt);
      const results = authHelpers.comparePass("", hash);
      should.exist(results);
      results.should.eql(false);
      done();
    });
  });
});
