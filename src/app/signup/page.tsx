"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await register(firstName, lastName, email, password);
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafafa] px-[20px] py-[40px]">
      <div className="w-full max-w-[400px]">
        <div className="mb-[40px] flex justify-center">
          <div className="flex items-center gap-[10px]">
            <Logo className="h-[28px] w-auto drop-shadow-[0_2px_6px_rgba(22,163,74,0.25)]" />
            <span className="font-display text-[26px] font-bold tracking-[-0.3px] text-black">
              Carbonsynq
            </span>
          </div>
        </div>

        <div className="rounded-[16px] border border-black/[0.08] bg-white p-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <h1 className="mb-[24px] text-center font-display text-[24px] font-semibold tracking-[-0.4px] text-black">
            Create an account
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
            {error && (
              <div className="rounded-[8px] bg-red-50 p-[12px] text-[13px] font-medium text-red-600">
                {error}
              </div>
            )}

            <div className="flex gap-[16px]">
              <div className="flex flex-1 flex-col gap-[6px]">
                <label className="text-[13px] font-medium text-[#71717a]">First name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="h-[44px] w-full rounded-[8px] border border-black/[0.1] px-[14px] text-[14px] text-black outline-none transition-colors focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-[6px]">
                <label className="text-[13px] font-medium text-[#71717a]">Last name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-[44px] w-full rounded-[8px] border border-black/[0.1] px-[14px] text-[14px] text-black outline-none transition-colors focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] font-medium text-[#71717a]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-[44px] rounded-[8px] border border-black/[0.1] px-[14px] text-[14px] text-black outline-none transition-colors focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
              />
            </div>

            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] font-medium text-[#71717a]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-[44px] rounded-[8px] border border-black/[0.1] px-[14px] text-[14px] text-black outline-none transition-colors focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-[8px] flex h-[44px] w-full items-center justify-center rounded-[8px] bg-[#16a34a] text-[14px] font-semibold text-white transition-colors hover:bg-[#15803d] disabled:opacity-70"
            >
              {isSubmitting ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <div className="mt-[24px] text-center text-[13px] text-[#71717a]">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#16a34a] hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
