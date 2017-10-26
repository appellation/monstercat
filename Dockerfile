FROM alpine:3.6

WORKDIR /usr/src/monstercat
COPY package.json gulpfile.js ./

RUN apk add --update \
	&& apk add --no-cache --virtual .deps nodejs-current nodejs-npm curl \
	&& apk add --no-cache --virtual .build-deps git build-base g++ python \
	&& apk add --no-cache --virtual .npm-deps opus ffmpeg

RUN npm install \
	&& npm i -g gulp && gulp \
	&& apk del .build-deps

COPY . .

CMD [ "node", "--trace-warnings", "dist/index.js" ]
