"use client";

export default function TasksPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">

      <section className="relative w-full py-28 bg-slate-800 border-b border-slate-700 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tasks</h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Assign, track, and complete tasks across your team with a simple, organized
              task management system built into your CRM.
            </p>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-80 h-56 bg-white rounded-xl shadow-xl border border-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Screenshot / Visual</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border border-gray-200 rounded-xl p-10 shadow-sm bg-white">
            <h2 className="text-2xl font-bold mb-4">What This Module Includes</h2>
            <p className="text-gray-600 mb-6">
              Keep your team aligned with clear task assignments and progress tracking.
            </p>

            <ul className="text-gray-700 space-y-3">
              <li>• Create and assign tasks to staff or teams</li>
              <li>• Due dates, priorities, and reminders</li>
              <li>• Link tasks to customers, work orders, or sales</li>
              <li>• Track progress and completion</li>
              <li>• Internal notes and attachments</li>
              <li>• Daily and weekly task views</li>
              <li>• Automated task creation from workflows</li>
              <li>• Sync with Scheduling and HR</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Task Flow Diagram</span>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Stay Organized and Productive</h3>
            <p className="text-gray-600 mb-4">
              Tasks keep your team aligned and accountable, with clear visibility into what needs to be done.
            </p>
            <p className="text-gray-600">
              With CRM integration, every task is connected to the right customer or job.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
