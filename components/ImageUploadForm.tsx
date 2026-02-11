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

      // ✅ Updated API endpoint
      const res = await fetch("/api/community-upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      alert("Thank you for contributing to wildlife conservation 🌱");

      // Reset form
      setPreview(null);
      setFile(null);
      setSpeciesType("");
      setSpeciesName("");
      setLocation("");

    } catch (error: any) {
      console.error("Community Upload Error:", error);
      alert(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[100svh] bg-[var(--soft-beige)] px-6 py-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT – INFO */}
        <div>
          <p className="uppercase tracking-widest text-sm text-[var(--leaf-green)] mb-4">
            Community Contribution
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[var(--charcoal-black)] leading-tight">
            Share Wildlife Sightings <br />
            <span className="text-[var(--forest-green)]">
              For Conservation
            </span>
          </h2>

          <p className="mt-6 text-[var(--text-grey)] max-w-md leading-relaxed">
            Your uploaded images help researchers understand wildlife movement
            and protect vulnerable species across natural habitats.
          </p>

          <div className="mt-8 rounded-2xl bg-[var(--off-white)] border border-[var(--forest-green)]/20 p-6">
            <h4 className="font-semibold text-[var(--forest-green)] mb-3">
              What happens after you upload?
            </h4>

            <ul className="space-y-2 text-sm text-[var(--text-grey)]">
              <li>
                • <strong>Non-endangered species:</strong> location may appear on
                our public wildlife map.
              </li>
              <li>
                • <strong>Endangered species:</strong> location stays private and
                is only reviewed internally to ensure safety.
              </li>
            </ul>

            <p className="mt-4 text-sm text-[var(--forest-green)] font-medium">
              Thank you for helping protect wildlife 🌍
            </p>
          </div>
        </div>

        {/* RIGHT – FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--off-white)] rounded-3xl p-10 shadow-xl border border-black/5 space-y-6"
        >
          <input
            type="text"
            placeholder="Species Type (e.g. Mammal)"
            value={speciesType}
            onChange={(e) => setSpeciesType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[var(--forest-green)]/40"
          />

          <select
            value={speciesName}
            onChange={(e) => setSpeciesName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--forest-green)]/40"
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
            className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[var(--forest-green)]/40"
          />

          {/* Upload */}
          <label>
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="border-2 border-dashed border-[var(--forest-green)]/30 rounded-xl p-6 text-center cursor-pointer hover:bg-[var(--forest-green)]/5 transition">
              <p className="text-sm text-[var(--charcoal-black)]">
                Click to upload or drag & drop
              </p>
              <p className="text-xs text-[var(--light-grey)] mt-1">
                JPG or PNG, up to 10MB
              </p>
            </div>
          </label>

          {preview && (
            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-md">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--forest-green)] hover:bg-[var(--leaf-green)] text-[var(--off-white)] py-4 rounded-xl font-semibold transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Submit Image"}
          </button>
        </form>

      </div>
    </section>
  );
}
