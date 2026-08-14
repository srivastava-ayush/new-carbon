"use client";

interface StepCardProps {
  num: string;
  title: string;
  description: string;
  active?: boolean;
  compact?: boolean;
  onClick?: () => void;
}

export default function StepCard({ num, title, description, active = false, compact = false, onClick }: StepCardProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`group flex w-full items-start rounded-[16px] border text-left transition-all duration-300 ${
        compact
          ? "gap-[16px] p-[16px] md:p-[18px]"
          : "gap-[24px] p-[24px] md:p-[28px]"
      } ${
        active ? "border-[#16a34a]/30 bg-[#f2faf5]" : "border-black/10 bg-white hover:border-[#16a34a]/25 hover:bg-[#fafff8]"
      }`}
    >
      <span
        className={`font-display leading-none transition-colors duration-300 ${
          compact ? "text-[22px] md:text-[26px]" : "text-[30px] md:text-[38px]"
        } ${active ? "text-[#16a34a]" : "text-black/40 group-hover:text-[#16a34a]/70"}`}
      >
        {num}
      </span>
      <div className="flex flex-col gap-[8px]">
        <h3
          className={`font-display leading-[1.1] tracking-[-0.4px] text-black ${
            compact ? "text-[18px] md:text-[20px]" : "text-[22px] md:text-[26px]"
          }`}
        >
          {title}
        </h3>
        <p
          className={`leading-[1.45] tracking-[-0.14px] text-[#848484] ${
            compact ? "text-[13px] md:text-[14px]" : "text-[15px] md:text-[16px]"
          }`}
        >
          {description}
        </p>
      </div>
    </button>
  );
}