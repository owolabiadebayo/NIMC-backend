import mongoose from "mongoose";

const VNIN = new mongoose.Schema({
    vNIN: {
        type: String,
        required: "Email is required",
    }
});
export default mongoose.model("VNIN", VNIN)