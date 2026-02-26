"use client";

import { useState, useMemo } from "react";

interface UserType {
  _id: string;
  username: string;
  email: string;
  role: string;
  isVerified: boolean;
  isBlocked: boolean;
}

export default function UsersTable({
  users,
}: {
  users: UserType[];
}) {
  const [userList, setUserList] = useState(users);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const toggleBlock = async (userId: string) => {
    try {
      setLoadingId(userId);

      const res = await fetch("/api/admin/users/block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      setUserList((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isBlocked: data.isBlocked } : u
        )
      );
    } catch {
      alert("Request failed");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredUsers = useMemo(() => {
    return userList.filter((user) => {
      const matchesSearch =
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [search, roleFilter, userList]);

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by username or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          <option value="tourist">Tourist</option>
          <option value="photographer">Photographer</option>
          <option value="officer">Officer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-100 text-zinc-600 uppercase text-xs">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Verified</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-zinc-50 transition"
              >
                <td className="p-4">
                  <div>
                    <p className="font-semibold text-zinc-800">
                      {user.username}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {user.email}
                    </p>
                  </div>
                </td>

                <td className="p-4 capitalize">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                    {user.role}
                  </span>
                </td>

                <td className="p-4">
                  {user.isVerified ? (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      Verified
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                      Not Verified
                    </span>
                  )}
                </td>

                <td className="p-4">
                  {user.isBlocked ? (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                      Blocked
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      Active
                    </span>
                  )}
                </td>

                <td className="p-4 text-right">
                  <button
                    onClick={() => toggleBlock(user._id)}
                    disabled={loadingId === user._id}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      user.isBlocked
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    {loadingId === user._id
                      ? "Processing..."
                      : user.isBlocked
                      ? "Unblock"
                      : "Block"}
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-zinc-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}