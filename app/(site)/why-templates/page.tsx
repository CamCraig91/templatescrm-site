import Link from "next/link";

import AnimatedSection from "./components/AnimatedSection";
import Statement, { Accent, darkTexture } from "./components/StatementBand";

export const metadata = {
  title: "Why Templates — Compare and Cost",
  description:
    "See how Templates compares with blank platforms, big CRMs, and fixed software, and what goes into the cost of a setup.",
};

// The four outcomes customers get (moved here from the home page)
const outcomes = [
  {
    lead: "Less ",
    accent: "repetitive",
    tail: " work",
    body: "Enter information once and let automations handle the rest.",
  },
  {
    lead: "Fewer ",
    accent: "errors",
    tail: "",
    body: "One source of truth, kept in step with your accounting.",
  },
  {
    lead: "More ",
    accent: "capability",
    tail: "",
    body: "Do things your current software simply can't.",
  },
  {
    lead: "Better ",
    accent: "customer",
    tail: " experience",
    body: "Portals, online booking & payments, and live updates for your customers.",
  },
];

// ---------------------------------------------------------------------------
// Comparison table. Each cell has a mark (yes / part / no / none) and a short line.
// These describe typical differences between kinds of software, not any one product.
// ---------------------------------------------------------------------------
type Mark = "yes" | "part" | "no" | "none";
type Cell = { mark: Mark; text: string };

const columns = ["Templates", "Method on its own", "Big CRMs and suites", "Fixed industry software"];

const rows: { label: string; cells: Cell[] }[] = [
  {
    label: "Keep QuickBooks or Xero",
    cells: [
      { mark: "yes", text: "Yes. Your books stay where they are" },
      { mark: "yes", text: "Yes" },
      { mark: "part", text: "Often replaced, or linked with an add-on" },
      { mark: "part", text: "Depends on the product" },
    ],
  },
  {
    label: "Two-way accounting sync",
    cells: [
      { mark: "yes", text: "Customers, invoices, and payments sync both ways" },
      { mark: "yes", text: "Real-time two-way sync" },
      { mark: "part", text: "Depth varies, and some syncs are one-way" },
      { mark: "part", text: "Often limited" },
    ],
  },
  {
    label: "Ready to use on day one",
    cells: [
      { mark: "yes", text: "Prebuilt, connected apps" },
      { mark: "no", text: "A blank canvas you build on" },
      { mark: "part", text: "Generic until configured" },
      { mark: "yes", text: "Yes, for its one use case" },
    ],
  },
  {
    label: "Fits how you work",
    cells: [
      { mark: "yes", text: "Tailored to your workflows, now and later" },
      { mark: "part", text: "Flexible, but you build it" },
      { mark: "part", text: "Configurable, often with consultants" },
      { mark: "no", text: "You adapt to the software" },
    ],
  },
  {
    label: "Getting started",
    cells: [
      { mark: "yes", text: "Books stay put, and we help bring your data across" },
      { mark: "part", text: "Build first, then import" },
      { mark: "no", text: "Often a full migration project" },
      { mark: "part", text: "A new system to learn" },
    ],
  },
  {
    label: "Where the cost goes",
    cells: [
      { mark: "none", text: "Seats, plus only the customization you choose" },
      { mark: "none", text: "Seats, plus the whole build" },
      { mark: "none", text: "Seats, onboarding, and often consultants" },
      { mark: "none", text: "Seats, plus extra tools for the gaps" },
    ],
  },
];

function MarkIcon({ mark }: { mark: Mark }) {
  if (mark === "none") return null;
  const common = {
    className: "mt-0.5 h-4 w-4 shrink-0",
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (mark === "yes") {
    return (
      <svg {...common} className={`${common.className} text-emerald-600`}>
        <path d="M4 10.5l4 4 8-9" />
      </svg>
    );
  }
  if (mark === "part") {
    return (
      <svg {...common} className={`${common.className} text-amber-500`}>
        <path d="M5 10h10" />
      </svg>
    );
  }
  return (
    <svg {...common} className={`${common.className} text-red-500`}>
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// What affects the cost. "billedBy" tells the reader who sends the invoice.
// No dollar figures yet: add them here once the pricing is final.
// ---------------------------------------------------------------------------
const costFactors = [
  {
    billedBy: "Billed by Method",
    title: "Method base fee",
    body: "Templates runs on Method's entry-level plan, billed by Method per user. You don't need a higher Method tier or its add-on packs, because the extra capability comes from the Templates applications. Method sometimes offers introductory discounts that end after a few months, so budget for the regular rate.",
  },
  {
    billedBy: "Billed by Templates",
    title: "Application subscription",
    body: "Each Templates application is prebuilt and connected to the others. Your subscription depends on which applications you choose and how many people use them.",
  },
  {
    billedBy: "Billed by Templates",
    title: "Customization",
    body: "Tailoring screens, workflows, and automations is billed hourly or pay-per-use, with a lower-rate dedicated service plan available for ongoing support.",
  },
  {
    billedBy: "Billed by Templates",
    title: "Websites and custom builds",
    body: "Web design, maps, shipment tracking pages, and online shops are scoped up front, with an estimate before any build work begins.",
  },
  {
    billedBy: "Billed by your provider",
    title: "Accounting software",
    body: "Your QuickBooks or Xero subscription stays exactly as it is today, billed by them.",
  },
  {
    billedBy: "Billed by third parties",
    title: "Payment processing",
    body: "If you take card payments, your payment processor charges its own fees.",
  },
];

export default function WhyTemplatesPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-900 py-20 md:py-28" style={darkTexture}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-200 md:text-sm">
            Why Templates
          </p>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            Keep your books. Skip <Accent className="text-amber-300">the rebuild</Accent>.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base text-slate-300 md:text-lg">
            Templates gives you finished, connected business apps on top of Method. You keep
            QuickBooks or Xero, avoid a heavy migration, and spend your budget on what is unique to
            your business instead of the foundations.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/book-demo"
              className="rounded-lg bg-white px-6 py-3 font-medium text-blue-700 transition hover:bg-blue-50"
            >
              Book your free consultation
            </Link>
            <a
              href="#cost"
              className="rounded-lg border border-slate-600 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
            >
              What affects your cost
            </a>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <AnimatedSection>
        <section className="bg-white pt-16 md:pt-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 text-left sm:grid-cols-2 md:px-6 lg:grid-cols-4">
            {outcomes.map((o) => (
              <div key={o.accent}>
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
                  {o.lead}
                  <Accent underlineClass="text-yellow-400">{o.accent}</Accent>
                  {o.tail}
                </h2>
                <p className="mt-3 text-sm text-gray-600">{o.body}</p>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* COMPARISON TABLE */}
      <AnimatedSection>
        <section id="compare" className="scroll-mt-20 py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="mb-4 text-center text-2xl font-semibold text-gray-900 md:text-3xl">
              How Templates compares
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-gray-600 md:text-base">
              Most businesses are choosing between a few kinds of software. Here is how they
              typically differ.
            </p>

            <p className="mb-2 text-center text-xs text-gray-500 md:hidden">
              Swipe sideways to see every option
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
                <caption className="sr-only">
                  How Templates compares with other kinds of business software
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="w-44 bg-white p-4">
                      <span className="sr-only">What matters</span>
                    </th>
                    {columns.map((col, i) => (
                      <th
                        key={col}
                        scope="col"
                        className={`p-4 text-base font-semibold ${
                          i === 0 ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-800"
                        }`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className="border-t border-gray-200 bg-white p-4 align-top font-medium text-gray-900"
                      >
                        {row.label}
                      </th>
                      {row.cells.map((cell, i) => (
                        <td
                          key={`${row.label}-${columns[i]}`}
                          className={`border-t p-4 align-top text-gray-700 ${
                            i === 0 ? "border-blue-100 bg-blue-50" : "border-gray-200"
                          }`}
                        >
                          <div className="flex gap-2">
                            <MarkIcon mark={cell.mark} />
                            <span>{cell.text}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-gray-500">
              These describe typical differences between kinds of software, not any single product.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* STATEMENT */}
      <Statement
        size="lg"
        variant="dark"
        tone="sky"
        align="center"
        lead="Method is the canvas. We build the "
        accent="finished work"
        tail="."
        sub="Method gives you a flexible platform. Templates gives you the working applications on top of it, so you start with software that works and fine-tune it."
      />

      {/* COST FACTORS */}
      <AnimatedSection>
        <section
          id="cost"
          className="scroll-mt-20 border-y border-blue-100 bg-blue-50 py-20"
          style={{
            backgroundImage: "radial-gradient(rgba(37, 99, 235, 0.12) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="mb-4 text-center text-2xl font-semibold text-gray-900 md:text-3xl">
              What affects your cost
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-gray-600 md:text-base">
              These are the pieces that make up a Templates setup, and who bills for each one.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {costFactors.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-blue-100 bg-white p-6 text-left shadow-sm"
                >
                  <span className="mb-3 inline-block rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">
                    {item.billedBy}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.body}</p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-gray-600 md:text-base">
              Not sure what you would need? Book a free consultation and we&apos;ll scope it with
              you and give you a clear estimate.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* STATEMENT */}
      <Statement
        variant="light"
        tone="emerald"
        align="left"
        lead="Pay for what makes you "
        accent="different"
        tail="."
        sub="The foundations are already built, so your budget goes toward what is unique to your business."
      />

      {/* FINAL CTA */}
      <section className="bg-white pb-20 pt-4">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="rounded-3xl bg-blue-600 px-8 py-14 text-center shadow-lg md:px-16 md:py-16">
            <h2 className="mb-4 text-2xl font-semibold text-white md:text-3xl">
              Ready to run your business from one connected system?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-sm text-blue-100 md:text-base">
              Book a free consultation and tell us how your business works. We&apos;ll show you what
              Templates can do for it and give you a clear estimate.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/book-demo"
                className="rounded-lg bg-white px-6 py-3 font-medium text-blue-700 transition hover:bg-blue-50"
              >
                Book your free consultation
              </Link>
              <Link
                href="/"
                className="rounded-lg border border-blue-300 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
