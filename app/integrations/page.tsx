import Link from "next/link";
import Image from "next/image";

export default function IntegrationsPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col">
      {/* HERO SECTION */}
            {/* HERO SECTION */}
<section className="relative bg-slate-800 h-[475px] flex items-center overflow-hidden">

  {/* TEXT (inside container) */}
  <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
    <h1 className="text-5xl font-bold text-white mb-4">
      Integrations
    </h1>

    <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
      Connect your system to the outside world. These integrations extend
      your platform with shipping, calendars, payments, AI automation,
      communication tools, and more — creating a seamless, intelligent
      business ecosystem.
    </p>
  </div>

  {/* FULL-HEIGHT, EDGE-TO-EDGE HERO IMAGE */}
  <div className="absolute top-0 right-0 h-full w-[45vw]">
    <Image
      src="/integrations3.jpg"
      alt="Integrations Hero"
      fill
      className="object-cover object-center"
      priority
    />
  </div>

</section>


      
      {/* Integrations Grid */}
      <section className="py-16 bg-white flex-1">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Available Integrations
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* DHL / Shipping APIs */}
            <Link href="/integrations/shipping" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Shipping & Logistics (DHL, UPS, FedEx)
                </h3>
                <p className="text-gray-600 text-sm">
                  Real-time shipment tracking, label generation, and automated
                  delivery updates directly inside your workflows.
                </p>
              </div>
            </Link>

            {/* Google Calendar */}
            <Link href="/integrations/google-calendar" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Google Calendar
                </h3>
                <p className="text-gray-600 text-sm">
                  Create events, sync schedules, and push bookings or reminders
                  directly into customer and staff calendars.
                </p>
              </div>
            </Link>

            {/* AI Meeting Notes */}
            <Link href="/integrations/ai-notes" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  AI Meeting Notes & Summaries
                </h3>
                <p className="text-gray-600 text-sm">
                  Automatically analyze transcripts, generate summaries, and
                  attach structured notes to meetings, tasks, or CRM records.
                </p>
              </div>
            </Link>

            {/* Payment Gateways */}
            <Link href="/integrations/payments" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Payment Gateways (Stripe, Square, PayPal)
                </h3>
                <p className="text-gray-600 text-sm">
                  Accept payments, manage subscriptions, and sync transactions
                  across your customer portal and internal systems.
                </p>
              </div>
            </Link>

            {/* Accounting */}
            <Link href="/integrations/accounting" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Accounting (QuickBooks, Xero)
                </h3>
                <p className="text-gray-600 text-sm">
                  Sync invoices, payments, expenses, and financial data
                  automatically with your accounting software.
                </p>
              </div>
            </Link>

            {/* SMS & Email */}
            <Link href="/integrations/messaging" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  SMS & Email (Twilio, SendGrid)
                </h3>
                <p className="text-gray-600 text-sm">
                  Send automated reminders, alerts, marketing campaigns, and
                  transactional messages through reliable communication APIs.
                </p>
              </div>
            </Link>

            {/* Maps & Location Services */}
            <Link href="/integrations/maps" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Maps & Location Services
                </h3>
                <p className="text-gray-600 text-sm">
                  Route optimization, address validation, and location-based
                  automations powered by Google Maps or Mapbox.
                </p>
              </div>
            </Link>

            {/* Identity & Authentication */}
            <Link href="/integrations/auth" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Authentication (OAuth, SSO, Microsoft 365)
                </h3>
                <p className="text-gray-600 text-sm">
                  Secure login, single sign-on, and identity management for
                  staff and customers across all apps.
                </p>
              </div>
            </Link>

            {/* Webhooks & Custom APIs */}
            <Link href="/integrations/custom-api" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Webhooks & Custom API Integrations
                </h3>
                <p className="text-gray-600 text-sm">
                  Connect any external system, trigger automations, or build
                  custom workflows using flexible API endpoints.
                </p>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </main>
  );
}
