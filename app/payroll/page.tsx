"use client";

export default function PayrollPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Payroll</h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Track hours, manage pay rates, and sync payroll data with your accounting
              system — all from one centralized dashboard.
            </p>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-80 h-56 bg-white rounded-xl shadow-xl border border-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Screenshot / Visual</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border border-gray-200 rounded-xl p-10 shadow-sm bg-white">
            <h2 className="text-2xl font-bold mb-4">What This Module Includes</h2>
            <p className="text-gray-600 mb-6">
              A simple, accurate payroll workflow that keeps your team paid and your books clean.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Track employee hours and time entries</li>
              <li>• Manage pay rates, roles, and departments</li>
              <li>• Sync with Scheduling and HR</li>
              <li>• Export payroll summaries to QuickBooks or Xero</li>
              <li>• Track overtime, holidays, and adjustments</li>
              <li>• Approval workflows for managers</li>
              <li>• Pay period reporting</li>
              <li>• Secure access controls</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Payroll Workflow Diagram</span>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Accurate and Connected</h3>
            <p className="text-gray-600 mb-4">
              Payroll data flows directly from your scheduling and HR systems.
            </p>
            <p className="text-gray-600">
              No more manual calculations — everything stays synced and audit‑ready.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
