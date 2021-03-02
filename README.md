# Weather Server

This NodeJS app collects weather data from multiple sensors, stores them in a MongoDB database, serves data for frontend apps and handles jwt authentication of users and devices.

## Setup

Set following environment variables:

- DATABASE - the connection to your MongoDB database
- AUTH_DOMAIN - the auth issuer domain
- AUTH_AUDIENCE - the unique API identifier
- APP_DOMAIN - the app domain for CORS

## Install

```
npm install
```

## Run

```
node -r esm app.js
```

### Run localy

```
npm run start
```

### Run in Docker

```
docker build . -t weather-server && docker run -e .env weather-server
```
