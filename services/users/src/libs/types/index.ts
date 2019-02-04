import { Moment } from "moment";
import { Request } from "express";

export type Token = string;

export interface ErrorWithStatus extends Error {
  status?: number;
}

export interface RequestWithAuthorization extends Request {
  headers: {
    authorization?: Token;
  };
}

export interface TokenData {
  sub: string;
  exp: Moment;
  iat: Moment;
}

export interface RequestWithUser extends RequestWithAuthorization {
  user: string;
}

export interface KnexUser {
  username: string;
  password: string;
  id: string;
  length: number;
}
