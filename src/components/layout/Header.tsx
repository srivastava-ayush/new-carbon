"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";

const NAV_LINKS = [
  { label: "Product", href: "/product" },
  { label: "Company", href: "/company" },
  { label: "Resources", href: "/resources" },
  { label: "News", href: "/news" },
];

const CONTACT_EMAIL = "sales@arianetworks.com";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link =
    "text-black text-[14px] font-semibold tracking-[-0.14px] transition-opacity duration-200 hover:opacity-60";

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-white/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container className="flex h-[70px] items-center justify-between md:h-[100px]">
        <Link href="/" className="flex items-center">
          <span className="font-display text-[22px] font-bold tracking-[-0.3px] text-black">Carbonsynq</span>
        </Link>

        <div className="flex items-center gap-[20px]">
          <nav className="hidden items-center gap-[20px] md:flex">
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href} className={link}>
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hidden h-[40px] w-[100px] items-center justify-center rounded-full bg-[#16a34a] text-[14px] font-semibold tracking-[-0.14px] text-white transition-colors duration-200 hover:bg-[#15803d] md:inline-flex"
          >
            Contact
          </a>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center text-black md:hidden"
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-[rgba(13,13,13,0.95)] backdrop-blur-[10px]" onClick={() => setOpen(false)} />
          <div className="absolute inset-[20px] flex flex-col rounded-[10px] bg-white">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-[20px] left-[20px] flex h-[24px] w-[24px] items-center justify-center text-black"
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <nav className="absolute top-1/2 left-[20px] flex -translate-y-1/2 flex-col gap-[25px]">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="pl-[20px] font-display text-[40px] leading-[0.95] text-black"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="absolute right-[20px] bottom-[20px] left-[20px]">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => setOpen(false)}
                className="flex h-[60px] w-full items-center justify-center rounded-[70px] bg-[#16a34a] text-[16px] font-semibold text-white"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}