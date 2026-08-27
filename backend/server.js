import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import apiRoutes from "./src/routes/index.js";
import { errorHandler, notFound } from "./src/middleware/errorHandler.js";

const app = express();

// ── Middleware ───────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-staff-id");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// ── Routes ───────────────────────────────────────────────────
app.use("/api", apiRoutes);

// ── Error Handling ────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Database + Start ──────────────────────────────────────────
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("🚀 Connected to MongoDB successfully!");
    app.listen(PORT, () => {
      console.log(`🌐 Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ── Graceful Shutdown ─────────────────────────────────────────
const gracefulShutdown = () => {
  mongoose.connection.close(() => {
    console.log("Server and database connections closed.");
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);