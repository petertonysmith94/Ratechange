FROM node:8.16.0-alpine

# Set the working directory
WORKDIR /app

# Adds dependencies
RUN apk update && apk --no-cache add yarn

# Adds configuration files
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

# Install packages
RUN yarn
RUN yarn install

# Copy application code
COPY ./ /app/

CMD ["yarn", "run", "start"]
EXPOSE "${PORT}"