"use client";

import Image from "next/image";
import Link from "next/link";
import ImageGallery from "../components/ImageGallery";

// Paste the embed URL for your Method:CRM lead form here.
const LEAD_FORM_URL = "https://MIurl.cc/GDo6AOlmI";
const LEAD_FORM_HEIGHT = 1200; // px, adjust to fit your form

const galleryItems = [
  { src: "/LeadForms1.png", alt: "Lead Forms screen 1" },
  { src: "/LeadForms2.png", alt: "Lead Forms screen 2" },
  { src: "/LeadForms3.png", alt: "Lead Forms screen 3" },
  { src: "/LeadForms4.png", alt: "Lead Forms screen 4" },
  { src: "/LeadForms5.png", alt: "Lead Forms screen 5" },
  { src: "/LeadForms6.png", alt: "Lead Forms screen 6" },
  // Later you can add more, including video:
  // { type: "video" as const, src: "/lead-forms-demo.mp4", alt: "Lead Forms demo", poster: "/lead-forms-poster.png" },
];

export default function LeadFormsPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* Animations for the "Try it" section */}
      <style>{`
        @keyframes try-draw {
          0%   { stroke-dashoffset: 1; }
          55%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes try-head {
          0%, 50% { opacity: 0; }
          62%, 100% { opacity: 1; }
        }
        @keyframes try-wiggle {
          0%, 100% { transform: rotate(-6deg); }
          50%      { transform: rotate(-2deg) scale(1.05); }
        }
        .try-arrow-line {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: try-draw 3.2s ease-in-out infinite;
        }
        .try-arrow-head {
          opacity: 0;
          animation: try-head 3.2s ease-in-out infinite;
        }
        .try-sticker {
          animation: try-wiggle 2.4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .try-arrow-line { animation: none; stroke-dashoffset: 0; }
          .try-arrow-head { animation: none; opacity: 1; }
          .try-sticker { animation: none; transform: rotate(-4deg); }
        }
      `}</style>

      {/* HERO */}
      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Lead Forms
            </h1>
            <p className="text-lg text-slate-300 max-w-xl mb-8">
              Capture new leads straight from your website, campaigns, and referrals.
              Every submission becomes a contact, an opportunity, and a follow-up
              in Method:CRM, with no manual entry.
            </p>
            <a
              href="#try-it"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Try one live
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          {/* VISUAL */}
          <div className="hidden md:flex justify-center">
            <Image
              src="/webtoleadhero.png"
              alt="Lead form creating a contact, opportunity and alert"
              width={480}
              height={256}
              className="object-contain"
            />
          </div>

        </div>
      </section>

      {/* FEATURE CARD */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border border-gray-200 rounded-xl p-10 shadow-sm bg-white">
            <h2 className="text-2xl font-bold mb-4">What This Module Includes</h2>
            <p className="text-gray-600 mb-6">
              Turn every visitor enquiry into a tracked lead. Lead Forms collect contact
              details, map them to your contact records, and kick off your sales process
              the moment someone hits submit.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Captures contact details and basic information in a simple, fast form</li>
              <li>• Form fields map directly to fields on the contact record</li>
              <li>• Automatically creates an opportunity for every new lead</li>
              <li>• Instant alerts to the right staff member or team</li>
              <li>• Creates a follow-up reminder so no lead goes cold</li>
              <li>• Optionally attach a Form to gather more detail after the lead comes in</li>
              <li>• Built-in referral incentives to reward people who send you business</li>
              <li>• Links each contact to the marketing campaign that brought them in</li>
              <li>• Embed on your website, landing pages, or share by link</li>
              <li>• Clean, mobile‑friendly layout for all devices</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-blue-50 border-t border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-10 text-center">
            What Happens When a Lead Comes In
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Contact created",
                text: "Submitted details are mapped to fields on a new or existing contact.",
              },
              {
                title: "Opportunity opened",
                text: "A new opportunity is created and ready to work in your pipeline.",
              },
              {
                title: "Team alerted",
                text: "The right person is notified immediately so you can respond fast.",
              },
              {
                title: "Follow-up scheduled",
                text: "A reminder is created so every lead gets a timely reply.",
              },
            ].map((step, i) => (
              <div
                key={step.title}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                <div className="text-sm font-semibold text-blue-600 mb-2">
                  Step {i + 1}
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRY IT */}
      <section
        id="try-it"
        className="relative scroll-mt-4 py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 overflow-hidden"
      >
        {/* decorative glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl"
        />

        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* TEXT + ARROW */}
          <div className="text-white">
            <span className="try-sticker inline-block bg-yellow-300 text-slate-900 text-sm font-bold uppercase tracking-wide px-3 py-1 rounded-md shadow-md mb-5">
              Try me!
            </span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Why not try one to see how it works!
            </h2>
            <p className="text-blue-100 text-lg max-w-md">
              Fill in the form and hit submit. It's the same kind of Lead Form your
              website visitors would use, and everything in the steps above happens
              behind the scenes.
            </p>

            {/* Desktop: hand-drawn arrow curving toward the form */}
            <svg
              aria-hidden="true"
              viewBox="0 0 200 120"
              fill="none"
              className="hidden md:block w-48 h-28 mt-6 ml-auto mr-4 text-white"
            >
              <path
                className="try-arrow-line"
                pathLength={1}
                d="M10 20 C 80 10, 140 40, 170 95"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                className="try-arrow-head"
                d="M147.7 81.4 L170 95 L170.6 69"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Mobile: bouncing arrow pointing down at the form */}
            <div className="md:hidden flex justify-center mt-8" aria-hidden="true">
              <svg
                viewBox="0 0 40 60"
                fill="none"
                className="h-14 w-10 text-white animate-bounce"
              >
                <path
                  d="M20 4 V48 M6 34 L20 50 L34 34"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* FORM */}
          <div className="relative">
            {/* pulsing glow to make the form pop */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-3xl bg-white/30 blur-2xl animate-pulse"
            />

            {/* live badge */}
            <div className="absolute -top-4 left-6 z-10 flex items-center gap-2 bg-white text-slate-900 text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              Live demo
            </div>

            <div className="relative bg-white rounded-2xl shadow-2xl ring-4 ring-white/40 overflow-hidden transition-transform duration-300 hover:-translate-y-1">
              <iframe
                src={LEAD_FORM_URL}
                title="Try a Lead Form"
                loading="lazy"
                className="block w-full border-0"
                style={{ height: LEAD_FORM_HEIGHT }}
              />
            </div>

            <p className="relative mt-5 text-center text-sm text-blue-100">
              Form not loading?{" "}
              <a
                href={LEAD_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Open it in a new tab
              </a>
            </p>
          </div>

        </div>
      </section>

      {/* VISUAL SECTION */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <ImageGallery items={galleryItems} />

          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Know Where Every Lead Came From</h3>
            <p className="text-gray-600 mb-4">
              Lead Forms tie each new contact to the campaign, referral, or page that
              produced them, so you can see which marketing is actually bringing in
              business.
            </p>
            <p className="text-gray-600">
              Add a referral incentive and your happiest customers become your best
              source of new leads, all tracked back to them automatically.
            </p>
          </div>

        </div>
      </section>

      {/* LEAD FORMS VS FORMS */}
      <section className="py-20 bg-blue-50 border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border border-blue-200 rounded-xl p-10 bg-white shadow-sm md:flex md:items-center md:justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-3">Need to collect more than contact details?</h3>
              <p className="text-gray-600 max-w-2xl">
                Lead Forms are built to capture new contacts and start your sales process.
                If you want to gather preferences, feedback, or other custom answers and
                store them against a contact, work order, sales order, or event, use
                Forms instead.
              </p>
            </div>
            <Link
              href="/forms"
              className="inline-block whitespace-nowrap bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Explore Forms
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
