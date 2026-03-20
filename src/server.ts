import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

const PORT = process.env.PORT || 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/lms")
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB Error:", err);
  });

  dotenv.config();