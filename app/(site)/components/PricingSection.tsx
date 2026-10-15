type PricingSectionProps = {
  id?: string;
  title?: string;
  description?: string;
  contactHref?: string;
};

export default function PricingSection({
  id = "pricing",
  title = "Flexible Plans for Every Business",
  description = "Choose the plan that fits your needs — whether you want occasional help or ongoing support.",
  contactHref = "/contact",
}: PricingSectionProps) {
  return (
    <section id={id} className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          {title}
        </h2>

        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
          {description}
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* PAY PER USE */}
          <div className="p-8 bg-blue-50 rounded-xl border border-blue-200 shadow-sm">
            <h3 className="text-2xl font-bold mb-2">Pay‑Per‑Use</h3>
            <p className="text-4xl font-bold text-blue-600 mb-4">
              $75<span className="text-lg text-gray-600">/hour</span>
            </p>
            <p className="text-gray-600 mb-6">
              Perfect for small updates, one‑off fixes, or occasional customization.
            </p>

            <ul className="text-gray-600 space-y-2 text-sm mb-10">
              <li>• No commitment</li>
              <li>• Pay only for the hours you use</li>
              <li>• Ideal for small enhancements, updates, and/or scoping sessions</li>
              <li>• Great for testing the waters</li>
              <li>• Tell us about your business needs in your Free Consultation</li>
            </ul>

            <a
              href={contactHref}
              className="block text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Start a Request
            </a>
          </div>

          {/* DEDICATED SERVICE PLAN */}
          <div className="p-8 bg-blue-500 text-white rounded-xl shadow-lg border border-blue-600">
            <h3 className="text-2xl font-bold mb-2">Dedicated Service Plan</h3>
            <p className="text-4xl font-bold mb-4">
              $50<span className="text-lg text-blue-100">/hour</span>
            </p>
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
              href={contactHref}
              className="block text-center px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Get Started
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
