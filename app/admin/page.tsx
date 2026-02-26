import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Image from "@/models/Image";

export default async function AdminDashboard() {
  await connectDB();

  const usersCount = await User.countDocuments();

  const photographerImagesCount = await Image.countDocuments({
    source: "photographer",
  });

  const pendingOfficersCount = await User.countDocuments({
    role: "officer",
    officerApproved: false,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-800">
          Admin Dashboard
        </h1>
        <p className="text-zinc-500 mt-1">
          Overview of EcoLens system activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Total Users</p>
              <p className="text-4xl font-bold mt-2">{usersCount}</p>
            </div>
            <div className="text-5xl opacity-30">👤</div>
          </div>
        </div>

        {/* Photographer Images */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">
                Photographer Images
              </p>
              <p className="text-4xl font-bold mt-2">
                {photographerImagesCount}
              </p>
            </div>
            <div className="text-5xl opacity-30">📸</div>
          </div>
        </div>

        {/* Pending Officers */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">
                Pending Officers
              </p>
              <p className="text-4xl font-bold mt-2">
                {pendingOfficersCount}
              </p>
            </div>
            <div className="text-5xl opacity-30">🛡️</div>
          </div>
        </div>
      </div>

      {/* Quick Info Panel */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          System Summary
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-sm text-zinc-600">
          <div>
            <p className="font-semibold text-zinc-800">
              User Base
            </p>
            <p>
              {usersCount} registered users across all roles.
            </p>
          </div>

          <div>
            <p className="font-semibold text-zinc-800">
              Gallery Activity
            </p>
            <p>
              {photographerImagesCount} photographer images currently
              available.
            </p>
          </div>

          <div>
            <p className="font-semibold text-zinc-800">
              Officer Requests
            </p>
            <p>
              {pendingOfficersCount} officer accounts awaiting manual
              approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}