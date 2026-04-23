"use client";
import Image from "next/image";

export default function ShipmentTrackingPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipment Tracking</h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Automatically track shipments from major carriers and keep customers updated
              with real‑time delivery information.
            </p>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-80 h-56 bg-white rounded-xl shadow-xl border border-gray-100 flex items-center justify-center">
              {/* IMAGE ON RIGHT */}
                        <div className="flex-1 flex justify-center md:justify-end">
                          <div className="w-full max-w-md">
                            <Image
                              src="/DHLLogo.png"
                              alt="DHL Logo"
                              width={900}
                              height={900}
                              className="object-contain drop-shadow-xl"
                              priority
                            />
                          </div>
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
              Keep customers informed and reduce support inquiries with automated tracking.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Track shipments from UPS, FedEx, USPS, DHL, and more</li>
              <li>• Real‑time status updates inside Templates</li>
              <li>• Automated customer notifications</li>
              <li>• Link tracking numbers to sales orders and invoices</li>
              <li>• Delivery confirmation and history</li>
              <li>• Reduce manual tracking and follow‑up</li>
              <li>• Sync with Online Shop and Sales Orders</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Tracking Flow Diagram</span>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Real‑Time Delivery Visibility</h3>
            <p className="text-gray-600 mb-4">
              Customers and staff always know where shipments are — no guessing.
            </p>
            <p className="text-gray-600">
              Every update flows directly into your CRM and order history.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
