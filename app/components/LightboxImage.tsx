"use client";

import { useState } from "react";

interface LightboxImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LightboxImage({ src, alt, className = "" }: LightboxImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <img
        src={src}
        alt={alt}
        className={`cursor-pointer transition hover:opacity-80 ${className}`}
        onClick={() => setOpen(true)}
      />

      {/* Lightbox Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
