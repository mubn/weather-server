# Weather Server

This NodeJS app collects weather data from multiple sensors, stores them in a MongoDB database, serves data for frontend apps and handles jwt authentication of users and devices.

## Setup

Set following environment variables:

- DATABASE - the connection to your MongoDB database
- AUTH_DOMAIN - the auth issuer domain
- AUTH_AUDIENCE - the unique API identifier
- APP_DOMAIN - the app domain for CORS

## Installation

```
npm install
```

## Run

```
node -r esm app.js
```

### Run locally

```
npm run start
```

### Run in Docker

```
docker build . -t weather-server && docker run -e .env weather-server
```

## Usage

### Add a measurement

```
curl \
-X POST http://localhost:3000/measurements \
-H "Content-Type: application/json" \
-d '{"sensor": {"id": 7,"position": "Basement"},"temperature": 10,"humidity": 92,"pressure": 994}'
```

### Get measurements

```
curl -s http://localhost:3000/measurements | jq

[
  {
    "sensor": {
      "id": 7,
      "position": "Basement"
    },
    "_id": "60415763ddc6da1f60bae8ec",
    "temperature": 10,
    "humidity": 92,
    "pressure": 994,
    "date": "2021-03-04T21:55:47.962Z",
    "__v": 0
  }
]
```

### Get measurements for a time interval

```
curl -s http://localhost:3000/measurements/1600000000001/1800000000000
```

### Get sensors

```
curl -s http://localhost:3000/sensors | jq

[
  {
    "id": 7,
    "position": "Basement"
  }
]
```

### Delete all measurements from a sensor

```
curl \
-X DELETE \
-s http://localhost:3000/sensors/7
```
