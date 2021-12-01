FROM node:14
RUN mkdir -p  /usr/itio-f-api/node_modules

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/itio-f-api

COPY package*.json  ./

RUN npm install

# Copying source files
COPY .  .

# Building api
RUN npm run build

RUN npm rebuild bcrypt --build-from-source

# Running the api
CMD [ "npm", "run", "serve" ]
