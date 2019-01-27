#!/bin/sh

docker-compose run users-service npx knex migrate:latest --env development --knexfile knexfile.js
docker-compose run users-service npx knex seed:run --env development --knexfile knexfile.js
docker-compose run locations-service npx knex migrate:latest --env development --knexfile app/knexfile.js
docker-compose run locations-service npx knex seed:run --env development --knexfile app/knexfile.js
