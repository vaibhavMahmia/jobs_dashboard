import { ImportLog } from "../models/importLog.model.js";
import { Job } from "../models/job.model.js";

const normalizeJob = (job) => {
    const guid =
        typeof job.guid?.[0] === "object"
            ? job.guid?.[0]._ || "no-guid"
            : job.guid?.[0];

    return {
        guid,
        title: job.title?.[0],
        link: job.link?.[0],
        description: job.description?.[0],
        pubDate: new Date(job.pubDate?.[0]),
        source: job.source,
        raw: job,
    };
};

export const processJobs = async (rawJobs = []) => {
    const stats = {
        totalFetched: rawJobs.length,
        totalImported: 0,
        newJobs: 0,
        updatedJobs: 0,
        failedJobs: [],
    };

    console.log("🔍 Starting job processing... Total:", rawJobs.length);

    for (const raw of rawJobs) {
        const normalized = normalizeJob(raw);
        console.log("➡️ Processing:", normalized.guid);

        try {
            const existing = await Job.findOne({ guid: normalized.guid });

            if (!existing) {
                await Job.create(normalized);
                console.log("🆕 Inserted:", normalized.guid);
                stats.newJobs++;
            } else {
                const hasChanged =
                    existing.title !== normalized.title ||
                    existing.link !== normalized.link ||
                    existing.description !== normalized.description;

                if (hasChanged) {
                    await Job.updateOne({ guid: normalized.guid }, normalized);
                    console.log("🔁 Updated:", normalized.guid);
                    stats.updatedJobs++;
                } else {
                    console.log("⏩ No changes for:", normalized.guid);
                }
            }

            stats.totalImported++;
        } catch (err) {
            console.error("❌ Failed:", normalized.guid, err.message);
            stats.failedJobs.push({ guid: normalized.guid, reason: err.message });
        }
    }

    // Save import summary log to DB
    try {
        await ImportLog.create({
            startedAt: new Date(),
            sourceUrls: [...new Set(rawJobs.map(job => job.source))],
            totalFetched: stats.totalFetched,
            newJobs: stats.newJobs,
            updatedJobs: stats.updatedJobs,
            failedJobs: stats.failedJobs.length
        });
        console.log("📝 Import log saved");
    } catch (err) {
        console.error("❌ Failed to save import log:", err.message);
    }

    console.log("✅ processJobs completed:", stats);
    return stats;
};
