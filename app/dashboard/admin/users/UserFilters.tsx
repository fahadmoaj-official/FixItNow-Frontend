"use client";

import { useState } from "react";

export function UserFilters() {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const handleApply = () => {
    console.log({
      role,
      status,
    });
  };

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex flex-wrap items-end gap-4">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Role
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="h-11 w-52 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Users</option>
            <option value="CUSTOMER">Customer</option>
            <option value="TECHNICIAN">Technician</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 w-52 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="BANNED">Banned</option>
          </select>
        </div>

        <button
          onClick={handleApply}
          className="h-11 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Apply
        </button>

      </div>

    </div>
  );
}