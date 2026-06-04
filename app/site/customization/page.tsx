import Image from "next/image";

export default function CustomizationPage() {
  return (
    <div className="bg-white text-gray-800">

      {/* HERO / BANNER */}
      <section className="w-full bg-slate-800 py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">

          {/* LEFT — TEXT */}
          <div className="flex-1 text-white md:text-left text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Unlock the Full Power of Method:CRM
            </h1>

            <p className="text-lg md:text-xl text-white max-w-2xl mb-10">
              Method is one of the most customizable CRMs on the market — but only if you know 
              how to unlock it. We design custom screens, workflows, automations, and integrations 
              that transform Method into a system tailored to your business.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row md:justify-start justify-center gap-4">
              <a
                href="/book-demo"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Book your Free Consultation
              </a>
              <a
                href="#pricing"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                View Pricing
              </a>
            </div>
          </div>

          {/* RIGHT — IMAGE */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="w-full max-w-md">
              <Image
                src="/serviceswhit.png"
                alt="Man building pillar with gear"
                width={900}
                height={900}
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </div>

        </div>
      </section>


      {/* WHAT IS METHOD CUSTOMIZATION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            What Is Method Customization?
          </h2>

          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            Method:CRM is powerful business tool because it’s flexible. It connects to accounting softwares (QuickBooks, Xero) to the custom applications that manage the other aspects of your business unique to you. Every screen, workflow, and process 
            can be customized to match your exact business needs — giving you a system that 
            works the way *you* work.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">What You Can Customize</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Custom screens and layouts</li>
                <li>• Automated workflows</li>
                <li>• Lead intake forms</li>
                <li>• Customer portals</li>
                <li>• Reporting dashboards</li>
                <li>• Integrations with other tools</li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Why It Matters</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Save time with automation</li>
                <li>• Reduce errors and double‑entry</li>
                <li>• Improve customer experience</li>
                <li>• Centralize your data</li>
                <li>• Scale your operations</li>
                <li>• Build competitive advantage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-200 border-y border-gray-200" >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            How Customization Works
          </h2>

          <div className="grid md:grid-cols-4 gap-10 mt-16">

            <div className="text-center">
              <div className="relative h-40 w-40 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
  <Image
    src="/discovery1.png"
    alt="test"
    fill
    className="object-cover"
  />
</div>
             
              <h3 className="font-semibold mb-2">1. Discovery</h3>
              <p className="text-gray-600 text-sm">
                We learn your workflows, pain points, and goals.
              </p>
            </div>

            <div className="text-center">
               <div className="relative h-40 w-40 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
  <Image
    src="/design1.png"
    alt="test"
    fill
    className="object-cover"
  />
</div>
              
              <h3 className="font-semibold mb-2">2. Design</h3>
              <p className="text-gray-600 text-sm">
                We map out screens, workflows, and automations.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-40 w-40 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
  <Image
    src="/build.png"
    alt="test"
    fill
    className="object-cover"
  />
</div>
              
              <h3 className="font-semibold mb-2">3. Build</h3>
              <p className="text-gray-600 text-sm">
                We develop your custom Method components.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-40 w-40 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
  <Image
    src="/launch.png"
    alt="test"
    fill
    className="object-cover"
  />
</div>
              
              <h3 className="font-semibold mb-2">4. Launch</h3>
              <p className="text-gray-600 text-sm">
                We test, refine, and support your rollout.
              </p>
            </div>

          </div>
        </div>
      </section>

    {/* EXAMPLES */}
<section className="py-20">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
      Real Customizations. Real Results.
    </h2>

    <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
      Here are some examples of customizations completed for past clients:
    </p>

    <div className="grid md:grid-cols-3 gap-10 mt-16">

      {/* PHOTO VERIFICATION */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 mb-6">
          <Image
            src="/verification.jpg"
            alt="Photograph Verification Screenshot"
            fill
            className="object-contain"
          />
        </div>

        <h3 className="font-semibold mb-2">Photograph Verification</h3>
        <p className="text-gray-600 text-sm">
          Verify job completion with photos uploaded by technicians and visible on the customer portal.
        </p>
      </div>

      {/* COMPANY DASHBOARD */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 mb-6">
          <Image
            src="/dashboard.png"
            alt="Company Dashboard Screenshot"
            fill
            className="object-contain"
          />
        </div>

        <h3 className="font-semibold mb-2">Company Dashboard</h3>
        <p className="text-gray-600 text-sm">
          All company metrics in one place — live and easily adjustable.
        </p>
      </div>

      {/* SHIPMENT TRACKING */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 mb-6">
          <Image
            src="/shipmenttracking.jpg"
            alt="Shipment Tracking Screenshot"
            fill
            className="object-contain"
          />
        </div>

        <h3 className="font-semibold mb-2">Shipment Tracking</h3>
        <p className="text-gray-600 text-sm">
          Live updates on shipment status, visible to both staff and customers.
        </p>
      </div>

    </div>
  </div>
</section>


      {/* REVIEWS */}
      <section className="py-20 bg-gray-200 border-y border-gray-200" >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold  text-center mb-6">
            What Clients Say
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-16">

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <p className="text-gray-700 italic mb-4">
                “Cameron helped us automate our entire estimate workflow. We save hours every week.”
              </p>
              <p className="text-gray-600 text-sm">— Sarah, Home Services Business</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <p className="text-gray-700 italic mb-4">
                “Our custom screens make Method so much easier for our team. Total game‑changer.”
              </p>
              <p className="text-gray-600 text-sm">— Mark, Construction Company</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <p className="text-gray-700 italic mb-4">
                “The integrations Cameron built keep everything synced. No more double‑entry.”
              </p>
              <p className="text-gray-600 text-sm">— Jenna, Accounting Firm</p>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Flexible Plans for Every Business
          </h2>

          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            Choose the plan that fits your needs — whether you want occasional help or ongoing support.
          </p>

          <div className="grid md:grid-cols-2 gap-10">

            {/* PAY PER USE */}
            <div className="p-8 bg-blue-50 rounded-xl border border-blue-200 shadow-sm">
              <h3 className="text-2xl font-bold mb-2">Pay‑Per‑Use</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">$75<span className="text-lg text-gray-600">/hour</span></p>
              <p className="text-gray-600 mb-6">
                Perfect for small updates, one‑off fixes, or occasional customization.
              </p>

              <ul className="text-gray-600 space-y-2 text-sm mb-10 ">
                <li>• No commitment</li>
                <li>• Pay only for the hours you use</li>
                <li>• Ideal for small enhancements, updates, and/or scoping sessions</li>
                <li>• Great for testing the waters</li>
                <li>• Tell us about your business needs in your Free Consultation </li>
              </ul>

              <a
                href="/contact"
                className="block text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Start a Request
              </a>
            </div>

            {/* DEDICATED SERVICE PLAN */}
            <div className="p-8 bg-blue-600 text-white rounded-xl shadow-lg border border-blue-700">
              <h3 className="text-2xl font-bold mb-2">Dedicated Service Plan</h3>
              <p className="text-4xl font-bold mb-4">$50<span className="text-lg text-blue-100">/hour</span></p>
              <p className="text-blue-100 mb-6">
                Best for businesses that want ongoing support, continuous improvements, and predictable costs.
              </p>

              <ul className="text-blue-100 space-y-2 text-sm mb-8">
                <li>• Minimum 3 hours/month</li>
                <li>• 3‑month minimum commitment</li>
                <li>• Priority scheduling</li>
                <li>• Monthly review & optimization</li>
                <li>*Additional hours above prepaid time for month billed at $75/hour</li>
              </ul>

              <a
                href="/contact"
                className="block text-center px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Get Started
              </a>
            </div>

          </div>
        </div>
      </section>

  

    </div>
  );
}
