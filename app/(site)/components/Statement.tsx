import Link from "next/link";
import type { ReactNode } from "react";

// A big, attention-grabbing statement used to break up long stretches of a page.
//   variant: "dark" (navy) or "light" (white)
//   tone:    colour of the highlighted word (amber, emerald or sky)
//   align:   where the text sits, so the bands don't all line up down the page
//   size:    "xl" for short punchy lines, "lg" for longer ones
// The highlighted word gets a hand-drawn style underline. Keep it to one short word or phrase.

type Tone = "amber" | "emerald" | "sky";
type Variant = "dark" | "light";
type Align = "left" | "center" | "right";
type Size = "xl" | "lg";

const accentClass: Record<Variant, Record<Tone, string>> = {
  dark: { amber: "text-amber-300", emerald: "text-emerald-300", sky: "text-sky-300" },
  light: { amber: "text-amber-600", emerald: "text-emerald-600", sky: "text-blue-600" },
};

const alignClass: Record<Align, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

const sizeClass: Record<Size, string> = {
  xl: "text-5xl md:text-7xl lg:text-8xl",
  lg: "text-4xl md:text-6xl lg:text-7xl",
};

// Faint dot texture for dark sections (same idea as the Why Templates section)
export const darkTexture = {
  backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

// The highlighted word with its underline. Colour it with a text-* class via className.
// underlineClass can recolour just the underline, e.g. "text-yellow-400" under dark text.
export function Accent({
  children,
  className = "",
  underlineClass = "",
}: {
  children: ReactNode;
  className?: string;
  underlineClass?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        aria-hidden="true"
        className={`absolute left-0 -bottom-1 md:-bottom-2 h-2 md:h-3 w-full ${underlineClass}`}
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M2 9C45 3 125 3 198 7"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

type StatementProps = {
  lead?: string;
  accent: string;
  tail?: string;
  sub?: string;
  kicker?: string;
  href?: string;
  linkLabel?: string;
  tone?: Tone;
  variant?: Variant;
  align?: Align;
  size?: Size;
};

export default function Statement({
  lead,
  accent,
  tail,
  sub,
  kicker,
  href,
  linkLabel,
  tone = "amber",
  variant = "dark",
  align = "left",
  size = "xl",
}: StatementProps) {
  const dark = variant === "dark";

  return (
    <section
      className={`relative overflow-hidden py-16 md:py-24 ${dark ? "bg-slate-900" : "bg-white"}`}
      style={dark ? darkTexture : undefined}
    >
      {dark && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
        />
      )}

      <div className={`relative mx-auto flex max-w-6xl flex-col px-4 md:px-6 ${alignClass[align]}`}>
        {kicker && (
          <p
            className={`mb-4 text-xs font-semibold uppercase tracking-widest md:text-sm ${
              dark ? "text-blue-200" : "text-blue-700"
            }`}
          >
            {kicker}
          </p>
        )}

        <h2
          className={`font-bold leading-[1.05] tracking-tight ${sizeClass[size]} ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          {lead}
          <Accent className={accentClass[variant][tone]}>{accent}</Accent>
          {tail}
        </h2>

        {sub && (
          <p className={`mt-8 max-w-xl text-base md:text-lg ${dark ? "text-slate-300" : "text-gray-600"}`}>
            {sub}
          </p>
        )}

        {href && linkLabel && (
          <Link
            href={href}
            className={`group mt-6 inline-flex items-center gap-2 rounded text-sm font-medium underline underline-offset-4 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 md:text-base ${
              dark
                ? "text-white/90 decoration-white/30 hover:text-white hover:decoration-white"
                : "text-blue-700 decoration-blue-200 hover:text-blue-800 hover:decoration-blue-700"
            }`}
          >
            {linkLabel}
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
      </div>
    </section>
  );
}
