import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
const app = express();

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to a database");
  })
  .catch(() => {
    console.log("error connecting to db");
  });

app.listen(3001, () => {
  console.log("server is running at port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const messsage = err.messsage || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    messsage,
  });
});
