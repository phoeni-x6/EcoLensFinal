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

  // 🔒 Only photographers can see this
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

      // ✅ Updated API
      const res = await fetch("/api/photographer-upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      alert("Your photography has been submitted to the curated gallery 📸");

      // Reset
      setPreview(null);
      setFile(null);
      setSpeciesType("");
      setSpeciesName("");
      setLocation("");

    } catch (error: any) {
      console.error("Photographer Upload Error:", error);
      alert(error.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[85vh] bg-[var(--charcoal-black)] text-[var(--off-white)] px-6 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT – Premium Description */}
        <div>
          <p className="uppercase tracking-widest text-sm text-[var(--leaf-green)] mb-4">
            Curated Photographer Access
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Upload Your Wildlife Photography <br />
            <span className="text-[var(--forest-green)]">
              For The Official Gallery
            </span>
          </h2>

          <p className="text-[var(--light-grey)] text-lg max-w-md leading-relaxed">
            As a verified EcoLens photographer, your work becomes part of our
            curated visual archive. Selected submissions are showcased publicly
            and may support conservation awareness initiatives.
          </p>

          <div className="mt-8 p-5 rounded-2xl bg-[var(--charcoal-black)] border border-[var(--forest-green)]/30">
            <p className="text-sm text-[var(--light-grey)] leading-relaxed">
              🔒 Sensitive species data is handled responsibly.  
              Endangered species locations remain protected and are never shown publicly.
            </p>
          </div>
        </div>

        {/* RIGHT – Elegant Upload Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--charcoal-black)]/80 backdrop-blur-xl rounded-3xl p-10 space-y-6 shadow-2xl border border-[var(--forest-green)]/20"
        >
          <input
            type="text"
            placeholder="Species Type (e.g. Mammal)"
            value={speciesType}
            onChange={(e) => setSpeciesType(e.target.value)}
            className="w-full bg-transparent border border-white/15 px-4 py-3 rounded-xl focus:outline-none focus:border-[var(--forest-green)] transition"
          />

          <select
            value={speciesName}
            onChange={(e) => setSpeciesName(e.target.value)}
            className="w-full bg-transparent border border-white/15 px-4 py-3 rounded-xl focus:outline-none focus:border-[var(--forest-green)] transition"
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
            className="w-full bg-transparent border border-white/15 px-4 py-3 rounded-xl focus:outline-none focus:border-[var(--forest-green)] transition"
          />

          {/* Upload Area */}
          <label>
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center cursor-pointer hover:border-[var(--leaf-green)] transition">
              <p className="text-sm text-[var(--off-white)]">
                Upload your professional photograph
              </p>
              <p className="text-xs text-[var(--light-grey)] mt-1">
                High resolution images recommended
              </p>
            </div>
          </label>

          {preview && (
            <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-xl">
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
            className="w-full bg-[var(--forest-green)] hover:bg-[var(--leaf-green)] text-[var(--off-white)] font-semibold py-4 rounded-2xl transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit to Curated Gallery"}
          </button>
        </form>
      </div>
    </section>
  );
}
