"use client";

export default function RemindersPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Reminders
            </h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Automated notifications for appointments, renewals, payments, and follow‑ups — 
              keeping customers engaged without manual effort.
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
              Keep customers informed and reduce no‑shows, missed payments, and forgotten tasks.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Appointment reminders via email or SMS</li>
              <li>• Payment due and overdue notifications</li>
              <li>• Renewal reminders for subscriptions or services</li>
              <li>• Follow‑up prompts after appointments or purchases</li>
              <li>• Customizable timing and message templates</li>
              <li>• Automated triggers based on CRM activity</li>
              <li>• Multi‑step reminder sequences</li>
              <li>• Full logging and tracking inside Method:CRM</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VISUAL SECTION */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Reminder Workflow Diagram</span>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Never Miss a Follow‑Up</h3>
            <p className="text-gray-600 mb-4">
              Your system handles the timing, messaging, and delivery — automatically.
            </p>
            <p className="text-gray-600">
              You stay focused on your work while customers stay informed and engaged.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
