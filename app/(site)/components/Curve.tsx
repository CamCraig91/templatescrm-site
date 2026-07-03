"use client";

export default function Curve({ flip = false }) {
  return (
    <div className={`w-full overflow-hidden ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 120"
        className="w-full h-20 md:h-28"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C480,120 960,0 1440,120 L1440,0 L0,0 Z"
          fill="#f0f6ff"
        />
      </svg>
    </div>
  );
}
