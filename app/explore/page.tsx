"use client";

import { useSession } from "next-auth/react";
import WildlifeMap from "@/components/WildlifeMap";
import EndangeredAnimalsMap from "@/components/EndangeredAnimalsMap";
import SpeciesList from "@/components/SpeciesList";

export default function ExplorePage() {
  const { data: session } = useSession();
  const isOfficer = session?.user?.role === "officer";

  return (
    <section className="bg-gradient-to-b from-[#F5F5DC] via-[#F8F6EE] to-[#F5F5DC] min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* ===== Hero Section ===== */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2E7D32] tracking-tight">
            Explore Wildlife Across Sri Lanka
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover biodiversity hotspots, monitor endangered species,
            and visualize conservation zones across the island.
          </p>

          {isOfficer && (
            <div className="mt-8 inline-flex items-center px-5 py-2 rounded-full 
                            bg-red-50 text-red-700 text-sm font-semibold 
                            border border-red-200 shadow-sm">
              Officer Access Enabled
            </div>
          )}
        </div>

        {/* ===== Public Map Section ===== */}
        <div className="mb-28">

          <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                Biodiversity Observations Map
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Community-reported wildlife sightings across Sri Lanka.
              </p>
            </div>

            <span className="text-xs uppercase tracking-wider text-gray-400">
              Public Layer
            </span>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
            <WildlifeMap />
          </div>
        </div>

        {/* ===== Officer Restricted Section ===== */}
        {isOfficer && (
          <div className="mb-28">

            <div className="flex items-end justify-between mb-8 border-b border-red-100 pb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                  Restricted Endangered Species Monitoring Layer
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Strategic conservation data accessible to authorized officers only.
                </p>
              </div>

              <span className="text-xs uppercase tracking-wider text-red-400">
                Restricted Layer
              </span>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl border border-red-100 bg-white p-8">
              <EndangeredAnimalsMap />
            </div>
          </div>
        )}

        {/* ===== Species Dashboard Section ===== */}
        <div>

          <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                Conservation Status Overview
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Species risk classification and habitat insights.
              </p>
            </div>

            <span className="text-xs uppercase tracking-wider text-gray-400">
              Analytics Panel
            </span>
          </div>

          <div className="rounded-3xl bg-white shadow-2xl border border-gray-200 p-8">
            <SpeciesList />
          </div>
        </div>

      </div>
    </section>
  );
}