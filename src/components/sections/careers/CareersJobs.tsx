"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/animations";
import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";

const CATEGORIES = ["All", "Engineering", "Climate Science", "Product", "Policy", "Go-to-Market"];

interface Job {
  type: string;
  category: string;
  title: string;
  description: string;
  location: string;
  locationType: string;
}

const JOBS: Job[] = [
  {
    type: "Full-time",
    category: "Engineering",
    title: "Senior Backend Engineer",
    description: "Architect and scale high-throughput pipeline infrastructure parsing real-time emissions data across 38 jurisdictions.",
    location: "Remote",
    locationType: "Remote",
  },
  {
    type: "Full-time",
    category: "Climate Science",
    title: "Climate Data Scientist",
    description: "Refine mathematical models using peer-reviewed methodology and remote sensing inputs for Scope 3 estimation.",
    location: "Amsterdam or Remote",
    locationType: "Hybrid",
  },
  {
    type: "Full-time",
    category: "Engineering",
    title: "ML Engineer — Emissions Modelling",
    description: "Deploy advanced ML methodologies to predict, map, and attribute supply chain carbon intensities.",
    location: "Remote",
    locationType: "Remote",
  },
  {
    type: "Full-time",
    category: "Product",
    title: "Product Manager — Reporting Suite",
    description: "Lead CSRD, GHG Protocol, and SEC disclosure platform workflows from conception to launch.",
    location: "Remote",
    locationType: "Remote",
  },
  {
    type: "Contract",
    category: "Policy",
    title: "Carbon Policy Advisor",
    description: "Synthesize global regulatory mandates into actionable carbon intelligence product features.",
    location: "Brussels or Remote",
    locationType: "Hybrid",
  },
  {
    type: "Full-time",
    category: "Engineering",
    title: "Senior Frontend Engineer",
    description: "Craft highly immersive, performant React dashboards and interactive data visualizations for enterprise clients.",
    location: "Remote",
    locationType: "Remote",
  },
  {
    type: "Full-time",
    category: "Go-to-Market",
    title: "Enterprise Account Executive",
    description: "Drive strategic engagement with Fortune 500 sustainability executives to accelerate carbon management.",
    location: "North America",
    locationType: "Remote",
  },
  {
    type: "Full-time",
    category: "Climate Science",
    title: "Life Cycle Assessment Specialist",
    description: "Perform high-fidelity LCAs and integrate real-world datasets into the platform database model.",
    location: "Singapore or Remote",
    locationType: "Hybrid",
  },
  {
    type: "Full-time",
    category: "Policy",
    title: "Head of Regulatory Affairs",
    description: "Lead CarbonSynq's engagement with international standards-setting bodies and policy groups.",
    location: "Brussels",
    locationType: "On-site",
  },
  {
    type: "Full-time",
    category: "Product",
    title: "UX Researcher",
    description: "Direct qualitative and quantitative user research mapping corporate sustainability workflows.",
    location: "Remote",
    locationType: "Remote",
  },
];

export default function CareersJobs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const reduced = useReducedMotion();

  const filtered = activeCategory === "All" ? JOBS : JOBS.filter((j) => j.category === activeCategory);

  return (
    <Section id="open-roles" narrow>
      <Reveal>
        <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#188f8b]/60 via-[#188f8b]/20 to-transparent" />
        <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#188f8b]">
          Opportunities
        </span>
        <div className="mb-[16px] flex flex-col gap-[12px] sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:text-[64px]">
            Join the Mandate
          </h2>
          <span className="rounded-full border border-[#188f8b]/20 bg-[#188f8b]/[0.07] px-[14px] py-[6px] text-[12px] font-semibold tracking-[-0.1em] text-[#188f8b]">
            {JOBS.length} Live Openings
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mb-[32px] flex flex-wrap gap-[8px]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-[18px] py-[8px] text-[13px] font-medium tracking-[-0.1px] transition-all duration-200 ${
                activeCategory === cat
                  ? "border-[#188f8b] bg-[#188f8b] text-white shadow-[0_4px_12px_rgba(24,143,139,0.25)]"
                  : "border-black/10 bg-white text-[#52525b] hover:border-[#188f8b]/40 hover:text-[#0b1f1e]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="flex flex-col gap-[10px]">
        {filtered.map((job, i) => (
          <Reveal key={job.title} delay={0.05 + i * 0.04}>
            <div className="group relative flex flex-col overflow-hidden rounded-[18px] border border-black/[0.06] bg-white p-[24px] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#188f8b]/20 hover:shadow-[0_16px_40px_rgba(11,59,56,0.06)] sm:flex-row sm:items-center sm:justify-between md:p-[28px]">
              <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#188f8b] to-[#43b0a9] transition-transform duration-500 group-hover:scale-x-100" />

              <div className="flex-1">
                <div className="mb-[10px] flex flex-wrap items-center gap-[8px]">
                  <span className="rounded-full border border-black/[0.08] bg-[#fafafa] px-[10px] py-[3px] text-[11px] font-semibold text-[#52525b]">
                    {job.type}
                  </span>
                  <span className="rounded-full border border-[#188f8b]/20 bg-[#188f8b]/[0.06] px-[10px] py-[3px] text-[11px] font-semibold text-[#188f8b]">
                    {job.category}
                  </span>
                </div>

                <h3 className="text-[18px] font-semibold tracking-[-0.3px] text-[#0b1f1e]">
                  {job.title}
                </h3>
                <p className="mt-[6px] text-[13.5px] leading-[1.5] tracking-[-0.1px] text-[#7c8f8d]">
                  {job.description}
                </p>

                <div className="mt-[12px] flex items-center gap-[16px]">
                  <span className="flex items-center gap-[6px] text-[12px] text-[#848484]">
                    <svg viewBox="0 0 16 16" fill="none" className="h-[13px] w-[13px]">
                      <path d="M8 1.333A4.667 4.667 0 003.333 6c0 3.5 4.667 8.667 4.667 8.667S12.667 9.5 12.667 6A4.667 4.667 0 008 1.333zm0 6.334a1.667 1.667 0 110-3.334 1.667 1.667 0 010 3.334z" fill="currentColor" />
                    </svg>
                    {job.location}
                  </span>
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${
                    job.locationType === "Remote" ? "text-[#16a34a]" :
                    job.locationType === "Hybrid" ? "text-[#d97706]" :
                    "text-[#6366f1]"
                  }`}>
                    {job.locationType}
                  </span>
                </div>
              </div>

              <div className="mt-[18px] sm:mt-0 sm:ml-[24px]">
                <a
                  href="mailto:sales@Carbonsynqnetworks.com"
                  className="inline-flex h-[42px] items-center justify-center gap-[8px] rounded-full border border-[#188f8b]/20 bg-white px-[22px] text-[13px] font-semibold tracking-[-0.12px] text-[#188f8b] transition-all duration-300 hover:border-[#188f8b] hover:bg-[#188f8b] hover:text-white hover:shadow-[0_8px_20px_rgba(24,143,139,0.25)]"
                >
                  Apply Now
                  <svg viewBox="0 0 16 16" fill="none" className="h-[13px] w-[13px] transition-transform duration-300 group-hover:translate-x-[2px]">
                    <path d="M4 12L12 4M5 4h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
