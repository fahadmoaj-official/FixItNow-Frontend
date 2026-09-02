// import { getAdminUsers } from "../_actions/getAdminUsers";
// import { UserFilters } from "./UserFilters";
// import { UserTable } from "./UserTable";

// export default async function AdminUsersPage() {
//   const result = await getAdminUsers();

//   const users = result.data || [];


//   return (
//     <main className="min-h-screen bg-slate-50 p-6">
//       <div className="mx-auto max-w-7xl">

//         <div className="mb-8">
//           <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
//             User Management
//           </p>

//           <h1 className="mt-2 text-3xl font-bold text-slate-900">
//             All Users
//           </h1>

//           <p className="mt-2 text-slate-500">
//             Manage customers and technicians.
//           </p>
//         </div>

//         <UserFilters />

//         <UserTable users={users} />

//       </div>
//     </main>
//   );
// }

import { getAdminUsers } from "../_actions/getAdminUsers";
import { UserTable } from "./UserTable";

export default async function AdminUsersPage() {
  const result = await getAdminUsers();

  if (!result.success) {
    throw new Error(result.message);
  }

  const users = result.data || [];

  // Only customers
  const customers = users.filter(
    (user) => user.role === "CUSTOMER"
  );

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            User Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Customers
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all customers.
          </p>
        </div>

        <UserTable users={customers} />

      </div>
    </main>
  );
}