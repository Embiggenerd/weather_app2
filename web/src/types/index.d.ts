export interface ErrorWithStatus extends Error {
  statusCode?: number;
  httpStatusCode?: number;
  error?: any;
  err?: {
    message: string;
  };
  code?: string;
  details?: string;
  body?: any;
  detail?: string

}

export interface ResponseFromUser {
  token: string;
  status: string;
  message: string;
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

export interface LocationsResponse {
  data: LocationsArray;
}

export interface ResponseWithToken extends Response {
  token: string;
}
