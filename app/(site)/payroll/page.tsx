"use client";

import Image from "next/image";
import ImageGallery from "../components/ImageGallery";

const galleryItems = [
  { src: "/Payroll1.png", alt: "Payroll screen 1" },
  { src: "/Payroll2.png", alt: "Payroll screen 2" },
  { src: "/Payroll3.png", alt: "Payroll screen 3" },
  // Later you can add more, including video:
  // { type: "video" as const, src: "/demo.mp4", alt: "Payroll demo", poster: "/demo-poster.png" },
];

const features = [
  {
    title: "Hours & time entries",
    text: "Track the hours each employee works, tied to your schedule and organized by pay period.",
  },
  {
    title: "Pay rates, roles & departments",
    text: "Manage rates by employee, role, or department in one place.",
  },
  {
    title: "Taxable hours",
    text: "Keep regular, overtime, and holiday hours separate so taxable hours are clear for every pay period.",
  },
  {
    title: "Deductions & contributions",
    text: "Track employee deductions and employer contributions alongside each pay period.",
  },
  {
    title: "Vacation tracking",
    text: "See vacation time taken and remaining for every employee without a separate spreadsheet.",
  },
  {
    title: "Overtime, holidays & adjustments",
    text: "Record overtime, statutory holidays, and one-off adjustments with a clear trail.",
  },
  {
    title: "Approval workflows",
    text: "Managers review and approve hours before anything is finalized.",
  },
  {
    title: "Pay period reporting",
    text: "Summaries by pay period, employee, and department, ready when you need them.",
  },
  {
    title: "Secure access controls",
    text: "Control who can see pay rates and payroll data, so sensitive details stay private.",
  },
];

const flow = [
  {
    title: "Schedule & track",
    text: "Shifts and time entries capture who worked, when, and for how long.",
  },
  {
    title: "Review & approve",
    text: "Managers check hours, overtime, and adjustments before they're finalized.",
  },
  {
    title: "Track the details",
    text: "Taxable hours, deductions, contributions, and vacation are tracked for each pay period.",
  },
  {
    title: "Sync with accounting",
    text: "Payroll summaries are exported to QuickBooks or Xero so your books stay audit-ready.",
  },
];

const connections = [
  {
    title: "Scheduling",
    text: "Scheduled shifts are the starting point for hours, so nobody re-enters time that is already on the calendar.",
  },
  {
    title: "Human Resources",
    text: "Employee details, roles, and departments are shared with HR, so you maintain them once.",
  },
  {
    title: "Accounting",
    text: "Export payroll summaries to QuickBooks or Xero to keep your books clean and consistent.",
  },
];

export default function PayrollPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Payroll</h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Track hours, manage pay rates, and sync payroll data with your accounting
              system, all from one centralized dashboard.
            </p>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="rounded-xl shadow-xl overflow-hidden">
              <Image
                src="/payrollwhite.png"
                alt="payroll"
                width={300}
                height={160}
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">What This Module Includes</h2>
            <p className="text-gray-600">
              A simple, accurate payroll workflow that keeps your team paid and your
              books clean.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="border border-gray-200 border-t-4 border-t-blue-500 rounded-xl p-6 shadow-sm bg-white hover:shadow-md hover:-translate-y-0.5 transition"
              >
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW PAYROLL FLOWS */}
      <section className="py-20 bg-blue-50 border-t border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            From Schedule to Pay Period
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {flow.map((step, i) => (
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

      {/* CONNECTED MODULES + QUICKBOOKS NOTE */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Connected to the Rest of Your Business</h2>
            <p className="text-gray-600">
              Payroll doesn't live on its own. It draws on the same scheduling and
              employee data you already keep, and passes the results to your accounting
              system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {connections.map((c) => (
              <div
                key={c.title}
                className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white"
              >
                <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                <p className="text-gray-600 text-sm">{c.text}</p>
              </div>
            ))}
          </div>

          {/* QuickBooks Payroll caveat */}
          <div className="border border-amber-200 bg-amber-50 rounded-xl p-8 md:flex md:items-start md:gap-6">
            <div className="shrink-0 mb-4 md:mb-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-200 text-amber-900 font-bold">
              i
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Paying your team by direct deposit?</h3>
              <p className="text-gray-700 max-w-3xl">
                Payroll tracks hours, deductions, contributions, and vacation, and keeps
                that data in sync with your accounting system. At the moment it can't
                issue bank deposits directly to employees. If you want to pay your team
                by direct deposit, you'll need QuickBooks Payroll alongside it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL SECTION */}
      <section className="py-20 bg-blue-50 border-t border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <ImageGallery items={galleryItems} />

          <div>
            <h3 className="text-2xl font-bold mb-4">Accurate and Connected</h3>
            <p className="text-gray-600 mb-4">
              Payroll data flows directly from your scheduling and HR systems.
            </p>
            <p className="text-gray-600">
              No more manual calculations. Everything stays synced and audit‑ready.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
