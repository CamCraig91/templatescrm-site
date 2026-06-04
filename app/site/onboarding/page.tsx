"use client";
import Image from "next/image";

export default function OnboardingPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full h-[420px] bg-slate-800 border-b border-slate-700 overflow-hidden flex items-center">

        {/* TEXT */}
        <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Onboarding Guide
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl leading-relaxed">
            Follow this quick setup process to get your QuickBooks and Method:CRM
            accounts ready. Once complete, we’ll install the applications you need
            and configure your system for success.
          </p>
        </div>

      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-20">

          {/* STEP 1 — QUICKBOOKS */}
          <div>
            <div className="flex flex-col items-center mb-6">
              <img
                src="/quickbooks1.png"
                alt="QuickBooks Logo"
                className="h-20 mb-4 opacity-90"
              />
              <h2 className="text-3xl font-bold">1. Install or Prepare QuickBooks</h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4 text-center">
              Templates integrates directly with QuickBooks, so ensure your accounting
              system is ready before connecting Method.
            </p>

            <h3 className="text-xl font-semibold mb-2">QuickBooks Online</h3>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li>• No installation required</li>
              <li>• Ensure you have an active subscription</li>
              <li>• Administrator access is required</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">QuickBooks Desktop</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Install the latest supported version of QuickBooks Desktop</li>
              <li>• Install QuickBooks Web Connector</li>
              <li>• Ensure you have Admin access to the company file</li>
            </ul>
          </div>

          {/* STEP 2 — METHOD */}
          <div>
            <div className="flex flex-col items-center mb-6">
              <img
                src="/methodcrm.png"
                alt="Method CRM Logo"
                className="h-20 mb-4 opacity-90"
              />
              <h2 className="text-3xl font-bold">2. Create Your Method:CRM Account</h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4 text-center">
              Use our official partner link so your account is automatically connected
              to Templates and eligible for application installation.
            </p>

            <div className="flex justify-center">
              <a
                href="https://method.me/refer?referid=Tp5LxM48zSzuc72l56hmIA%3d%3d"
                target="_blank"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              >
                Create Your Method Account
              </a>
            </div>

            <p className="text-gray-700 leading-relaxed mt-6 text-center">
              During signup, you’ll connect QuickBooks, create your Method administrator
              user, and complete the initial setup wizard.
            </p>
          </div>

          {/* STEP 3 — FORM */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-center">3. Complete the Application Request Form</h2>
            <p className="text-gray-700 leading-relaxed mb-4 text-center">
              Tell us which Templates applications you want installed. This helps us
              configure your Method account to match your business needs.
            </p>

            <div className="border border-gray-200 rounded-xl p-8 bg-gray-50 text-gray-700">
              <p className="mb-4">
                <strong>Form Placeholder:</strong> We can embed your real form here.
              </p>
              <p className="text-sm text-gray-500">
                (This could be a Typeform, JotForm, Method screen, or custom component.)
              </p>
            </div>
          </div>

          {/* STEP 4 — ADMIN */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-center">4. Administrator Access Required</h2>
            <p className="text-gray-700 leading-relaxed text-center">
              To install applications into your Method account, you must have a user
              with <strong>Administrator permissions</strong>. This is required for:
            </p>

            <ul className="text-gray-700 space-y-2 mt-4 text-center">
              <li>• Installing applications</li>
              <li>• Creating tables and fields</li>
              <li>• Managing permissions</li>
              <li>• Connecting integrations</li>
              <li>• Updating workflows</li>
            </ul>
          </div>

          {/* STEP 5 — NEXT STEPS */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-center">5. What Happens Next</h2>
            <p className="text-gray-700 leading-relaxed mb-4 text-center">
              Once your form is submitted, our team will take care of the rest.
            </p>

            <ul className="text-gray-700 space-y-2 text-center">
              <li>• We review your selections</li>
              <li>• We install the requested applications</li>
              <li>• We configure your Method account</li>
              <li>• We ensure everything syncs correctly</li>
              <li>• We schedule a walkthrough session</li>
            </ul>
          </div>

          {/* STEP 6 — READY */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-center">6. You're Ready to Begin</h2>
            <p className="text-gray-700 leading-relaxed text-center">
              Once setup is complete, you’ll have a fully configured Method environment
              with the exact applications your business needs — optimized, scalable,
              and ready for daily use.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
