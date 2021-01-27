import express from "express";
import bodyParser from "body-parser";
import start from "./routes/index.js";
import sensors from "./routes/sensors.js";
import measurements from "./routes/measurements.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
