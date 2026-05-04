import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api"
import StatusBadge from "../components/StatusBadge"

export default function EvaluationReport() {
  const { reportId } = useParams()
  const [report, setReport] = useState(null)

  useEffect(() => {
    api.get(`/reports/${reportId}`).then((response) => setReport(response.data))
  }, [reportId])

  const downloadReport = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = `autotender-report-${report.id}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  if (!report) {
    return <div className="ml-64 p-8 text-sm text-slate-500">Loading evaluation report...</div>
  }

  const passed = report.verdict === "Pass"
  const passedCount = report.criteria_results.filter((item) => item.passed).length
  const failedCount = report.criteria_results.filter((item) => !item.passed).length

  return (
    <div className="ml-64 max-w-[1440px] p-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <nav className="mb-1 flex items-center gap-2 text-[12px] text-slate-400">
            <span>Evaluations</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span>Report ID: AT-{String(report.id).padStart(4, "0")}</span>
          </nav>
          <h2 className="text-[32px] font-semibold tracking-[-0.01em] text-[#1b2b48]">Technical Evaluation Report</h2>
          <p className="mt-1 text-base text-slate-500">Vendor: Vendor #{report.vendor_id}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[12px] hover:bg-slate-50" onClick={downloadReport} type="button">
            <span className="material-symbols-outlined text-sm">download</span> Download JSON Report
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[12px] hover:bg-slate-50" type="button">
            <span className="material-symbols-outlined text-sm">print</span> Print Report
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-[#1b2b48] px-4 py-2 text-[12px] text-white" type="button">
            <span className="material-symbols-outlined text-sm">share</span> Share
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:col-span-2">
          <div className="flex flex-col md:flex-row">
            <div className={`flex w-full flex-col items-center justify-center p-12 text-center text-white md:w-64 ${passed ? "bg-emerald-600" : "bg-[#ba1a1a]"}`}>
              <span className="material-symbols-outlined mb-2 text-5xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                {passed ? "verified" : "gpp_bad"}
              </span>
              <h3 className="text-3xl font-bold tracking-tight">{report.verdict.toUpperCase()}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/80">Status: {passed ? "Qualified" : "Review Required"}</p>
            </div>
            <div className={`flex flex-1 flex-col justify-center p-6 ${passed ? "bg-emerald-50/30" : "bg-red-50/40"}`}>
              <div className="mb-4">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className={`text-[12px] font-bold uppercase tracking-[0.05em] ${passed ? "text-emerald-800" : "text-[#ba1a1a]"}`}>
                    CONFIDENCE SCORE
                  </span>
                  <span className={`text-[24px] font-semibold ${passed ? "text-emerald-700" : "text-[#ba1a1a]"}`}>
                    {Math.round(report.confidence_score * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white">
                  <div
                    className={`h-full ${passed ? "bg-emerald-600" : "bg-[#ba1a1a]"}`}
                    style={{ width: `${Math.round(report.confidence_score * 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <h4 className="mb-1 text-[12px] font-medium uppercase text-slate-700">Evaluation Summary</h4>
                <p className="text-base leading-relaxed text-slate-600">{report.summary_reason}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h4 className="mb-4 text-[12px] font-bold uppercase tracking-[0.05em] text-slate-400">SUBMISSION METRICS</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Processing Time</span>
              <span className="text-base font-bold text-[#1b2b48]">12.4 Seconds</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Rules Scanned</span>
              <span className="text-base font-bold text-[#1b2b48]">{report.criteria_results.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Data Integrity</span>
              <span className={`text-base font-bold ${passed ? "text-emerald-600" : "text-[#ba1a1a]"}`}>{passed ? "Valid" : "Flagged"}</span>
            </div>
            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs italic text-slate-400">
                Evaluation generated by AutoTender AI Engine on {new Date(report.created_at).toLocaleString()}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <h3 className="text-lg font-semibold text-[#1b2b48]">Criterion Breakdown</h3>
              <div className="flex gap-2">
                <span className="rounded bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">{passedCount} PASSED</span>
                <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">{failedCount} FAILED</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-white">
                    <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.05em] text-slate-400">CRITERION NAME</th>
                    <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.05em] text-slate-400">CATEGORY</th>
                    <th className="px-6 py-4 text-center text-[12px] font-bold uppercase tracking-[0.05em] text-slate-400">STATUS</th>
                    <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.05em] text-slate-400">RULE VS ACTUAL</th>
                    <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.05em] text-slate-400">REASONING</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {report.criteria_results.map((item, index) => (
                    <tr key={item.criterion_id} className={index % 2 === 1 ? "bg-slate-50/30 hover:bg-slate-50" : "hover:bg-slate-50"}>
                      <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.name}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{item.category}</td>
                      <td className="px-6 py-4 text-center">
                        <StatusBadge value={item.passed ? "Pass" : "Fail"} />
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-600">
                        <span className="block">Req: {item.operator} {String(item.expected)}</span>
                        <span className="block font-bold text-[#1b2b48]">Act: {String(item.actual)}</span>
                      </td>
                      <td className="max-w-xs px-6 py-4 text-xs text-slate-500">{item.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-[#1b2b48]">
              <span className="material-symbols-outlined">history_edu</span> Evaluation Log
            </h3>
            <div className="relative space-y-6 before:absolute before:bottom-2 before:left-3 before:top-2 before:w-px before:bg-slate-100 before:content-['']">
              {report.audit_trail.map((line, index) => (
                <div key={`${line}-${index}`} className="relative pl-8">
                  <div className="absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-emerald-100 shadow-sm">
                    <span className="material-symbols-outlined text-[10px] text-emerald-600" style={{ fontVariationSettings: '"FILL" 1' }}>
                      check
                    </span>
                  </div>
                  <div>
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.05em] text-slate-400">Step {index + 1}</span>
                    <p className="text-xs text-slate-500">{line}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-[#1b2b48] p-6 text-white">
            <div className="mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffdea7]">smart_toy</span>
              <h4 className="text-sm font-bold">AI Risk Assessment</h4>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-slate-300">
              {passed
                ? "While the vendor passed all mandatory checks, review residual commercial and supply-chain dependencies before award."
                : "Mandatory failures were detected. Review the failed clauses and confirm whether clarifications or human overrides are allowed."}
            </p>
            <button className="w-full rounded bg-white/10 py-2 text-xs font-bold hover:bg-white/20">Investigate Risk</button>
          </div>
        </div>
      </div>
    </div>
  )
}
