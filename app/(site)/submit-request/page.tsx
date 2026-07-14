"use client";

import Link from "next/link";
import Image from "next/image";

export default function ClientRequestPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full py-24 bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Submit a Service Request
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Whether you need Pay‑Per‑Use work, Dedicated Services, or full
            Application Subscriptions, submit your request below. Your selections
            will automatically create an opportunity with the appropriate line items.
          </p>
        </div>
      </section>

      {/* IFRAME SECTION */}
      <section className="py-16 bg-gray-50 border-t border-gray-200 flex-1">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Request Form</h2>
          <p className="text-gray-600 mb-6">
            Complete the form below to submit your request. You can choose service
            types, modules, or subscription options directly within the form.
          </p>

          <div className="w-full h-[900px] bg-white border rounded-xl shadow-sm overflow-hidden">
            <iframe
              src="https://YOUR_WEB_TO_LEAD_URL"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

    </main>
  );
}
