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
        <section className="relative -mt-20 z-10">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="bg-blue-50 border border-blue-100 rounded-3xl shadow-md px-8 md:px-16 py-16 md:py-20 text-center">

              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
                Your Connected Business System
              </h2>

              <p className="text-gray-600 max-w-2xl mx-auto mb-10 md:mb-12 text-sm md:text-base">
                A complete front‑to‑back ecosystem that connects your website, customer experience,
                internal operations, and external integrations into one seamless loop.
              </p>

              <div className="w-full flex items-center justify-center">
                <Image
                  src="/ConnectedBusiness5.png"
                  alt="Hero section illustration"
                  width={700}
                  height={400}
                  className="object-contain mx-auto rounded-3xl"
                  priority
                />
              </div>

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

{/* CURVE SEPARATOR */}
<Curve />

{/* WEBSITE DESIGN / DIGITAL STOREFRONT */}
<section className="relative -mt-16 md:-mt-24 z-10">
  <div className="max-w-6xl mx-auto px-4 md:px-6">

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-white border border-gray-200 rounded-3xl shadow-lg px-8 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-center gap-12"
    >

      {/* Text */}
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
          Website Design & Digital Storefront
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          Your website becomes the front door of your business — a digital storefront that
          connects directly to your backend system. Every form, purchase, booking, and
          customer interaction flows into one place you can easily manage.
        </p>
        <p className="text-gray-600 text-sm md:text-base">
          We design clean, modern websites that integrate seamlessly with your operations,
          ensuring customers get a premium experience while your team gets a unified,
          automated workflow behind the scenes.
        </p>
      </div>

      {/* Image */}
      <div className="flex-1 flex justify-center md:justify-end">
        <div className="w-full max-w-md">
          <Image
            src="/websitedesign2.png"
            alt="website design"
            width={900}
            height={600}
            className="rounded-2xl shadow-md object-cover"
          />
        </div>
      </div>

    </motion.div>
  </div>
</section>



        {/* PLATFORM CUSTOMIZATION */}
        <section className="relative -mt-10 md:-mt-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="bg-blue-50 border border-blue-100 rounded-3xl shadow-lg px-8 md:px-16 py-16 md:py-20 flex flex-col md:flex-row-reverse items-center gap-12">

              {/* Text */}
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                  Customization Built Around Your Business
                </h2>
                <p className="text-gray-600 text-sm md:text-base mb-6">
                  Every business runs differently — your system should reflect that. We customize
                  Templates so your workflows, data structure, automations, and customer experience
                  match exactly how your business operates.
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  From custom apps to tailored workflows, we ensure everything you need lives in one
                  place and runs efficiently.
                </p>
              </div>

              {/* Image */}
              <div className="flex-1">
                <Image
                  src="/customization.png"
                  alt="Customization illustration"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-md object-cover"
                />
              </div>

            </div>
          </div>
        </section>


        {/* INTEGRATIONS */}
        <section className="relative -mt-10 md:-mt-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-lg px-8 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-center gap-12">

              {/* Text */}
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                  Integrations That Connect Your Entire Business
                </h2>
                <p className="text-gray-600 text-sm md:text-base mb-6">
                  Templates connects to the outside world — Google Workspace, Maps, Zapier, DHL,
                  QuickBooks, Xero, and dozens of other systems. All your external data flows into
                  your central database automatically.
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  No more switching between apps or manually updating information. Everything stays
                  synced, organized, and accessible.
                </p>
              </div>

              {/* Image */}
              <div className="flex-1">
                <Image
                  src="/integrations.png"
                  alt="Integrations illustration"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-md object-cover"
                />
              </div>

            </div>
          </div>
        </section>


        {/* PRODUCT VIDEO SECTION */}
        <section className="relative -mt-10 md:-mt-16 mb-20">
          <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
            <div className="bg-blue-50 border border-blue-100 rounded-3xl shadow-lg px-8 md:px-16 py-16 md:py-20">

              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                Watch the Product Walkthrough
              </h2>

              <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm md:text-base">
                See how Templates connects your website, front end, back end, and integrations into
                one seamless business system.
              </p>

              <div className="aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-md">
                <video
                  src="/product-demo.mp4"
                  controls
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
