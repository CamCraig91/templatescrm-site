"use client";

export default function SalesOrdersPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sales Orders</h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Manage quotes, orders, and fulfillment with a streamlined sales order system
              that connects directly to inventory and invoicing.
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
              A complete workflow for managing customer orders from quote to delivery.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Create quotes and convert them into sales orders</li>
              <li>• Track order status and fulfillment progress</li>
              <li>• Pull inventory and pricing automatically</li>
              <li>• Apply discounts, taxes, and custom pricing rules</li>
              <li>• Sync with Inventory and Work Orders</li>
              <li>• Generate invoices instantly</li>
              <li>• Customer‑friendly order summaries</li>
              <li>• Internal notes and approval workflows</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Sales Order Lifecycle Diagram</span>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">A Smooth Sales Workflow</h3>
            <p className="text-gray-600 mb-4">
              From quoting to fulfillment, your sales process stays organized and efficient.
            </p>
            <p className="text-gray-600">
              Every step syncs with CRM, inventory, and billing automatically.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
