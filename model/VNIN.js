const mongoose = require("mongoose");

const VNIN = new mongoose.Schema({
  vNIN: {
    type: String,
    required: "vNIN is required",
  },
});

module.exports = mongoose.model("VNIN", VNIN);
