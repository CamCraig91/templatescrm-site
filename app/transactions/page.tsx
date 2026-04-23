"use client";

export default function TransactionsPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transactions
            </h1>
            <p className="text-lg text-slate-300 max-w-xl">
              A clean interface where customers can view invoices, pay balances, 
              review past payments, and manage billing preferences — all synced 
              directly with your CRM and accounting system.
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
              Give customers full visibility into their financial relationship with your business.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• View invoices, estimates, and statements</li>
              <li>• Pay outstanding balances securely online</li>
              <li>• Review past payments and receipts</li>
              <li>• Update billing preferences and saved payment methods</li>
              <li>• Automated payment confirmations and reminders</li>
              <li>• Syncs directly with Method:CRM and QuickBooks</li>
              <li>• Optional deposits, partial payments, or payment plans</li>
              <li>• Customizable branding and layout</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VISUAL SECTION */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Invoice / Payment Flow Diagram</span>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Clear, Simple, and Accurate</h3>
            <p className="text-gray-600 mb-4">
              Customers always know what they owe, what they’ve paid, and what’s coming next.
            </p>
            <p className="text-gray-600">
              Every transaction is synced automatically, eliminating manual entry and reducing errors.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
