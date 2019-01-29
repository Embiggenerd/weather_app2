process.env.NODE_ENV = "test"

import * as chai from "chai"
const should = chai.should()
const request = require("request-promise");

const BASE = "http://api.openweathermap.org/data/2.5/weather";
const KEY = process.env.OPENWEATHERMAP_API_KEY;



const { getWeather, ensureAuthenticated } = require("../../src/libs/helpers");

describe("auth : helpers", () => {
  describe("getWeather", () => {

  })


  describe("ensureAuthenticated", () => {
    
  })
})