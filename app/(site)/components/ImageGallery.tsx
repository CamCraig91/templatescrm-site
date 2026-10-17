"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
        playsInline
        className={
          fullscreen
            ? "w-full h-full object-contain"
            : "w-full aspect-video bg-black"
        }
      />
    );
  }

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

const MAX_DOTS = 8;

export default function ImageGallery({ items }: { items: MediaItem[] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const count = items.length;

  // Used by the full-screen view (just changes the index)
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  // Used by the inline arrows, thumbnails and dots (scrolls the track)
  const goTo = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    setIndex(i);
  }, []);

  // Keep the index in step with the user's swipe
  const onTrackScroll = () => {
    if (open) return;
    const el = trackRef.current;
    if (!el || !el.clientWidth) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  // When full screen closes, put the inline track on the slide we ended on
  useEffect(() => {
    if (open) return;
    const el = trackRef.current;
    if (el) el.scrollTo({ left: index * el.clientWidth, behavior: "auto" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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
  const caption = current.caption?.trim();

  const glass =
    "bg-white/80 hover:bg-white text-gray-800 backdrop-blur-md shadow-md transition";

  // Swipe handling for the full-screen view
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || count < 2) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) next();
    else prev();
  };

  return (
    // min-w-0 stops a grid parent from stretching this wider than the screen
    <div className="w-full min-w-0">
      {/* VIEWER — swipeable on touch, arrows on desktop */}
      <div className="relative rounded-lg overflow-hidden ring-1 ring-gray-200">
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          className="flex overflow-x-auto snap-x snap-mandatory overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <div key={item.src} className="relative w-full shrink-0 snap-center self-center">
              <Media item={item} priority={i === 0} />
              {item.type !== "video" && (
                <button
                  onClick={() => setOpen(true)}
                  aria-label="Enlarge image"
                  className="absolute inset-0 cursor-zoom-in"
                />
              )}
            </div>
          ))}
        </div>

        {/* Arrows: desktop only, phones swipe */}
        {count > 1 && (
          <>
            <button
              onClick={() => goTo((index - 1 + count) % count)}
              aria-label="Previous"
              className={`hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full text-xl items-center justify-center ${glass}`}
            >
              ‹
            </button>
            <button
              onClick={() => goTo((index + 1) % count)}
              aria-label="Next"
              className={`hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full text-xl items-center justify-center ${glass}`}
            >
              ›
            </button>

            <span
              className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium pointer-events-none ${glass}`}
            >
              {index + 1} / {count}
            </span>
          </>
        )}

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

      {caption && (
        <p className="mt-3 text-sm text-gray-600 text-center">{caption}</p>
      )}

      {/* DOTS — mobile only (skipped if there are lots of items) */}
      {count > 1 && count <= MAX_DOTS && (
        <div className="md:hidden flex justify-center gap-2 mt-4">
          {items.map((item, i) => (
            <button
              key={item.src}
              onClick={() => goTo(i)}
              aria-label={`Show item ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-5 bg-blue-500" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* THUMBNAIL STRIP — desktop only, scrolls inside its own width */}
      {count > 1 && (
        <div className="hidden md:flex gap-3 mt-4 overflow-x-auto pb-1">
          {items.map((item, i) => (
            <button
              key={item.src}
              onClick={() => goTo(i)}
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
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
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
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-3xl items-center justify-center"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next"
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-3xl items-center justify-center"
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
