import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import newsRoutes from "./routes/news.js";
import analyzeRoutes from "./routes/analyze.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
});
app.use(limiter);

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL || "https://your-frontend-domain.vercel.app"
      : [
          "http://localhost:3000",
          "http://localhost:3001",
          "http://localhost:5173",
          "http://127.0.0.1:5173",
        ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(logger);

const requiredEnvVars = ["NEWS_API_KEY", "OPENAI_API_KEY"];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    process.exit(1);
  }
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/news", newsRoutes);
app.use("/api/analyze", analyzeRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `The endpoint ${req.originalUrl} does not exist`,
  });
});

app.use(errorHandler);

app.listen(PORT, () => {});

process.on("SIGTERM", () => {
  process.exit(0);
});

process.on("SIGINT", () => {
  process.exit(0);
});
