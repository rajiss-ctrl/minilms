// app.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Connect to MongoDB using Mongoose
mongoose
  .connect(
    "mongodb+srv://rajissctrl:rajissctrl123@minilms.vod0kq4.mongodb.net/minilms?retryWrites=true&w=majority&appName=AtlasApp",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const PORT = process.env.PORT || 5000;

// Use the userRouter for /auth routes
app.use("/auth", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
