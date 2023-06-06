import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  newName: {
    type: String,
    required: true,
  },
  affidavit: {
    type: String,
    required: true,
  },
  publication: {
    type: String,
    required: true,
  },
  persons: {
    type: String,
    required: true,
  },
  referral: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});

export default mongoose.model("Data", dataSchema);
