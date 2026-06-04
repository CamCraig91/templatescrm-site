"use client";

export default function WebsiteDesignPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="w-full py-28 bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left text-white grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Website Design
            </h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Modern, responsive websites built with clean design, strong branding, 
              and seamless integration into your Templates ecosystem.
            </p>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-80 h-56 bg-white rounded-xl shadow-xl border border-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Website Mockup</span>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-xl p-10 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">What’s Included</h2>
            <p className="text-gray-600 mb-6">
              Your website becomes the front door of your business — designed to convert, 
              inform, and integrate seamlessly with your internal systems.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Fully responsive design for all devices</li>
              <li>• Clean, modern layouts with strong UX principles</li>
              <li>• Custom branding, colors, and typography</li>
              <li>• SEO‑friendly structure and metadata</li>
              <li>• Integrated forms, booking, and customer portal access</li>
              <li>• Fast load times and optimized performance</li>
              <li>• Optional blog, resources, and landing pages</li>
              <li>• Built on scalable, maintainable components</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VISUAL SECTION */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Wireframe / Layout Diagram</span>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Designed for Clarity and Conversion</h3>
            <p className="text-gray-600 mb-4">
              Every page is crafted with purpose — guiding visitors toward the actions 
              that matter most to your business.
            </p>
            <p className="text-gray-600">
              With Templates powering your backend, your website becomes more than a 
              brochure — it becomes a fully connected digital experience.
            </p>
          </div>

        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-6">See the Design Process</h3>

          <div className="w-full aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Video Placeholder</span>
          </div>
        </div>
      </section>

    </main>
  );
}
