import mongoose from "mongoose";

const importLogSchema = new mongoose.Schema(
  {
    startedAt: {
      type: Date,
      default: Date.now
    },
    sourceUrls: {
      type: [String],
      required: true
    },
    totalFetched: Number,
    newJobs: Number,
    updatedJobs: Number,
    failedJobs: Number
  },
  { timestamps: true }
);

export const ImportLog = mongoose.model("ImportLog", importLogSchema);
