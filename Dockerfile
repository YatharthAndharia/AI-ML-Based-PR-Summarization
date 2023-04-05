FROM node:16.15.0-alpine

WORKDIR /app

COPY package.json .

RUN npm i
RUN npm i -g nodemon

COPY . .

EXPOSE 3000

CMD [ "npx","nodemon","src/server.js" ]
