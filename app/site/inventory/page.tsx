"use client";

export default function InventoryPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Inventory</h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Track products, stock levels, and item usage across your entire operation —
              fully synced with sales, work orders, and purchasing.
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
              A complete inventory management system built directly into your workflow.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Track stock levels across locations</li>
              <li>• Automatic adjustments from sales and work orders</li>
              <li>• Item categories, variants, and pricing</li>
              <li>• Low‑stock alerts and reorder points</li>
              <li>• Purchase order integration</li>
              <li>• Serialized and non‑serialized items</li>
              <li>• Inventory usage reporting</li>
              <li>• Sync with QuickBooks or Xero</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Inventory Flow Diagram</span>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Stay Stocked and Organized</h3>
            <p className="text-gray-600 mb-4">
              Inventory updates automatically as your team works — no manual adjustments.
            </p>
            <p className="text-gray-600">
              With real‑time visibility, you always know what’s available and what needs restocking.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
