"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export type MediaItem = {
  type?: "image" | "video"; // defaults to "image"
  src: string;
  alt: string;
  caption?: string; // optional text shown under the image; nothing appears if left out
  poster?: string; // optional preview image for videos
};

function Media({
  item,
  fullscreen = false,
  priority = false,
}: {
  item: MediaItem;
  fullscreen?: boolean;
  priority?: boolean;
}) {
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        poster={item.poster}
        controls
        className={
          fullscreen
            ? "w-full h-full object-contain"
            : "w-full aspect-video bg-black"
        }
      />
    );
  }

  // Full screen: fill the viewport box
  if (fullscreen) {
    return (
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="92vw"
        className="object-contain"
      />
    );
  }

  // Inline: image sets its own height, no surrounding box
  return (
    <Image
      src={item.src}
      alt={item.alt}
      width={0}
      height={0}
      sizes="(min-width: 1024px) 50vw, 100vw"
      style={{ width: "100%", height: "auto" }}
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
  const caption = current.caption?.trim(); // empty or missing means no caption

  // Frosted-glass look shared by the floating controls
  const glass =
    "bg-white/80 hover:bg-white text-gray-800 backdrop-blur-md shadow-md transition";

  return (
    <div className="w-full">
      {/* VIEWER — just the image with a thin outline */}
      <div className="relative rounded-lg overflow-hidden ring-1 ring-gray-200">
        <Media item={current} priority />

        {/* Click the image itself to enlarge */}
        {current.type !== "video" && (
          <button
            onClick={() => setOpen(true)}
            aria-label="Enlarge image"
            className="absolute inset-0 cursor-zoom-in"
          />
        )}

        {count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous"
              className={`absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full text-xl flex items-center justify-center ${glass}`}
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className={`absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full text-xl flex items-center justify-center ${glass}`}
            >
              ›
            </button>

            {/* Counter — bottom left */}
            <span
              className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium pointer-events-none ${glass}`}
            >
              {index + 1} / {count}
            </span>
          </>
        )}

        {/* Full screen — bottom right */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Full screen"
          className={`absolute bottom-3 right-3 flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full text-xs font-medium ${glass}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
            />
          </svg>
        </button>
      </div>

      {/* CAPTION — only rendered when this item has one */}
      {caption && (
        <p className="mt-3 text-sm text-gray-600 text-center">{caption}</p>
      )}

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
            className="flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Leave room for the caption when there is one */}
            <div
              className={`relative w-[92vw] ${caption ? "h-[76vh]" : "h-[85vh]"}`}
            >
              <Media item={current} fullscreen />
            </div>

            {caption && (
              <p className="mt-4 max-w-3xl px-4 text-center text-white/90 text-sm md:text-base">
                {caption}
              </p>
            )}
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
              <span className="absolute bottom-4 left-4 text-white/80 text-sm">
                {index + 1} / {count}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
