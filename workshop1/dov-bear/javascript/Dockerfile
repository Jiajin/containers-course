# Using node23
FROM node:23


LABEL maintainer="sjj"

## 1. Build the application
# create directory /app
WORKDIR /app

COPY main.js .
COPY package-lock.json .
COPY package.json .
COPY public public
COPY views views

# install the dependencies
RUN npm ci
RUN apt update && apt install -y curl

## 2. Run the application
ENV port=3000 INSTANCE_NAME="dov-bear" INSTANCE_HASH=""

# add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -s http://localhost:${port}/health || exit 1

EXPOSE ${port}

ENTRYPOINT node main.js