import mongoose from "mongoose";

const pinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: 60,
    },
    description: {
      type: String,
      max: 60,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Pin = mongoose.model("Pin", pinSchema);
export default Pin;
