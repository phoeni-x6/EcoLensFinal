import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate likes from same user
LikeSchema.index({ userId: 1, imageId: 1 }, { unique: true });

export default mongoose.models.Like ||
  mongoose.model("Like", LikeSchema);
