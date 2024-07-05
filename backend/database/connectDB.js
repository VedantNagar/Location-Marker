import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Database is connected");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};
export default connectDB;
