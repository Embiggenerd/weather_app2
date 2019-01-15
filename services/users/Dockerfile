FROM node:latest

# set working directory
RUN mkdir -p /src/app
WORKDIR /src/app

# install app dependencies
# ENV PATH /src/node_modules/.bin:$PATH
# ADD package.json package.json
COPY . .
RUN npm install

# compile ts to js
# RUN npm install -g typescript
RUN npm run build

# start app
CMD ["node", "dist/index.js"]
