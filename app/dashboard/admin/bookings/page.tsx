import { getAdminBookings } from "../_actions/getAdminBookings";

export default async function AdminBookingsPage() {
  const result = await getAdminBookings();

  if (!result.success) {
    throw new Error(result.message);
  }
  // console.log("Admin Bookings Result:", result);

  const bookings = result.data || [];

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Booking Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Active Bookings
          </h1>

          <p className="mt-2 text-slate-500">
            View all currently active bookings.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Active
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {bookings.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Confirmed
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {
                bookings.filter(
                  (booking) =>
                    booking.status === "CONFIRMED"
                ).length
              }
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              In Progress
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-600">
              {
                bookings.filter(
                  (booking) =>
                    booking.status === "IN_PROGRESS"
                ).length
              }
            </p>
          </div>

        </div>

        {/* Booking Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">
                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Service
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Technician
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Booking Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* Service */}
                      <td className="px-6 py-5">
                        <p className="font-semibold text-slate-900">
                          {booking.service?.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {booking.service?.location}
                        </p>
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-5">
                        <p className="font-medium text-slate-900">
                          {booking.customer?.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {booking.customer?.email}
                        </p>
                      </td>

                      {/* Technician */}
                      <td className="px-6 py-5">
                        <p className="font-medium text-slate-900">
                          {booking.technician?.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {booking.technician?.email}
                        </p>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-5">
                        <span className="font-semibold text-slate-900">
                          ৳{Number(
                            booking.service?.price || 0
                          ).toLocaleString()}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {new Date(
                          booking.bookingDate
                        ).toLocaleDateString()}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            booking.status === "CONFIRMED"
                              ? "bg-blue-50 text-blue-600"
                              : booking.status === "IN_PROGRESS"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-yellow-50 text-yellow-600"
                          }`}
                        >
                          {booking.status}
                        </span>

                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No active bookings found.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </main>
  );
}