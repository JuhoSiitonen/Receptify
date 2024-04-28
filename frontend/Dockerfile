FROM node:16 as start-stage
WORKDIR /usr/src/app
COPY . .
FROM start-stage as build-stage
ARG UPLOADCARE_PUBLIC_KEY
ENV UPLOADCARE_PUBLIC_KEY=${UPLOADCARE_PUBLIC_KEY}
RUN npm ci
RUN npm run build
FROM nginx:1.20-alpine
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80