"use client";

import Image from "next/image";
import Link from "next/link";

export default function FrontEndPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col">

      {/* HERO SECTION */}
<section className="relative bg-slate-800 h-[475px] flex items-center overflow-hidden">

  {/* TEXT (inside container) */}
  <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
    <h1 className="text-5xl font-bold text-white mb-4">
      Front End Apps
    </h1>

    <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
      Everything your customers interact with — unified, branded, and
      fully customizable. These apps form the public-facing experience
      of your business, giving clients a seamless way to book, buy,
      submit, and manage their relationship with you.
    </p>
  </div>

  {/* FULL-HEIGHT, EDGE-TO-EDGE HERO IMAGE */}
  <div className="absolute top-0 right-0 h-full w-[45vw]">
    <Image
      src="/customerservice2.jpg"
      alt="Front End Apps Hero"
      fill
      className="object-cover object-center"
      priority
    />
  </div>

</section>

      {/* MODULES GRID */}
      <section className="py-16 bg-white flex-1">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            Front End Modules
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mb-12">
            These customer-facing modules shape the experience your clients see
            every day. Each one is designed to feel modern, intuitive, and
            consistent — while giving you full control over branding, layout,
            and workflow automation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Customer Portal */}
            <Link href="/customer-portal" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Customer Portal
                </h3>
                <p className="text-gray-600 text-sm">
                  A secure, branded hub where customers log in, view activity,
                  pay invoices, and manage their relationship with your business.
                </p>
              </div>
            </Link>

            {/* Online Shop */}
            <Link href="/online-shop" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Online Shop
                </h3>
                <p className="text-gray-600 text-sm">
                  A customizable storefront for selling products or services with
                  inventory sync, taxes, discounts, and automated order workflows.
                </p>
              </div>
            </Link>

            {/* Book Appointment */}
            <Link href="/book-appointment" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Book Appointment
                </h3>
                <p className="text-gray-600 text-sm">
                  A modern scheduling experience that lets customers choose
                  services, staff, and times — fully synced to your internal
                  calendar.
                </p>
              </div>
            </Link>

            {/* Transactions */}
            <Link href="/transactions" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Transactions
                </h3>
                <p className="text-gray-600 text-sm">
                  A clean interface for customers to view and pay invoices,
                  review past payments, and manage billing preferences.
                </p>
              </div>
            </Link>

            {/* Events */}
            <Link href="/events" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Events
                </h3>
                <p className="text-gray-600 text-sm">
                  Promote events, workshops, or classes. Customers can register,
                  pay, and receive automated reminders.
                </p>
              </div>
            </Link>

            {/* Reminders */}
            <Link href="/reminders" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Reminders
                </h3>
                <p className="text-gray-600 text-sm">
                  Automated notifications for appointments, renewals, payments,
                  and follow-ups — keeping customers engaged without manual
                  effort.
                </p>
              </div>
            </Link>

            {/* Forms */}
            <Link href="/forms" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Forms
                </h3>
                <p className="text-gray-600 text-sm">
                  Customizable forms for intake, onboarding, surveys, or service
                  requests. Every submission flows directly into your workflows.
                </p>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </main>
  );
}
