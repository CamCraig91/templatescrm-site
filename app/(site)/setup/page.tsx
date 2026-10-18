"use client";

import Link from "next/link";

// Paste/replace the web-to-lead form URL here if it ever changes.
const WEB_TO_LEAD_URL = "https://MIurl.cc/RL5AMVlmI";

export default function SetupPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">

      {/* HERO */}
      <section className="w-full pt-24 pb-24 bg-slate-800 border-b border-slate-700">
        <div className="max-w-5xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Getting Set Up
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Connect QuickBooks or Xero, create your Method:CRM account, and get
            your Templates applications installed. This guide walks you through
            every step from signup to customization.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="#form" className="text-blue-300 font-medium hover:underline">
              Ready to go? Jump to the sign up form →
            </a>
          </div>

        </div>
      </section>

      {/* MAIN CONTENT */}
      <section id="start" className="relative py-20 scroll-mt-4">

        {/* DECORATIVE ARROW 1 — flows out of the hero, across its edge, down to the Browse box.
            Not clickable, hidden on phones. Tweak the path "d" to change the curve. */}
        <div
          aria-hidden="true"
          className="pointer-events-none hidden md:block absolute left-0 right-0 -top-24 h-40 z-10"
        >
          <div className="max-w-5xl mx-auto px-6 h-full">
            <svg viewBox="0 0 400 160" className="h-full w-full" fill="none">
              <path
                d="M 40 40 C 40 110, 200 60, 200 138"
                stroke="#60a5fa"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="8 9"
              />
              <path
                d="M 187 124 L 200 146 L 213 124"
                stroke="#60a5fa"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 space-y-20">

          {/* BROWSE APPS FIRST */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Not sure which apps you need? Browse first.</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-6">
              Take a look at the prebuilt Templates applications before you continue. And if you
              don&apos;t see exactly what your business needs, new apps can be created quickly.
            </p>
            <Link
              href="/apps"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Browse Applications
            </Link>
          </div>

          {/* BOOKING SECTION */}
          <div className="relative">
            {/* DECORATIVE ARROW 2 — swings back from the Browse box down to step 1 */}
            <div
              aria-hidden="true"
              className="pointer-events-none hidden md:block absolute left-0 right-0 -top-[84px] h-[100px] z-10"
            >
              <svg viewBox="0 0 400 100" className="h-full w-full" fill="none">
                <path
                  d="M 330 4 C 330 60, 70 30, 70 84"
                  stroke="#60a5fa"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="8 9"
                />
                <path
                  d="M 57 70 L 70 92 L 83 70"
                  stroke="#60a5fa"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold mb-6">1. See What&apos;s Right For You!</h2>
            <p className="text-gray-700 mb-6">
              A demo is a quickest way to see if our software is the right fit for you. Have questions answered in real time by a real agent.
            </p>

            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <iframe
                src="https://camcraigconsulting.method.ws/apps/Public.aspx#/1e4729fe-c52a-46d9-90e6-d86f8bca59d3/RkZzZFJYbHVOZHR4bTYwRFpHRTJ1Zy0t"
                title="Book a demo"
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
                <img src="/quickbooks1.png" className="h-20 mb-4 opacity-90" />
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

          {/* TEMPLATES APPLICATION SETUP + WEB TO LEAD FORM */}
          <div id="form" className="scroll-mt-6">
            <h2 className="text-3xl font-bold mb-6">4. Install Your Templates Applications</h2>
            <p className="text-gray-700 mb-8">
              After your Method:CRM account is created, a short form will help us determine what applications are needed for your business. We will then install the Templates
              applications directly into your Method environment. This includes:
            </p>

            <ul className="text-gray-700 space-y-3 mb-8">
              <li>• Core Templates modules</li>
              <li>• Custom screens and workflows</li>
              <li>• API integrations*</li>
              <li>• Optional add‑ons depending on your business needs</li>
            </ul>

            {/* WEB TO LEAD FORM */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm mb-4">
              <h3 className="text-xl font-semibold mb-2">Tell us about your business</h3>
              <p className="text-gray-600 mb-5">
                Fill in the form below and we&apos;ll be in touch to confirm which applications to install.
              </p>
              <iframe
                src={WEB_TO_LEAD_URL}
                title="Sign up form"
                loading="lazy"
                className="w-full h-[900px] rounded-xl border"
              />
              <p className="text-gray-500 text-sm mt-4">
                Form not loading?{" "}
                <a
                  href={WEB_TO_LEAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Open it in a new tab
                </a>
                .
              </p>
            </div>

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
