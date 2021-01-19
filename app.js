import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use("/", routes);

const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});

export default app;
