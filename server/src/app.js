import express from "express";
import cors from "cors";
import jobRoutes from "./controllers/job.controller.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST"],
}));
app.use("/api/jobs", jobRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Job Importer API");
});

export default app;