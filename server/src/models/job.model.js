import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  guid: { type: String, required: true, unique: true }, // unique identifier
  title: String,
  link: String,
  description: String,
  pubDate: Date,
  source: String,
  raw: Object, // to store raw JSON if needed
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);