"use client";

export default function EventsPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Events
            </h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Promote events, workshops, or classes. Customers can register, pay, 
              and receive automated reminders — all connected to your CRM.
            </p>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-80 h-56 bg-white rounded-xl shadow-xl border border-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Screenshot / Visual</span>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURE CARD */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border border-gray-200 rounded-xl p-10 shadow-sm bg-white">
            <h2 className="text-2xl font-bold mb-4">What This Module Includes</h2>
            <p className="text-gray-600 mb-6">
              Everything you need to run events smoothly and professionally.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Event listings with descriptions, dates, and locations</li>
              <li>• Online registration and optional ticketing</li>
              <li>• Secure payment collection</li>
              <li>• Automated confirmations and reminders</li>
              <li>• Capacity limits and waitlist management</li>
              <li>• Syncs attendees directly into Method:CRM</li>
              <li>• Customizable branding and layout</li>
              <li>• Post‑event follow‑ups and surveys</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VISUAL SECTION */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Event Registration Flow</span>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Effortless Event Management</h3>
            <p className="text-gray-600 mb-4">
              From sign‑up to follow‑up, your event workflow stays organized and automated.
            </p>
            <p className="text-gray-600">
              Every attendee is tracked, every payment is logged, and every reminder is sent automatically.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
