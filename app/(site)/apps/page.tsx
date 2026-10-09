"use client";

import Image from "next/image";

type AppCard = { name: string; link: string; desc: string };

const frontEnd: AppCard[] = [
  {
    name: "Customer Portal",
    link: "/customer-portal",
    desc: "Give customers a secure login to follow their jobs, view photos, approve estimates, and pay invoices.",
  },
  {
    name: "Online Shop",
    link: "/online-shop",
    desc: "Sell products or services online with a storefront connected to your inventory and accounting.",
  },
  {
    name: "Book Appointment",
    link: "/book-appointment",
    desc: "Let customers book an open time themselves, with confirmations and reminders sent automatically.",
  },
  {
    name: "Transactions",
    link: "/transactions",
    desc: "See every sale, invoice, and payment in one place, kept in sync with your accounting.",
  },
  {
    name: "Events",
    link: "/events",
    desc: "Schedule events, site visits, and meetings, linked to customers and your team's calendar.",
  },
  {
    name: "Reminders",
    link: "/reminders",
    desc: "Automatic email or text reminders for appointments, due invoices, and follow-ups, so nothing slips.",
  },
  {
    name: "Forms",
    link: "/forms",
    desc: "Build custom forms for intake, inspections, and sign-offs that save straight to the customer record.",
  },
];

const backEnd: AppCard[] = [
  {
    name: "Careers",
    link: "/careers",
    desc: "Post job openings on your website and collect applications directly into your system.",
  },
  {
    name: "Scheduling",
    link: "/scheduling",
    desc: "Plan crews, jobs, and appointments on one shared calendar your whole team can see.",
  },
  {
    name: "Work Orders",
    link: "/work-orders",
    desc: "Send jobs to the field, track progress, and collect photo proof when work is finished.",
  },
  {
    name: "Sales Orders",
    link: "/sales-orders",
    desc: "Turn approved estimates into orders, track fulfilment, and invoice in one click.",
  },
  {
    name: "Inventory",
    link: "/inventory",
    desc: "Track stock and items, with pricing that carries into your estimates and invoices.",
  },
  {
    name: "Payroll",
    link: "/payroll",
    desc: "Pull hours from schedules and jobs and get them ready for payroll without retyping.",
  },
  {
    name: "Tasks",
    link: "/tasks",
    desc: "Assign, track, and complete tasks across your team, linked to customers and jobs.",
  },
  {
    name: "Human Resources",
    link: "/human-resources",
    desc: "Keep employee profiles, documents, and certifications organized in one place.",
  },
];

const integrations: AppCard[] = [
  {
    name: "Google Workspace",
    link: "/google-workspace",
    desc: "Keep Gmail, Calendar, and Drive connected so emails, events, and files stay with the right customer.",
  },
  {
    name: "Shipment Tracking",
    link: "/shipment-tracking",
    desc: "Track shipments with carrier updates and share live status with your team and your customers.",
  },
  {
    name: "QuickBooks",
    link: "/quickbooks",
    desc: "Two-way sync with QuickBooks, so invoices, customers, and payments only get entered once.",
  },
  {
    name: "Xero",
    link: "/xero",
    desc: "Connect Xero so your invoices, customers, and payments stay in step with your accounting.",
  },
];

function CardGrid({ items }: { items: AppCard[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map((app) => (
        <a
          key={app.name}
          href={app.link}
          className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition bg-white"
        >
          <h3 className="text-lg font-semibold mb-2">{app.name}</h3>
          <p className="text-gray-600 text-sm">{app.desc}</p>
        </a>
      ))}
    </div>
  );
}

export default function AppsOverviewPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">

{/* HERO */}
<section className="w-full py-28 bg-slate-800 border-b border-slate-700">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">

    {/* TEXT */}
    <div className="flex-1 text-center md:text-left text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Apps & Modules
      </h1>

      <p className="text-lg text-slate-300 max-w-xl">
        Explore the full suite of Templates apps — from customer‑facing tools 
        to internal operations and accounting integrations. Everything works 
        together to streamline your business.
      </p>
    </div>

    {/* IMAGE ON RIGHT */}
    <div className="flex-1 flex justify-center md:justify-end">
      <div className="w-full max-w-md">
        <Image
          src="/heroimageapps.png"
          alt="Apps overview hero"
          width={800}
          height={800}
          className="object-contain drop-shadow-xl"
          priority
        />
      </div>
    </div>

  </div>
</section>


      {/* FRONT END */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Front End</h2>
          <CardGrid items={frontEnd} />
        </div>
      </section>

      {/* BACK END */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Back End</h2>
          <CardGrid items={backEnd} />
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Integrations</h2>
          <CardGrid items={integrations} />
        </div>
      </section>

    </main>
  );
}
