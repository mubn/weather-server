import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const r = {
    message: "Weather Server",
  };

  res.json(r);
});

export default router;
