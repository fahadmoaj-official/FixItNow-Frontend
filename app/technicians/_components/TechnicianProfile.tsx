
import {
  Star,
  UserRound,
  Briefcase,
} from "lucide-react"

import { ITechnician } from "@/lib/types"
import { BookingForm } from "./BookingForm"
import { TechnicianReviews } from "./TechnicianReviews"

interface TechnicianProfileProps {
  technician: ITechnician
  serviceId: string
}

export function TechnicianProfile({
  technician,
  serviceId,
}: TechnicianProfileProps) {
  const profile = technician.technicianProfiles?.[0]

  return (
    <div className="space-y-6">

      {/* Profile Header */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Cover */}
        <div className="h-36 bg-linear-to-r from-blue-600 to-blue-400" />

        <div className="px-6 pb-6 sm:px-8">

          {/* Avatar */}
          <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div className="flex items-end gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-3xl font-bold text-blue-600 shadow-md">
                {technician.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="pb-1">
                <h1 className="text-2xl font-bold text-slate-900">
                  {technician.name}
                </h1>

                <p className="text-sm text-slate-500">
                  Professional Technician
                </p>
              </div>
            </div>

            {/* Availability */}
            <div>
              {profile?.isAvailable ? (
                <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  ● Available
                </span>
              ) : (
                <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                  ● Currently unavailable
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-yellow-500">
                <Star size={18} fill="currentColor" />
                <span className="font-bold">
                  {profile?.rating?.toFixed(1) ?? "0.0"}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Rating
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-blue-600">
                <Briefcase size={18} />
                <span className="font-bold">
                  {profile?.experienceYears ?? 0}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Years Experience
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-blue-600">
                <Star size={18} />
                <span className="font-bold">
                  {profile?.totalReviews ?? 0}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Reviews
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-blue-600">
                <UserRound size={18} />
                <span className="font-bold">
                  {technician.status}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Account Status
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Left */}
        <div className="space-y-6 lg:col-span-2">

          {/* About */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              About Technician
            </h2>

            <p className="mt-3 leading-7 text-slate-500">
              {profile?.bio || "No bio available."}
            </p>
          </section>

          {/* Skills */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Skills
            </h2>

            {profile?.skills?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                No skills added yet.
              </p>
            )}
          </section>

          {/* Reviews */}
          <TechnicianReviews
            reviews={technician.reviewsReceived}
          />
        </div>

        {/* Right - Booking */}
        <div>
          <BookingForm
            technicianId={technician.id}
            serviceId={serviceId}
            isAvailable={profile?.isAvailable ?? false}
          />
        </div>

      </div>
    </div>
  )
}
