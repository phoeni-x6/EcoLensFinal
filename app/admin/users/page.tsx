import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import UsersTable from "./UsersTable";

export default async function AdminUsersPage() {
  await connectDB();

  const users = await User.find().sort({ createdAt: -1 }).lean();

  const serializedUsers = users.map((u: any) => ({
    ...u,
    _id: u._id.toString(),
  }));

  const totalUsers = serializedUsers.length;
  const totalPhotographers = serializedUsers.filter(
    (u: any) => u.role === "photographer"
  ).length;

  const totalOfficers = serializedUsers.filter(
    (u: any) => u.role === "officer"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-800">
          User Management
        </h1>
        <p className="text-zinc-500 mt-1">
          Manage all registered users in EcoLens
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-zinc-500">Total Users</p>
          <p className="text-3xl font-bold mt-2">
            {totalUsers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-zinc-500">
            Photographers
          </p>
          <p className="text-3xl font-bold mt-2">
            {totalPhotographers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-zinc-500">
            Wildlife Officers
          </p>
          <p className="text-3xl font-bold mt-2">
            {totalOfficers}
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow p-6">
        <UsersTable users={serializedUsers} />
      </div>
    </div>
  );
}