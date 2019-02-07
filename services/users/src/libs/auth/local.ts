import * as moment from "moment";
import * as jwt from "jwt-simple";

import { KnexUser, Token } from "../types";

let secret: string = process.env.TOKEN_SECRET || "changeme";
console.log("secret", secret);

function encodeToken(user: KnexUser) {
  const payload = {
    exp: moment()
      .add(14, "days")
      .unix(),
    iat: moment().unix(),
    sub: user.id
  };
  return jwt.encode(payload, secret);
}

function decodeToken(token: Token, callback: Function) {
  try {
    console.log("token", token)
    const payload = jwt.decode(token, secret);
    console.log("payload", payload)

    const now = moment().unix();
    // check if the token has expired
    if (now > payload.exp) callback("Token has expired.");
    else callback(null, payload);
  } catch (e) {
    console.log("decodeErr", e);
  }
}

export { encodeToken, decodeToken };
