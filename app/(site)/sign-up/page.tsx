import Link from "next/link";

export const metadata = {
  title: "Sign Up — Templates",
  description:
    "Tell us about your business and we'll get you set up with Templates. Fill in the form and we'll be in touch to book your free consultation.",
};

// Paste your Method web-to-lead form URL here (the src of the iframe Method gives you).
// Until it's set, the page shows a fallback card pointing people to the consultation booking.
const WEB_TO_LEAD_URL = "";

// Height of the form frame in pixels. Raise it if the form gets cut off or shows a scrollbar.
const FORM_HEIGHT = 900;

const nextSteps = [
  {
    title: "Send us your details",
    body: "Fill in the form with a few details about you and your business.",
  },
  {
    title: "We get in touch",
    body: "We'll reach out to book your free consultation and learn how your business works.",
  },
  {
    title: "Get a clear estimate",
    body: "We scope your project and give you a clear estimate before any build work begins.",
  },
];

export default function SignUpPage() {
  return (
    <div className="bg-white">
      {/* HEADER */}
      <section className="w-full bg-slate-800 pt-14 pb-24 md:pt-20 md:pb-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Sign up for Templates
          </h1>
          <p className="mt-6 text-lg text-slate-200">
            Tell us a little about your business and we&apos;ll get you set up with a system built
            around the way you work.
          </p>
        </div>
      </section>

      <main>
        {/* FORM CARD — overlaps the header, same pattern as the home page */}
        <section className="relative -mt-14 z-10 pb-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl px-4 sm:px-8 md:px-10 py-8 md:py-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
                Get started
              </h2>
              <p className="text-gray-600 text-sm md:text-base text-center mb-8">
                Fill in the form below and we&apos;ll be in touch to book your free consultation.
              </p>

              {WEB_TO_LEAD_URL ? (
                <iframe
                  src={WEB_TO_LEAD_URL}
                  title="Templates sign up form"
                  className="w-full rounded-xl border-0"
                  style={{ height: FORM_HEIGHT }}
                  loading="lazy"
                />
              ) : (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-8 text-center">
                  <p className="text-gray-700 mb-5 text-sm md:text-base">
                    The sign up form is coming soon. In the meantime, book a free consultation and
                    we&apos;ll get you started.
                  </p>
                  <Link
                    href="/book-demo"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Book your free consultation
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* WHAT HAPPENS NEXT */}
        <section className="pb-20">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              What happens next
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {nextSteps.map((step, i) => (
                <div
                  key={step.title}
                  className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-left"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white font-semibold mb-4"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.body}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 text-sm text-center mt-10">
              Already a customer?{" "}
              <Link href="/my-account" className="text-blue-700 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
