import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full bg-slate-800 pt-16 pb-32 md:pt-20 md:pb-40">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* LEFT SIDE */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Your Business,
            <br />One Platform,
            <br />Fully Customizable.
          </h1>

          <p className="mt-6 text-lg text-slate-200 max-w-xl">
            Fully adaptable applications that automate your operations,
            and seamlessly sync from your website to your accounting software.
          </p>

          <div className="mt-8 flex gap-4 justify-center md:justify-start">
            <Link
              href="/apps"
              className="bg-blue-600 hover:bg-blue-900 text-white font-medium px-6 py-3 rounded-md"
            >
              Browse Applications
            </Link>

            <Link
              href="/book-demo"
              className="border border-white text-white hover:bg-blue-200 hover:text-slate-900 font-medium px-6 py-3 rounded-md"
            >
              Book a Demo
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="w-full max-w-xl h-[420px] md:h-[500px]">
            <Image
              src="/HeroImage2.png"
              alt="Hero section illustration"
              width={900}
              height={700}
              className="rounded-xl shadow-xl object-cover w-full h-full"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
