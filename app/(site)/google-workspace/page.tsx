"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ImageGallery from "../components/ImageGallery";

const galleryItems = [
  { src: "/google1.png", alt: "Google screen 1" },
  { src: "/google2.png", alt: "Google screen 2" },
  { src: "/google3.png", alt: "Google screen 3" },
  // Later you can add more, including video:
  // { type: "video" as const, src: "/demo.mp4", alt: "Transactions demo", poster: "/demo-poster.png" },
];

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
          <ImageGallery items={galleryItems} />
          
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
)}
