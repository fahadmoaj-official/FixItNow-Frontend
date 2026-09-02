import { getAdminUsers } from "./_actions/getAdminUsers";

import { AdminStats } from "./_components/AdminStats";
import { getActiveBookings } from "./_actions/getActiveBookings";

export default async function AdminDashboard() {
  const usersResult = await getAdminUsers();
  const bookingsResult = await getActiveBookings();


  const users = usersResult.data || [];

  
 
  console.log("Bookings Result:", bookingsResult.count);

  const totalUsers = users.filter(
    (user:any) => user.role === "CUSTOMER"
  ).length;

  const totalTechnicians = users.filter(
    (user:any) => user.role === "TECHNICIAN"
  ).length;

  const activeBookings = bookingsResult.count || 0;
  console.log("Active Bookings:", activeBookings);

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Platform Overview
          </h1>

          <p className="mt-2 text-slate-500">
            Manage users, technicians and bookings.
          </p>
        </div>

        <AdminStats
          totalUsers={totalUsers}
          totalTechnicians={totalTechnicians}
          activeBookings={activeBookings}
        />

      </div>
    </main>
  );
}