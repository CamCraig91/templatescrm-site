"use client";

import { useState } from "react";
import SignUpButton from "./components/SignUpButton";

export default function BookDemoPage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Sign up banner — sits above the booking form so it's seen without scrolling */}
      <div className="w-full bg-blue-50 border-b border-blue-100">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-gray-700 text-sm md:text-base">
            <span className="font-medium text-gray-900">Ready to get started?</span>{" "}
            Sign up and we&apos;ll be in touch to set up your system.
          </p>
          <SignUpButton size="sm" className="shrink-0 w-full sm:w-auto" />
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      {/* Responsive width wrapper */}
      <div className="w-full md:max-w-5xl md:mx-auto md:px-6 flex-1">
        {/* Clip wrapper: hides anything past its right edge */}
        <div className="overflow-hidden">
          <iframe
            src="https://camcraigconsulting.method.ws/apps/Public.aspx#/1e4729fe-c52a-46d9-90e6-d86f8bca59d3/RkZzZFJYbHVOZHR4bTYwRFpHRTJ1Zy0t"
            className={`
              h-[100vh] border-none
              ${loading ? "opacity-0" : "opacity-100"}
              transition-opacity duration-500
            `}
            style={{
              width: "calc(100% + 80px)",
              maxWidth: "none",
            }}
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>

    </div>
  );
}
