"use client";

import Image from "next/image";

export default function AppsOverviewPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">

{/* HERO */}
<section className="w-full py-28 bg-slate-800 border-b border-slate-700">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">

    {/* TEXT */}
    <div className="flex-1 text-center md:text-left text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Apps & Modules
      </h1>

      <p className="text-lg text-slate-300 max-w-xl">
        Explore the full suite of Templates apps — from customer‑facing tools 
        to internal operations and accounting integrations. Everything works 
        together to streamline your business.
      </p>
    </div>

    {/* IMAGE ON RIGHT */}
    <div className="flex-1 flex justify-center md:justify-end">
      <div className="w-full max-w-md">
        <Image
          src="/heroimageapps.png"
          alt="Apps overview hero"
          width={800}
          height={800}
          className="object-contain drop-shadow-xl"
          priority
        />
      </div>
    </div>

  </div>
</section>


      {/* FRONT END */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Front End</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Customer Portal", link: "/customer-portal" },
              { name: "Online Shop", link: "/online-shop" },
              { name: "Book Appointment", link: "/book-appointment" },
              { name: "Transactions", link: "/transactions" },
              { name: "Events", link: "/events" },
              { name: "Reminders", link: "/reminders" },
              { name: "Forms", link: "/forms" },
            ].map((app) => (
              <a
                key={app.name}
                href={app.link}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition bg-white"
              >
                <h3 className="text-lg font-semibold mb-2">{app.name}</h3>
                <p className="text-gray-600 text-sm">
                  Learn more about this module.
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BACK END */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Back End</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Careers", link: "/careers" },
              { name: "Scheduling", link: "/scheduling" },
              { name: "Work Orders", link: "/work-orders" },
              { name: "Sales Orders", link: "/sales-orders" },
              { name: "Inventory", link: "/inventory" },
              { name: "Payroll", link: "/payroll" },
              { name: "Tasks", link: "/tasks" },
              { name: "Human Resources", link: "/human-resources" },
            ].map((app) => (
              <a
                key={app.name}
                href={app.link}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition bg-white"
              >
                <h3 className="text-lg font-semibold mb-2">{app.name}</h3>
                <p className="text-gray-600 text-sm">
                  Learn more about this module.
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Integrations</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Google Workspace", link: "/google-workspace" },
              { name: "Shipment Tracking", link: "/shipment-tracking" },
              { name: "QuickBooks", link: "/quickbooks" },
              { name: "Xero", link: "/xero" },
            ].map((app) => (
              <a
                key={app.name}
                href={app.link}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition bg-white"
              >
                <h3 className="text-lg font-semibold mb-2">{app.name}</h3>
                <p className="text-gray-600 text-sm">
                  Learn more about this integration.
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
