"use client";

import Image from "next/image";
import Link from "next/link";
import ImageGallery from "../components/ImageGallery";

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

      {/* HERO */}
      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Lead Forms
            </h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Capture new leads straight from your website, campaigns, and referrals.
              Every submission becomes a contact, an opportunity, and a follow-up
              in Method:CRM, with no manual entry.
            </p>
          </div>

          {/* VISUAL */}
          <div className="hidden md:flex justify-center">
            <div className="rounded-xl shadow-xl overflow-hidden">
              <Image
                src="/lead-form.png"
                alt="Lead form"
                width={300}
                height={160}
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
