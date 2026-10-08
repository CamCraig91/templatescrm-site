"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function ImageLightbox({ src, alt, width, height, className = "" }: Props) {
  const [open, setOpen] = useState(false);

  // Close on Escape and lock page scroll while the full-screen view is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View full screen: ${alt}`}
        className={`relative block w-full cursor-zoom-in overflow-hidden border border-gray-200 bg-white shadow-lg rounded-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 ${className}`}
      >
        <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" rounded-3x1 />
        <span className="absolute bottom-3 right-3 inline-flex items-center justify-center bg-white/95 p-2 text-gray-800 shadow rounded-lg">
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M12 3h5v5M8 17H3v-5M17 3l-5 5M3 17l5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="sr-only">Enlarge image</span>
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/85 p-4 md:p-8"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            autoFocus
            onClick={() => setOpen(false)}
            aria-label="Close full screen image"
            className="absolute right-4 top-4 rounded-full bg-white p-2 text-gray-800 shadow hover:bg-blue-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="100vw"
            onClick={(e) => e.stopPropagation()}
            className="h-auto max-h-full w-auto max-w-full object-contain shadow-2xl"
            rounded-lg
          />
        </div>
      )}
    </>
  );
}
