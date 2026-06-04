"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white border border-gray-300 shadow-xl rounded-lg p-4 z-50">
      <p className="text-gray-700 text-sm mb-3">
        We use cookies to improve your experience. See our{" "}
        <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={decline}
          className="px-3 py-1 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
