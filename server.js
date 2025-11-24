import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";

import listingsRoutes from "./routes/listings.js";
import authRoutes from "./routes/auth.js";
import "./utils/passportConfig.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(passport.initialize());

// Serve frontend
app.use(express.static(path.join(__dirname, "../client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// Test route
app.get("/test", (req, res) => {
  res.send("Server working ✅");
});

// Routes
app.use("/api/listings", listingsRoutes);
app.use("/api/auth", authRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
