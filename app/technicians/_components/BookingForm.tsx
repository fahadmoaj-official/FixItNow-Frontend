
"use client"

import { useActionState } from "react"
import {
  CalendarDays,
  Clock,
  Loader2,
} from "lucide-react"

import { createBooking } from "../_actions/createBooking"

interface BookingFormProps {
  technicianId: string
  serviceId: string
  isAvailable: boolean
}

const initialState = {
  success: false,
  message: "",
}

export function BookingForm({
  technicianId,
  serviceId,
  isAvailable,
}: BookingFormProps) {
  const [state, action, pending] = useActionState(
    createBooking,
    initialState
  )

  return (
    <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold text-slate-900">
        Book This Technician
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Select your preferred date and time.
      </p>

      {!isAvailable && (
        <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          This technician is currently unavailable.
        </div>
      )}

      <form action={action} className="mt-6 space-y-5">

        {/* Hidden IDs */}
        <input
          type="hidden"
          name="serviceId"
          value={serviceId}
        />

        <input
          type="hidden"
          name="technicianId"
          value={technicianId}
        />

        {/* Booking Date */}
        <div>
          <label
            htmlFor="bookingDate"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Booking Date
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="bookingDate"
              name="bookingDate"
              type="date"
              required
              disabled={!isAvailable}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        {/* Start Time */}
        <div>
          <label
            htmlFor="startTime"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Start Time
          </label>

          <div className="relative">
            <Clock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="startTime"
              name="startTime"
              type="time"
              required
              disabled={!isAvailable}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        {/* End Time */}
        <div>
          <label
            htmlFor="endTime"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            End Time
          </label>

          <div className="relative">
            <Clock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="endTime"
              name="endTime"
              type="time"
              required
              disabled={!isAvailable}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        {/* Backend Message */}
        {state.message && (
          <div
            className={`rounded-xl p-4 text-sm ${
              state.success
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {state.message}
          </div>
        )}

        {/* Book */}
        <button
          type="submit"
          disabled={pending || !isAvailable}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Booking...
            </>
          ) : (
            "Book Now"
          )}
        </button>

      </form>
    </div>
  )
}
