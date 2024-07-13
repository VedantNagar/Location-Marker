import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";
import pinRoutes from "./router/pinRoutes.js";
import userRoutes from "./router/userRoutes.js";
import authRoutes from "./router/authRoutes.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://localhost:5173",
  "http://localhost:5174",
  "https://localhost:5174",
  "http://localhost:8000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true, // Allow credentials like cookies
};
app.use(cors(corsOptions));

app.use("/api/pins", pinRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

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
