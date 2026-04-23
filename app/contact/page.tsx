"use client";

import { useState, useCallback } from "react";
import StableIframe from "../components/StableIframe";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => setIsLoading(false), []);
  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  return (
    <div className="w-full bg-white pb-16">

      <style>{`
        .contact-cards {
          order: -1;
        }
        @media (min-width: 768px) {
          .contact-cards {
            order: 2;
          }
        }
      `}</style>

      {/* TITLE */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold text-gray-900">Contact Us</h1>
      </div>

      {/* FLEX LAYOUT */}
      <div
        className="max-w-7xl mx-auto px-6"
        style={{ display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "flex-start" }}
      >

        {/* IFRAME — left on desktop, bottom on mobile */}
        <div style={{ flex: "2 1 500px", minWidth: 0 }}>

          {/* Loading Spinner */}
          {isLoading && !hasError && (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <h2 className="text-xl font-semibold text-red-600 mb-2">Unable to load contact form</h2>
              <p className="text-gray-600 max-w-md">The embedded page could not be loaded.</p>
            </div>
          )}

          {/* IFRAME — always mounted, hidden via CSS until loaded */}
          <div style={{ visibility: isLoading || hasError ? "hidden" : "visible" }}>
            <StableIframe
              src="https://MIurl.cc/MydA6VpmI"
              height="1200px"
              onLoad={handleLoad}
              onError={handleError}
            />
          </div>
        </div>

        {/* CARDS — right on desktop, top on mobile */}
        <div className="contact-cards" style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* OFFICE HOURS */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 6v6l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Office Hours
            </h3>
            <p className="text-gray-800 text-base font-medium">Monday – Friday</p>
            <p className="text-gray-700 text-base">9:00 AM – 5:00 PM EST</p>
          </div>

          {/* RESPONSE TIME */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.5a2.25 2.25 0 01-2.31 0l-7.5-4.5A2.25 2.25 0 012.25 6.993V6.75" />
              </svg>
              Response Time
            </h3>
            <p className="text-gray-700 text-base">
              We typically respond within{" "}
              <span className="font-medium">1–2 business days</span>.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}