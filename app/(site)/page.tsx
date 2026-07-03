import HeroSection from "./components/HeroSection";
import Pillars from "./components/Pillars";
import Image from "next/image";

import AnimatedSection from "./components/AnimatedSection";
import Curve from "./components/Curve";

export const metadata = {
  title: "Templates — Business Management Software",
};

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* HERO */}
      <HeroSection />

      <main>

        {/* FLOW DIAGRAM (no animation) */}
        <section className="relative -mt-20 z-10">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="bg-blue-50 border border-blue-100 rounded-3xl shadow-md px-8 md:px-16 py-16 md:py-20 text-center">

              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
                Your Connected Business System
              </h2>

              <p className="text-gray-600 max-w-2xl mx-auto mb-10 md:mb-12 text-sm md:text-base">
                A complete front‑to‑back ecosystem that connects your website, customer experience,
                internal operations, and external integrations into one seamless loop.
              </p>

              <div className="w-full flex items-center justify-center">
                <Image
                  src="/ConnectedBusiness5.png"
                  alt="Connected business diagram"
                  width={700}
                  height={400}
                  className="object-contain mx-auto rounded-3xl"
                  priority
                />
              </div>

            </div>
          </div>
        </section>

        {/* INTERACTIVE PILLARS (no animation) */}
        <Pillars />

      {/* TOP CURVE FOR QUICKBOOKS */}
<Curve flip={true} />

{/* QUICKBOOKS SYNC (no animation) */}
<section className="w-full py-10 md:py-12 bg-blue-50 border-t border-blue-100">

          <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Two‑way sync with QuickBooks — no double entry, ever.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 md:mb-10 text-sm md:text-base">
              Your website, workflows, and operations stay perfectly aligned with your accounting.
            </p>

            <div className="w-full max-w-3xl mx-auto">
              <Image
                src="/method-quickbooks.png"
                alt="Method and QuickBooks sync illustration"
                width={1200}
                height={600}
              />
            </div>
          </div>
        </section>

        {/* KEEP CURVE ONLY HERE */}
        <Curve />

        {/* PREBUILT APPLICATIONS (animated) */}
        <AnimatedSection>
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6">

              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center">
                Prebuilt Applications for Every Part of Your Business
              </h2>

              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                Templates includes a full suite of ready‑to‑use applications that manage your daily
                operations — from estimates and invoices to work orders, events, calendars, and more.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  "Estimates",
                  "Invoices",
                  "Work Orders",
                  "Events",
                  "Booking Calendar",
                  "Appointments",
                  "Tasks",
                  "Schedules",
                  "Shipment Tracking",
                  "Forms",
                  "Items",
                  "Documents",
                  "Cases",
                  "Reviews",
                  "Gallery",
                ].map((app) => (
                  <div
                    key={app}
                    className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center shadow-sm"
                  >
                    <p className="font-medium text-gray-800">{app}</p>
                  </div>
                ))}
              </div>

            </div>
          </section>
        </AnimatedSection>

        {/* CUSTOMIZATION (animated) */}
        <AnimatedSection>
          <section className="py-20 bg-blue-50 border-y border-blue-100">
            <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12">

              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                  Customized to Match Your Exact Workflows
                </h2>
                <p className="text-gray-600 text-sm md:text-base mb-6">
                  Every business operates differently — and your system should reflect that. We tailor
                  each application to your processes, data structure, automation rules, and customer
                  experience.
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  Whether you need custom fields, workflow logic, approval steps, automation triggers,
                  or industry‑specific UI changes, we adapt Templates to fit your business perfectly.
                </p>
              </div>

              <div className="flex-1">
                <Image
                  src="/customization.png"
                  alt="Customization illustration"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-md object-cover"
                />
              </div>

            </div>
          </section>
        </AnimatedSection>

        {/* INTEGRATIONS (animated) */}
        <AnimatedSection>
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12">

              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                  Integrations That Connect Your Entire Business
                </h2>
                <p className="text-gray-600 text-sm md:text-base mb-6">
                  Templates connects to Google Workspace, Maps, Zapier, DHL, QuickBooks, Xero, and
                  dozens of other systems — keeping all your external data synced automatically.
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  No more switching between apps or manually updating information. Everything stays
                  synced, organized, and accessible.
                </p>
              </div>

              <div className="flex-1">
                <Image
                  src="/integrations.png"
                  alt="Integrations illustration"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-md object-cover"
                />
              </div>

            </div>
          </section>
        </AnimatedSection>

        {/* VIDEO (animated) */}
        <AnimatedSection>
          <section className="py-20 bg-blue-50 border-t border-blue-100">
            <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">

              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                Watch the Product Walkthrough
              </h2>

              <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm md:text-base">
                See how Templates connects your website, front end, back end, and integrations into
                one seamless business system.
              </p>

              <div className="aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-md bg-gray-200">
                <span className="text-gray-500">Video Placeholder</span>
              </div>

            </div>
          </section>
        </AnimatedSection>

      </main>
    </div>
  );
}
