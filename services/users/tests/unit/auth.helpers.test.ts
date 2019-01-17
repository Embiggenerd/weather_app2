process.env.NODE_ENV = "test";

import * as chai from "chai";
const should = chai.should();
const {genSaltSync, hashSync, } = require("bcryptjs");


// const helpers = require("../../src/libs/auth/helpers");
// const { comparePass, createUser, getUser } = helpers
// const authHelpers = new helpers()

import { authHelpers }  from "../../src/libs/auth"

const { comparePass, getUser, createUser} = authHelpers

// const { encodeToken, decodeToken } = localAuth


// console.log('Helpers', Helpers)
// const authHelpers = Helpers

console.log("authHelpers", authHelpers)
console.log("comparePass", comparePass)
console.log("getUser", getUser)
console.log("createUser", createUser)

describe("auth : helpers", () => {
  describe("comparePass()", () => {
    it("should return true if the password is correct", done => {
      const salt = genSaltSync();
      const hash = hashSync("test", salt);
      const results = comparePass("test", hash);
      should.exist(results);
      results.should.eql(true);
      done();
    });
    it("should return false if the password is correct", done => {
      const salt = genSaltSync();
      const hash = hashSync("test", salt);
      const results = comparePass("testing", hash);
      should.exist(results);
      results.should.eql(false);
      done();
    });
    it("should return false if the password empty", done => {
      const salt = genSaltSync();
      const hash = hashSync("test", salt);
      const results = comparePass("", hash);
      should.exist(results);
      results.should.eql(false);
      done();
    });
  });
});
