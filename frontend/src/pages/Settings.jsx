const preferences = [
  {
    title: "Default Analysis Mode",
    description: "Choose how aggressively the AI should extract and normalize rules from uploaded tender documents.",
    value: "Balanced extraction",
  },
  {
    title: "Notification Policy",
    description: "Receive alerts for completed scans, low-confidence criteria, and final evaluation verdicts.",
    value: "Email + In-app alerts",
  },
  {
    title: "Data Retention",
    description: "Control how long uploaded files and generated evaluation artifacts remain available for audit.",
    value: "180 days",
  },
]

export default function Settings() {
  return (
    <div className="ml-64 min-h-screen bg-background p-6">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <section className="flex items-end justify-between">
          <div>
            <h2 className="text-[32px] font-semibold tracking-[-0.01em] text-[#041632]">Settings</h2>
            <p className="mt-2 max-w-2xl text-base leading-[1.6] text-[#44474d]">
              Configure workspace defaults, notification behavior, and document governance for AutoTender.
            </p>
          </div>
          <button className="rounded-lg bg-[#1b2b48] px-4 py-2 text-sm font-bold text-white hover:opacity-90">
            Save Changes
          </button>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-[#041632]">Workspace Preferences</h3>
            <div className="space-y-4">
              {preferences.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-[#1b2b48]">{item.title}</h4>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{item.description}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#1b2b48] shadow-sm">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-[#041632]">Security Posture</h3>
              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Encryption at rest</span>
                  <span className="font-bold text-emerald-600">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Encrypted upload channel</span>
                  <span className="font-bold text-emerald-600">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Human review required</span>
                  <span className="font-bold text-[#1b2b48]">Mandatory</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#1b2b48] p-6 text-white shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined">tune</span>
                <h3 className="text-sm font-bold">Admin Controls</h3>
              </div>
              <p className="text-sm leading-6 text-slate-300">
                Additional tenant-level controls can be connected here later, including role management and retention overrides.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
