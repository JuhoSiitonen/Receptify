FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

USER node

EXPOSE 3001

CMD ["npm","run","dev"]