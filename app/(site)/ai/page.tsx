import Link from "next/link";

export const metadata = {
  title: "AI for Your Business System — Templates",
  description:
    "AI compliments your business management system by cutting manual entry, interpreting data and helping you adjust customizations without the need of a consultant.",
};

// status: "Available now" | "Available through partners" | "Planned"
// NOTE: check the CRAge wording below and expand it with its specific features.
const options = [
  {
    name: "Method AI",
    status: "Available now",
    statusStyle: "bg-green-100 text-green-800 border-green-200",
    summary: "Customize your CRM by describing what you need.",
    points: [
      "Ask for a new field or column on a screen, such as a part number on invoices",
      "Build automations from a plain-language request",
      "Works inside your Method:CRM account, so Templates applications benefit too",
    ],
    note: "Method AI is currently in beta, and availability is set by Method.",
  },
  {
    name: "CRAge",
    status: "Available through partners",
    statusStyle: "bg-blue-100 text-blue-800 border-blue-200",
    summary: "A service that connects with Method, which we can set up for you today.",
    points: [
      "Connects to your Method data",
      "We can configure it alongside your Templates applications",
    ],
    note: "Ask us in your free consultation whether it fits your needs.",
  },
  {
    name: "Gemini image reading",
    status: "Planned",
    statusStyle: "bg-amber-100 text-amber-900 border-amber-200",
    summary: "Let a photo do the data entry.",
    points: [
      "Identify what is in an image, such as a product, part, or item",
      "Extract text from photos of labels, receipts, or documents",
      "Fill in the matching fields in your system for you to review",
    ],
    note: "This is on our roadmap using Google Gemini. It is not available yet.",
  },
];

export default function AiPage() {
  return (
    <main className="bg-white">
      <section className="bg-blue-50 border-b border-blue-100 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-wide text-blue-700 mb-3">
            AI with Templates
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-5">
            Less typing. More done.
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg mb-8">
            AI can build your customizations from a conversation and reduce the information your
            team has to enter by hand. Here is what you can use now and what we are building next.
          </p>
          <Link
            href="/book-demo"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Book your free consultation
          </Link>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {options.map((o) => (
              <div
                key={o.name}
                className="flex flex-col bg-white border border-blue-100 rounded-2xl p-6 shadow-sm text-left"
              >
                <span
                  className={`self-start rounded-full border px-3 py-1 text-xs font-medium mb-4 ${o.statusStyle}`}
                >
                  {o.status}
                </span>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">{o.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{o.summary}</p>
                <ul className="space-y-2 mb-5">
                  {o.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-gray-700">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto text-xs text-gray-500">{o.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="bg-blue-600 rounded-3xl px-8 md:px-16 py-12 text-center shadow-lg">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Tell us where manual entry slows you down
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-sm md:text-base">
              We will show you what can be automated today and what is coming.
            </p>
            <Link
              href="/book-demo"
              className="inline-block px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              Book your free consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
