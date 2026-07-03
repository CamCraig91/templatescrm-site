"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WebsiteDesignPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full py-28 bg-slate-800"
      >
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

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center md:justify-end"
          >
            <div className="w-full max-w-md">
              <Image
                src="/websitedesign2.png"
                alt="website design"
                width={900}
                height={900}
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* WHITE CURVE OVERLAPPING BLUE HERO */}
      <div className="w-full overflow-hidden -mt-1">
        <svg viewBox="0 0 1440 120" className="w-full h-20" preserveAspectRatio="none">
          <path d="M0,0 C480,120 960,0 1440,120 L1440,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* WHAT'S INCLUDED */}
      <motion.section
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
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
      </motion.section>

      {/* FLIPPED GRAY CURVE OVERLAPPING INTO NEXT SECTION */}
      <div className="w-full overflow-hidden rotate-180 -mt-1">
        <svg viewBox="0 0 1440 120" className="w-full h-20" preserveAspectRatio="none">
          <path d="M0,0 C480,120 960,0 1440,120 L1440,0 L0,0 Z" fill="#f9fafb" />
        </svg>
      </div>

      {/* DESIGNED FOR CLARITY — NO TOP BORDER */}
      <motion.section
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-gray-50 border-b border-gray-200"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center md:justify-end"
          >
            <div className="w-full max-w-md">
              <Image
                src="/ConnectedBusiness1.png"
                alt="website diagram"
                width={900}
                height={900}
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </motion.div>

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
      </motion.section>

      {/* WHITE CURVE AT BOTTOM */}
      <div className="w-full overflow-hidden rotate-180 -mt-1">
        <svg viewBox="0 0 1440 120" className="w-full h-20" preserveAspectRatio="none">
          <path d="M0,0 C480,120 960,0 1440,120 L1440,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* VIDEO SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-6">See the Design Process</h3>

          <div className="w-full aspect-video bg-gray-200 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-gray-500">Video Placeholder</span>
          </div>
        </div>
      </motion.section>

    </main>
  );
}
