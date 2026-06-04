import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="bg-white text-gray-900">

      {/* HERO */}
      <section className="w-full bg-slate-800 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Pricing
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Simple, transparent pricing for both customization services and app access.
            Choose a service plan for workflow development, and subscribe to the app suite
            to unlock every front‑end and back‑end application.
          </p>
        </div>
      </section>

      {/* SERVICE PLANS */}
      <section className="py-20" id="service-plans">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Service Plans
          </h2>

          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            These plans match the customization options shown on our Customization page.
            Choose the level of support that fits your business.
          </p>

          <div className="grid md:grid-cols-2 gap-10">

            {/* PAY PER USE */}
            <Link href="/pricing/pay-per-use" className="block">
              <div className="p-8 bg-blue-50 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition">
                <h3 className="text-2xl font-bold mb-2">Pay‑Per‑Use</h3>
                <p className="text-4xl font-bold text-blue-600 mb-4">
                  $75<span className="text-lg text-gray-600">/hour</span>
                </p>
                <p className="text-gray-600 mb-6">
                  Perfect for small updates, one‑off fixes, or occasional customization.
                </p>

                <ul className="text-gray-600 space-y-2 text-sm mb-8">
                  <li>• No commitment</li>
                  <li>• Pay only for the hours you use</li>
                  <li>• Ideal for small enhancements</li>
                  <li>• Great for testing the waters</li>
                </ul>

                <div className="block text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                  Start a Request
                </div>
              </div>
            </Link>

            {/* DEDICATED SERVICE PLAN */}
            <Link href="/pricing/dedicated-service" className="block">
              <div className="p-8 bg-blue-600 text-white rounded-xl shadow-lg border border-blue-700 hover:shadow-xl transition">
                <h3 className="text-2xl font-bold mb-2">Dedicated Service Plan</h3>
                <p className="text-4xl font-bold mb-4">
                  $50<span className="text-lg text-blue-100">/hour</span>
                </p>
                <p className="text-blue-100 mb-6">
                  Best for businesses that want app development, enhanced features, ongoing support, continuous improvements,
                  and predictable costs.
                </p>

                <ul className="text-blue-100 space-y-2 text-sm mb-8">
                  <li>• Minimum 3 hours/month</li>
                  <li>• 3‑month commitment</li>
                  <li>• Priority scheduling</li>
                  <li>• Monthly review & optimization</li>
                  <li>• Additional hours billed at $75/hour</li>
                </ul>

                <div className="block text-center px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-gray-100 transition">
                  Get Started
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* APP SUBSCRIPTION */}
      <section className="py-20 bg-gray-200 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            App Subscription
          </h2>

          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            Unlock every front‑end and back‑end application with one simple subscription.
          </p>

          <Link href="/pricing/app-subscription" className="block max-w-3xl mx-auto">
            <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
              <h3 className="text-2xl font-bold mb-2">All Apps Included</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">
                $25<span className="text-lg text-gray-600">/user / month</span>
              </p>

              <p className="text-gray-600 mb-6">
                Get full access to every application: customer portal, online shop,
                scheduling, events, reminders, tasks, inventory, reporting, and more.
              </p>

              <div className="block text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                View App Details
              </div>
            </div>
          </Link>

          {/* REQUIREMENTS NOTICE */}
          <div className="mt-12 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-3xl mx-auto">
            <p className="text-sm text-gray-700">
              <strong>Important:</strong> A QuickBooks Online subscription and a Method:CRM
              subscription are required to use any customizations or applications. These
              platforms provide the core data and API infrastructure your system relies on.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
