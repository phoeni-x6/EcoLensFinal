import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import OfficersTable from "./OfficersTable";

export default async function OfficersPage() {
  await connectDB();

  const pendingOfficers = await User.find({
    role: "officer",
    officerApproved: false,
  }).lean();

  const approvedOfficersCount = await User.countDocuments({
    role: "officer",
    officerApproved: true,
  });

  const serialized = pendingOfficers.map((o: any) => ({
    ...o,
    _id: o._id.toString(),
  }));

  const pendingCount = serialized.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-800">
          Officer Approval Center
        </h1>
        <p className="text-zinc-500 mt-1">
          Review and manually approve wildlife officer accounts.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-zinc-500">
            Pending Approvals
          </p>
          <p className="text-3xl font-bold mt-2">
            {pendingCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-zinc-500">
            Approved Officers
          </p>
          <p className="text-3xl font-bold mt-2">
            {approvedOfficersCount}
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow p-6">
        <OfficersTable officers={serialized} />
      </div>
    </div>
  );
}