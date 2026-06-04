import HeroSection from "./components/HeroSection";
import Pillars from "./components/Pillars";
import Image from "next/image";

export const metadata = {
  title: "Templates — Business Management Software",
};

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* HERO */}
      <HeroSection />

      <main>

        {/* FLOW DIAGRAM */}
        <section className="w-full py-16 md:py-20 bg-blue-50 border-b border-blue-100">
          <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
              Your Connected Business System
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 md:mb-10 text-sm md:text-base">
              A complete front‑to‑back ecosystem that connects your website, customer experience,
              internal operations, and external integrations into one seamless loop.
            </p>

            <div className="w-full h-56 md:h-64 bg-white border border-blue-200 rounded-lg flex items-center justify-center text-blue-400 shadow-sm text-sm md:text-base px-4">
              Flow Diagram Placeholder (Website ↔ Front End ↔ Back End ↔ Integrations)
            </div>
          </div>
        </section>

        {/* INTERACTIVE PILLARS */}
        <Pillars />

        {/* METHOD + QUICKBOOKS */}
        <section className="w-full py-10 md:py-12 bg-blue-50 border-t border-blue-100">
          <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Two‑way sync with QuickBooks — no double entry, ever.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 md:mb-10 text-sm md:text-base">
              Your website, workflows, and operations stay perfectly aligned with your accounting.
            </p>

            <div className="w-full max-w-3xl mx-auto">
              <Image
                src="/method-quickbooks.png"
                alt="Method and QuickBooks sync illustration"
                width={1200}
                height={600}
              
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
