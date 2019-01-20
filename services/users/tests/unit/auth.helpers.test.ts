process.env.NODE_ENV = "test";

import * as chai from "chai";
const should = chai.should();
const { genSaltSync, hashSync } = require("bcryptjs");

import { authHelpers } from "../../src/libs/auth";

const { comparePass, getUser, createUser } = authHelpers;

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
