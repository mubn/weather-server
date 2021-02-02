import Router from "express";
import * as controller from "../controllers/sensor.js";

const router = Router();

router.route("/").get(controller.getAllSensors);

router.route("/:sensorId").delete(controller.deleteSensor);

export default router;
