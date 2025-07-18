# 🏗️ System Architecture Overview

This document provides a high-level overview of the architecture of the **Jobs Admin Dashboard** application.

---

## ⚙️ Components

### 1. **Frontend (Next.js 15)**
- Built using App Router with Server-Side Rendering (SSR).
- Displays imported jobs and import logs in a single dashboard.
- Fetches job and log data from the backend via REST APIs.

### 2. **Backend (Express.js)**
- Provides APIs to:
  - Fetch list of jobs (`GET /api/jobs/fetch`)
  - Fetch import logs (`GET /api/logs/fetch`)
- Manages MongoDB connection and job schema.
- Includes a scheduled job (cron) to trigger data imports automatically.

### 3. **Worker (BullMQ + Redis)**
- Runs as a separate process.
- Listens to the Redis queue and processes incoming import jobs.
- For each job:
  - Fetches external RSS feeds.
  - Parses XML and normalizes job data.
  - Inserts or updates records in MongoDB.
  - Records import stats into `importLogs` collection.

### 4. **MongoDB**
- Stores two main collections:
  - `jobs`: Imported job listings.
  - `importLogs`: Metadata/statistics for each import.

### 5. **Redis**
- Acts as the job queue mechanism using BullMQ.
- Decouples job import execution from request-response cycles.

---

## 🔁 Data Flow

```ascii
+------------------------+
|   Cron Scheduler         <--- Runs every hour
+------------------------+
            |
            v
+------------------------+
|   Redis Job Queue      
+------------------------+
            |
            v
+------------------------+
|   Job Worker (BullMQ)  
| - Fetch & parse feeds  
| - Normalize & insert   
| - Store logs in MongoDB
+------------------------+
            |
            v
+------------------------+
|       MongoDB          
| - jobs collection      
| - importLogs collection
+------------------------+
            ^
            |
+------------------------+
| Express Backend API    
| - GET /api/jobs/fetch        
| - GET /api/logs/fetch        
+------------------------+
            ^
            |
+------------------------+
| Next.js Frontend UI 
| - Job Cards        
| - Import Log Table 
+------------------------+
```
