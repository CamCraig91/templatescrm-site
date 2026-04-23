"use client";

export default function ResourcesPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">

      {/* HERO */}
      <section className="w-full py-28 bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Software
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            The central softwares to making your business run. Explore integrations, syncing, and workflow compatibility with Method:CRM, QuickBooks, Xero, and more.
          </p>
        </div>
      </section>

      {/* RESOURCE CATEGORIES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-16">

      
          {/* SOFTWARE (WITH LOGOS) */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Software</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Method:CRM",
                  link: "https://www.method.me/",
                  logo: "/methodcrm.png"
                },
                {
                  name: "QuickBooks",
                  link: "https://quickbooks.intuit.com/",
                  logo: "/quickbooks1.png"
                },
                {
                  name: "Xero",
                  link: "https://www.xero.com/",
                  logo: "/xero.png"
                },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition bg-white flex flex-col items-center text-center"
                >
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="h-10 mb-4 opacity-90"
                  />
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Integrations, syncing, and workflow compatibility.
                  </p>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
