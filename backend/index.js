import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";
import pinRoutes from "./router/pinRoutes.js";
import userRoutes from "./router/userRoutes.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api/pins", pinRoutes);
app.use("/api/users", userRoutes);

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
