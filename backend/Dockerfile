FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci

USER node

EXPOSE 3001

CMD ["npm","start"]