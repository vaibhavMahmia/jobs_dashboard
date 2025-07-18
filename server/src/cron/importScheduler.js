import cron from "node-cron";
import { fetchAndParseFeeds } from "../services/jobFetcher.service.js";
import { jobQueue } from "../queues/jobQueue.js";

// Run every hour at minute 0
cron.schedule("0 * * * *", async () => {
  console.log("⏰ Cron triggered: Job import");

  try {
    const jobs = await fetchAndParseFeeds();

    if (jobs.length) {
      await jobQueue.add("importBatch", { jobs });
      console.log(`📤 Enqueued ${jobs.length} jobs from cron`);
    } else {
      console.log("⚠️ No jobs fetched from cron run");
    }
  } catch (err) {
    console.error("❌ Cron job failed:", err.message);
  }
});
