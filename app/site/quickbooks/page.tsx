"use client";
import Image from "next/image";

export default function QuickBooksPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">QuickBooks</h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Sync customers, invoices, payments, and products between Templates and QuickBooks
              to keep your books accurate and up‑to‑date.
            </p>
          </div>

          {/* HERO IMAGE ON RIGHT */}
          <div className="hidden md:flex justify-center">
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="w-full max-w-md">
                <Image
                  src="/quickbooks1.png"
                  alt="QuickBooks Integration Hero Image"
                  width={400}
                  height={400}
                  className="object-contain drop-shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border border-gray-200 rounded-xl p-10 shadow-sm bg-white">
            <h2 className="text-2xl font-bold mb-4">What This Integration Includes</h2>
            <p className="text-gray-600 mb-6">
              A deep, reliable sync between your CRM and accounting system.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Sync customers and contact details</li>
              <li>• Sync invoices, payments, and credits</li>
              <li>• Sync products, services, and pricing</li>
              <li>• Reduce double entry and manual errors</li>
              <li>• Real‑time updates between systems</li>
              <li>• Map custom fields and workflows</li>
              <li>• Supports QuickBooks Online and Desktop</li>
              <li>• Full audit trail of sync activity</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VISUAL SECTION */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* SINGLE INLINE IMAGE */}
          <div className="w-full h-72 bg-gray-200 rounded-xl object-contain overflow-hidden">
            <Image
              src="/method-quickbooks.png"
              alt="QuickBooks Integration Diagram"
              width={900}
              height={700}
              className="object-contain w-full h-full"
            />
          </div>

          {/* TEXT ON RIGHT */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Accurate Books, Automatically</h3>
            <p className="text-gray-600 mb-4">
              Your financial data stays clean and consistent across both systems.
            </p>
            <p className="text-gray-600">
              No more reconciling mismatched records or chasing missing invoices.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
