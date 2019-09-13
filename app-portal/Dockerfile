FROM node:8.16.0-alpine

WORKDIR /app

RUN yarn build

EXPOSE ${ PORT }
CMD ["yarn", "run", "start"]