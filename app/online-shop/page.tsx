"use client";

export default function OnlineShopPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Online Shop
            </h1>
            <p className="text-lg text-slate-300 max-w-xl">
              A customizable storefront where customers browse products, place orders, 
              and complete payments — fully synced with your Method:CRM and QuickBooks workflows.
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
              A modern, flexible online shopping experience that connects directly to your 
              internal systems — no double entry, no disconnected tools.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Fully customizable storefront layout</li>
              <li>• Product catalog with images, variants, and categories</li>
              <li>• Real‑time inventory sync with Method:CRM or QuickBooks</li>
              <li>• Secure checkout with tax, discounts, and shipping rules</li>
              <li>• Automated order creation and workflow triggers</li>
              <li>• Customer accounts with order history and saved details</li>
              <li>• Optional guest checkout for frictionless purchases</li>
              <li>• Email confirmations and automated follow‑ups</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VISUAL SECTION */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE / DIAGRAM SLOT */}
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Product Grid / Diagram Placeholder</span>
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Built for Real‑World Selling</h3>
            <p className="text-gray-600 mb-4">
              Whether you sell products, services, or a mix of both, your online shop adapts 
              to your business model. Every order flows directly into your CRM, keeping your 
              team organized and your customers informed.
            </p>
            <p className="text-gray-600">
              From inventory management to automated workflows, your shop becomes a seamless 
              extension of your operations — not a separate system to maintain.
            </p>
          </div>

        </div>
      </section>

      {/* VIDEO SECTION (OPTIONAL) */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-6">See It In Action</h3>

          <div className="w-full aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Embedded Video Placeholder</span>
          </div>
        </div>
      </section>

    </main>
  );
}
