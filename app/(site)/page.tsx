import HeroSection from "./components/HeroSection";
import Pillars from "./components/Pillars";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import AnimatedSection from "./components/AnimatedSection";
import Curve from "./components/Curve";
import ImageLightbox from "./components/ImageLightbox";
import IndustriesGrid from "./components/IndustriesGrid";
import ValueProps from "./components/ValueProps";

export const metadata = {
  title: "Templates — Business Management Software",
  description:
    "Templates is a suite of customizable business applications built inside Method:CRM. Manage customers, work, and finances in one system with two-way QuickBooks sync and no double entry.",
};

// Flip to true once you have real client reviews to show (the section and its background
// rhythm switch back automatically)
const SHOW_TESTIMONIALS = false;

// App pages live at /<slug> (e.g. /work-orders). Change this one function if that ever changes
const appPath = (slug: string) => `/${slug}`;

// How many cards show on phones before the rest are tucked away.
// Featured apps beyond this number move into the quick-link pills on mobile.
// Industries beyond this number are tucked behind a "Show more" button on mobile.
const MOBILE_FEATURED_COUNT = 4;
const MOBILE_INDUSTRY_COUNT = 3;

// Featured apps: the ones with the most interesting features. Each card links to its own page.
const featuredApps = [
  {
    name: "Customer Portal",
    blurb: "A branded login where customers follow their jobs, see photos, and review invoices.",
    slug: "customer-portal",
  },
  {
    name: "Online Shop",
    blurb: "Sell products online, with orders flowing straight into your accounting.",
    slug: "online-shop",
  },
  {
    name: "Book Appointment",
    blurb: "Let customers pick an open time themselves, any hour of the day.",
    slug: "book-appointment",
  },
  {
    name: "Work Orders",
    blurb: "Send jobs to the field and collect photo proof when they're finished.",
    slug: "work-orders",
  },
  {
    name: "Scheduling",
    blurb: "Plan crews and jobs on one calendar the whole team can see.",
    slug: "scheduling",
  },
  {
    name: "Inventory",
    blurb: "Track stock and items, with prices that carry into estimates and invoices.",
    slug: "inventory",
  },
  {
    name: "Shipment Tracking",
    blurb: "Live shipment status for your team and your customers.",
    slug: "shipment-tracking",
  },
  {
    name: "Forms",
    blurb: "Custom forms for intake, inspections, and sign-offs, saved to the customer record.",
    slug: "forms",
  },
];

// Everything else: shown as quick links under the featured cards
const moreApps = [
  { name: "Sales Orders", slug: "sales-orders" },
  { name: "Transactions", slug: "transactions" },
  { name: "Events", slug: "events" },
  { name: "Reminders", slug: "reminders" },
  { name: "Tasks", slug: "tasks" },
  { name: "Human Resources", slug: "human-resources" },
  { name: "Payroll", slug: "payroll" },
];

// Why Templates: the alternatives on the left, Templates highlighted last
const comparison = [
  {
    name: "DIY setup",
    subtitle: "Spreadsheets, separate tools, or a blank platform",
    points: [
      "Information copied into several places",
      "Manual re-entry that invites errors",
      "Takes forever to build the foundations",
      "More admin time just to keep it running",
      "Missing features and no real connection between tools",
      "Patching software together to make it work",
    ],
  },
  {
    name: "Other platforms",
    subtitle: "Big CRMs, suites, and fixed software",
    points: [
      "Expensive once seats, onboarding, and add-ons add up",
      "Lacking the features you actually need",
      "Not adaptable: you change to fit the software",
      "Hard to change as you grow",
      "Can mean replacing QuickBooks and a heavy migration",
    ],
  },
];

const templatesPoints = [
  "One adaptable home for operations and finances",
  "Prebuilt, connected apps that work out of the box",
  "Keep QuickBooks or Xero, with two-way sync",
  "Easy move-over: books stay put, we bring your data",
  "Custom tools for maps, tracking, and more",
];

// Ways to work with us. Each card links to its own page.
// NOTE: confirm the web design page URL below.
const offerings = [
  {
    name: "Application subscription",
    body: "Prebuilt, connected apps, ready to use.",
    cta: "Browse applications",
    href: "/apps",
  },
  {
    name: "Customization",
    body: "Tailor screens, workflows, and automations. Hourly, pay-per-use, or a lower-rate service plan.",
    cta: "See customization",
    href: "/customization",
  },
  {
    name: "Web design",
    body: "Websites and portals that work with your data: maps, order status, online shops.",
    cta: "See web design",
    href: "/web-design",
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
    body: "Items, orders, and invoices that flow into QuickBooks or Xero.",
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
    q: "Do I need Method:CRM to use Templates?",
    a: "Yes. Templates is built inside Method:CRM, so it runs on a Method account, and Method's base fee is required. It is billed by Method, separately from Templates. You don't need Method's additional packs or its basic applications when you use Templates applications. We can walk you through the setup during your free consultation.",
  },
  {
    q: "Do I need QuickBooks?",
    a: "To use the accounting sync, yes. You'll need a QuickBooks account (Xero is supported as well). Your books stay where they are, and Templates keeps them in step with the rest of your business.",
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
    a: "Customization is billed hourly, with a pay-per-use option and a lower-rate dedicated service plan for ongoing support. Method's own fee is billed separately by Method, and any introductory discount on it ends after the first few months. The Why Templates page lists everything that affects your total, and the free consultation helps us scope your project and give you a clear estimate.",
  },
  {
    q: "How long does setup take?",
    a: "It depends on how much you want customized. We'll give you a timeline after the discovery step, before any build work begins.",
  },
  {
    q: "What about the data I already have in spreadsheets or other tools?",
    a: "Your books can stay in QuickBooks or Xero, and bringing your existing spreadsheet and CRM data across is part of what we scope in the consultation. You aren't starting from scratch or replacing your accounting system.",
  },
];

// Small icons for the "Why Templates?" cards
function XBadge() {
  return (
    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white ring-2 ring-white">
      <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
      {children}
      <XBadge />
    </div>
  );
}

const iconProps = {
  className: "h-6 w-6",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function SpreadsheetIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M3 15h18M9 4v16M15 4v16" />
    </svg>
  );
}

function FixedSoftwareIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M3 8h18M6 12h5" />
      <rect x="14" y="13" width="7" height="6" rx="1.5" fill="white" />
      <path d="M15.5 13v-1.2a2 2 0 014 0V13" />
    </svg>
  );
}

const comparisonIcons = [SpreadsheetIcon, FixedSoftwareIcon];

function TemplatesIcon() {
  return (
    <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
      <svg {...iconProps}>
        <circle cx="6" cy="12" r="2.2" />
        <circle cx="18" cy="6" r="2.2" />
        <circle cx="18" cy="18" r="2.2" />
        <path d="M8 11l8-4M8 13l8 4" />
      </svg>
      <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-white ring-2 ring-blue-600">
        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
          <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}

// Hand-drawn style yellow underline for a key word in a heading (decorative)
function Hl({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden="true"
        className="absolute left-0 -bottom-1 h-2 w-full text-yellow-400"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M2 9C45 3 125 3 198 7"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

// Hand-drawn style yellow arrow that points down. Size, flip and tilt it with className,
// e.g. "h-16 w-16 -scale-x-100 rotate-6".
function ScribbleArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none text-yellow-400 ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8C62 10 82 34 74 78" />
      <path d="M56 62L74 80L90 60" />
    </svg>
  );
}

// Hand-drawn style yellow arrow that arcs up and points right (used to link the card to the photo).
function ScribbleArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none text-yellow-400 ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 78C14 30 52 14 88 36" />
      <path d="M77 17L88 36L66 36" />
    </svg>
  );
}

// An arrow that straddles the seam between two sections, to lead the eye down the page.
// Position it sideways with className, e.g. "left-[14%]" or "right-[14%] -scale-x-100".
function SeamArrow({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className="relative z-10 hidden h-0 md:block">
      <ScribbleArrow className={`absolute -top-10 h-20 w-20 ${className}`} />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <HeroSection />

      <main>
        {/* VALUE PROPOSITIONS (interactive — see components/ValueProps.tsx)
            Extra bottom padding (pb-28 / md:pb-32) gives the next card room to overlap
            without covering the content. */}
        <section className="relative -mt-20 z-10">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="bg-blue-50 border border-blue-100 rounded-3xl shadow-md px-6 md:px-14 pt-14 md:pt-16 pb-28 md:pb-32 text-center">
              <ValueProps />
            </div>
          </div>
        </section>

        {/* WHAT TEMPLATES IS — compact card nudged toward the center, with a click-to-enlarge
            image in the open space beside it. Hidden on phones; stacks under the card on tablets.
            - Card closeness to the left edge: md:pl-12 lg:pl-20 on the <section>
            - Image closeness to the right edge: lg:pr-10 xl:pr-16 on the <section> (bigger = more central)
            - Card width: lg:max-w-xl (narrower card = bigger image)
            - Image gap from the card above: lg:mt-28 (the card above ends 64px into this section)
            - Space before the next section: pb-6 lg:pb-8 */}
        <section className="relative -mt-16 z-20 pl-4 pr-4 md:pl-12 lg:pl-20 md:pr-6 lg:pr-10 xl:pr-16 pb-6 lg:pb-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10">
            <div className="w-full max-w-3xl lg:max-w-xl lg:shrink-0 bg-white border border-gray-200 rounded-3xl shadow-xl px-8 md:px-12 py-10 md:py-12 text-left">
              <div className="mb-4 flex items-center gap-3">
                <Image src="/logo1.png" alt="" width={64} height={64} className="h-9 w-auto md:h-10" />
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  What is Templates?
                </h2>
              </div>

              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Templates is a suite of customizable business applications built inside
                Method:CRM. It manages your financial, customer, work, and employee data in one
                unified system, replacing spreadsheets, disconnected tools, and manual
                processes.
              </p>

              <p className="text-gray-600 mb-6 text-sm md:text-base">
                Powered by Method&apos;s platform, every workflow you create syncs in both
                directions with QuickBooks, so you keep your accounting system and avoid double
                entry. As your business grows, Templates adapts with you. Every screen,
                automation, and workflow can be tailored to fit your evolving needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/book-demo"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium text-center hover:bg-blue-700 transition"
                >
                  Book your free consultation
                </Link>
                <a
                  href="#why-templates"
                  className="px-6 py-3 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg font-medium text-center hover:bg-blue-100 transition"
                >
                  Why Templates?
                </a>
              </div>
            </div>

            {/* Home screen image (hidden on phones). Remove rounded-3xl for flat corners. */}
            <div className="relative hidden md:block w-full max-w-3xl lg:max-w-none lg:flex-1 lg:min-w-0 lg:mt-28">
              <ScribbleArrowRight className="absolute -left-14 -top-8 hidden h-14 w-20 lg:block" />
              <ImageLightbox
                src="/homescreen.png"
                alt="Templates home screen"
                width={1400}
                height={900}
                className="rounded-3xl"
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
              Two‑way sync with QuickBooks — <Hl>no double entry</Hl>, ever.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 md:mb-10 text-sm md:text-base">
              Keep QuickBooks or Xero as your books. Changes flow both ways, with no migration.
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

        {/* PREBUILT APPLICATIONS (animated) — featured cards link to each app's page.
            On phones only the first MOBILE_FEATURED_COUNT cards show; the rest appear as
            quick-link pills below (the sm:hidden pills). From sm up, all cards show. */}
        <AnimatedSection>
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center">
                Prebuilt Apps for <Hl>Every Part</Hl> of Your Business
              </h2>

              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12 text-sm md:text-base">
                Method on its own is a blank canvas. These apps are the finished foundation: ready
                to use, easy to tailor.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredApps.map((app, i) => (
                  <Link
                    key={app.slug}
                    href={appPath(app.slug)}
                    className={`group flex-col bg-blue-50 border border-blue-100 rounded-2xl p-6 text-left transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 ${
                      i >= MOBILE_FEATURED_COUNT ? "hidden sm:flex" : "flex"
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{app.name}</h3>
                    <p className="text-gray-600 text-sm">{app.blurb}</p>
                  </Link>
                ))}
              </div>

              <p className="text-gray-600 text-center mt-12 mb-4 text-sm">
                Plus more, all customizable:
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {/* Mobile only: the featured apps that were hidden from the card grid */}
                {featuredApps.slice(MOBILE_FEATURED_COUNT).map((app) => (
                  <Link
                    key={`mobile-${app.slug}`}
                    href={appPath(app.slug)}
                    className="sm:hidden px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-700 transition hover:border-blue-300 hover:text-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                  >
                    {app.name}
                  </Link>
                ))}
                {moreApps.map((app) => (
                  <Link
                    key={app.slug}
                    href={appPath(app.slug)}
                    className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-700 transition hover:border-blue-300 hover:text-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                  >
                    {app.name}
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/apps"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  View all applications
                </Link>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <SeamArrow className="left-[14%]" />

        {/* CUSTOMIZATION (animated) */}
        <AnimatedSection>
          <section className="py-20 bg-blue-50 border-y border-blue-100">
            <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                  Customized to Match <Hl>Your Exact Workflows</Hl>
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Custom fields, workflow logic, approvals, automations, industry layouts. We
                  tailor each app to how you work, so your budget goes to what makes you unique,
                  not rebuilding the basics.
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

        <SeamArrow className="right-[14%] -scale-x-100" />

        {/* INTEGRATIONS — prebuilt connections and custom-built tools in one section (animated) */}
        <AnimatedSection>
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                  Integrations That Connect Your Entire Business
                </h2>
                <p className="text-gray-600 text-sm md:text-base mb-6">
                  We connect the tools you already use and build the ones you don&apos;t. Everything
                  feeds back into one system.
                </p>

                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-2">
                    Prebuilt, ready to use
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Google Workspace", "Employee sign-in locations","Google Maps", "Zapier", "DHL", "QuickBooks", "Shipment status on your website","Xero"].map(
                      (t) => (
                        <span
                          key={t}
                          className="rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs md:text-sm text-blue-800"
                        >
                          {t}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-2">
                    Custom built for you
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Maps and geofencing",
                      "Barcode scanning",
                      "POS payments",
                      "AI photo reading",
                    ].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-dashed border-blue-300 px-3 py-1 text-xs md:text-sm text-gray-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/ai"
                  className="text-sm font-medium text-blue-700 hover:text-blue-800 transition"
                >
                  See what AI can do for your data entry &rarr;
                </Link>
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

        <SeamArrow className="left-1/2 -translate-x-1/2" />

        {/* WHY TEMPLATES — compared with staying put or choosing something else (animated).
            The faint dot texture is the backgroundImage below; lower the 0.12 to soften it. */}
        <AnimatedSection>
          <section
            id="why-templates"
            className="py-20 bg-blue-50 border-y border-blue-100 scroll-mt-20"
            style={{
              backgroundImage: "radial-gradient(rgba(37, 99, 235, 0.12) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          >
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <Image src="/logo1.png" alt="" width={64} height={64} className="mx-auto mb-3 h-10 w-auto" />
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 text-center">
                Why <Hl>Templates</Hl>?
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12 text-sm md:text-base">
                Keeping what you have, weighing big-name CRMs, or starting from a blank platform?
                Here is how they compare.{" "}
                <Link
                  href="/why-templates"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800 hover:decoration-blue-700"
                >
                  Full comparison and cost factors &rarr;
                </Link>
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {comparison.map((option, i) => {
                  const Icon = comparisonIcons[i];
                  return (
                    <div
                      key={option.name}
                      className="bg-white border border-gray-200 rounded-2xl p-6 text-left"
                    >
                      <IconFrame>
                        <Icon />
                      </IconFrame>
                      <h3 className="text-base font-semibold text-gray-800">{option.name}</h3>
                      <p className="mt-1 mb-4 text-xs text-gray-500">{option.subtitle}</p>
                      <ul className="space-y-3">
                        {option.points.map((point) => (
                          <li key={point} className="flex gap-2 text-sm text-gray-600">
                            <svg
                              className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              aria-hidden="true"
                            >
                              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                            </svg>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}

                <div className="bg-blue-600 rounded-2xl p-6 text-left shadow-lg ring-4 ring-yellow-300 sm:col-span-2 lg:col-span-1">
                  <TemplatesIcon />
                  <h3 className="text-base font-semibold text-white">Templates</h3>
                  <p className="mt-1 mb-4 text-xs text-blue-100">Method&apos;s platform, finished for you</p>
                  <ul className="space-y-3">
                    {templatesPoints.map((point) => (
                      <li key={point} className="flex gap-2 text-sm text-blue-50">
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-white"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          aria-hidden="true"
                        >
                          <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* WAYS TO WORK WITH US */}
              <div className="mt-20">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 text-center">
                  Choose how you want to work with us
                </h3>
                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 text-sm md:text-base">
                  Start with the apps, tailor them, or add a website. Many clients do more than one.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  {offerings.map((o) => (
                    <div
                      key={o.name}
                      className="flex flex-col bg-white border border-blue-100 rounded-2xl p-6 text-left shadow-sm"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{o.name}</h4>
                      <p className="text-gray-600 text-sm mb-6">{o.body}</p>
                      <Link
                        href={o.href}
                        className="mt-auto inline-block self-start px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                      >
                        {o.cta}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* GOOD TO KNOW — a quiet note about what Templates runs on */}
              <div
                role="note"
                className="mt-10 max-w-3xl mx-auto flex gap-3 rounded-2xl border border-blue-200 bg-blue-100/60 px-5 py-4 text-left"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5M12 8h.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-sm text-blue-950/80">
                  <p className="font-semibold text-blue-950">Good to know: Templates runs on Method:CRM</p>
                  <p className="mt-1">
                    You&apos;ll need a Method subscription (base fee only, billed by Method) and
                    QuickBooks or Xero for the sync. No Method add-on packs or basic apps needed.
                    We&apos;ll help you set up in your free consultation.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* INDUSTRIES — on phones only the first MOBILE_INDUSTRY_COUNT cards show */}
        <AnimatedSection>
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 text-center">
                Built for Businesses That Run on Jobs, Customers, and Invoices
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12 text-sm md:text-base">
                Templates adapts to your industry. A few places it fits well.
              </p>

              <IndustriesGrid industries={industries} mobileCount={MOBILE_INDUSTRY_COUNT} />
            </div>
          </section>
        </AnimatedSection>

        {/* TESTIMONIALS — hidden until SHOW_TESTIMONIALS is true */}
        {SHOW_TESTIMONIALS && (
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
        )}

        {/* VIDEO (animated) */}
        <AnimatedSection>
          <section
            className={`py-20 ${
              SHOW_TESTIMONIALS ? "bg-white" : "bg-blue-50 border-y border-blue-100"
            }`}
          >
            <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                Watch the Product Walkthrough
              </h2>

              <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm md:text-base">
                Method provides the platform. We build the applications. See how it all connects.
              </p>

              {/* YouTube embed (privacy-enhanced domain, loads only when scrolled near) See how Templates connects your website, front end, back end, and integrations
                into one seamless business system.*/}
              <div className="aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-md bg-slate-900">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube-nocookie.com/embed/TpN1_FyHVeI"
                  title="Method CRM: #1 Customizable QuickBooks CRM for Growing Businesses"
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* FAQ — native <details>, no client JS needed */}
        <AnimatedSection>
          <section
            className={`py-20 ${
              SHOW_TESTIMONIALS ? "bg-blue-50 border-y border-blue-100" : "bg-white"
            }`}
          >
            <div className="max-w-3xl mx-auto px-4 md:px-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-10 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqs.map((item) => (
                  <details
                    key={item.q}
                    className={`group border border-blue-100 rounded-2xl px-6 py-5 shadow-sm ${
                      SHOW_TESTIMONIALS ? "bg-white" : "bg-blue-50"
                    }`}
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
        <section className={`bg-white ${SHOW_TESTIMONIALS ? "py-20" : "pt-4 pb-20"}`}>
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="bg-blue-600 rounded-3xl px-8 md:px-16 py-14 md:py-16 text-center shadow-lg">
              <Image src="/logowhite.png" alt="Templates" width={400} height={100} className="mx-auto mb-5 h-8 w-auto" />
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                Ready to run your business from one connected system?
              </h2>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-sm md:text-base">
                Book a free consultation. We&apos;ll show you what Templates can do and give you a
                clear estimate.
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
