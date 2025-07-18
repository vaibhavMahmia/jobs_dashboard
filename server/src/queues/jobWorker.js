import { Worker } from "bullmq";
import IORedis from "ioredis";
import dotenv from "dotenv";
import { connectDB } from "../utils/db.js";
import { processJobs } from "../services/jobProcessor.service.js";

// Load .env
dotenv.config();

// Connect MongoDB
await connectDB(); // ensures DB is ready before starting worker

// Redis connection
const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

console.log("👷 Worker connected");

// Create job worker
const worker = new Worker(
  "job-import-queue",
  async (job) => {
    console.log("🔥 Job received:", job.name, job.data?.jobs?.length);

    try {
      console.log("🛠 Calling processJobs...");
      const stats = await processJobs(job.data.jobs);
      console.log("📊 Job import stats:", stats);
      return stats;
    } catch (err) {
      console.error("❌ Error during job processing:", err.message);
      throw err;
    }
  },
  { connection }
);

// Job listeners
worker.on("completed", (job, result) => {
  console.log("✅ Job completed:", job.id);
  console.log("📦 Final result:", result);
});

worker.on("failed", (job, err) => {
  console.error("❌ Job failed:", err.message);
});
