import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import expressJwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import start from "./routes/index.js";
import sensors from "./routes/sensors.js";
import measurements from "./routes/measurements.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

let envVars = ["DATABASE", "AUTH0_DOMAIN", "AUTH0_AUDIENCE", "APP_DOMAIN"];

let unsetEnvVars = envVars.filter(
  (env) => typeof process.env[env] === "undefined"
);

if (unsetEnvVars.length > 0) {
  throw new Error(
    "Required einvironment variables are not set: [" +
      unsetEnvVars.join(", ") +
      "]"
  );
}

const app = express();

const corsOptions = {
  origin: process.env.APP_DOMAIN,
};

const checkJwt = expressJwt({
  // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("combined"));

if (process.env.NODE_ENV === "production") {
  app.use(checkJwt);
}

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", () => {
  console.log("mongoose is connected...");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoose is disconnected...");
});

app.use("/", start);
app.use("/sensors", sensors);
app.use("/measurements", measurements);

const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});

export default app;
