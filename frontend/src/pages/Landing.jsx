import { Link } from "react-router-dom"

const impactCards = [
  { value: "90%", label: "Reduction in evaluation time" },
  { value: "94%", label: "F1-score in clause extraction" },
  { value: "98%", label: "Consistency in rule application" },
]

export default function Landing() {
  return (
    <div className="page-shell min-h-screen px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 px-6 py-5 shadow-panel backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">AI-Driven Procurement Ops</p>
            <h1 className="mt-2 text-3xl font-extrabold text-primary md:text-4xl">AutoTender</h1>
          </div>
          <Link
            to="/dashboard"
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            View Dashboard
          </Link>
        </header>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] bg-primary p-8 text-white shadow-panel md:p-12">
            <p className="text-sm uppercase tracking-[0.35em] text-blue-200">AI-Driven Tender Evaluation for Government Procurement</p>
            <h2 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
              From scanned clauses to defensible pass/fail decisions.
            </h2>
            <p className="mt-6 max-w-2xl text-base text-slate-200 md:text-lg">
              AutoTender ingests tender documents, extracts machine-readable eligibility rules, validates vendor profiles, and generates auditable decision reports.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/upload" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-primary hover:bg-slate-100">
                Upload Tender
              </Link>
              <Link
                to="/dashboard"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          <div className="space-y-5">
            {impactCards.map((card) => (
              <div key={card.label} className="panel p-6">
                <p className="text-4xl font-extrabold text-primary">{card.value}</p>
                <p className="mt-3 text-sm text-slate-600">{card.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            "Document Ingestion",
            "Clause Classification",
            "Rule Engine",
            "Vendor Matching",
            "Confidence Scoring",
            "Audit Trail",
          ].map((step) => (
            <div key={step} className="panel p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Pipeline</p>
              <h3 className="mt-3 text-xl font-bold text-primary">{step}</h3>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
