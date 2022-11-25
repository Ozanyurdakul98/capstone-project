import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    name: { type: String, default: "Guest" },
    lastname: { type: String },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "/images/Thumbnail-default.png",
      set: (v) =>
        v === "" || undefined || null ? "/images/Thumbnail-default.png" : v,
    },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
