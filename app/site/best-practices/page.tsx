"use client";
import Image from "next/image";

export default function BestPracticesPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative w-full h-[420px] bg-slate-800 border-b border-slate-700 overflow-hidden flex items-center">

        {/* TEXT */}
        <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Method:CRM Customization Best Practices
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl leading-relaxed">
            Build faster, cleaner, and more scalable customizations inside Method:CRM.
            These principles help ensure your screens, workflows, and integrations
            stay maintainable and future‑proof.
          </p>
        </div>

        {/* HERO IMAGE (optional) */}
        <div className="absolute top-0 right-0 h-full w-[45vw] pointer-events-none opacity-40">
          <Image
            src="/method-hero.png" // swap with any image you want
            alt="Method Customization"
            fill
            className="object-contain object-right"
            priority
          />
        </div>

      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-20">

          {/* 1. DATA MODEL */}
          <div>
            <h2 className="text-3xl font-bold mb-4">1. Start With a Clear Data Model</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before building screens or workflows, define your tables, fields, and relationships.
              A clean data model prevents duplication, reduces complexity, and keeps your system
              easy to maintain.
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>• Normalize your data where possible</li>
              <li>• Avoid storing the same value in multiple tables</li>
              <li>• Use custom tables for heavy customization</li>
            </ul>
          </div>

          {/* 2. REUSABLE SCREENS */}
          <div>
            <h2 className="text-3xl font-bold mb-4">2. Build Reusable Screens</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Instead of creating multiple versions of the same screen, build reusable components:
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>• One “Edit Record” screen</li>
              <li>• One “Create Record” screen</li>
              <li>• One “List View” screen</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Pass record IDs through navigation actions to keep your system clean and scalable.
            </p>
          </div>

          {/* 3. ACTIONS OVER CODE */}
          <div>
            <h2 className="text-3xl font-bold mb-4">3. Use Actions Instead of Code</h2>
            <p className="text-gray-700 leading-relaxed">
              Method’s action engine is powerful and update‑safe. Use built‑in actions whenever
              possible instead of custom JavaScript or HTML. This ensures your customizations
              remain stable across platform updates.
            </p>
          </div>

          {/* 4. MODULAR WORKFLOWS */}
          <div>
            <h2 className="text-3xl font-bold mb-4">4. Keep Workflows Modular</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Break large workflows into smaller, reusable components:
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>• Validate Input</li>
              <li>• Create or Update Record</li>
              <li>• Send Email</li>
              <li>• Sync to QuickBooks</li>
              <li>• Log Activity</li>
            </ul>
          </div>

          {/* 5. TESTING */}
          <div>
            <h2 className="text-3xl font-bold mb-4">5. Test With Real Data</h2>
            <p className="text-gray-700 leading-relaxed">
              Always test with multiple users, roles, and edge‑case data. Method behaves differently
              depending on context, so thorough testing prevents unexpected behavior.
            </p>
          </div>

          {/* 6. PERMISSIONS */}
          <div>
            <h2 className="text-3xl font-bold mb-4">6. Use Permissions Properly</h2>
            <p className="text-gray-700 leading-relaxed">
              Don’t rely on hiding UI elements for security. Use Method’s role and table permissions
              to ensure sensitive data stays protected.
            </p>
          </div>

          {/* 7. BUILT-IN TABLES */}
          <div>
            <h2 className="text-3xl font-bold mb-4">7. Avoid Over‑Customizing Built‑In Tables</h2>
            <p className="text-gray-700 leading-relaxed">
              Built‑in tables sync with QuickBooks and other systems. Add custom fields sparingly.
              For heavy customization, create a separate custom table.
            </p>
          </div>

          {/* 8. PERFORMANCE */}
          <div>
            <h2 className="text-3xl font-bold mb-4">8. Optimize for Speed</h2>
            <ul className="text-gray-700 space-y-2">
              <li>• Reduce unnecessary actions</li>
              <li>• Avoid loops when possible</li>
              <li>• Use filtered “Retrieve List” actions</li>
              <li>• Load only the fields you need</li>
              <li>• Use pagination for large lists</li>
            </ul>
          </div>

          {/* 9. INTEGRATIONS */}
          <div>
            <h2 className="text-3xl font-bold mb-4">9. Integrate Thoughtfully</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When connecting Method to external systems:
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>• Store API keys securely</li>
              <li>• Avoid unnecessary API calls</li>
              <li>• Cache results when possible</li>
              <li>• Log integration failures</li>
            </ul>
          </div>

          {/* 10. CLEANUP */}
          <div>
            <h2 className="text-3xl font-bold mb-4">10. Keep Your Account Clean</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Schedule regular cleanup to keep your Method account fast and maintainable:
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>• Delete unused screens</li>
              <li>• Remove abandoned tables</li>
              <li>• Archive old workflows</li>
              <li>• Consolidate duplicate fields</li>
              <li>• Review permissions</li>
            </ul>
          </div>

          {/* 11. DOCUMENTATION */}
          <div>
            <h2 className="text-3xl font-bold mb-4">11. Document Everything</h2>
            <p className="text-gray-700 leading-relaxed">
              Every customization should include purpose, affected screens, fields used,
              workflows involved, and modification notes. Documentation saves hours of
              reverse‑engineering later.
            </p>
          </div>

          {/* 12. FUTURE-PROOFING */}
          <div>
            <h2 className="text-3xl font-bold mb-4">12. Build With the Future in Mind</h2>
            <p className="text-gray-700 leading-relaxed">
              Ask whether your customization will scale, survive updates, and be understandable
              to another developer. If not, rethink the design.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
