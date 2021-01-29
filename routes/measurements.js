import Router from "express";
import * as controller from "../controllers/measurement.js";

const router = Router();

router
  .route("/")
  .get(controller.getAllMeasurements)
  .post(controller.addMeasurement);

router.route("/:datefrom/:dateto").get(controller.getMeasurements);

export default router;
