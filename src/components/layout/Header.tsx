"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { EASE } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { label: "Pricing", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const { isAuthenticated, user, logout } = useAuth();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#188f8b] to-[#3faea7]"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={reduced ? false : { y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed top-0 right-0 left-0 z-50 pt-[14px] md:pt-[20px]"
      >
        <Container narrow>
          <div
            className={`flex h-[58px] items-center justify-between rounded-full border px-[10px] pl-[22px] transition-all duration-500 md:h-[64px] ${
              scrolled || open
                ? "border-black/[0.06] bg-gray-100 shadow-[0_12px_40px_rgba(11,59,56,0.08)] backdrop-blur-xl"
                : "border-transparent bg-gradient-to-r from-[#188f8b] to-gray-100 backdrop-blur-md"
            }`}
          >
            <Link href="/" className="flex items-center gap-[9px]">
              <Logo className="h-[24px] w-auto" />
              <span className="font-display text-[21px] tracking-[-0.3px] text-[#0b1f1e]">
                Carbonsynq
              </span>
            </Link>

            <div className="flex items-center gap-[8px]">
              <nav className="mr-[6px] hidden items-center gap-[26px] lg:flex">
                {NAV_LINKS.map(
                  (item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="relative text-[13.5px] font-medium tracking-[-0.13px] text-[#3f5a55] transition-colors duration-200 hover:text-[#0b1f1e] after:absolute after:-bottom-[5px] after:left-0 after:h-[1.5px] after:w-0 after:bg-[#188f8b] after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item.label}
                    </a>
                  ),
                )}
              </nav>

              {isAuthenticated ? (
                <div className="hidden items-center gap-[12px] md:flex">
                  <span className="text-[13.5px] font-medium tracking-[-0.13px] text-[#3f5a55]">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <button
                    onClick={logout}
                    className="inline-flex h-[42px] items-center justify-center rounded-full bg-[#0b1f1e] px-[22px] text-[13.5px] font-semibold tracking-[-0.14px] text-white transition-all duration-300 hover:bg-black"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden items-center gap-[12px] md:flex">
                  <Link
                    href="/auth/signin"
                    className="inline-flex h-[42px] items-center justify-center rounded-full bg-[#0b3b38] px-[22px] text-[13.5px] font-semibold tracking-[-0.14px] text-white shadow-[0_8px_22px_rgba(11,59,56,0.22)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#0e4a47]"
                  >
                    Log in
                  </Link>
                </div>
              )}

              <button
                onClick={() => setOpen(true)}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full text-[#0b1f1e] transition-colors hover:bg-black/[0.05] md:hidden"
                aria-label="Open menu"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </Container>

        {open && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-[rgba(251,252,250,0.9)] backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <button
              onClick={() => setOpen(false)}
              className="absolute top-[26px] right-[26px] z-10 flex h-[44px] w-[44px] items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#0b1f1e]"
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <motion.nav
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
              className="absolute top-1/2 left-[30px] flex -translate-y-1/2 flex-col gap-[26px]"
            >
              {NAV_LINKS.map(
                (item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-[42px] leading-none text-[#0b1f1e]"
                  >
                    {item.label}
                  </a>
                ),
              )}
              {!isAuthenticated && (
                <Link
                  href="/auth/signin"
                  onClick={() => setOpen(false)}
                  className="font-display text-[42px] leading-none text-[#188f8b]"
                >
                  Log in
                </Link>
              )}
            </motion.nav>

            <div className="absolute right-[24px] bottom-[32px] left-[24px]">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="flex h-[60px] w-full items-center justify-center rounded-full bg-[#0b1f1e] text-[16px] font-semibold text-white shadow-[0_16px_40px_rgba(11,31,30,0.3)]"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/auth/signup"
                  onClick={() => setOpen(false)}
                  className="flex h-[60px] w-full items-center justify-center rounded-full bg-[#0b3b38] text-[16px] font-semibold text-white shadow-[0_16px_40px_rgba(11,59,56,0.3)]"
                >
                  Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </motion.header>
    </>
  );
}
