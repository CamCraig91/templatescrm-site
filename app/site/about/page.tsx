export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900">

      {/* HERO SECTION */}
      <section className="w-full bg-slate-800 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            A Unified System That Runs Your Entire Operation
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Templates brings your website, workflows, customer experience, and integrations 
            together into one seamless platform that integrates with your website.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="/book-demo"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Book a Demo
            </a>
            <a
              href="/apps"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Explore the Platform
            </a>
          </div>

          {/* HERO GRAPHIC */}
          <div className="mt-16">
            <img
              src="/images/four-pillars-hero.png"
              alt="Illustration representing the four pillars of the Templates platform"
              className="w-full max-w-4xl mx-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* FOUR PILLARS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            The Four Pillars of a Modern, Connected Business
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            Every successful system needs a strong foundation. Templates is built on four 
            core pillars that work together to power your entire operation.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* WEBSITE */}
            <div className="p-6 bg-blue-50 rounded-xl border border-gray-200 shadow-sm">
              <img
                src="/website.png"
                alt="Website pillar graphic"
                className="h-32 w-full object-contain rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold mb-3">Website</h3>
              <p className="text-gray-600 mb-4">
                Your digital front door — designed to convert visitors into customers.
              </p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Responsive, modern design</li>
                <li>• Dynamic content based on your data</li>
                <li>• Embedded forms, bookings, and portals</li>
                <li>• SEO‑optimized structure</li>
                <li>• Lightning‑fast performance</li>
              </ul>
            </div>

            {/* FRONT END */}
            <div className="p-6 bg-blue-50 rounded-xl border border-gray-200 shadow-sm">
              <img
                src="/frontend.png"
                alt="Front end pillar graphic"
                className="h-32 w-full object-contain rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold mb-3">Front End</h3>
              <p className="text-gray-600 mb-4">
                Everything your customers interact with — clean, intuitive, and seamless.
              </p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Custom forms and workflows</li>
                <li>• Customer login portals</li>
                <li>• Appointment booking</li>
                <li>• Transaction History</li>
                <li>• Reminders and Notifications</li>
              </ul>
            </div>

            {/* BACK END */}
            <div className="p-6 bg-blue-50 rounded-xl border border-gray-200 shadow-sm">
              <img
                src="/backend.png"
                alt="Back end pillar graphic"
                className="h-32 w-full object-contain rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold mb-3">Back End</h3>
              <p className="text-gray-600 mb-4">
                The operational engine that automates your business behind the scenes and keeps your employees on top of everything.
              </p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Automated workflows</li>
                <li>• Payroll</li>
                <li>• Task management</li>
                <li>• Internal dashboards</li>
                <li>• Role‑based permissions</li>
              </ul>
            </div>

            {/* INTEGRATIONS */}
            <div className="p-6 bg-blue-50 rounded-xl border border-gray-200 shadow-sm">
              <img
                src="/integrations.png"
                alt="Integrations pillar graphic"
                className="h-32 w-full object-contain rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold mb-3">Integrations</h3>
              <p className="text-gray-600 mb-4">
                Your tools, connected — keeping your data synced everywhere.
              </p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• QuickBooks</li>
                <li>• Method:CRM</li>
                <li>• Email & Calendar</li>
                <li>• Payment processors</li>
                <li>• Custom API connections</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-10 mt-16">

            <div className="text-center">
              <img
                src="/images/how-learn.png"
                alt="Learn step graphic"
                className="h-20 w-20 mx-auto mb-4"
              />
              <h3 className="font-semibold mb-2">1. Learn</h3>
              <p className="text-gray-600 text-sm">
                We map your workflows, tools, and goals.
              </p>
            </div>

            <div className="text-center">
              <img
                src="/images/how-build.png"
                alt="Build step graphic"
                className="h-20 w-20 mx-auto mb-4"
              />
              <h3 className="font-semibold mb-2">2. Build</h3>
              <p className="text-gray-600 text-sm">
                We create your connected system — website, front end, back end, and integrations.
              </p>
            </div>

            <div className="text-center">
              <img
                src="/images/how-launch.png"
                alt="Launch step graphic"
                className="h-20 w-20 mx-auto mb-4"
              />
              <h3 className="font-semibold mb-2">3. Launch</h3>
              <p className="text-gray-600 text-sm">
                We train your team and support your rollout.
              </p>
            </div>

            <div className="text-center">
              <img
                src="/images/how-grow.png"
                alt="Grow step graphic"
                className="h-20 w-20 mx-auto mb-4"
              />
              <h3 className="font-semibold mb-2">4. Grow</h3>
              <p className="text-gray-600 text-sm">
                Your system evolves as your business evolves.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Business?
        </h2>

        <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
          Templates is the system that grows with you — not the other way around.
        </p>

        <a
          href="/book-demo"
          className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Book a Demo
        </a>
      </section>

    </div>
  );
}
