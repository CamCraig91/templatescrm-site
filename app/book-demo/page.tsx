"use client";

import { useState } from "react";

export default function BookDemoPage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Loading Spinner */}
      {loading && (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      {/* Responsive width wrapper */}
      <div className="w-full md:max-w-5xl md:mx-auto md:px-6 flex-1 overflow-hidden">

        <iframe
          src="https://camcraigconsulting.method.ws/apps/Public.aspx#/1e4729fe-c52a-46d9-90e6-d86f8bca59d3/RkZzZFJYbHVOZHR4bTYwRFpHRTJ1Zy0t"
          className={`
            w-full h-[100vh] border-none 
            ${loading ? "opacity-0" : "opacity-100"} 
            transition-opacity duration-500
          `}
           style={{
      overflow: "hidden",
      position: "relative",
      left: "0",
      top: "0",
      clipPath: "inset(0px 0px 0px 0px)"}}
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
