import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import routes from "./routes/index.js";

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 8000;

// Proper CORS setup
app.use(
  cors({
    origin: "*", // Allow all origins (for dev only, restrict in production)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api-v1", routes);

// Handle unknown routes
app.use("*", (req, res) => {
  res.status(404).json({
    status: "404 Not Found",
    message: "Route not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
