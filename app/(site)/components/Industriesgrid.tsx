"use client";
import { useState } from "react";

type Industry = { name: string; body: string };

// Industry cards. On phones only the first `mobileCount` show, with a Show more / Show less
// button for the rest. From md up, every card always shows and the button is hidden.
export default function IndustriesGrid({
  industries,
  mobileCount = 3,
}: {
  industries: Industry[];
  mobileCount?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = industries.length - mobileCount;

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((item, i) => (
          <div
            key={item.name}
            className={`bg-blue-50 border border-blue-100 rounded-2xl p-6 text-left ${
              i >= mobileCount && !expanded ? "hidden md:block" : ""
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.body}</p>
          </div>
        ))}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-8 text-center md:hidden">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-blue-700 border border-blue-100 font-medium hover:bg-blue-50 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            {expanded ? "Show less" : `Show ${hiddenCount} more industries`}
            <svg
              className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
