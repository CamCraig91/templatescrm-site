"use client";

import { useState, useCallback } from "react";
import StableIframe from "../components/StableIframe";

export default function PrivacyPolicyPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => setIsLoading(false), []);
  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* CONTENT AREA */}
      <div className="relative flex-1">

        {/* LOADING SPINNER */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        )}

        {/* ERROR STATE */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Unable to load Privacy Policy
            </h2>
            <p className="text-gray-600 max-w-md">
              The embedded page could not be loaded. This may be due to Method:CRM
              permissions, a blocked iframe, or a temporary outage.
            </p>
          </div>
        )}

        {/* IFRAME */}
        {!hasError && (
          <StableIframe
            src="https://camcraigconsulting.method.ws/apps/Public.aspx#/e1be413a-b636-48f1-8515-16779aff4d2f/VktVd1JtNHp5dlhJNldHbzRoV3N6Zy0t"
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
      </div>

    </main>
  );
}