import Link from "next/link";
import { MapPin, ArrowRight, Clock } from "lucide-react";

import { IService } from "@/lib/types";

interface ServiceCardProps {
  service: IService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image Placeholder */}
      <div className="relative h-48 overflow-hidden bg-linear-to-br from-blue-100 to-slate-100">
        <div className="flex h-full items-center justify-center">
          <span className="text-5xl">🛠️</span>
        </div>

        {/* Status */}
        <div className="absolute right-3 top-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              service.status === "OPEN"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {service.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
          Service
        </div>

        {/* Title */}
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {service.description}
        </p>

        {/* Technician */}
        <div className="mt-3 flex items-center gap-2">
         

          <div className="flex">
            <p className="text-sm text-slate-400">Technician:</p>

            <p className="text-sm font-semibold text-slate-700 pl-2
            ">
              {service.technician.name}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={16} className="text-slate-400" />
          <span>{service.location}</span>
        </div>

        {/* Bottom */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          {/* Price */}
          <div>
            <p className="text-xs text-slate-400">Starting from</p>

            <p className="text-xl font-bold text-slate-900">৳{service.price}</p>
          </div>

          {/* Details */}
          <Link
            href={`/technicians/${service.technician.id}?serviceId=${service.id}`}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
