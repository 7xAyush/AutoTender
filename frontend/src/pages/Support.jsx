const supportChannels = [
  {
    title: "Technical Support",
    copy: "Use this for upload failures, stuck scans, extraction mismatches, or report rendering issues.",
    action: "Open Support Ticket",
  },
  {
    title: "Procurement Guidance",
    copy: "Reach out for help interpreting criteria logic, mandatory-rule behavior, and evaluation flow decisions.",
    action: "Contact Specialist",
  },
  {
    title: "Platform Documentation",
    copy: "Review the operating guide, security notes, and evaluation workflow references for your team.",
    action: "View Docs",
  },
]

export default function Support() {
  return (
    <div className="ml-64 min-h-screen bg-background p-6">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <section>
          <h2 className="text-[32px] font-semibold tracking-[-0.01em] text-[#041632]">Support</h2>
          <p className="mt-2 max-w-2xl text-base leading-[1.6] text-[#44474d]">
            Get help with document processing, evaluation logic, and workspace operations.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {supportChannels.map((channel) => (
            <div key={channel.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#041632]">{channel.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">{channel.copy}</p>
              <button className="mt-6 rounded-lg bg-[#1b2b48] px-4 py-2 text-sm font-bold text-white hover:opacity-90">
                {channel.action}
              </button>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-[#041632]">Frequently Needed</h3>
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-100 p-4">
                <h4 className="text-sm font-bold text-[#1b2b48]">Why didn’t my tender start scanning?</h4>
                <p className="mt-1 text-sm text-slate-500">
                  A scan starts only after you provide title, department, file, and click `Start AI Scan` on the upload screen.
                </p>
              </div>
              <div className="rounded-lg border border-slate-100 p-4">
                <h4 className="text-sm font-bold text-[#1b2b48]">Why can’t I open Vendor Profile directly?</h4>
                <p className="mt-1 text-sm text-slate-500">
                  Vendor evaluation depends on a tender context. The app now routes `/vendor` to the latest available tender automatically.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#1b2b48] p-6 text-white shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">headset_mic</span>
              <h3 className="text-lg font-semibold">Response Standards</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>Critical platform issues: target response within 2 business hours.</li>
              <li>Workflow assistance: same business day.</li>
              <li>Feature requests and admin questions: within 1 business day.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
