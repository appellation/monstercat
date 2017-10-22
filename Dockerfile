FROM alpine:3.6

WORKDIR /usr/src/monstercat
COPY package.json ./

RUN apk add --update \
    && apk add --no-cache --virtual .deps nodejs-current nodejs-npm curl \
    && apk add --no-cache --virtual .build-deps git build-base g++ python \
    && apk add --no-cache --virtual .npm-deps opus ffmpeg

COPY . .

RUN npm install \
    && apk del .build-deps

CMD [ "node", "src/index.js" ]
