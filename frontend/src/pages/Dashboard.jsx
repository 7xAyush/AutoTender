import { useEffect, useState } from "react"
import api from "../api"
import StatCard from "../components/StatCard"
import StatusBadge from "../components/StatusBadge"

export default function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/dashboard/summary").then((response) => {
      setSummary(response.data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div className="panel p-6">Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total tenders uploaded" value={summary.total_tenders_uploaded} accent="bg-blue-100 text-accent" />
        <StatCard title="Total vendors evaluated" value={summary.total_vendors_evaluated} accent="bg-slate-100 text-slate-700" />
        <StatCard title="Passed vendors" value={summary.passed_vendors} accent="bg-emerald-100 text-success" />
        <StatCard title="Failed vendors" value={summary.failed_vendors} accent="bg-red-100 text-danger" />
      </section>

      <section className="panel overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-5">
          <h3 className="text-lg font-bold text-primary">Recent Evaluations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Tender</th>
                <th className="px-6 py-4 font-semibold">Vendor</th>
                <th className="px-6 py-4 font-semibold">Verdict</th>
                <th className="px-6 py-4 font-semibold">Confidence</th>
                <th className="px-6 py-4 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {summary.recent_evaluations.length === 0 ? (
                <tr>
                  <td className="px-6 py-6 text-slate-500" colSpan="5">
                    No evaluations yet. Upload a tender and submit a vendor profile to start.
                  </td>
                </tr>
              ) : (
                summary.recent_evaluations.map((item) => (
                  <tr key={item.report_id} className="border-t border-slate-100">
                    <td className="px-6 py-4 font-medium text-primary">{item.tender_title}</td>
                    <td className="px-6 py-4">{item.vendor_name}</td>
                    <td className="px-6 py-4">
                      <StatusBadge value={item.verdict} />
                    </td>
                    <td className="px-6 py-4">{Math.round(item.confidence_score * 100)}%</td>
                    <td className="px-6 py-4">{new Date(item.created_at).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
