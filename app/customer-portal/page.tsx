"use client";
import Image from "next/image";

export default function FrontEndModulePage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full h-[420px] bg-slate-800 border-b border-slate-700 overflow-hidden flex items-center">

        {/* TEXT */}
        <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Customer Portal
          </h1>

          <p className="text-lg text-blue-100 max-w-xl leading-relaxed">
            A secure, branded hub where customers log in, view activity, pay invoices,
            and manage their relationship with your business.
          </p>
        </div>

        {/* FULL-HEIGHT HERO IMAGE (NOT CLICKABLE) */}
        <div className="absolute top-0 right-0 h-full w-[45vw] pointer-events-none">
          <Image
            src="/heroimage1.png"
            alt="Customer Portal Screenshot"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

      </section>

      {/* FEATURE CARD */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border border-gray-200 rounded-xl p-10 shadow-sm bg-white">
            <h2 className="text-2xl font-bold mb-4">What This Module Includes</h2>
            <p className="text-gray-600 mb-6">
              Everything your customers need in one clean, modern interface — fully synced with Method:CRM.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Secure customer login</li>
              <li>• View invoices, estimates, and transaction history</li>
              <li>• Make payments directly through the portal</li>
              <li>• Update contact information and preferences</li>
              <li>• View upcoming appointments and reminders</li>
              <li>• Submit forms, requests, or support tickets</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SINGLE VISUAL SECTION */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <div className="w-contain  object-contain h-fit bg-gray-200 rounded-xl overflow-hidden">
            <Image
              src="/portal.png"
              alt="Customer Portal Visual"
              width={800}
              height={600}
              className="object-contain w-full h-full"
            />
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-bold mb-4">A Seamless Customer Experience</h3>
            <p className="text-gray-600 mb-4">
              Your portal is designed to feel clean, fast, and intuitive — giving customers 
              everything they need without confusion or clutter.
            </p>
            <p className="text-gray-600">
              Every interaction flows directly into Method:CRM, keeping your team organized 
              and your data perfectly in sync.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
