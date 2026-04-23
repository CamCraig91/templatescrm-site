"use client";

export default function SetupPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">

      {/* HERO */}
      <section className="w-full py-24 bg-slate-800 border-b border-slate-700">
        <div className="max-w-5xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Getting Set Up
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Connect QuickBooks or Xero, create your Method:CRM account, and get
            your Templates applications installed. This guide walks you through
            every step from signup to customization.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-20">

                  {/* BOOKING SECTION */}
          <div>
            <h2 className="text-3xl font-bold mb-6">1. See Whats Right For You! </h2>
            <p className="text-gray-700 mb-6">
              A demo is a quickest way to see if our software is the right fit for you. Have questions answered in real time by a real agent.
            </p>

            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <iframe
                src="https://camcraigconsulting.method.ws/apps/Public.aspx#/1e4729fe-c52a-46d9-90e6-d86f8bca59d3/RkZzZFJYbHVOZHR4bTYwRFpHRTJ1Zy0t"
                className="w-full h-[900px] rounded-xl border"
              />
            </div>
          </div>


          {/* ACCOUNTING PLATFORM SETUP */}
          <div>
            <h2 className="text-3xl font-bold mb-6">2. Connect Your Accounting Platform</h2>
            <p className="text-gray-700 mb-8">
              Templates is a collection of applications built on Method:CRM. This software requires a live connection to your accounting system.
              Method:CRM supports both QuickBooks and Xero. Choose your platform below
              to follow the setup steps.
            </p>

            <div className="grid md:grid-cols-2 gap-8">

              {/* QUICKBOOKS */}
              <div className="border border-gray-200 rounded-2xl p-8 bg-white shadow-sm">
                <img src="/quickbooks.png" className="h-20 mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-3">QuickBooks Setup</h3>
                <p className="text-gray-600 mb-4">
                  Connect your QuickBooks Online account to Method:CRM in minutes.
                </p>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>• Sign into QuickBooks Online</li>
                  <li>• Approve Method:CRM as a connected app</li>
                  <li>• Sync customers, invoices, payments, and items</li>
                </ul>
                <a
                  href="https://quickbooks.intuit.com/"
                  target="_blank"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  QuickBooks Website →
                </a>
              </div>

              {/* XERO */}
              <div className="border border-gray-200 rounded-2xl p-8 bg-white shadow-sm">
                <img src="/xero.png" className="h-20 mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-3">Xero Setup</h3>
                <p className="text-gray-600 mb-4">
                  Connect your Xero organization to Method:CRM for real‑time syncing.
                </p>
                <ul className="text-gray-700 space-y-2 mb-4">
                  <li>• Sign into Xero</li>
                  <li>• Approve Method:CRM as an integration</li>
                  <li>• Sync contacts, invoices, payments, and items</li>
                </ul>
                <a
                  href="https://www.xero.com/"
                  target="_blank"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Xero Website →
                </a>
              </div>

            </div>
          </div>

          {/* METHOD:CRM SETUP */}
          <div>
            <h2 className="text-3xl font-bold mb-6">3. Set Up Method:CRM</h2>
            <p className="text-gray-700 mb-8">
              Once your accounting platform is connected, Method:CRM becomes the
              central hub for your data, automations, and Templates applications.
            </p>
            {/* PARTNER SIGNUP — HIGHLIGHTED */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="text-3xl font-bold mb-4">Start Here — Create Your Method:CRM Account</h2>
            <p className="text-gray-700 mb-6">
              To use Templates Applications, you’ll need a Method:CRM account connected to your
              accounting platform. Use the link below to sign up — and it ensures you receive the correct setup,
              onboarding, and access to our custom applications.
            </p>

            <a
              href="https://method.me/refer?referid=Tp5LxM48zSzuc72l56hmIA%3d%3d"
              target="_blank"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Create Your Method:CRM Account
            </a>
          </div>

            <div className="border border-gray-200 rounded-2xl p-8 bg-white shadow-sm">
              <img src="/methodcrm.png" className="h-20 mb-4 opacity-90" />
              <h3 className="text-xl font-semibold mb-3">Method:CRM Setup Steps</h3>

              <ul className="text-gray-700 space-y-3 mb-6">
                <li>• Complete your Method:CRM onboarding wizard</li>
                <li>• Ensure your QuickBooks/Xero sync is running</li>
                <li>• Invite team members if needed</li>
                <li>• Confirm your tables and lists have synced successfully</li>
              </ul>

              <a
                href="https://docs.method.me/"
                target="_blank"
                className="text-blue-600 font-semibold hover:underline"
              >
                Method:CRM Documentation →
              </a>
            </div>
          </div>

          {/* TEMPLATES APPLICATION SETUP */}
          <div>
            <h2 className="text-3xl font-bold mb-6">4. Install Your Templates Applications</h2>
            <p className="text-gray-700 mb-8">
              After your Method:CRM account is created, a short form will help us determine what applications are needed for your business. We will then install the Templates
              applications directly into your Method environment. This includes:
            </p>

            <ul className="text-gray-700 space-y-3 mb-6">
              <li>• Core Templates modules</li>
              <li>• Custom screens and workflows</li>
              <li>• API integrations*</li>
              <li>• Optional add‑ons depending on your business needs</li>
            </ul>

            <p className="text-gray-700">
              Once installed, you’ll receive a guided walkthrough and at request access to a
              sandbox environment for testing.
              *API integrations may require additional setup or credentials depending on the platforms being connected.
            </p>
          </div>

  
          {/* CUSTOMIZATION PROCESS */}
          <div>
            <h2 className="text-3xl font-bold mb-6">5. Customization & Final Setup</h2>
            <p className="text-gray-700 mb-6">
              Once you’ve explored the software and tested your sandbox environment,
              we’ll schedule a customization session to tailor Templates to your
              workflows. This may include:
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Custom screens and layouts</li>
              <li>• Workflow automations</li>
              <li>• API integrations</li>
              <li>• Role‑based permissions</li>
              <li>• Additional modules or features</li>
            </ul>
          </div>

        </div>
      </section>

    </main>
  );
}
