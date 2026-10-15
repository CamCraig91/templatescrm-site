"use client";

import Image from "next/image";
import Link from "next/link";
import ImageGallery from "../components/ImageGallery";

const galleryItems = [
  { src: "/HumanResources1.png", alt: "HumanResources screen 1" },
  { src: "/HumanResources3.png", alt: "HumanResources screen 2" },
  { src: "/HumanResources4.png", alt: "HumanResources screen 3" },
  { src: "/HumanResources5.png", alt: "HumanResources screen 4" },
  // Later you can add more, including video:
  // { type: "video" as const, src: "/demo.mp4", alt: "Transactions demo", poster: "/demo-poster.png" },
];

export default function HumanResourcesPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Human Resources
            </h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Manage employee records, onboarding, certifications, documents, and internal
              workflows — all in one organized, secure system connected to your operations.
            </p>
          </div>

         {/* VISUAL */}
    <div className="hidden md:flex justify-center">
      <div className="rounded-xl shadow-xl overflow-hidden">
        <Image
          src="/humanresourceswhite.png"
          alt="humanresources"
          width={200}
          height={120}
          className="object-cover"
        />
      </div>
    </div>

        </div>
      </section>

      {/* FEATURE CARD */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border border-gray-200 rounded-xl p-10 shadow-sm bg-white">
            <h2 className="text-2xl font-bold mb-4">What This Module Includes</h2>
            <p className="text-gray-600 mb-6">
              A centralized hub for managing your team — from onboarding to ongoing compliance.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Employee profiles with contact info, roles, and permissions</li>
              <li>• Onboarding workflows and required documentation</li>
              <li>• Track certifications, training, and renewal dates</li>
              <li>• Store contracts, policies, and signed documents</li>
              <li>• Manage time‑off requests and approvals</li>
              <li>• Internal notes, performance logs, and HR activity tracking</li>
              <li>• Automated reminders for renewals and compliance deadlines</li>
              <li>• Sync with Scheduling, Payroll, and Work Orders</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VISUAL SECTION */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

 <ImageGallery items={galleryItems} />

          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Organized, Compliant, and Connected</h3>
            <p className="text-gray-600 mb-4">
              Keep your HR processes streamlined and consistent. From onboarding to ongoing
              compliance, everything is tracked and accessible in one place.
            </p>
            <p className="text-gray-600">
              With automated reminders and integrated workflows, your team stays compliant
              without the manual follow‑up.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
