"use client";

import { useState, useCallback } from "react";
import StableIframe from "../components/StableIframe";

export default function MyAccountPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => setIsLoading(false), []);
  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto w-full px-6 py-10">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          My Account
        </h1>

        {/* Loading Spinner */}
        {isLoading && !hasError && (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Unable to load My Account</h2>
            <p className="text-gray-600 max-w-md">The embedded page could not be loaded.</p>
          </div>
        )}

        {/* IFRAME — always mounted, hidden via CSS until loaded */}
        <div style={{ visibility: isLoading || hasError ? "hidden" : "visible" }}>
          <StableIframe
            src="https://methodportal.com/camcraigconsulting"
            height="120vh"
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>
      </div>
    </div>
  );
}