import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from './modules/auth/auth.routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running",
  });
});

export default app;
