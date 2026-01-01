ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV development

WORKDIR /app

COPY package*.json ./

RUN mkdir -p /app/node_modules && chown -R node:node /app

USER node

RUN npm install

COPY --chown=node:node . .

CMD ["npm", "run", "dev", "--", "--host"]
