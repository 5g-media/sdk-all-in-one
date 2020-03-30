FROM node:alpine

ADD . /sdk
WORKDIR /sdk

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*
RUN npm install

EXPOSE 3001

ENTRYPOINT [ "npm","run","start" ]