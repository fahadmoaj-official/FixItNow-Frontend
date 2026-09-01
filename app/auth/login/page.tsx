

"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner"
import { useEffect } from "react"

import { loginActions } from "../_actions/LoginAuthaction";
import jwt ,{ JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/navigation"

const initialState = {
  success: false,
  message: "",
};

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginActions, initialState);

  const router = useRouter();

  useEffect(() => {
  if (state.message) {
    if (state.success) {
      toast.success("Login successful!");
      
      // redirect to the appropriate dashboard
      if (state.data) {
        const decodedToken = jwt.decode(state.data.accessToken) as JwtPayload;
        if (decodedToken.role === 'CUSTOMER') {
          router.push('/dashboard/customer');
        } else if (decodedToken.role === 'ADMIN') {
          router.push('/dashboard/admin');
        } else if (decodedToken.role === 'TECHNICIAN') {
          router.push('/dashboard/technician');
        }
      }
    } else {
      toast.error("Credentials are incorrect. Please try again.");
    }
  }
}, [state])

  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <Lock size={26} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to your account to continue
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">


          <form action={action} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-12 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

           

            {/* Error */}
            {!state.success && state.message && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {state.message}
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              disabled={pending}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Register */}
          <div className="mt-7 text-center text-sm text-slate-500">
            Dont have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
