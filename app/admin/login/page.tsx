"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2, Lock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

function AdminLoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError(
          authError.message === "Invalid login credentials"
            ? "Incorrect email or password. Please try again."
            : authError.message
        );
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls = (hasError: boolean) =>
    cn(
      "w-full rounded-lg border px-4 py-3 text-sm bg-white/5 text-white placeholder-white/30",
      "outline-none transition-all duration-200",
      "focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20",
      hasError ? "border-red-400" : "border-white/15 hover:border-white/30"
    );

  return (
    <div className="min-h-screen bg-[#0B1633] flex items-center justify-center px-4">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#5A1725]/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#C9A24D]/8 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#E0C477] flex items-center justify-center mx-auto mb-4 shadow-[0_0_24px_rgba(201,162,77,0.4)]">
            <Star className="w-6 h-6 text-[#0B1633] fill-[#0B1633]" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white mb-1">
            Balaji Jyotish
          </h1>
          <p className="text-white/40 text-sm">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-[#C9A24D]" />
            <h2 className="text-white font-semibold text-base">Sign In</h2>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls(!!error)}
                placeholder="admin@balajijyotish.com"
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(inputCls(!!error), "pr-11")}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="btn-gold w-full justify-center mt-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Restricted access — Balaji Jyotish Admin only
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B1633] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#C9A24D]/30 border-t-[#C9A24D] animate-spin" />
      </div>
    }>
      <AdminLoginInner />
    </Suspense>
  );
}
