import { getAdminUsers } from "../_actions/getAdminUsers";
import { UserTable } from "../users/UserTable";

export default async function TechniciansPage() {
  const result = await getAdminUsers();

  if (!result.success) {
    throw new Error(result.message);
  }

  const users = result.data || [];

  const technicians = users.filter(
    (user) => user.role === "TECHNICIAN"
  );

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            User Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Technicians
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all technicians.
          </p>
        </div>

        <UserTable users={technicians} />

      </div>
    </main>
  );
}