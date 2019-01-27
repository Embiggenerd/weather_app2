FROM node:latest


# set working directory
RUN mkdir -p /locations/src
WORKDIR /locations


# install app dependencies
RUN npm install -g nodemon  typescript@next 

# copy package to be installed in compose file
COPY ./package.json .

RUN npm install @types/node

# calling node etc will happen in compose file