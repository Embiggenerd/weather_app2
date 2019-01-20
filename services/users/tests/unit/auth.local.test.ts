process.env.NODE_ENV = "test";

import * as chai from "chai";
const should = chai.should();
import { localAuth }  from "../../src/libs/auth"
import { Token } from "../../src/libs/types";


describe("auth : local", () => {
  describe("encodeToken()", () => {
    it("should return a token", done => {
      const token = localAuth.encodeToken({ id: 1 });
      should.exist(token);
      token.should.be.a("string");
      done();
    });
  });

  describe("decodeToken()", () => {
    it("should return a payload", done => {
      const token = localAuth.encodeToken({ id: 1 });
      should.exist(token);
      token.should.be.a("string");
      localAuth.decodeToken(token, (err:Error, res: Token) => {
        should.not.exist(err);
        res.sub.should.eql(1);
        done();
      });
    });
  });
});
