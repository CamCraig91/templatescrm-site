"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export type MediaItem = {
  type?: "image" | "video"; // defaults to "image"
  src: string;
  alt: string;
  poster?: string; // optional preview image for videos
};

function Media({ item, priority = false }: { item: MediaItem; priority?: boolean }) {
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        poster={item.poster}
        controls
        className="w-full h-full object-contain"
      />
    );
  }
  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="object-contain"
      priority={priority}
    />
  );
}

export default function ImageGallery({ items }: { items: MediaItem[] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const count = items.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  // Keyboard controls + scroll lock while the full-screen view is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, next, prev]);

  if (count === 0) return null;
  const current = items[index];

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white text-2xl flex items-center justify-center transition";

  return (
    <div className="w-full">
      {/* MAIN VIEWER */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-md">
        <Media item={current} priority />

        {/* Click anywhere on an image to enlarge it */}
        {current.type !== "video" && (
          <button
            onClick={() => setOpen(true)}
            aria-label="Enlarge image"
            className="absolute inset-0 cursor-zoom-in"
          />
        )}

        {/* Maximize button */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Full screen"
          className="absolute top-3 right-3 h-9 w-9 rounded-md bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
          </svg>
        </button>

        {count > 1 && (
          <>
            <button onClick={prev} aria-label="Previous" className={`${arrowClass} left-3`}>‹</button>
            <button onClick={next} aria-label="Next" className={`${arrowClass} right-3`}>›</button>
            <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/50 text-white text-xs">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {/* THUMBNAIL STRIP */}
      {count > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
          {items.map((item, i) => (
            <button
              key={item.src}
              onClick={() => setIndex(i)}
              aria-label={`Show item ${i + 1}`}
              className={`relative shrink-0 h-16 w-24 rounded-lg overflow-hidden border-2 transition ${
                i === index
                  ? "border-blue-500"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {item.type === "video" ? (
                item.poster ? (
                  <Image src={item.poster} alt={item.alt} fill sizes="96px" className="object-cover" />
                ) : (
                  <span className="absolute inset-0 bg-slate-800" />
                )
              ) : (
                <Image src={item.src} alt={item.alt} fill sizes="96px" className="object-cover" />
              )}
              {item.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center text-white text-lg">▶</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* FULL-SCREEN VIEW */}
      {open && (
        <div
          className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-[92vw] h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Media item={current} />
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center"
          >
            ✕
          </button>

          {count > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-3xl flex items-center justify-center"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next"
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-3xl flex items-center justify-center"
              >
                ›
              </button>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                {index + 1} / {count}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
