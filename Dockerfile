FROM node:14.17.4-alpine as dev
WORKDIR /app/

COPY . /app/

RUN yarn
