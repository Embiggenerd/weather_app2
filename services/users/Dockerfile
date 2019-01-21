FROM node:latest

# set working directory
RUN mkdir -p /users/src
WORKDIR /users

# install app dependencies
RUN npm install -g nodemon typescript

# copy package to be installed in compose file
COPY ./package.json .

# calling node etc will happen in compose file