FROM node:12-alpine

WORKDIR /usr/src/monstercat
COPY package.json package-lock.json ./

RUN apk add --update \
	&& apk add --no-cache --virtual .build-deps git build-base g++ python \
	&& apk add --no-cache --virtual .npm-deps opus ffmpeg

RUN npm install \
	&& apk del .build-deps

COPY . .

RUN npm run prepare
CMD [ "npm", "start" ]
