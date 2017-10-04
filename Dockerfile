FROM node:8-alpine

COPY index.js package.json ./

RUN npm install

CMD node index.js
