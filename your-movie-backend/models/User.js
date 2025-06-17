// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,
  role: { type: String, default: "user" },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
