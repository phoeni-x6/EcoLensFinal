"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PhotographerUploadForm() {
  const { data: session, status } = useSession();

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [speciesType, setSpeciesType] = useState("");
  const [speciesName, setSpeciesName] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

      const res = await fetch("/api/photographer-upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      // 🎉 Trigger Success Screen
      setSuccess(true);

      setPreview(null);
      setFile(null);
      setSpeciesType("");
      setSpeciesName("");
      setLocation("");

    } catch (error: any) {
      alert(error.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 🎉 Success Overlay */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[var(--charcoal-black)] border border-[var(--forest-green)]/40 rounded-3xl p-12 text-center max-w-lg shadow-2xl animate-slideUp">
            <h2 className="text-3xl font-bold text-[var(--leaf-green)] mb-4">
              📸 Masterpiece Received
            </h2>

            <p className="text-[var(--light-grey)] leading-relaxed mb-6">
              Your wildlife photograph has entered the EcoLens curated archive.
              Our conservation team will review it shortly.
            </p>

            <p className="text-sm text-[var(--forest-green)] mb-8">
              Thank you for helping protect and document nature 🌿
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-3 rounded-xl border border-[var(--forest-green)] text-[var(--forest-green)] hover:bg-[var(--forest-green)]/10 transition"
              >
                Upload Another
              </button>

              <Link
                href="/gallery"
                className="px-6 py-3 rounded-xl bg-[var(--forest-green)] text-white hover:bg-[var(--leaf-green)] transition"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Section */}
      <section className="min-h-[85vh] bg-[var(--charcoal-black)] text-[var(--off-white)] px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
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
              Your lens captures stories nature cannot speak. Selected works
              become part of EcoLens' visual conservation archive.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-[var(--charcoal-black)]/80 rounded-3xl p-10 space-y-6 shadow-2xl border border-[var(--forest-green)]/20"
          >
            <input
              type="text"
              placeholder="Species Type"
              value={speciesType}
              onChange={(e) => setSpeciesType(e.target.value)}
              className="w-full bg-transparent border border-white/15 px-4 py-3 rounded-xl focus:outline-none focus:border-[var(--forest-green)]"
            />

            <select
              value={speciesName}
              onChange={(e) => setSpeciesName(e.target.value)}
              className="w-full bg-transparent border border-white/15 px-4 py-3 rounded-xl focus:outline-none focus:border-[var(--forest-green)]"
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
              className="w-full bg-transparent border border-white/15 px-4 py-3 rounded-xl focus:outline-none focus:border-[var(--forest-green)]"
            />

            <label>
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center cursor-pointer hover:border-[var(--leaf-green)] transition">
                Upload your professional photograph
              </div>
            </label>

            {preview && (
              <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-xl">
                <Image src={preview} alt="Preview" fill className="object-cover" />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--forest-green)] hover:bg-[var(--leaf-green)] text-white font-semibold py-4 rounded-2xl transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit to Curated Gallery"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
