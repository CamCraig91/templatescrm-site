"use client";

export default function SchedulingPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Scheduling
            </h1>
            <p className="text-lg text-slate-300 max-w-xl">
              A powerful internal calendar for managing staff availability, appointments, 
              field work, and daily operations — fully synced with your customer bookings.
            </p>
          </div>

          {/* VISUAL */}
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
              Keep your team organized with a centralized scheduling system that adapts to your workflow.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Staff calendars with availability and shift management</li>
              <li>• Real‑time sync with customer bookings</li>
              <li>• Drag‑and‑drop appointment management</li>
              <li>• Color‑coded schedules for teams and service types</li>
              <li>• Automated reminders and notifications</li>
              <li>• Daily, weekly, and monthly calendar views</li>
              <li>• Assign appointments to staff or teams</li>
              <li>• Optional travel time and buffer rules</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VISUAL SECTION */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE / DIAGRAM SLOT */}
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Calendar Layout Diagram</span>
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-bold mb-4">A Calendar Built for Your Team</h3>
            <p className="text-gray-600 mb-4">
              Whether you're managing field technicians, office staff, or service providers, 
              your schedule stays accurate and up‑to‑date across the entire system.
            </p>
            <p className="text-gray-600">
              Every appointment, shift, and update flows directly into Method:CRM, ensuring 
              your team always knows where they need to be.
            </p>
          </div>

        </div>
      </section>

      {/* VIDEO SECTION (OPTIONAL) */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-6">See It In Action</h3>

          <div className="w-full aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Embedded Video Placeholder</span>
          </div>
        </div>
      </section>

    </main>
  );
}
