"use client";

import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="bg-white text-white min-h-screen flex flex-col">

      {/* HERO */}
      <section className="w-full bg-slate-800 py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">

          {/* TEXT */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Services Designed to Move Your Business Forward
            </h1>
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              Whether you need powerful Method:CRM customizations or a modern,
              conversion‑focused website, we build solutions that help your
              business run smoother and look sharper.
            </p>
          </div>

          {/* IMAGE ON RIGHT */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="w-full max-w-md">
              <Image
                src="/serviceswhit.png"
                alt="Man building pillar with gear"
                width={900}
                height={900}
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          {/* CUSTOMIZATION CARD */}
          <div className="border border-gray-200 rounded-xl p-10 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
            <div className="flex-1">
              <h2 className="text-2xl text-black font-bold mb-4">
                Method:CRM Customization & Automation
              </h2>
              <p className="text-gray-600 mb-0">
                Tailored workflows, custom screens, and automated processes built
                around the way your business actually operates.
              </p>
              <h3 className="text-lg font-semibold mb-0 mt-4">How It Works</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Initial diligence call to understand your workflow</li>
                <li>• Outline features to implement</li>
                <li>• Customize screens, automations, and integrations</li>
                <li>• Ongoing support as your needs evolve</li>
              </ul>
            </div>
            <div className="mt-6">
              <a
                href="/customization"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Explore Customization →
              </a>
            </div>
          </div>

          {/* WEB DESIGN CARD */}
          <div className="border border-gray-200 rounded-xl p-10 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
            <div className="flex-1">
              <h2 className="text-2xl text-black font-bold mb-4">
                Modern, Responsive Website Design
              </h2>
              <p className="text-gray-600 mb-0">
                Clean, fast, and conversion‑focused websites built with premium UI
                components and a structure that supports your business goals.
              </p>
              <h3 className="text-lg font-semibold mb-0 mt-4">How It Works</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Establish your page design, content, and brand direction</li>
                <li>• You receive a polished, modern design</li>
                <li>• Built using scalable components that connect with your Method:CRM system</li>
                <li>• Optimized for speed, SEO, and accessibility</li>
              </ul>
            </div>
            <div className="mt-6">
              <a
                href="/website-design"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Explore Web Design →
              </a>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
