# Weather App

A continuation on MHerman's [tutorial](https://mherman.org/blog/developing-and-testing-microservices-with-docker/). It simply gets the users location, and allows him to add it to a list of such locations, with data from openweatherapi to tell what temperature it is.


## In Detail

* The backend was rewritten using object oriented typescript.
* Tests were added to achieve close to 100% test coverage.
* Proper error handling was introduced.
* The flow of the app goes like this:an initial get request to locations quries the users service via middleware. If there is a cookie, its index is used by the web service to look up sessions stored in jwt. The token is
sent to the users service for authentication. If it passses, the locations service looks up the needed data in its own database.

## Visit App

Clone the app. Make sure to get an open weather api key, and to create a database name. Export those variables, then build and run in docker-compose.

## Demonstrates

* Understanding micro services architecure, including testing and error handling.
* The value of typescript.
* Usage of JWT to validate data sent between services.
