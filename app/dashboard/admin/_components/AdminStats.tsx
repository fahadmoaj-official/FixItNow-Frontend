import Link from "next/link";
import {
  Users,
  Wrench,
  CalendarCheck,
} from "lucide-react";

interface AdminStatsProps {
  totalUsers: number;
  totalTechnicians: number;
  activeBookings: number;
}

export function AdminStats({
  totalUsers,
  totalTechnicians,
  activeBookings,
}: AdminStatsProps) {

const stats = [
  {
    title: "Total Users",
    value: totalUsers,
    icon: Users,
    href: "/dashboard/admin/users",
  },
  {
    title: "Total Technicians",
    value: totalTechnicians,
    icon: Wrench,
    href: "/dashboard/admin/technicians",
  },
  {
    title: "Active Bookings",
    value: activeBookings,
    icon: CalendarCheck,
    href: "/dashboard/admin/bookings",
  },
];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Link
            key={stat.title}
            href={stat.href}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Icon size={24} />
              </div>

              <span className="text-sm text-slate-400 group-hover:text-blue-600">
                View →
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              {stat.title}
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {stat.value}
            </h2>
          </Link>
        );
      })}
    </div>
  );
}