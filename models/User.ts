import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["tourist", "photographer", "officer"],
      required: true,
    },
    dwcId: {
      type: String,
      default: null, // only for wildlife officers
    },
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);
