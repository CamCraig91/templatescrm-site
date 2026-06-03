import Image from "next/image";
import Link from "next/link";

export default function BackEndPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col">
        {/* HERO SECTION */}
      <section className="relative bg-slate-800 h-[475px] flex items-center overflow-hidden">

  {/* TEXT (inside container) */}
  <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
    <h1 className="text-5xl font-bold text-white mb-4">
      Back End System
    </h1>

    <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
      The operational engine of your business. Manage staff, inventory,
      workflows, reporting, and automations — all from one unified,
      powerful control center designed to keep your business running
      smoothly.
    </p>
  </div>

  {/* FULL-HEIGHT, EDGE-TO-EDGE HERO IMAGE */}
  <div className="absolute top-0 right-0 h-full w-[45vw]">
    <Image
      src="/backend3.jpg"
      alt="Back End System Hero"
      fill
      className="object-cover object-center"
      priority
    />
  </div>

</section>



      {/* Modules Grid */}
      <section className="py-16 bg-white flex-1">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Back End Modules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Inventory Management */}
            <Link href="/backend/inventory" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Inventory Management
                </h3>
                <p className="text-gray-600 text-sm">
                  Track stock levels, automate purchase orders, and manage
                  suppliers with real-time accuracy across all locations.
                </p>
              </div>
            </Link>

            {/* Hiring & Onboarding */}
            <Link href="/backend/hiring" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Hiring & Onboarding
                </h3>
                <p className="text-gray-600 text-sm">
                  Collect applications, streamline onboarding workflows, and set
                  role-based access for new team members.
                </p>
              </div>
            </Link>

            {/* Training */}
            <Link href="/backend/training" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Training & Knowledge Base
                </h3>
                <p className="text-gray-600 text-sm">
                  Deliver training modules, track certifications, and maintain a
                  centralized SOP and documentation library.
                </p>
              </div>
            </Link>

            {/* Tasks */}
            <Link href="/backend/tasks" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tasks & Workflows
                </h3>
                <p className="text-gray-600 text-sm">
                  Assign tasks, automate recurring work, and monitor progress
                  across teams and departments.
                </p>
              </div>
            </Link>

            {/* Work Orders */}
            <Link href="/backend/work-orders" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Work Orders
                </h3>
                <p className="text-gray-600 text-sm">
                  Create work orders, dispatch technicians, and capture notes,
                  photos, and status updates from the field.
                </p>
              </div>
            </Link>

            {/* Reporting */}
            <Link href="/backend/reports" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Reporting & Analytics
                </h3>
                <p className="text-gray-600 text-sm">
                  View sales, productivity, inventory usage, and performance
                  insights in real time to guide smarter decisions.
                </p>
              </div>
            </Link>

            {/* Reminders */}
            <Link href="/backend/reminders" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Reminders
                </h3>
                <p className="text-gray-600 text-sm">
                  Automated notifications for deadlines, renewals, follow-ups,
                  and time-sensitive tasks.
                </p>
              </div>
            </Link>

            {/* Automations */}
            <Link href="/backend/automations" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Automations
                </h3>
                <p className="text-gray-600 text-sm">
                  Trigger workflows, notifications, and actions based on custom
                  rules, events, and business logic.
                </p>
              </div>
            </Link>

            {/* Payroll */}
            <Link href="/backend/payroll" className="block">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Payroll
                </h3>
                <p className="text-gray-600 text-sm">
                  Manage employee compensation, benefits, and tax withholdings
                  with automated calculations and reporting.
                </p>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </main>
  );
}
