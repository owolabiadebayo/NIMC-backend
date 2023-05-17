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
  transactionId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Data", dataSchema);
