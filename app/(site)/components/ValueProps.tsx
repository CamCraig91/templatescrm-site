"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// The four outcomes customers get. Edit the wording here.
const outcomes = [
  {
    title: "Less repetitive work",
    body: "Enter information once and let automations handle the rest.",
  },
  {
    title: "Fewer errors",
    body: "One source of truth, kept in step with your accounting.",
  },
  {
    title: "More capability",
    body: "Do things your current software simply can't.",
  },
  {
    title: "Better customer experience",
    body: "Portals, online booking, and live updates for your customers.",
  },
];

// How we get there. Each item shows an example "when this happens, that happens" flow.
const items = [
  {
    label: "Adapts to you",
    headline: "Software that changes to fit your business, not the other way around",
    body: "Most management software forces you to change your workflow, or to patch the gaps with other tools. Templates keeps your information in one place and adapts to how you work today, and again as your business changes.",
    trigger: "Your process changes",
    actions: [
      "Add a custom field or approval step",
      "Update the screen your team uses",
      "Keep working, with nothing to replace",
    ],
  },
  {
    label: "One home for everything",
    headline: "Your operations and finances in one standard place",
    body: "We create applications for each part of your business, so every piece of work is tracked clearly and consistently. Spreadsheets that used to be copied into several places live in one, and triggers do real work for you.",
    trigger: "A work order is completed",
    actions: [
      "Email the customer automatically",
      "Check the shipment status",
      "Take the payment",
      "Send the invoice to QuickBooks",
    ],
  },
  {
    label: "Books that stay accurate",
    headline: "Two-way sync with QuickBooks and Xero",
    body: "Customers, invoices, and payments stay current on both sides, so your books are accurate and you spend less time fixing and updating accounts.",
    trigger: "An invoice is created",
    actions: [
      "It syncs to your accounting software",
      "Customer and payment details match both ways",
      "No double entry, fewer corrections",
    ],
  },
  {
    label: "Working from day one",
    headline: "Prebuilt, connected apps instead of a blank canvas",
    body: "Method provides the platform. Templates provides finished applications with preferred features already built in, connected to each other and to outside tools. You start with working software and fine-tune it, rather than building the foundations from scratch.",
    trigger: "You start with Templates",
    actions: [
      "Prebuilt apps are already connected",
      "We tailor the details to your business",
      "You skip the ground-up build",
    ],
  },
  {
    label: "Tools beyond the CRM",
    headline: "Custom apps and websites that work with your data",
    body: "We also build external apps and websites that collect or display information and feed it back into your system: locations and geofences, points on a map, or live shipment status shown beside a customer's order.",
    trigger: "A crew member signs in on site",
    actions: [
      "Their location is recorded",
      "It's pinned on the work map",
      "Your team sees it in the office",
    ],
  },
];

const AUTOPLAY_MS = 8000;

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-blue-600"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ValueProps() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
  }, []);

  // Reveal the trigger, then each action in turn, whenever the selected item changes
  useEffect(() => {
    const total = items[active].actions.length;
    if (reduceMotion) {
      setRevealed(total + 1);
      return;
    }
    setRevealed(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i <= total; i++) {
      timers.push(setTimeout(() => setRevealed(i + 1), 250 + i * 450));
    }
    return () => timers.forEach(clearTimeout);
  }, [active, reduceMotion]);

  // Rotate through the items until the visitor takes over (hover, focus, or click)
  useEffect(() => {
    if (reduceMotion || paused || interacted) return;
    const t = setInterval(() => setActive((a) => (a + 1) % items.length), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [reduceMotion, paused, interacted]);

  const current = items[active];

  return (
    <div>
      <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-gray-900 mb-3 md:mb-4">
        One Connected Business System
      </h2>
      <p className="text-lg md:text-2xl font-medium text-blue-700 mb-4 md:mb-6">
        Less busywork. Fewer mistakes. A system that fits how you work.
      </p>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10 md:mb-12 text-sm md:text-base">
        Templates brings your customers, work, and finances into one adaptable system, so your
        team spends less time on repetitive tasks and your customers get a better experience.
      </p>

      {/* The four outcomes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-12 text-left">
        {outcomes.map((o) => (
          <div
            key={o.title}
            className="bg-white border border-blue-100 rounded-2xl p-4 md:p-5 shadow-sm"
          >
            <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1">{o.title}</h3>
            <p className="text-gray-600 text-xs md:text-sm">{o.body}</p>
          </div>
        ))}
      </div>

      {/* How we get there */}
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-5">How we get there</h3>

      <div
        className="flex flex-col md:flex-row gap-4 md:gap-6 text-left"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          role="tablist"
          aria-label="How Templates helps"
          className="flex flex-wrap md:flex-col gap-2 md:w-64 md:shrink-0"
        >
          {items.map((item, i) => (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => {
                setInteracted(true);
                setActive(i);
              }}
              className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 md:py-3 text-sm font-medium text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 ${
                i === active
                  ? "bg-white border-blue-300 shadow-sm text-gray-900"
                  : "border-transparent text-gray-600 hover:bg-white/70"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  i === active ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
                }`}
              >
                {i + 1}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          className="flex-1 bg-white border border-blue-100 rounded-2xl shadow-sm p-6 md:p-8 min-h-[26rem] md:min-h-[24rem]"
        >
          <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
            {current.headline}
          </h4>
          <p className="text-gray-600 text-sm md:text-base">{current.body}</p>

          <div className="mt-6 rounded-xl bg-blue-50 border border-blue-100 p-5">
            <div
              className={`inline-flex items-center rounded-full bg-blue-600 text-white text-sm font-medium px-4 py-1.5 transition-all duration-500 ${
                revealed >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {current.trigger}
            </div>
            <ul className="mt-3 ml-4 border-l-2 border-blue-200 pl-5 space-y-2">
              {current.actions.map((action, j) => (
                <li
                  key={action}
                  className={`flex items-center gap-2 text-sm text-gray-700 transition-all duration-500 ${
                    revealed >= j + 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                >
                  <CheckIcon />
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* The connected business diagram */}
      <div className="mt-10 md:mt-12 flex justify-center">
        <Image
          src="/ConnectedBusiness5.png"
          alt="Connected business diagram"
          width={700}
          height={400}
          className="object-contain mx-auto rounded-3xl"
        />
      </div>
    </div>
  );
}
