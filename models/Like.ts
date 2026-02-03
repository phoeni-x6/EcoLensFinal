import mongoose, { Schema } from "mongoose";

const LikeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    imageId: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "likes",
  }
);

// 🔒 Ensure one user can like one image only once
LikeSchema.index({ userId: 1, imageId: 1 }, { unique: true });

// Prevent model overwrite in Next.js dev
const Like =
  mongoose.models.Like || mongoose.model("Like", LikeSchema);

export default Like;
