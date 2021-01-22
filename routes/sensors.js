import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const r = {
    message: "GET sensors",
  };

  res.json(r);
});

router.post("/", (req, res) => {
  const r = {
    message: "POST sensors",
  };

  res.json(r);
});

router.put("/:sensorId", (req, res) => {
  const r = {
    message: `PUT sensors ${req.params.sensorId}`,
  };

  res.json(r);
});

router.delete("/:sensorId", (req, res) => {
  const r = {
    message: `DELETE sensors ${req.params.sensorId}`,
  };

  res.json(r);
});

export default router;
