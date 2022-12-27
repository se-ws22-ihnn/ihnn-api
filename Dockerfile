FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]

LABEL org.opencontainers.image.source=https://github.com/se-ws22-ihnn/ihnn-api/