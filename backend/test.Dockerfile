FROM node:16 as test-stage
WORKDIR /usr/src/app
COPY . .
RUN npm install
USER node
RUN npm run test

CMD ["npm","run","start:test"]