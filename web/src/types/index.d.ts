export interface ErrorWithStatus extends Error {
  status?: number;
  err?: {
    message: string
  }
  code?: string;
}

export interface ResponseFromUser{
  token: string;
  status: string
  message: string
}

export interface ResponseWithUser extends Response {
  user: string;
}

export interface Location {
  lat: number;
  long: number;
  temp: number;
  user_id: number;
}

export interface LocationsArray extends Array<Location> {}

export interface LocationsResponse{
  data: LocationsArray
}

export interface ResponseWithToken extends Response {
  token: string
}