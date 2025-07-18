import express from "express";
import { ImportLog } from "../models/importLog.model.js";

const router = express.Router();

// GET /api/logs - return all logs sorted by latest first
router.get("/fetch", async (req, res) => {
  try {
    const logs = await ImportLog.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    console.error("❌ Failed to fetch logs:", err.message);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

export default router;