"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";

const ImageUploadForm = () => {
  const [location, setLocation] = useState("");
  const [species, setSpecies] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <section className="bg-[#F5F5DC] py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-[#E0E0E0] p-10 rounded-lg shadow-lg animate-slideUp">

          <h2 className="text-3xl font-bold text-center text-[#263238] mb-8">
            Image Upload Form
          </h2>

          <form className="space-y-6">

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
            />

            {/* Species */}
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="w-full px-4 py-3 rounded bg-white text-[#263238] outline-none focus:ring-2 focus:ring-[#66BB6A]"
            >
              <option value="">Select Species</option>
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
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-[#2E7D32] text-[#F5F5DC] font-semibold rounded hover:bg-[#66BB6A] transition"
            >
              Submit Image
            </button>

          </form>

        </div>
      </div>
    </section>
  );
};

export default ImageUploadForm;
