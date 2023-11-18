import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  Application_nos: {
    type: Number,
    required: true,
  },
  Selected: {
    type: String,
    required: true,
  },
  Address1: {
    type: String,
    required: true,
  },
  Address2: {
    type: String,
    required: true,
  },
  Family: {
    type: String,
    required: true,
  },
  Landmark: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Imagedata: {
    type: String,
    required: true,
  },
  Names: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});

export default mongoose.model("Data", dataSchema);
