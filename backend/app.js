import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ENV } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import tableRoutes from "./routes/table.routes.js";
import orderRoutes from "./routes/order.routes.js";
import billRoutes from "./routes/bill.routes.js";
import superadminRoutes from "./routes/superadmin.routes.js";
import servedOrderRoutes from "./routes/servedOrder.routes.js";

const app = express();

// CORS configuration - allow multiple frontend URLs
const allowedOrigins = [
  ENV.CLIENT_URL,
  "http://localhost:8080",
  "http://localhost:5173",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin or from allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // For development, allow all origins
        callback(null, true);
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Khao Peeo backend running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/superadmin", superadminRoutes);
app.use("/api/served-orders", servedOrderRoutes);

// Global error handler fallback
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error" });
});

export default app;


