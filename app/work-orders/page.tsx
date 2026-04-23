"use client";

export default function WorkOrdersPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Work Orders</h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Create, assign, and track work orders from start to finish — fully connected
              to scheduling, inventory, and customer records.
            </p>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-80 h-56 bg-white rounded-xl shadow-xl border border-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Screenshot / Visual</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border border-gray-200 rounded-xl p-10 shadow-sm bg-white">
            <h2 className="text-2xl font-bold mb-4">What This Module Includes</h2>
            <p className="text-gray-600 mb-6">
              Keep your field and internal teams aligned with a streamlined work order system.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Create work orders from leads, jobs, or customer requests</li>
              <li>• Assign technicians or teams with one click</li>
              <li>• Track job status, notes, and attachments</li>
              <li>• Sync with Scheduling for real‑time dispatching</li>
              <li>• Pull required inventory automatically</li>
              <li>• Capture time, materials, and completion details</li>
              <li>• Convert work orders into invoices instantly</li>
              <li>• Mobile‑friendly for field staff</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VISUAL */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Work Order Flow Diagram</span>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">From Request to Completion</h3>
            <p className="text-gray-600 mb-4">
              Work orders move smoothly through your system, keeping everyone aligned.
            </p>
            <p className="text-gray-600">
              Every update syncs with CRM, scheduling, and billing — no double entry.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
