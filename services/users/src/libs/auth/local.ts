import * as moment from "moment";
import * as jwt from "jwt-simple";

import { KnexUser, Token } from "../types";

let secret: string = process.env.TOKEN_SECRET || "changeme";

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
  const payload = jwt.decode(token, secret);
  const now = moment().unix();
  // check if the token has expired
  if (now > payload.exp) callback("Token has expired.");
  else callback(null, payload);
}

export { encodeToken, decodeToken };
