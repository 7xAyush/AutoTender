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
    return <div className="panel p-6">Loading evaluation report...</div>
  }

  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Eligibility Verdict</p>
            <h2 className="mt-2 text-3xl font-extrabold text-primary">{report.verdict}</h2>
            <p className="mt-2 text-sm text-slate-500">{report.summary_reason}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-slate-50 px-5 py-4 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Confidence</p>
              <p className="mt-2 text-3xl font-extrabold text-primary">{Math.round(report.confidence_score * 100)}%</p>
            </div>
            <StatusBadge value={report.verdict} />
          </div>
        </div>
      </section>

      <section className="panel overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-5">
          <h3 className="text-lg font-bold text-primary">Criteria-wise Match</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Criterion</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Mandatory</th>
                <th className="px-6 py-4 font-semibold">Actual</th>
                <th className="px-6 py-4 font-semibold">Expected</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Reason</th>
              </tr>
            </thead>
            <tbody>
              {report.criteria_results.map((item) => (
                <tr key={item.criterion_id} className="border-t border-slate-100">
                  <td className="px-6 py-4 font-medium text-primary">{item.name}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.mandatory ? "Mandatory" : "Optional"}</td>
                  <td className="px-6 py-4">{String(item.actual)}</td>
                  <td className="px-6 py-4">{item.operator} {String(item.expected)}</td>
                  <td className="px-6 py-4">
                    <StatusBadge value={item.passed ? "Pass" : "Fail"} />
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="panel p-6">
          <h3 className="text-lg font-bold text-primary">Decision Reason</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">{report.summary_reason}</p>
        </div>
        <div className="panel p-6">
          <h3 className="text-lg font-bold text-primary">Audit Trail</h3>
          <div className="mt-4 space-y-3">
            {report.audit_trail.map((line, index) => (
              <div key={`${line}-${index}`} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                {line}
              </div>
            ))}
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={downloadReport}
        className="rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
      >
        Download Report as JSON
      </button>
    </div>
  )
}
