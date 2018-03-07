FROM node:8-alpine

WORKDIR /usr/src/monstercat
COPY package.json package-lock.json ./

RUN apk add --update \
	&& apk add --no-cache --virtual .build-deps git build-base g++ python \
	&& apk add --no-cache --virtual .npm-deps opus ffmpeg

RUN npm install \
	&& npm i -g gulp \
	&& apk del .build-deps

COPY . .

RUN gulp

CMD [ "node", "--trace-warnings", "dist/index.js" ]
