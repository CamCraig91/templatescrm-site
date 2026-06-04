"use client";

export default function ResourcesPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">

      {/* HERO */}
      <section className="w-full py-28 bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Resources
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Your central hub for learning, documentation, optimization, and
            integrations. Explore everything you need to build confidently with Templates.
          </p>
        </div>
      </section>

      {/* RESOURCE CATEGORIES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-16">

          {/* GETTING STARTED */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Setup Guide", link: "/setup" },
                { name: "Best Practices", link: "/best-practices" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition bg-white"
                >
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Learn the basics and get up and running quickly.
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* TUTORIALS (SWAPPED WITH DOCUMENTATION) */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Tutorials & Videos</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Video Library", link: "https://www.youtube.com/@MethodCRM" },
                { name: "Free Trial", link: "https://grow.method.me/method-crm-partner-demo/" },
                
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition bg-white"
                >
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Learn by watching or following guided examples.
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* DOCUMENTATION (NOW METHOD:CRM DOCS) */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Documentation</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "API Reference",
                  link: "https://developer.method.me/",
                  desc: "Official API documentation for Method:CRM."
                },
                {
                  name: "Help Center",
                  link: "https://help.method.me/en/",
                  desc: "Learn how to build, customize, and extend Method."
                },
                {
                  name: "Customization Docs",
                  link: "https://docs.method.me/customization/",
                  desc: "Deep dive into screens, actions, tables, and logic."
                },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition bg-white"
                >
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
