"use client";
import Image from "next/image";

export default function XeroPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Xero</h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Connect Templates with Xero to sync contacts, invoices, payments, and product
              data for a unified financial workflow.
            </p>
          </div>

          <div className="hidden md:flex justify-center">
            {/* IMAGE ON RIGHT */}
                                        <div className="flex-1 flex justify-center md:justify-end">
                                          <div className="w-full max-w-md">
                                            <Image
                                              src="/xero.png"
                                              alt="Xero Integration Hero Image"
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

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border border-gray-200 rounded-xl p-10 shadow-sm bg-white">
            <h2 className="text-2xl font-bold mb-4">What This Integration Includes</h2>
            <p className="text-gray-600 mb-6">
              A seamless connection between your CRM and Xero accounting.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Sync contacts and customer details</li>
              <li>• Sync invoices, payments, and credit notes</li>
              <li>• Sync products, services, and pricing</li>
              <li>• Reduce manual entry and reconciliation</li>
              <li>• Real‑time updates between systems</li>
              <li>• Supports multi‑currency workflows</li>
              <li>• Map custom fields and data structures</li>
              <li>• Full sync history and error logging</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Xero Sync Diagram</span>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Unified Financial Data</h3>
            <p className="text-gray-600 mb-4">
              Your CRM and accounting system stay perfectly aligned.
            </p>
            <p className="text-gray-600">
              No more mismatched invoices or missing payments.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
