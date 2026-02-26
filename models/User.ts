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
      enum: ["tourist", "photographer", "officer", "admin"],
      default: "tourist",
    },

    // Officer ID (only for wildlife officers)
    dwcId: {
      type: String,
      default: null,
    },

    // 🔐 Officer manual approval
    officerApproved: {
      type: Boolean,
      default: false,
    },

    // 🔐 Account block system
    isBlocked: {
      type: Boolean,
      default: false,
    },

    // Email verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
    },

    verificationTokenExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);