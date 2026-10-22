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
import Statement from "./components/Statement";

export const metadata = {
  title: "Templates — Business Management Software",
  description:
    "Templates is a suite of customizable business applications built inside Method:CRM. Manage customers, work, and finances in one system with two-way QuickBooks sync and no double entry.",
};

// Flip to true once you have real client reviews to show (the section and its background
// rhythm switch back automatically)
const SHOW_TESTIMONIALS = false;

// App pages liv at /<slug> (e.g. /work-orders). Change this one function if that ever changes
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
    name: "Spreadsheets and separate tools",
    points: [
      "Information copied into several places",
      "Manual re-entry that invites errors",
      "Every new need becomes another tool",
    ],
  },
  {
    name: "Fixed off-the-shelf software",
    points: [
      "You adapt your workflow to the software",
      "Can mean replacing QuickBooks and a heavy data migration",
      "Accounting sync can be one-way or limited",
      "Hard to change as your business grows",
    ],
  },
  {
    name: "A blank platform",
    points: [
      "Method on its own is a blank canvas, with basic apps that need customizing first",
      "You pay to build the foundations",
      "Slow to get to a working system",
    ],
  },
];

const templatesPoints = [
  "One adaptable home for operations and finances",
  "Changes with your business, now and later",
  "Prebuilt, connected apps that work out of the box",
  "Keep QuickBooks or Xero, with two-way sync",
  "Easier move-over: your books stay put and we help bring your data across",
  "Custom tools for maps, tracking, and more",
];

// Ways to work with us. Each card links to its own page.
// NOTE: confirm the web design page URL below.
const offerings = [
  {
    name: "Application subscription",
    body: "Subscribe to the Templates applications you need. Each one is prebuilt, connected to the others, and ready to use.",
    cta: "Browse applications",
    href: "/apps",
  },
  {
    name: "Customization",
    body: "Tailor screens, workflows, and automations to your business. Choose hourly or pay-per-use work, or a lower-rate dedicated service plan for ongoing support.",
    cta: "See customization",
    href: "/customization",
  },
  {
    name: "Web design",
    body: "Websites and portals built to work with your data, such as maps, order and shipment status, and online shops.",
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

function BlankPlatformIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="4" width="18" height="16" rx="2" strokeDasharray="3 3" />
      <path d="M12 9v6M9 12h6" />
    </svg>
  );
}

const comparisonIcons = [SpreadsheetIcon, FixedSoftwareIcon, BlankPlatformIcon];

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
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                What is Templates?
              </h2>

              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Templates is a suite of customizable business applications built inside
                Method:CRM. It manages your financial, customer, work, and employee data in one
                unified system, replacing spreadsheets, disconnected tools, and manual
                processes.
              </p>

              <p className="text-gray-600 mb-6 text-sm md:text-base">
                Powered by Method&apos;s platform, every workflow you create syncs in both
                directions with QuickBooks, so you keep your accounting system and avoid double
                entry. As your
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
                  href="#why-templates"
                  className="px-6 py-3 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg font-medium text-center hover:bg-blue-100 transition"
                >
                  Why Templates?
                </a>
              </div>
            </div>

            {/* Home screen image (hidden on phones). Remove rounded-3xl for flat corners. */}
            <div className="hidden md:block w-full max-w-3xl lg:max-w-none lg:flex-1 lg:min-w-0 lg:mt-28">
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
              Two‑way sync with QuickBooks — no double entry, ever.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 md:mb-10 text-sm md:text-base">
              Your website, workflows, and operations stay aligned with your accounting. Keep
              QuickBooks or Xero as your books: changes flow in both directions, with no
              accounting migration and no one-way exports to untangle.
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
                Prebuilt Applications for Every Part of Your Business
              </h2>

              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12 text-sm md:text-base">
                Method on its own is a blank canvas. These applications are the finished foundation
                built on it, ready to use and easy to tailor to the way your business works.
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
                Plus more applications, all ready to customize:
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

        {/* STATEMENT BAND 1 */}
        <Statement
          variant="dark"
          tone="amber"
          align="left"
          lead="Working from "
          accent="day one"
          tail="."
          sub="Method is the blank canvas. Templates is the finished work on top of it, so there is no ground-up build."
          href="/why-templates#compare"
          linkLabel="See how we compare"
        />

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
                  business perfectly. Because the foundations are already built, your customization budget goes toward what makes your business unique, not rebuilding the basics.
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

        {/* STATEMENT BAND 2 */}
        <Statement
          variant="light"
          tone="emerald"
          align="right"
          lead="Built around "
          accent="you"
          tail="."
          sub="Every screen, workflow, and automation can change as your business does."
          href="/customization"
          linkLabel="See customization"
        />

        {/* INTEGRATIONS — prebuilt connections and custom-built tools in one section (animated) */}
        <AnimatedSection>
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                  Integrations That Connect Your Entire Business
                </h2>
                <p className="text-gray-600 text-sm md:text-base mb-6">
                  Templates connects to the tools you already use, and we build the ones you
                  don&apos;t have yet. Some connections are prebuilt and ready to go. Others are
                  custom made to fit how you work, then feed their data back into your system.
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

        {/* STATEMENT BAND 3 */}
        <Statement
          variant="dark"
          tone="sky"
          align="center"
          lead="Enter it "
          accent="once"
          tail="."
          sub="Customers, invoices, and payments sync both ways, so nothing gets typed twice."
          href="/why-templates#compare"
          linkLabel="Compare your options"
        />

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
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 text-center">
                Why Templates?
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12 text-sm md:text-base">
                Whether you&apos;re keeping what you have, weighing up big-name CRMs and suites, or
                starting from a blank platform, here is how the options compare.{" "}
                <Link
                  href="/why-templates"
                  className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800 hover:decoration-blue-700"
                >
                  Full comparison and cost factors &rarr;
                </Link>
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      <h3 className="text-base font-semibold text-gray-800 mb-4">{option.name}</h3>
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

                <div className="bg-blue-600 rounded-2xl p-6 text-left shadow-lg">
                  <TemplatesIcon />
                  <h3 className="text-base font-semibold text-white mb-4">Templates</h3>
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
                  Start with the applications, tailor them to your business, or add a website that
                  works with your data. Many clients use more than one.
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
                    Templates applications are installed in your Method:CRM account, so you&apos;ll
                    need a Method subscription. Only Method&apos;s base fee is required, and it is
                    billed by Method. You won&apos;t need Method&apos;s additional packs or basic
                    applications when you use Templates applications.
                  </p>
                  <p className="mt-2">
                    For the accounting sync, you&apos;ll also need QuickBooks (Xero works too). We
                    can help you get set up in your free consultation.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* STATEMENT BAND 4 */}
        <Statement
          variant="light"
          tone="amber"
          align="left"
          lead="Keep "
          accent="QuickBooks"
          tail="."
          sub="Two-way sync and no accounting migration. Xero works too."
          href="/why-templates#cost"
          linkLabel="See what affects your cost"
        />

        {/* INDUSTRIES — on phones only the first MOBILE_INDUSTRY_COUNT cards show */}
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
                Method provides the platform - we build the applications. See how Method connects all aspects of your business into one seamless business system.
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
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                Ready to run your business from one connected system?
              </h2>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-sm md:text-base">
                Book a free consultation and tell us how your business works. We&apos;ll show you
                what Templates can do for it and give you a clear estimate.
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
