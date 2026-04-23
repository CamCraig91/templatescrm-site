"use client";

export default function BookAppointmentPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Appointment
            </h1>
            <p className="text-lg text-slate-300 max-w-xl">
              A modern scheduling experience that lets customers choose services, 
              staff, and times — fully synced to your internal calendar and workflows.
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
              A clean, intuitive booking flow that reduces back‑and‑forth, eliminates 
              scheduling errors, and keeps your team perfectly organized.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Customers choose services, staff, and available times</li>
              <li>• Real‑time availability synced with Method:CRM calendars</li>
              <li>• Automated confirmations and reminder notifications</li>
              <li>• Optional deposits or full payments at booking</li>
              <li>• Staff‑specific schedules and service offerings</li>
              <li>• Support for recurring appointments or multi‑step bookings</li>
              <li>• Custom intake forms before or after booking</li>
              <li>• Automatic creation of activities, work orders, or tasks</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VISUAL SECTION */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE / DIAGRAM SLOT */}
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Booking Flow Diagram Placeholder</span>
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-bold mb-4">A Seamless Scheduling Experience</h3>
            <p className="text-gray-600 mb-4">
              Customers can book appointments in seconds — no emails, no phone calls, 
              no confusion. Every booking flows directly into your CRM, keeping your 
              team aligned and your schedule accurate.
            </p>
            <p className="text-gray-600">
              From service‑based businesses to field teams and consultants, this module 
              adapts to your workflow and ensures every appointment is captured cleanly.
            </p>
          </div>

        </div>
      </section>

  
    </main>
  );
}
