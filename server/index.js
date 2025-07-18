import dotenv from "dotenv";
import { connectDB } from "./src/utils/db.js";
import app from "./src/app.js";
import "./src/cron/importScheduler.js"; // fetch job every hour

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB(); // connection with mongodb database
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));