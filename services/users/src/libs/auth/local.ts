import * as moment from "moment";
import * as jwt from "jwt-simple";

import { KnexUser, Token } from "../types"

class Local {
  private secret: string

  constructor() {
    this.secret = process.env.TOKEN_SECRET || "changeme"
  }

  public encodeToken(user: KnexUser) {
    const payload = {
      exp: moment()
        .add(14, "days")
        .unix(),
      iat: moment().unix(),
      sub: user.id
    };
    return jwt.encode(payload, this.secret);
  }

  public decodeToken(token: Token, callback: Function) {
    const payload = jwt.decode(token, this.secret);
    const now = moment().unix();
    // check if the token has expired
    if (now > payload.exp) callback("Token has expired.");
    else callback(null, payload);
  }
}

export default new Local()