import Link from "next/link";
import type { ReactNode } from "react";

interface CarbonCardProps {
  /** Ghost number rendered large in the top-right corner (e.g. "01"). */
  num?: string;
  /** Pill badge content — short uppercase text or a small icon. */
  badge?: ReactNode;
  /** Optional block rendered between the badge and the title (avatar, quote glyph, media panel). */
  header?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Body rendered after the description — lists, notes, media. */
  children?: ReactNode;
  /** Bottom block (with the top border) — chips, CTAs, credits. */
  footer?: ReactNode;
  /** Anchor id; also adds scroll offset for sticky-header pages. */
  id?: string;
  className?: string;
  /** Renders the card as a link — internal routes use next/link, mailto/tel/http use <a>. */
  href?: string;
  /**
   * Reverses the palette: solid green by default, flipping to white on hover
   * (the inverse of the default white → green behaviour).
   */
  inverted?: boolean;
  /** Text alignment of the card's built-in slots. Defaults to "left". */
  align?: "left" | "center";
}

const present = (v: ReactNode) =>
  v !== undefined && v !== null && v !== false && v !== "";

const BASE =
  "group relative flex h-full flex-col overflow-hidden rounded-[24px] p-[24px] transition-all duration-300 hover:-translate-y-[4px] md:p-[28px]";

const SHELL = {
  normal: `${BASE} border border-[#188f8b]/15 bg-white hover:border-[#188f8b] hover:bg-[#188f8b] hover:shadow-[0_32px_80px_rgba(11,59,56,0.28)]`,
  inverted: `${BASE} border border-[#188f8b] bg-[#188f8b] hover:border-[#188f8b] hover:bg-white hover:shadow-[0_32px_80px_rgba(11,59,56,0.18)]`,
};

const GHOST = {
  normal:
    "pointer-events-none absolute -top-[26px] right-[14px] font-display text-[128px] leading-none text-[#188f8b]/[0.07] transition-colors duration-500 group-hover:text-white/[0.14]",
  inverted:
    "pointer-events-none absolute -top-[26px] right-[14px] font-display text-[128px] leading-none text-white/[0.14] transition-colors duration-500 group-hover:text-[#188f8b]/[0.07]",
};

const RULE = {
  normal:
    "absolute top-0 left-0 h-[3px] w-[34px] rounded-full bg-gradient-to-r from-[#188f8b] to-[#3faea7]/40 transition-all duration-500 ease-out group-hover:w-[calc(100%-0px)] group-hover:from-white/60 group-hover:to-white/20",
  inverted:
    "absolute top-0 left-0 h-[3px] w-[34px] rounded-full bg-gradient-to-r from-white/60 to-white/20 transition-all duration-500 ease-out group-hover:w-[calc(100%-0px)] group-hover:from-[#188f8b] group-hover:to-[#3faea7]/40",
};

const PILL = {
  normal:
    "rounded-full border border-[#188f8b]/25 bg-[#188f8b]/[0.06] px-[11px] py-[5px] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#188f8b] transition-colors duration-300 group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white",
  inverted:
    "rounded-full border border-white/30 bg-white/10 px-[11px] py-[5px] text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 group-hover:border-[#188f8b]/25 group-hover:bg-[#188f8b]/[0.06] group-hover:text-[#188f8b]",
};

const TITLE = {
  normal:
    "relative mt-[22px] font-display text-[26px] leading-[1.05] tracking-[-0.5px] text-black transition-colors duration-300 group-hover:text-white md:text-[28px]",
  inverted:
    "relative mt-[22px] font-display text-[26px] leading-[1.05] tracking-[-0.5px] text-white transition-colors duration-300 group-hover:text-black md:text-[28px]",
};

const DESC = {
  normal:
    "text-[#848484] transition-colors duration-300 group-hover:text-[#ade5df]/85",
  inverted:
    "text-[#ade5df]/85 transition-colors duration-300 group-hover:text-[#848484]",
};

const FOOTER = {
  normal:
    "border-black/[0.07] transition-colors duration-300 group-hover:border-white/15",
  inverted:
    "border-white/15 transition-colors duration-300 group-hover:border-black/[0.07]",
};

export default function CarbonCard({
  num,
  badge,
  header,
  title,
  description,
  children,
  footer,
  id,
  className = "",
  href,
  inverted = false,
  align = "left",
}: CarbonCardProps) {
  const hasChildren = present(children);
  const hasTitleOrDesc = present(title) || present(description);
  const v = inverted ? "inverted" : "normal";
  const centered = align === "center";

  const body = (
    <>
      {present(num) && (
        <span aria-hidden className={GHOST[v]}>
          {num}
        </span>
      )}

      <span className={RULE[v]} />

      {present(badge) && (
        <div
          className={`relative flex items-center gap-[10px]${
            centered ? " justify-center" : ""
          }`}
        >
          <span className={PILL[v]}>{badge}</span>
        </div>
      )}

      {present(header) && (
        <div className={`relative${centered ? " text-center" : ""}`}>
          {header}
        </div>
      )}

      {present(title) && (
        <h3 className={`${TITLE[v]}${centered ? " text-center" : ""}`}>
          {title}
        </h3>
      )}

      {present(description) && (
        <p
          className={`relative mt-[12px] text-[14px] leading-[1.55] tracking-[-0.14px] ${DESC[v]}${
            centered ? " text-center" : ""
          } ${hasChildren ? "" : "flex-1"}`}
        >
          {description}
        </p>
      )}

      {hasChildren && (
        <div
          className={`flex flex-1 flex-col gap-[12px]${
            centered ? " items-center" : ""
          } ${hasTitleOrDesc ? "mt-[12px]" : ""}`}
        >
          {children}
        </div>
      )}

      {present(footer) && (
        <div
          className={`relative mt-[26px] border-t pt-[20px] ${FOOTER[v]}${
            centered ? " text-center" : ""
          }`}
        >
          {footer}
        </div>
      )}
    </>
  );

  const classes = `${SHELL[v]} ${id ? "scroll-mt-[100px]" : ""} ${className}`;

  if (href) {
    if (/^(https?:\/\/|mailto:|tel:)/.test(href)) {
      return (
        <a id={id} href={href} className={classes}>
          {body}
        </a>
      );
    }

    return (
      <Link id={id} href={href} className={classes}>
        {body}
      </Link>
    );
  }

  return (
    <article id={id} className={classes}>
      {body}
    </article>
  );
}
