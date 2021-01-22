import express from "express";
import start from "./routes/index.js";
import sensors from "./routes/sensors.js";
import measurements from "./routes/measurements.js";

const app = express();

app.use("/", start);
app.use("/sensors", sensors);
app.use("/sensors/:sensorId/measurements", measurements);

const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});

export default app;
