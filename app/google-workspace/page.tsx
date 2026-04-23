"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function GoogleWorkspacePage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Google Workspace</h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Sync contacts, calendars, and email activity between Templates and Google Workspace
              to keep your team aligned and connected.
            </p>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="w-full max-w-md">
                <Image
                  src="/googlelogo.png"
                  alt="Google Logo Integration Hero Images"
                  width={400}
                  height={400}
                  className="object-contain drop-shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border border-gray-200 rounded-xl p-10 shadow-sm bg-white">
            <h2 className="text-2xl font-bold mb-4">What This Integration Includes</h2>
            <p className="text-gray-600 mb-6">
              Connect your Google tools directly to your CRM and workflows.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Sync Google Contacts with CRM contacts</li>
              <li>• Two‑way calendar sync for appointments and tasks</li>
              <li>• Log email activity automatically</li>
              <li>• Attach Google Drive files to records</li>
              <li>• Single sign‑on (SSO) support</li>
              <li>• Team‑wide visibility into communication history</li>
              <li>• Automated workflows triggered by email or calendar events</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VISUAL SECTION */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">

          {/* LEFT — SINGLE IMAGE */}
          <Gallery />

          {/* RIGHT — TEXT */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Stay Connected Across Tools</h3>
            <p className="text-gray-600 mb-4">
              Your team’s communication and scheduling stay unified across Google and Templates.
            </p>
            <p className="text-gray-600">
              No more switching tabs or losing track of conversations.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}

/* -----------------------------------------------------------
   GALLERY COMPONENT — FIXED FULLSCREEN VIEWER
----------------------------------------------------------- */

const images = [
  { src: "/google1.png", caption: "Connect your email so information flows seamlessly between Google and your CRM" },
  { src: "/google2.png", caption: "Connect your calendar so all your scheduling is in one place" },
  { src: "/google3.png", caption: "Log emails directly to CRM records to ensure information is where it needs to be and quickly." },
  { src: "/google5.png", caption: "Allow clients to view your availability calendar and book an appointment directly - no more fumbling with back and forth emails to arrange a meeting" },
];

function Gallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const total = images.length;

  /* FIX: TypeScript implicit any */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, total]);

  return (
    <>
      {/* WRAPPER — keeps image + caption + count together */}
      <div className="flex flex-col items-start">

        {/* INLINE IMAGE */}
        <div
          className="w-full h-72 bg-gray-200 rounded-xl overflow-hidden cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <Image
            src={images[index].src}
            alt={images[index].caption}
            width={900}
            height={700}
            className="object-cover w-full h-full"
          />
        </div>

        {/* BOLDED CAPTION */}
        <p className="text-gray-800 font-semibold mt-3 text-sm">
          {images[index].caption}
        </p>

        {/* COUNT */}
        <p className="text-gray-500 text-xs mt-1">
          {index + 1} of {total}
        </p>
      </div>

      {/* FULLSCREEN VIEWER */}
      {open && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          {/* X BUTTON — FIXED TO SCREEN */}
          <button
            className="fixed top-6 right-6 text-white text-5xl font-bold drop-shadow-xl z-[9999]"
            onClick={() => setOpen(false)}
          >
            ×
          </button>

          {/* LEFT ARROW */}
          <button
            className="fixed left-6 top-1/2 -translate-y-1/2 text-white text-6xl font-bold drop-shadow-xl z-[9999]"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i - 1 + total) % total);
            }}
          >
            ‹
          </button>

          {/* RIGHT ARROW */}
          <button
            className="fixed right-6 top-1/2 -translate-y-1/2 text-white text-6xl font-bold drop-shadow-xl z-[9999]"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i + 1) % total);
            }}
          >
            ›
          </button>

          {/* IMAGE + CAPTION */}
          <div
            className="flex flex-col items-center max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index].src}
              alt={images[index].caption}
              width={1600}
              height={1200}
              className="object-contain max-h-[80vh] max-w-[90vw] rounded-lg"
            />

            <p className="text-center text-white mt-4 opacity-90 text-lg font-semibold max-w-[80vw]">
              {images[index].caption}
            </p>

            <p className="text-center text-gray-300 mt-1 text-sm">
              {index + 1} / {total}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
