import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../api"
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
    return <div className="ml-64 p-8 text-sm text-slate-500">Loading dashboard...</div>
  }

  const ratioBase = Math.max(summary.passed_vendors + summary.failed_vendors, 1)
  const passRatio = Math.round((summary.passed_vendors / ratioBase) * 100)

  const cards = [
    {
      label: "Total Tenders",
      icon: "inventory_2",
      value: summary.total_tenders_uploaded,
      accent: "text-[#041632]",
      iconWrap: "bg-slate-50 text-[#041632]",
      foot: "+12% from last month",
      footIcon: "trending_up",
      footStyle: "text-emerald-600 font-bold",
    },
    {
      label: "Total Vendors",
      icon: "group",
      value: summary.total_vendors_evaluated,
      accent: "text-[#041632]",
      iconWrap: "bg-slate-50 text-[#041632]",
      foot: "Verified in current fiscal year",
      footStyle: "text-slate-400",
    },
    {
      label: "Passed",
      icon: "check_circle",
      value: summary.passed_vendors,
      accent: "text-emerald-600",
      iconWrap: "bg-emerald-50 text-emerald-600",
      foot: `${passRatio}% success rate`,
      footStyle: "text-emerald-600 font-bold",
    },
    {
      label: "Failed",
      icon: "cancel",
      value: summary.failed_vendors,
      accent: "text-[#ba1a1a]",
      iconWrap: "bg-[#ffdad6] text-[#ba1a1a]",
      foot: "Requires manual audit",
      footStyle: "text-[#ba1a1a] font-bold",
    },
  ]

  return (
    <div className="ml-64 min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] p-8">
        <div className="mb-12">
          <h2 className="text-[32px] font-semibold tracking-[-0.01em] text-[#041632]">Operational Dashboard</h2>
          <p className="text-base text-[#515f74]">Overview of current procurement pipelines and AI-driven compliance checks.</p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <span className="text-[12px] font-bold uppercase tracking-[0.05em] text-slate-500">{card.label}</span>
                <span className={`material-symbols-outlined rounded-lg p-2 ${card.iconWrap}`}>{card.icon}</span>
              </div>
              <div className="mt-4">
                <h3 className={`text-[40px] font-bold tracking-[-0.02em] ${card.accent}`}>{card.value}</h3>
                <p className={`mt-2 flex items-center gap-1 text-xs ${card.footStyle}`}>
                  {card.footIcon ? <span className="material-symbols-outlined text-[14px]">{card.footIcon}</span> : null}
                  {card.foot}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h4 className="text-[24px] font-semibold text-[#041632]">Weekly Processing Trend</h4>
              <div className="flex gap-2">
                <button className="rounded-lg bg-slate-100 px-4 py-1 text-xs font-bold text-slate-600">7 Days</button>
                <button className="px-4 py-1 text-xs font-medium text-slate-400">30 Days</button>
              </div>
            </div>
            <div className="relative flex h-64 w-full items-end gap-6 overflow-hidden rounded-lg bg-slate-50 px-4 pb-4">
              {[40, 55, 45, 70, 85, 60, 95].map((height, index) => (
                <div
                  key={`${height}-${index}`}
                  className={`flex-1 rounded-t-sm ${index === 6 ? "bg-[#1b2b48]" : "bg-[#1b2b48]"}`}
                  style={{ height: `${height}%`, opacity: index === 6 ? 1 : 0.2 + index * 0.1 }}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-between px-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <span key={day} className="text-xs text-slate-400">
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="mb-4 text-[24px] font-semibold text-[#041632]">Quick Actions</h4>
              <div className="space-y-3">
                <Link
                  className="group flex w-full items-center justify-between rounded-lg border border-slate-100 p-4 text-left hover:bg-slate-50"
                  to="/upload"
                >
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#041632]">upload_file</span>
                    <span className="text-sm font-semibold text-slate-700">Upload New Tender</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-[#041632]">chevron_right</span>
                </Link>
                <div className="group flex items-center justify-between rounded-lg border border-slate-100 p-4 hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#041632]">person_add</span>
                    <span className="text-sm font-semibold text-slate-700">Add Vendor Profile</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-[#041632]">chevron_right</span>
                </div>
                <div className="group flex items-center justify-between rounded-lg border border-slate-100 p-4 hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#041632]">rule</span>
                    <span className="text-sm font-semibold text-slate-700">Review Pending Criteria</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-[#041632]">chevron_right</span>
                </div>
              </div>
            </div>

            <div className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-[12px] font-bold uppercase tracking-[0.05em] text-slate-500">Pass vs Fail Ratio</h4>
                <span className="material-symbols-outlined text-slate-300">pie_chart</span>
              </div>
              <div className="flex items-center justify-center py-4">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-8 border-emerald-500">
                  <div className="absolute inset-0 -rotate-45 rounded-full border-8 border-[#ba1a1a] border-t-transparent" />
                  <span className="text-lg font-bold text-[#041632]">{passRatio}%</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-slate-500">Passed ({summary.passed_vendors})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#ba1a1a]" />
                  <span className="text-slate-500">Failed ({summary.failed_vendors})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <div>
              <h4 className="text-[24px] font-semibold text-[#041632]">Recent Evaluations</h4>
              <p className="text-sm text-slate-500">Showing the last 5 automated tender reviews.</p>
            </div>
            <button className="flex items-center gap-1 text-sm font-bold text-[#041632] hover:underline">
              View All Records <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[12px] uppercase tracking-[0.05em] text-slate-500">
                <tr>
                  <th className="border-b border-slate-200 px-6 py-4">Tender Title</th>
                  <th className="border-b border-slate-200 px-6 py-4">Vendor Name</th>
                  <th className="border-b border-slate-200 px-6 py-4">Verdict</th>
                  <th className="border-b border-slate-200 px-6 py-4 text-center">Confidence</th>
                  <th className="border-b border-slate-200 px-6 py-4">Date/Time</th>
                  <th className="border-b border-slate-200 px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {summary.recent_evaluations.length === 0 ? (
                  <tr>
                    <td className="px-6 py-8 text-slate-500" colSpan="6">
                      No evaluations yet. Upload a tender and evaluate a vendor to populate this dashboard.
                    </td>
                  </tr>
                ) : (
                  summary.recent_evaluations.slice(0, 5).map((item, index) => (
                    <tr key={item.report_id} className={index % 2 === 0 ? "" : "bg-slate-50"}>
                      <td className="border-b border-slate-100 px-6 py-4 font-medium">{item.tender_title}</td>
                      <td className="border-b border-slate-100 px-6 py-4 text-slate-500">{item.vendor_name}</td>
                      <td className="border-b border-slate-100 px-6 py-4">
                        <StatusBadge value={item.verdict} />
                      </td>
                      <td className="border-b border-slate-100 px-6 py-4 text-center font-mono">
                        {Math.round(item.confidence_score * 100)}%
                      </td>
                      <td className="border-b border-slate-100 px-6 py-4 text-slate-500">
                        {new Date(item.created_at).toLocaleString()}
                      </td>
                      <td className="border-b border-slate-100 px-6 py-4 text-right">
                        <Link className="font-bold text-[#1b2b48] hover:text-[#4f5e7e]" to={`/report/${item.report_id}`}>
                          View Report
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="p-8 text-center text-[10px] uppercase tracking-[0.25em] text-slate-400">
          AutoTender v2.4.1 — Governmental Procurement Compliance Framework
        </footer>
      </div>
    </div>
  )
}
