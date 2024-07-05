import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";
const app = express();
dotenv.config();

app.use(express.json());

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
