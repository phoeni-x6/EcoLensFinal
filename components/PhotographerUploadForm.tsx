"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function PhotographerUploadForm() {
  const { data: session, status } = useSession();

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [speciesType, setSpeciesType] = useState("");
  const [speciesName, setSpeciesName] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);

  if (status === "loading") return null;
  if (!session || session.user.role !== "photographer") return null;

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file || !speciesType || !speciesName || !location) {
      alert("Please complete all fields.");
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

      alert("Photography submitted to the gallery!");

      setPreview(null);
      setFile(null);
      setSpeciesType("");
      setSpeciesName("");
      setLocation("");
    } catch {
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-charcoal text-offwhite px-6 py-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <p className="uppercase tracking-widest text-sm text-leaf mb-4">
            Photographer Access
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Upload Your Wildlife Photography <br />
            <span className="text-forest">For Our Gallery</span>
          </h2>

          <p className="text-lightgrey text-lg max-w-md">
            Share your best wildlife moments with the EcoLens community.
            Selected works are featured in our curated public gallery.
          </p>
        </div>

        {/* RIGHT – FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-charcoal/80 rounded-2xl p-10 space-y-6 shadow-2xl border border-white/10"
        >
          <input
            type="text"
            placeholder="Species Type (e.g. Mammal)"
            value={speciesType}
            onChange={(e) => setSpeciesType(e.target.value)}
            className="w-full bg-transparent border border-white/15 px-4 py-3 rounded-lg focus:outline-none focus:border-forest"
          />

          <select
            value={speciesName}
            onChange={(e) => setSpeciesName(e.target.value)}
            className="w-full bg-transparent border border-white/15 px-4 py-3 rounded-lg focus:outline-none focus:border-forest"
          >
            <option value="">Select Species</option>
            <option>Elephant</option>
            <option>Leopard</option>
            <option>Bird</option>
            <option>Other</option>
          </select>

          <input
            type="text"
            placeholder="Location / National Park"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent border border-white/15 px-4 py-3 rounded-lg focus:outline-none focus:border-forest"
          />

          {/* Upload */}
          <label>
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            <div className="border border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-leaf transition">
              <p className="text-sm text-offwhite">Upload your photograph</p>
              <p className="text-xs text-textgrey mt-1">
                High quality images preferred
              </p>
            </div>
          </label>

          {preview && (
            <div className="relative w-full h-48 rounded-xl overflow-hidden">
              <Image src={preview} alt="Preview" fill className="object-cover" />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest hover:bg-leaf text-offwhite font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit to Gallery"}
          </button>
        </form>
      </div>
    </section>
  );
}
