"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageUploadForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [speciesType, setSpeciesType] = useState("");
  const [speciesName, setSpeciesName] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file || !speciesType || !speciesName || !location) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("speciesType", speciesType);
      formData.append("speciesName", speciesName);
      formData.append("location", location);

      const res = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      alert("Thank you for contributing to wildlife conservation 💚");

      setPreview(null);
      setFile(null);
      setSpeciesType("");
      setSpeciesName("");
      setLocation("");
    } catch {
      alert("Something went wrong during upload.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[100svh] bg-softbeige px-6 py-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT – INFO */}
        <div>
          <p className="uppercase tracking-widest text-sm text-leaf mb-4">
            Community Contribution
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight">
            Share Wildlife Sightings <br />
            <span className="text-forest">For Conservation</span>
          </h2>

          <p className="mt-6 text-textgrey max-w-md leading-relaxed">
            Your uploaded images help researchers understand wildlife movement
            and protect vulnerable species across natural habitats.
          </p>

          {/* 🌱 Conservation Logic */}
          <div className="mt-8 rounded-2xl bg-offwhite border border-forest/20 p-6">
            <h4 className="font-semibold text-forest mb-3">
              What happens after you upload?
            </h4>

            <ul className="space-y-2 text-sm text-textgrey">
              <li>
                • <strong>Non-endangered species:</strong> location may appear on
                our public wildlife map.
              </li>
              <li>
                • <strong>Endangered species:</strong> location stays private and
                is only reviewed internally to ensure safety.
              </li>
            </ul>

            <p className="mt-4 text-sm text-forest font-medium">
              Thank you for helping protect wildlife 🌍
            </p>
          </div>
        </div>

        {/* RIGHT – FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-offwhite rounded-3xl p-10 shadow-xl border border-black/5 space-y-6"
        >
          <input
            type="text"
            placeholder="Species Type (e.g. Mammal)"
            value={speciesType}
            onChange={(e) => setSpeciesType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-forest/40"
          />

          <select
            value={speciesName}
            onChange={(e) => setSpeciesName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-forest/40"
          >
            <option value="">Select Species</option>
            <option>Elephant</option>
            <option>Leopard</option>
            <option>Bird</option>
            <option>Other</option>
          </select>

          <input
            type="text"
            placeholder="Location / Wildlife Park"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-forest/40"
          />

          {/* Upload */}
          <label>
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            <div className="border-2 border-dashed border-forest/30 rounded-xl p-6 text-center cursor-pointer hover:bg-forest/5 transition">
              <p className="text-sm text-charcoal">
                Click to upload or drag & drop
              </p>
              <p className="text-xs text-lightgrey mt-1">
                JPG or PNG, up to 10MB
              </p>
            </div>
          </label>

          {preview && (
            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-md">
              <Image src={preview} alt="Preview" fill className="object-cover" />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest hover:bg-leaf text-offwhite py-4 rounded-xl font-semibold transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Submit Image"}
          </button>
        </form>
      </div>
    </section>
  );
}
