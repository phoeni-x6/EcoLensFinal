import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    cloudinaryId: { type: String, required: true },

    speciesType: { type: String, required: true },
    speciesName: { type: String, required: true },
    location: { type: String, required: true },

    uploadedBy: { type: String },

    // 🔥 NEW FIELDS
    source: { type: String, enum: ["community", "photographer"], required: true },
    approved: { type: Boolean, default: false },
    isGalleryImage: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Image ||
  mongoose.model("Image", ImageSchema);
