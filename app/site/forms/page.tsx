"use client";

export default function FormsPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Forms
            </h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Customizable forms for intake, onboarding, surveys, or service requests. 
              Every submission flows directly into your Method:CRM workflows.
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
              Build forms that capture exactly what you need — and automatically trigger 
              the workflows that keep your business moving.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Fully customizable form builder</li>
              <li>• Support for text fields, dropdowns, checkboxes, uploads, and more</li>
              <li>• Conditional logic for dynamic form flows</li>
              <li>• Automated creation of leads, activities, work orders, or tasks</li>
              <li>• Email notifications for staff and customers</li>
              <li>• Public or authenticated form access</li>
              <li>• Embed forms directly into your website or customer portal</li>
              <li>• Clean, mobile‑friendly layout for all devices</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VISUAL SECTION */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE / DIAGRAM SLOT */}
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Form Flow Diagram Placeholder</span>
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Capture Information With Confidence</h3>
            <p className="text-gray-600 mb-4">
              Whether you're onboarding new clients, collecting service requests, or gathering 
              feedback, your forms adapt to your workflow and ensure every submission is captured cleanly.
            </p>
            <p className="text-gray-600">
              No more manual entry — everything flows directly into Method:CRM, ready for your 
              automations to take over.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
