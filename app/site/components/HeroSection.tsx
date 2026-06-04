import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-10 text-center md:text-left">

        {/* Left side text */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Your Business, 
            <p>One Platform,</p> 
            <p>Fully Customizable.</p>
          </h1>

          <p className="mt-6 text-lg text-slate-200 max-w-xl">
            Fully adaptable applications that automate your operations,
            and seamlessly sync from your website to your accounting software.
          </p>

          <div className="mt-8 flex gap-4 justify-center md:justify-start">
            <Link
              href="/apps"
              className="bg-blue-600 hover:bg-blue-900 text-white font-medium px-6 py-3 rounded-md inline-block cursor-pointer"
            >
              Browse Applications
            </Link>

            <Link
              href="/book-demo"
              className="border border-white text-white hover:bg-blue-200 hover:text-slate-900 font-medium px-6 py-3 rounded-md inline-block cursor-pointer"
            >
              Book a Demo
            </Link>
          </div>
        </div>

        {/* Right side hero image */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md">
            <Image
              src="/heroimage1.png"
              alt="Hero section illustration"
              width={600}
              height={500}
              className="rounded-lg shadow-lg object-cover"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
