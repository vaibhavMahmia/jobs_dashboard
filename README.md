# Jobs Dashboard

A modern full-stack application for managing and viewing job listings and logs. Built with Next.js (client) and Express.js (server).

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/vaibhavMahmia/jobs_dashboard
cd jobs_dashboard
```

---

## 🖥️ Server Setup (Express.js)

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Create a `.env` file and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_database_url # e.g. mongodb://localhost:27017/jobimporter
   REDIS_URL=your_redis_server_url     # e.g. redis://localhost:6379
   CORS_ORIGIN=your_frontend_url       # e.g. http://localhost:3000
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the Express server:
   ```bash
   npm start
   ```
5. In a separate terminal, start the Redis worker:
   ```bash
   npm run worker
   ```

---

## 🌐 Client Setup (Next.js)

1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Create a `.env.local` file and add:
   ```env
   NEXT_PUBLIC_API_BASE_URL=your_express_server_url # e.g. http://localhost:5000
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the Next.js app:
   ```bash
   npm run build
   ```
5. Start the client:
   ```bash
   npm start
   ```

---

## 📦 Folder Structure

```
client/   # Next.js frontend
server/   # Express.js backend
```

---

## 📝 Environment Variables
- **Server**: `.env` (PORT, MONGO_URI, REDIS_URL, CORS_ORIGIN)
- **Client**: `.env.local` (NEXT_PUBLIC_API_BASE_URL)

---

## 💡 Features
- Modern UI with glassmorphism and gradients
- Job listing and log management
- Real-time updates via Redis worker
- Easy setup and deployment

---

## 🤝 Contributing
Pull requests and suggestions are welcome!

---

## 📄 License
MIT
