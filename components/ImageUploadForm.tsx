"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

const ImageUploadForm = () => {
  const [speciesName, setSpeciesName] = useState("");
  const [location, setLocation] = useState("");
  const [speciesType, setSpeciesType] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // ✅ THIS WAS MISSING
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("speciesName", speciesName);
      formData.append("speciesType", speciesType);
      formData.append("location", location);

      const res = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let data;
try {
  data = await res.json();
} catch {
  throw new Error("Server error: Invalid response");
}

if (!res.ok) {
  throw new Error(data?.message || "Upload failed");
}

      }

      alert("Image uploaded successfully ✅");

      // Reset form
      setSpeciesName("");
      setLocation("");
      setSpeciesType("");
      setImageFile(null);
      setPreviewUrl(null);
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#F5F5DC] py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-[#E0E0E0] p-10 rounded-lg shadow-lg animate-slideUp">

          <h2 className="text-3xl font-bold text-center text-[#263238] mb-8">
            Image Upload Form
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Species Name */}
            <input
              type="text"
              placeholder="Species Name (e.g. Sri Lankan Leopard)"
              value={speciesName}
              onChange={(e) => setSpeciesName(e.target.value)}
              className="w-full px-4 py-3 rounded bg-white text-[#263238] outline-none focus:ring-2 focus:ring-[#66BB6A]"
              required
            />

            {/* Image Preview */}
            {previewUrl && (
              <div className="flex justify-center">
                <div className="relative w-64 h-40 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={previewUrl}
                    alt="Image Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Location */}
            <input
              type="text"
              placeholder="Location / Wildlife Park"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded bg-white text-[#263238] outline-none focus:ring-2 focus:ring-[#66BB6A]"
              required
            />

            {/* Species Type */}
            <select
              value={speciesType}
              onChange={(e) => setSpeciesType(e.target.value)}
              className="w-full px-4 py-3 rounded bg-white text-[#263238] outline-none focus:ring-2 focus:ring-[#66BB6A]"
              required
            >
              <option value="">Select Species Type</option>
              <option>Elephant</option>
              <option>Leopard</option>
              <option>Peacock</option>
              <option>Deer</option>
              <option>Monkey</option>
              <option>Bird</option>
            </select>

            {/* File Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-white px-4 py-2 rounded text-[#263238]"
              required
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#2E7D32] text-[#F5F5DC] font-semibold rounded hover:bg-[#66BB6A] transition disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Submit Image"}
            </button>

          </form>

        </div>
      </div>
    </section>
  );
};

export default ImageUploadForm;
