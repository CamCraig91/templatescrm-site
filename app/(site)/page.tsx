import HeroSection from "./components/HeroSection";
import Pillars from "./components/Pillars";
import Image from "next/image";
import Link from "next/link";

import AnimatedSection from "./components/AnimatedSection";
import Curve from "./components/Curve";
import ImageLightbox from "./components/ImageLightbox";

export const metadata = {
  title: "Templates:CRM — Business Management Software",
  description:
    "Templates:CRM is a suite of customizable business applications built inside Method:CRM. Manage customers, work, and finances in one system with two-way QuickBooks sync and no double entry.",
};

const apps = [
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
];

const steps = [
  {
    title: "Discovery",
    body: "We learn your workflows, pain points, and goals.",
    img: "/discovery1.png",
  },
  {
    title: "Design",
    body: "We map out screens, workflows, and automations.",
    img: "/design1.png",
  },
  {
    title: "Build",
    body: "We develop your custom Method components.",
    img: "/build.png",
  },
  {
    title: "Launch",
    body: "We test, refine, and support your rollout.",
    img: "/launch.png",
  },
];

const industries = [
  {
    name: "Home services",
    body: "Estimates, work orders, scheduling, and photo verification of finished jobs.",
  },
  {
    name: "Construction",
    body: "Track projects, crews, and change orders, then invoice straight from the job.",
  },
  {
    name: "Distribution and shipping",
    body: "Live shipment tracking that staff and customers can both see.",
  },
  {
    name: "Accounting and professional services",
    body: "Cases, documents, and client portals that stay synced with your books.",
  },
  {
    name: "Field service",
    body: "Appointments, technician tasks, and booking calendars in one place.",
  },
  {
    name: "Retail and wholesale",
    body: "Items, orders, and invoices that flow into QuickBooks or Xero automatically.",
  },
];

const testimonials = [
  {
    quote:
      "Cameron helped us automate our entire estimate workflow. We save hours every week.",
    who: "Sarah, Home Services Business",
  },
  {
    quote:
      "Our custom screens make Method so much easier for our team. Total game-changer.",
    who: "Mark, Construction Company",
  },
  {
    quote:
      "The integrations Cameron built keep everything synced. No more double-entry.",
    who: "Jenna, Accounting Firm",
  },
];

const faqs = [
  {
    q: "Do I need Method:CRM to use Templates:CRM?",
    a: "Yes. Templates is built inside Method:CRM, so it runs on a Method account. We can walk you through the setup during your free consultation.",
  },
  {
    q: "How does the QuickBooks sync work?",
    a: "Every workflow you build in Templates syncs with QuickBooks in both directions, so invoices, customers, and payments only need to be entered once. Xero is supported as well.",
  },
  {
    q: "Can Templates be customized to fit how we work?",
    a: "Yes. Every screen, automation, and workflow can be changed, including custom fields, approval steps, automation triggers, and industry-specific layouts.",
  },
  {
    q: "How much does it cost?",
    a: "Customization is billed hourly, with a pay-per-use option and a lower-rate dedicated service plan for ongoing support. The free consultation helps us scope your project and give you a clear estimate.",
  },
  {
    q: "How long does setup take?",
    a: "It depends on how much you want customized. We'll give you a timeline after the discovery step, before any build work begins.",
  },
  {
    q: "What about the data I already have in spreadsheets or other tools?",
    a: "Bringing existing data into your new system is part of what we scope in the consultation, so nothing gets left behind.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <HeroSection />

      <main>
        {/* FLOW DIAGRAM (no animation) */}
        {/* Extra bottom padding (pb-28 / md:pb-32) gives the next card room to overlap
            without covering the diagram. */}
        <section className="relative -mt-20 z-10">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="bg-blue-50 border border-blue-100 rounded-3xl shadow-md px-8 md:px-16 pt-16 md:pt-20 pb-28 md:pb-32 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
                Your Connected Business System
              </h2>

              <p className="text-gray-600 max-w-2xl mx-auto mb-10 md:mb-12 text-sm md:text-base">
                A complete front‑to‑back ecosystem that connects your website, customer experience,
                internal operations, and external integrations into one seamless loop.
              </p>

              <div className="md:flex w-full items-center justify-center">
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

        {/* WHAT TEMPLATES IS — compact card nudged toward the center, with a click-to-enlarge
            image in the open space beside it. Below lg the image stacks under the card.
            - Card closeness to the left edge: md:pl-12 lg:pl-20 on the <section>
            - Card width: lg:max-w-2xl
            - Image gap from the card above: lg:mt-28 (the card above ends 64px into this section)
            - Space before the next section: pb-6 lg:pb-8 */}
        <section className="relative -mt-16 z-20 pl-4 pr-4 md:pl-12 lg:pl-20 md:pr-6 pb-6 lg:pb-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
            <div className="w-full max-w-3xl lg:max-w-2xl lg:shrink-0 bg-white border border-gray-200 rounded-3xl shadow-xl px-8 md:px-12 py-10 md:py-12 text-left">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                What is Templates:CRM?
              </h2>

              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Templates is a suite of customizable business applications built inside
                Method:CRM. It manages your financial, customer, work, and employee data in one
                unified system, replacing spreadsheets, disconnected tools, and manual
                processes.
              </p>

              <p className="text-gray-600 mb-6 text-sm md:text-base">
                Powered by Method&apos;s platform, every workflow you create syncs directly
                with QuickBooks, ensuring clean accounting with no double entry. As your
                business grows, Templates adapts with you. Every screen, automation, and
                workflow can be tailored to fit your evolving needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/book-demo"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium text-center hover:bg-blue-700 transition"
                >
                  Book your free consultation
                </Link>
                <a
                  href="#how-it-works"
                  className="px-6 py-3 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg font-medium text-center hover:bg-blue-100 transition"
                >
                  See how it works
                </a>
              </div>
            </div>

            {/* Swap /templates-overview.png for a screenshot of your landing screen or app */}
            <div className="w-full max-w-3xl lg:max-w-none lg:flex-1 lg:min-w-0 lg:mt-28">
              <ImageLightbox
                src="/homescreen.png"
                alt="Templates:CRM overview"
                width={1400}
                height={900}
              />
            </div>
          </div>
        </section>

        {/* INTERACTIVE PILLARS (no animation) */}
        <Pillars />

        {/* TOP CURVE FOR QUICKBOOKS */}
        <Curve flip={true} />

        {/* QUICKBOOKS SYNC (no animation) */}
        <section className="w-full py-10 md:py-12 bg-blue-50">
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
                className="mx-auto h-auto w-full"
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
                operations — from estimates and invoices to work orders, events, calendars, and
                more.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {apps.map((app) => (
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
                  Every business operates differently, and your system should reflect that. We
                  tailor each application to your processes, data structure, automation rules, and
                  customer experience.
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  Whether you need custom fields, workflow logic, approval steps, automation
                  triggers, or industry‑specific UI changes, we adapt Templates to fit your
                  business perfectly.
                </p>
              </div>

              <div className="flex-1">
                <Image
                  src="/customizationchoice.jpg"
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
                  dozens of other systems, keeping all your external data synced automatically.
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  No more switching between apps or manually updating information. Everything
                  stays synced, organized, and accessible.
                </p>
              </div>

              <div className="flex-1">
                <Image
                  src="/plugin.png"
                  alt="Integrations illustration"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-md object-cover"
                />
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* HOW IT WORKS — a real sequence, so the steps are numbered */}
        <AnimatedSection>
          <section
            id="how-it-works"
            className="py-20 bg-blue-50 border-y border-blue-100 scroll-mt-20"
          >
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 text-center">
                From First Call to Going Live
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-14 text-sm md:text-base">
                We handle the build from start to finish, so you always know what&apos;s happening
                and what comes next.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                {steps.map((step, i) => (
                  <div key={step.title} className="text-center">
                    <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full mx-auto mb-4 overflow-hidden bg-white border border-blue-100 shadow-sm">
                      <Image
                        src={step.img}
                        alt={`${step.title} step`}
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {i + 1}. {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* INDUSTRIES */}
        <AnimatedSection>
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 text-center">
                Built for Businesses That Run on Jobs, Customers, and Invoices
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12 text-sm md:text-base">
                Templates adapts to the way your industry works. Here are a few places it fits
                well.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industries.map((item) => (
                  <div
                    key={item.name}
                    className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* TESTIMONIALS */}
        <AnimatedSection>
          <section className="py-20 bg-blue-50 border-y border-blue-100">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12 text-center">
                What Clients Say
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((t) => (
                  <figure
                    key={t.who}
                    className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm"
                  >
                    <blockquote className="text-gray-700 mb-4">&ldquo;{t.quote}&rdquo;</blockquote>
                    <figcaption className="text-gray-600 text-sm">{t.who}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* VIDEO (animated) */}
        <AnimatedSection>
          <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                Watch the Product Walkthrough
              </h2>

              <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm md:text-base">
                See how Templates connects your website, front end, back end, and integrations
                into one seamless business system.
              </p>

              {/* Swap this placeholder for your real video (iframe or <video>) when it's ready */}
              <div className="aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-md bg-blue-50 border border-blue-100 flex items-center justify-center">
                <span className="text-gray-500">Video coming soon</span>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* FAQ — native <details>, no client JS needed */}
        <AnimatedSection>
          <section className="py-20 bg-blue-50 border-y border-blue-100">
            <div className="max-w-3xl mx-auto px-4 md:px-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-10 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqs.map((item) => (
                  <details
                    key={item.q}
                    className="group bg-white border border-blue-100 rounded-2xl px-6 py-5 shadow-sm"
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-medium text-gray-900 [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <svg
                        className="h-5 w-5 shrink-0 text-blue-600 transition-transform group-open:rotate-180"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </summary>
                    <p className="mt-3 text-gray-600 text-sm md:text-base">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* FINAL CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="bg-blue-600 rounded-3xl px-8 md:px-16 py-14 md:py-16 text-center shadow-lg">
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                Ready to run your business from one connected system?
              </h2>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-sm md:text-base">
                Book a free consultation and tell us how your business works. We&apos;ll show you
                what Templates:CRM can do for it and give you a clear estimate.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/book-demo"
                  className="px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition"
                >
                  Book your free consultation
                </Link>
                <Link
                  href="/customization#pricing"
                  className="px-6 py-3 border border-blue-300 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
