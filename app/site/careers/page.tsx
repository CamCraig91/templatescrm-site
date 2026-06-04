"use client";

import { useState, useCallback } from "react";
import StableIframe from "../components/StableIframe";

export default function CareersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => setIsLoading(false), []);
  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="w-full bg-slate-800 py-16 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">
            Careers at Templates
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Join a growing team focused on building premium Method:CRM solutions, 
            modern websites, and scalable systems for businesses across North America.
            Explore open roles, apply directly, and discover what it’s like to work with us.
          </p>
        </div>
      </section>

      {/* CONTENT AREA */}
      <div className="relative flex-1">

        {/* LOADING SPINNER */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        )}

        {/* ERROR STATE */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Unable to load Careers
            </h2>
            <p className="text-gray-600 max-w-md">
              The embedded careers page could not be loaded. This may be due to 
              Method:CRM permissions or a temporary connection issue.
            </p>
          </div>
        )}

        {/* IFRAME */}
        {!hasError && (
          <StableIframe
            src="https://camcraigconsulting.method.ws/apps/Public.aspx#/bbdd5715-7d10-4496-88d4-ab11b2365aa1/"
            height="100vh"
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
      </div>

    </main>
  );
}
