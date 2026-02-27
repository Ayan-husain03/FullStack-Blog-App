import cookieParser from "cookie-parser";
import express from "express";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

// * user routes
app.use("/api/user/", userRouter);

// ! using error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server Error";
  res.status(statusCode).json({
    success: false,
    message,
  });
});

export default app;
