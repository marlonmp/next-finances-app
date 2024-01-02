ARG NODE_VERSION
FROM node:${NODE_VERSION} as builder

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

ARG NODE_PORT
EXPOSE ${NODE_PORT}

COPY package.json .
COPY yarn.lock .

COPY . .

CMD yarn install && yarn dev -p ${NODE_PORT}
