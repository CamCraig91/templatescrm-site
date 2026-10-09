"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Pillars() {
  const [activeCard, setActiveCard] = useState("website");
  const [lockedCard, setLockedCard] = useState<string | null>(null);
  // If an image file is missing, skip it instead of showing a broken-image icon
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const cards = [
    { id: "website", title: "Website" },
    { id: "frontend", title: "Front End" },
    { id: "backend", title: "Back End" },
    { id: "integrations", title: "External Integrations" },
  ];

  const routes: Record<string, string> = {
    website: "/website-design",
    frontend: "/front-end",
    backend: "/back-end",
    integrations: "/integrations",
  };

  // One image per pillar. Put the files in public/pillars/ (transparent PNG or WebP works best).
  const images: Record<string, string> = {
    website: "/pillars/website.png",
    frontend: "/pillars/frontend.png",
    backend: "/pillars/backend.png",
    integrations: "/pillars/integrations.png",
  };

  const cardContent: Record<string, any> = {
    website: {
      title: "Your Digital Storefront",
      desc: "A modern, responsive website fully connected to your business system.",
      features: [
        "Website design",
        "Online forms",
        "Lead capture",
        "SEO",
        "Hosting",
        "Method integration",
      ],
    },
    frontend: {
      title: "Everything Your Customers See",
      desc: "Your customer-facing experience, fully automated and connected.",
      features: [
        "Online booking",
        "Customer portal",
        "Online shop",
        "Estimates",
        "Payments",
        "Notifications",
      ],
    },
    backend: {
      title: "Everything Your Team Uses",
      desc: "Your internal operations, streamlined and automated.",
      features: [
        "Work orders",
        "Scheduling",
        "Payroll",
        "Inventory",
        "Job costing",
        "Employee management",
      ],
    },
    integrations: {
      title: "Connect Your System to the World",
      desc: "Powerful integrations that extend your business capabilities.",
      features: [
        "QuickBooks (accounting + taxes)",
        "Shipment tracking",
        "Google Workspace",
        "AI tools",
        "Payment processors",
        "Mapping",
        "Zapier / Make",
      ],
    },
  };

  const handleHover = (id: string) => {
    if (!lockedCard) setActiveCard(id);
  };

  const handleClick = (id: string) => {
    setLockedCard(lockedCard === id ? null : id);
    setActiveCard(id);
  };

  return (
    // overflow-x-clip stops the spilling image from causing sideways scrolling,
    // while still letting it hang out of the bottom of the panel.
    <section className="relative z-10 w-full py-20 md:py-24 bg-white overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-8 md:gap-10">

        {/* Cards */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          {cards.map((card) => {
            const isActive = activeCard === card.id;
            const isLocked = lockedCard === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => handleHover(card.id)}
                onClick={() => handleClick(card.id)}
                className={`p-4 md:p-5 rounded-lg border cursor-pointer transition
                  ${isActive ? "border-blue-500 bg-blue-50 shadow" : "border-gray-300 bg-white"}
                  ${isLocked ? "ring-2 ring-blue-300" : ""}
                `}
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center justify-between">
                  {card.title}
                  <span
                    className={`text-xs opacity-70 transition-transform duration-150
                      ${isActive ? "rotate-180" : ""}
                    `}
                  >
                    ▾
                  </span>
                </h3>
              </div>
            );
          })}
        </div>

        {/* Content Panel — `relative` so the image can hang off its bottom-right corner.
            Don't add overflow-hidden here or the image will be cut off. */}
        <div className="relative w-full md:w-2/3 bg-blue-50 border border-blue-200 rounded-lg p-6 md:p-10 shadow-sm">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
            {cardContent[activeCard].title}
          </h3>
          <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
            {cardContent[activeCard].desc}
          </p>

          <ul className="space-y-2 text-gray-800 text-sm md:text-base">
            {cardContent[activeCard].features.map((f: string, i: number) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-blue-700">•</span> {f}
              </li>
            ))}
          </ul>

          <Link
            href={routes[activeCard]}
            className="inline-block mt-6 md:mt-8 px-5 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 shadow text-sm md:text-base cursor-pointer"
          >
            Explore
          </Link>

          {/* Spilling image (hidden on phones): all four are stacked and cross-fade as the active
              pillar changes. The wrapper sits on the panel's bottom-right corner; each image is
              anchored to the wrapper's bottom-right, so it grows up and to the left.
              Size:      md:w-80 lg:w-[26rem] xl:w-[28rem]
              Position:  -bottom-12 (how far it hangs below the panel)
                         md:-right-2 lg:-right-4 (how far past the right edge; use md:right-6 to pull it fully inside)
              Corners:   rounded-2xl (remove for square corners) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 md:-right-2 lg:-right-4 z-20 hidden md:block md:w-80 lg:w-[26rem] xl:w-[28rem]"
          >
            {cards.map((card) =>
              failedImages[card.id] ? null : (
                <Image
                  key={card.id}
                  src={images[card.id]}
                  alt=""
                  width={1200}
                  height={900}
                  sizes="(min-width: 1280px) 448px, (min-width: 1024px) 416px, 320px"
                  onError={() => setFailedImages((prev) => ({ ...prev, [card.id]: true }))}
                  className={`absolute bottom-0 right-0 h-auto w-full rounded-2xl drop-shadow-xl transition duration-500 ease-out motion-reduce:transition-none ${
                    activeCard === card.id
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-4 scale-95"
                  }`}
                />
              )
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
