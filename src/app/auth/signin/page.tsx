'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { login } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/ui/Logo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { EASE, fadeUp, stagger } from '@/lib/animations';

const TRUST_STATS = [
  { value: '4.2M tCO₂e', label: 'Emissions tracked' },
  { value: '128k offsets', label: 'Verified & retired' },
  { value: 'GHG Protocol', label: 'Fully aligned' },
];

export default function SignInPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const reduced = useReducedMotion();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const container = reduced ? { hidden: {}, visible: {} } : stagger(0.08, 0.1);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    try {
      const res = await login(email, password);
      if (!res.success || !res.data?.token) {
        setError(res.message || 'Failed to sign in. Try again');
        setIsPending(false);
        return;
      }
      setAuth(res.data.token, res.data.user);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in. Try again');
      setIsPending(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* ── Left Panel — Branding ── */}
      <div className="relative hidden flex-1 flex-col justify-between overflow-hidden p-[64px] lg:flex xl:p-[80px]">
        {/* Background wash */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_0%,#ffffff_0%,#f4faf9_48%,#e6f3f2_100%)]" />

        {/* Faint engineering grid */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'linear-gradient(rgba(24,143,139,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(24,143,139,0.05) 1px, transparent 1px)',
            backgroundSize: '88px 88px',
            maskImage: 'radial-gradient(75% 65% at 50% 38%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(75% 65% at 50% 38%, black, transparent)',
          }}
        />

        {/* Readability overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,#fbfcfa_6%,rgba(251,252,250,0.86)_30%,rgba(251,252,250,0)_58%)]" />

        {/* Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col"
        >
          {/* Logo */}
          <motion.div variants={fadeUp}>
            <Link
              href="/"
              aria-label="CarbonSynq — back to home"
              className="inline-flex items-center gap-[14px] rounded-lg transition-opacity duration-200 hover:opacity-70"
            >
              <Logo className="h-[52px] w-[52px]" />
              <span className="font-display text-[28px] font-bold tracking-[-0.5px] text-[#0b1f1e]">
                CarbonSynq
              </span>
            </Link>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mt-[56px] max-w-[520px] font-display text-[44px] leading-[1.05] tracking-[-1.2px] text-[#0b1f1e] xl:text-[52px]"
          >
            Making your{' '}
            <em className="not-italic text-[#188f8b]">carbon footprint</em>{' '}
            lighter than your inbox.
          </motion.h1>

          {/* Supporting line */}
          <motion.p
            variants={fadeUp}
            className="mt-[24px] max-w-[440px] text-[16px] leading-[1.6] tracking-[-0.15px] text-[#5f706e]"
          >
            Measure every tonne with audit-grade precision — then cut what
            matters. Built for accuracy, designed to make decarbonization
            measurable.
          </motion.p>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-wrap items-center gap-x-[36px] gap-y-[16px]"
        >
          {TRUST_STATS.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="flex items-baseline gap-[10px]">
              <span className="font-display text-[18px] text-[#0b1f1e]">{stat.value}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#92a5a3]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Right Panel — Login Form ── */}
      <div className="flex flex-1 items-center justify-center px-[24px] py-[48px] lg:max-w-[520px] lg:px-[48px]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[400px]"
        >
          {/* Mobile logo */}
          <motion.div variants={fadeUp} className="mb-[32px] lg:hidden">
            <Link
              href="/"
              aria-label="CarbonSynq — back to home"
              className="inline-flex items-center gap-[12px] rounded-lg transition-opacity duration-200 hover:opacity-70"
            >
              <Logo className="h-[40px] w-[40px]" />
              <span className="font-display text-[22px] font-bold tracking-[-0.5px] text-[#0b1f1e]">
                CarbonSynq
              </span>
            </Link>
          </motion.div>

          {/* Card */}
          <motion.div
            variants={fadeUp}
            className="rounded-[22px] border border-black/[0.06] bg-white p-[32px] shadow-[0_24px_64px_rgba(11,59,56,0.10)] sm:p-[36px]"
          >
            <h2 className="font-display text-[26px] font-bold tracking-[-0.6px] text-[#0b1f1e]">
              Welcome back
            </h2>
            <p className="mt-[6px] text-[14px] leading-[1.5] text-[#5f706e]">
              Sign in to your account to continue
            </p>

            <form onSubmit={handleSubmit} className="mt-[28px] flex flex-col gap-[18px]">
              {/* Email */}
              <div className="flex flex-col gap-[6px]">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-[6px]">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="rounded-lg bg-destructive/[0.06] px-[12px] py-[10px] text-[13px] font-medium text-destructive"
                >
                  {error}
                </motion.p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="mt-[4px] h-[48px] w-full rounded-full bg-[#0b3b38] text-[15px] font-semibold tracking-[-0.1px] text-white shadow-[0_10px_28px_rgba(11,59,56,0.22)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#0e4a47] hover:shadow-[0_16px_36px_rgba(11,59,56,0.28)] active:scale-[0.99]"
              >
                {isPending ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>

            {/* Signup link */}
            <p className="mt-[24px] text-center text-[13.5px] text-[#5f706e]">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/signup"
                className="font-semibold text-[#188f8b] transition-colors hover:text-[#0d4f4b]"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
