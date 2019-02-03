import { Request, Response, NextFunction } from "express";

export interface ErrorWithStatus extends Error {
  status?: number;
}

export interface Location {
  lat: number;
  long: number;
  temp: number;
  user_id: number;
}

export interface LocationsArray extends Array<Location> {}

export type Token = string;

export interface RequestWithAuthorization extends Request {
  headers: {
    authorization?: Token;
  };
}

export interface RequestWithUser extends RequestWithAuthorization {
  user: string;
}

export interface ResponseWithUser extends Response {
  user: string;
}

export interface ResponseFromUser {
  token: string;
  status: string;
  message: string;
}

export interface WeatherResponse {
  coord: { lon: number; lat: number };
  sys: { country: string; sunrise: number; sunset: number };
  weather: [{ id: number; main: string; description: string; icon: string }];
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  wind: { speed: number; deg: number };
  rain: { "3h": number };
  clouds: { all: number };
  dt: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherArray extends Array<WeatherResponse> {}
