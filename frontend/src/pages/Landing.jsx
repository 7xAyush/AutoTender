import { Link } from "react-router-dom"

const impactCards = [
  {
    value: "90%",
    title: "Reduction in evaluation time",
    copy: "Automate the heavy lifting of document cross-referencing and extraction.",
  },
  {
    value: "94%",
    title: "F1-Score in Clause Detection",
    copy: "Exceptional accuracy in identifying mandatory vs. optional legal requirements.",
  },
  {
    value: "98%",
    title: "Consistency Rating",
    copy: "Eliminate subjective bias across different procurement officers and agencies.",
  },
]

const pipeline = [
  ["cloud_upload", "Ingestion", "PDF/DOCX Secure Import"],
  ["text_fields", "OCR", "Vision-to-Text Layer"],
  ["schema", "Layout", "Structural Mapping"],
  ["fact_check", "Classification", "Clause Categorization"],
  ["model_training", "Rule Engine", "Policy Enforcement"],
  ["description", "Eligibility", "Final Outcome Report"],
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-[#1b1b1e]">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#1b2b48]">
            <span className="material-symbols-outlined text-sm text-white">corporate_fare</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight text-[#041632]">AutoTender</span>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          <a className="border-b-2 border-[#041632] pb-1 text-xs font-medium text-[#041632]" href="#">
            Directives
          </a>
          <a className="text-xs font-medium text-slate-500 hover:text-[#041632]" href="#">
            Audit Logs
          </a>
          <a className="text-xs font-medium text-slate-500 hover:text-[#041632]" href="#">
            Compliance
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="rounded-lg bg-[#1b2b48] px-4 py-2 text-xs font-medium text-white hover:opacity-90">
            Run AI Analysis
          </button>
          <div className="flex gap-2 text-slate-500">
            <span className="material-symbols-outlined cursor-pointer hover:text-[#041632]">notifications</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-[#041632]">account_circle</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-8">
        <section className="flex flex-col items-center gap-16 py-24 md:flex-row">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#d5e3fc] px-3 py-1 text-[#57657a]">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                verified
              </span>
              <span className="text-[12px] font-bold uppercase tracking-[0.05em]">Institutional Grade AI</span>
            </div>
            <h1 className="max-w-xl text-[40px] font-bold leading-tight tracking-[-0.02em] text-[#041632]">
              Automate Procurement Intelligence
            </h1>
            <p className="max-w-lg text-[18px] leading-[1.6] text-[#44474d]">
              Transform complex PDF and DOCX tender documents into structured, actionable data. AutoTender leverages
              LLMs and OCR to ensure 100% compliance tracking in seconds.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                className="inline-flex items-center gap-2 rounded-xl bg-[#1b2b48] px-8 py-4 text-sm font-medium text-white hover:shadow-lg"
                to="/upload"
              >
                <span className="material-symbols-outlined">upload_file</span>
                Upload Tender
              </Link>
              <Link
                className="rounded-xl border border-[#75777e] px-8 py-4 text-sm font-medium text-[#041632] hover:bg-slate-50"
                to="/dashboard"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          <div className="w-full flex-1">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#1b2b48] to-[#d5e3fc] opacity-25 blur transition duration-1000 group-hover:opacity-50" />
              <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-xl">
                <img
                  alt="Procurement Dashboard Interface"
                  className="h-auto w-full rounded-lg"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuACX5YodhQ6Hi_5cfjrwbC0k6t14Pi9Y2WLOcEFC4Ggow1zKKD4S_MyzLfQqFyginQeUYHdU8TkmA9p-J9OefM8RRvqCEWgKoFshnR1CA9852Ms8_1rQnM9dCm8d304FFvY0O-j8OWAgM0uQxyVIP_DNajpmm3UzAQqPxyFek05iqFkp1f1m4trm7QJes5Ip4B2sys22FJMJyecgnaDJHOz8na0ZHWUVioekSg1lVwdPIgeGeOROoEFxqGWQ1eVmTjkhVUvplbxn-Nv"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 pb-24 md:grid-cols-3">
          {impactCards.map((card) => (
            <div key={card.title} className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-4">
                <span className="text-[32px] font-semibold text-[#041632]">{card.value}</span>
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-500">{card.title}</p>
                <div className="h-1 w-12 bg-[#1b2b48]" />
                <p className="text-sm text-[#44474d]">{card.copy}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="border-t border-slate-100 py-24">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-[32px] font-semibold tracking-[-0.01em] text-[#041632]">The AI Pipeline</h2>
            <p className="mx-auto max-w-2xl text-base leading-[1.6] text-[#44474d]">
              From raw document to auditable intelligence in six automated stages.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-slate-200 lg:block" />
            <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-6">
              {pipeline.map(([icon, title, copy]) => (
                <div key={title} className="flex flex-col items-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1b2b48] bg-white text-[#1b2b48] transition-all group-hover:bg-[#1b2b48]">
                    <span className="material-symbols-outlined">{icon}</span>
                  </div>
                  <span className="text-[12px] font-medium text-[#041632]">{title}</span>
                  <p className="mt-2 text-center text-[12px] text-slate-500">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-[#f5f3f6] px-12 py-24">
          <div className="mb-16">
            <h2 className="text-[32px] font-semibold tracking-[-0.01em] text-[#041632]">Unrivaled Evaluation Depth</h2>
            <p className="text-base text-[#44474d]">Built for the complexity of federal and municipal mandates.</p>
          </div>
          <div className="grid h-auto grid-cols-1 gap-6 md:h-[600px] md:grid-cols-4 md:grid-rows-2">
            <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-8 shadow-sm md:col-span-2 md:row-span-2">
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#d5e3fc] text-[#1b2b48]">
                  <span className="material-symbols-outlined">account_tree</span>
                </div>
                <h3 className="mb-4 text-[24px] font-semibold text-[#041632]">Legal-to-Logic Conversion</h3>
                <p className="text-base leading-[1.6] text-[#44474d]">
                  Automatically translate complex legal requirements into a boolean rule engine that checks for
                  compliance across every page of a vendor submission.
                </p>
              </div>
              <img
                alt="Abstract logic flow visualization"
                className="mt-8 h-48 rounded-lg object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWkWVcmQoTFh18-NcduHD_EyXDYnl3X9FuBrv_QKd5EE3yRCsoFjGNAscroW4jd5Lcy_I2eXu-PUnQFj8xn2k83va5kJ-wmmb37UOejS_IpuYdE1gFNvk3d_K64OF33I0esH2RJq9gGC68XIuHqrUafL_YLZt0unRODW9gesVUN2XcTYhMIv_it6UvbOFOrP8_MIsZn2g524L1efFxHpYRVGT7FKg6er_Ff-RTzFUQETOudq_1XvsY_3dWvSrMO7xjeFPMqJOZ69ZU"
              />
            </div>
            <div className="flex items-center gap-8 rounded-2xl bg-[#1b2b48] p-8 text-white shadow-sm md:col-span-2">
              <div className="flex-1">
                <h3 className="mb-2 text-[24px] font-semibold">Audit-Ready Trace</h3>
                <p className="text-sm text-white/80">
                  Every AI decision links directly back to a page number and paragraph in the source document. No
                  black boxes.
                </p>
              </div>
              <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                <span className="material-symbols-outlined text-4xl">history_edu</span>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <span className="material-symbols-outlined mb-4 text-3xl text-[#1b2b48]">target</span>
              <h4 className="text-[12px] font-bold text-[#041632]">Criterion Extraction</h4>
              <p className="mt-2 text-sm text-[#44474d]">Isolate technical criteria from legal boilerplates.</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <span className="material-symbols-outlined mb-4 text-3xl text-[#1b2b48]">diversity_3</span>
              <h4 className="text-[12px] font-bold text-[#041632]">Human-in-the-loop</h4>
              <p className="mt-2 text-sm text-[#44474d]">AI suggests, procurement officers finalize and sign off.</p>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div className="space-y-8">
              <h2 className="text-[32px] font-semibold tracking-[-0.01em] text-[#041632]">Designed for Institutional Trust</h2>
              <p className="text-[18px] leading-[1.6] text-[#44474d]">
                AutoTender is not meant to replace the procurement officer. It is a decision-support system designed to
                enhance accountability and transparency in public spending.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined mt-1 text-[#1b2b48]">shield_person</span>
                  <div>
                    <p className="text-[12px] font-bold text-[#041632]">End-to-End Encryption</p>
                    <p className="text-sm text-slate-500">Government data never leaves your secure sovereignty region.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined mt-1 text-[#1b2b48]">balance</span>
                  <div>
                    <p className="text-[12px] font-bold text-[#041632]">Unbiased Scoring</p>
                    <p className="text-sm text-slate-500">Neutral AI algorithms that treat every vendor submission equally.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <span className="material-symbols-outlined text-slate-400">account_balance</span>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#041632]">Ministry of Infrastructure</p>
                  <p className="text-sm text-slate-400">Success Case Study</p>
                </div>
              </div>
              <blockquote className="text-[18px] italic text-[#041632]">
                "AutoTender allowed us to process 45 complex engineering bids in 48 hours. Previously, this would
                have taken our committee three weeks of manual review."
              </blockquote>
              <div className="mt-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className="material-symbols-outlined text-sm text-[#1b2b48]"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    star
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative mb-24 overflow-hidden rounded-[2rem] bg-[#1b2b48] px-8 py-16 text-center text-white">
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[100px]" />
            <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-[#515f74] blur-[120px]" />
          </div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-[32px] font-semibold tracking-[-0.01em]">Ready to modernize your procurement audit trail?</h2>
            <p className="mx-auto max-w-2xl text-[18px] text-white/80">
              Join the 120+ government agencies using AutoTender to ensure absolute transparency and efficiency.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-xl bg-white px-10 py-4 text-sm font-bold text-[#1b2b48] hover:bg-slate-50">
                Request Demo Access
              </button>
              <button className="rounded-xl border border-white/30 px-10 py-4 text-sm hover:bg-white/10">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 px-8 py-12">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-12 md:flex-row">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#1b2b48]">
                <span className="material-symbols-outlined text-[14px] text-white">corporate_fare</span>
              </div>
              <span className="text-[12px] font-bold text-[#041632]">AutoTender</span>
            </div>
            <p className="max-w-xs text-sm text-slate-500">
              Next-generation AI for government procurement oversight and evaluation.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 md:grid-cols-3">
            <div className="space-y-4">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#041632]">Platform</p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a className="hover:text-[#041632]" href="#">Dashboard</a></li>
                <li><a className="hover:text-[#041632]" href="#">AI Analysis</a></li>
                <li><a className="hover:text-[#041632]" href="#">Directives</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#041632]">Legal</p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a className="hover:text-[#041632]" href="#">Compliance Guide</a></li>
                <li><a className="hover:text-[#041632]" href="#">Security</a></li>
                <li><a className="hover:text-[#041632]" href="#">Data Policy</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#041632]">Connect</p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a className="hover:text-[#041632]" href="#">Support</a></li>
                <li><a className="hover:text-[#041632]" href="#">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-[1440px] items-center justify-between border-t border-slate-100 pt-8 text-[12px] text-slate-400">
          <p>© 2024 AutoTender Systems. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-[#041632]" href="#">Privacy</a>
            <a className="hover:text-[#041632]" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
