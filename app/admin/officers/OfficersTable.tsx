"use client";

import { useState } from "react";

interface Officer {
  _id: string;
  username: string;
  email: string;
  dwcId: string;
}

export default function OfficersTable({
  officers,
}: {
  officers: Officer[];
}) {
  const [officerList, setOfficerList] = useState(officers);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const approveOfficer = async (userId: string) => {
    try {
      setLoadingId(userId);

      const res = await fetch("/api/admin/officers/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      // Remove approved officer from list
      setOfficerList((prev) =>
        prev.filter((o) => o._id !== userId)
      );
    } catch (err) {
      alert("Request failed");
    } finally {
      setLoadingId(null);
    }
  };

  if (officerList.length === 0) {
    return <p>No pending officers.</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      {officerList.map((officer) => (
        <div
          key={officer._id}
          className="border p-4 rounded-lg flex justify-between items-center"
        >
          <div>
            <p><strong>Name:</strong> {officer.username}</p>
            <p><strong>Email:</strong> {officer.email}</p>
            <p><strong>Officer ID:</strong> {officer.dwcId}</p>
          </div>

          <button
            onClick={() => approveOfficer(officer._id)}
            disabled={loadingId === officer._id}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loadingId === officer._id
              ? "Approving..."
              : "Approve"}
          </button>
        </div>
      ))}
    </div>
  );
}