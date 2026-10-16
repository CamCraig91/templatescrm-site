"use client";

import Image from "next/image";
import Link from "next/link";
import ImageGallery from "../components/ImageGallery";

const galleryItems = [
  { src: "/Forms1.png", alt: "Forms screen 1" },
  { src: "/Forms2.png", alt: "Forms screen 2" },
  { src: "/Forms3.png", alt: "Forms screen 3" },
  { src: "/Forms4.png", alt: "Forms screen 4" },
  { src: "/Forms5.png", alt: "Forms screen 5" },
  { src: "/Forms6.png", alt: "Forms screen 6" },
  // Later you can add more, including video:
  // { type: "video" as const, src: "/demo.mp4", alt: "Forms demo", poster: "/demo-poster.png" },
];

export default function FormsPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Forms
            </h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Build your own questionnaires, surveys, and feedback forms. Choose the
              questions and the answer types, send them out, and store every response
              against the right record in Method:CRM.
            </p>
          </div>

          {/* VISUAL */}
          <div className="hidden md:flex justify-center">
            <div className="rounded-xl shadow-xl overflow-hidden">
              <Image
                src="/form.png"
                alt="forms"
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
              Forms are for collecting information you want to keep: a contact's
              preferences, feedback on a job, a pre-event questionnaire, or a review
              request. You decide what to ask and how people can answer.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Fully customizable form builder with the questions you choose</li>
              <li>• Control the answer type for each question: text, dropdowns, checkboxes, uploads, and more</li>
              <li>• Limit contacts to the answers you allow, so your data stays clean</li>
              <li>• Conditional logic for dynamic form flows</li>
              <li>• Send forms out by email or link to collect information on demand</li>
              <li>• Connect responses to contacts, work orders, sales orders, events, and reviews</li>
              <li>• Attach a Form to a Lead Form to gather more detail from new leads</li>
              <li>• Email notifications for staff and customers</li>
              <li>• Public or authenticated form access</li>
              <li>• Clean, mobile‑friendly layout for all devices</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VISUAL SECTION */}
      <section className="py-20 bg-blue-50 border-t border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <ImageGallery items={galleryItems} />

          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Collect the Information That Matters</h3>
            <p className="text-gray-600 mb-4">
              Whether you're asking about customer preferences, gathering feedback on a
              completed job, or preparing for an event, your forms ask exactly what you
              need and accept only the answers you allow.
            </p>
            <p className="text-gray-600">
              Responses are stored in Method:CRM and linked to the work order, sales order,
              event, or contact they relate to, ready for your team to use.
            </p>
          </div>

        </div>
      </section>

      {/* FORMS VS LEAD FORMS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border border-blue-200 rounded-xl p-10 bg-blue-50 md:flex md:items-center md:justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-3">Looking to capture new leads?</h3>
              <p className="text-gray-600 max-w-2xl">
                Forms collect custom information. If you want to capture a new contact's
                details, create an opportunity, alert your team, schedule a follow-up, and
                track referrals and campaigns, use Lead Forms instead.
              </p>
            </div>
            <Link
              href="/lead-forms"
              className="inline-block whitespace-nowrap bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Explore Lead Forms
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
