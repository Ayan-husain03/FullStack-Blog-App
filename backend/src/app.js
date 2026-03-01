import cookieParser from "cookie-parser";
import express from "express";
import userRouter from "./routes/user.route.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// * user routes
app.use("/api/user", userRouter);

// ! using error handler
app.use((err, req, res, next) => {
  console.log("Error through middlware => ", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server Error";
  res.status(statusCode).json({
    success: false,
    message,
  });
});

export default app;
