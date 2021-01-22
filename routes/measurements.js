import { Router } from "express";

const router = Router();

router.get("/:timefrom/:timeto", (req, res) => {
  const r = {
    message: `GET measurements from ${req.params.timefrom} to ${req.params.timeto}`,
  };

  res.json(r);
});

router.post("/", (req, res) => {
  const r = {
    message: `POST measurement`,
  };

  res.json(r);
});

export default router;
