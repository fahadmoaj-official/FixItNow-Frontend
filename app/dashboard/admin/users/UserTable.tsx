"use client";

import { useState, useTransition } from "react";
import { updateUserStatus } from "../_actions/updateUserStatus";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserTableProps {
  users: User[];
}

export function UserTable({ users }: UserTableProps) {
  const [userList, setUserList] = useState(users);

  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (
    userId: string,
    currentStatus: string
  ) => {
    const newStatus =
      currentStatus === "ACTIVE"
        ? "BANNED"
        : "ACTIVE";

    startTransition(async () => {
      const result = await updateUserStatus(
        userId,
        newStatus
      );

      if (!result.success) {
        alert(result.message);
        return;
      }

      setUserList((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                status: newStatus,
              }
            : user
        )
      );
    });
  };

  const visibleUsers = userList.filter(
    (user) => user.role !== "ADMIN"
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Role
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">

            {visibleUsers.length > 0 ? (
              visibleUsers.map((user) => (
                <tr
                  key={user.id}
                  className="transition hover:bg-slate-50"
                >

                  {/* Name */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900">
                      {user.name}
                    </span>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      {user.email}
                    </span>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.role === "CUSTOMER"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-purple-50 text-purple-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.status === "ACTIVE"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-right">

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        handleStatusChange(
                          user.id,
                          user.status
                        )
                      }
                      className={`rounded-lg px-4 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                        user.status === "ACTIVE"
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                    >
                      {isPending
                        ? "Updating..."
                        : user.status === "ACTIVE"
                        ? "Ban"
                        : "Unban"}
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  No users found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}