import express from "express";
import { fetchAndParseFeeds } from "../services/jobFetcher.service.js";
import { jobQueue } from "../queues/jobQueue.js";
import { Job } from "../models/job.model.js";

const router = express.Router();

//manual get request to trigger redis for job import
router.get("/import", async (req, res) => {
  try {
    const jobs = await fetchAndParseFeeds();

    if (!jobs || jobs.length === 0) {
      return res.status(500).json({ error: "No jobs fetched from feeds." });
    }

    const job = await jobQueue.add("importBatch", { jobs });

    console.log(`📤 Enqueued ${jobs.length} jobs as job ID ${job.id}`);
    res.status(200).json({
      message: `${jobs.length} jobs queued successfully.`,
      jobId: job.id,
    });
  } catch (err) {
    console.error("❌ Failed to import jobs:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/fetch', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ pubDate: -1 }).limit(50);
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

export default router;
