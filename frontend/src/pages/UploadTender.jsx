import { useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"

export default function UploadTender() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({ title: "", department: "", reference: "", file: null })
  const [criteria, setCriteria] = useState([])
  const [tenderId, setTenderId] = useState(null)
  const [loading, setLoading] = useState(false)

  const stats = useMemo(() => {
    const mandatory = criteria.filter((item) => item.mandatory).length
    const optional = criteria.length - mandatory
    const confidence = criteria.length
      ? Math.round((criteria.reduce((sum, item) => sum + item.confidence, 0) / criteria.length) * 100)
      : 0

    return { mandatory, optional, confidence }
  }, [criteria])

  const handleSubmit = async (event) => {
    event?.preventDefault()
    if (!form.file) return

    const payload = new FormData()
    payload.append("title", form.title)
    payload.append("department", form.department)
    payload.append("file", form.file)

    setLoading(true)
    const response = await api.post("/upload-tender", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    setCriteria(response.data.extracted_criteria)
    setTenderId(response.data.tender.id)
    setLoading(false)
  }

  return (
    <div className="ml-64 max-w-[1440px] p-6">
      <section className="mb-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="mb-1 text-[32px] font-semibold tracking-[-0.01em] text-[#041632]">Upload New Tender</h2>
            <p className="max-w-2xl text-base leading-[1.6] text-[#44474d]">
              Upload institutional procurement documents for automated extraction of compliance criteria, technical
              requirements, and financial mandates.
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-400 lg:flex">
            <span className="material-symbols-outlined text-sm">security</span>
            SECURE ENCRYPTED CHANNEL
          </div>
        </div>
      </section>

      <div className="mb-12 grid grid-cols-12 gap-6">
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
          <div className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 flex items-center gap-2 text-base font-semibold text-[#041632]">
              <span className="material-symbols-outlined text-[#041632]">description</span>
              Tender Metadata
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1 block text-[12px] font-medium text-[#44474d]">Tender Title</label>
                <input
                  placeholder="e.g. Smart City Infrastructure Phase IV"
                  required
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-medium text-[#44474d]">Issuing Department</label>
                <input
                  placeholder="Ministry of Urban Development"
                  required
                  type="text"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-medium text-[#44474d]">Reference Number (Optional)</label>
                <input
                  placeholder="REF/2024/098/B"
                  type="text"
                  value={form.reference}
                  onChange={(e) => setForm({ ...form, reference: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-medium text-[#44474d]">Tender File</label>
                <input
                  accept=".pdf,.doc,.docx"
                  required
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })}
                />
                {form.file ? <p className="mt-2 text-xs text-slate-500">Selected: {form.file.name}</p> : null}
              </div>
              <button
                className="w-full rounded-lg bg-[#1b2b48] px-4 py-3 text-sm font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading || !form.title || !form.department || !form.file}
                type="submit"
              >
                {loading ? "Scanning..." : "Start AI Scan"}
              </button>
            </form>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="group relative flex min-h-[340px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-white p-12 text-center transition-colors hover:border-[#1b2b48]">
            <div className="absolute inset-0 bg-slate-50/30 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="material-symbols-outlined mb-4 text-6xl text-slate-300 transition-all group-hover:text-[#1b2b48]">
              cloud_upload
            </span>
            <h3 className="mb-1 text-lg font-semibold text-[#041632]">Drag & Drop Tender Documents</h3>
            <p className="mb-6 max-w-sm text-sm text-slate-500">
              Support for PDF, DOCX, and high-res scanned images up to 100MB. Multi-file upload supported for
              annexures.
            </p>
            <button
              className="rounded-lg bg-[#efedf0] px-6 py-3 text-sm font-bold text-[#041632] hover:bg-slate-200"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              Select Files from Computer
            </button>
            <div className="mt-8 flex flex-wrap gap-4">
              {["OCR Active", "Multi-language", "Clause Detection"].map((item) => (
                <div key={item} className="flex items-center gap-1 text-[10px] text-slate-400">
                  <span className="material-symbols-outlined text-sm">check_circle</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <section className="mb-12 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="animate-spin text-[#1b2b48]">
                <span className="material-symbols-outlined">sync</span>
              </div>
              <div>
                <h4 className="text-[12px] font-bold uppercase tracking-[0.05em] text-[#041632]">
                  ANALYZING: {form.file?.name || "Tender Document"}
                </h4>
                <p className="text-[10px] text-slate-500">Estimating 45 seconds remaining...</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-[#041632]">72%</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-100" />
            <div className="absolute left-0 top-1/2 h-0.5 w-[72%] -translate-y-1/2 bg-[#1b2b48]" />
            <div className="relative flex justify-between">
              {[
                ["done", "Uploaded", true],
                ["done", "OCR", true],
                ["psychology", "Clause Extraction", true],
                ["rule", "Rules Generated", false],
              ].map(([icon, label, active]) => (
                <div key={label} className="flex flex-col items-center gap-2 bg-white">
                  <div
                    className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white ${
                      active ? "bg-[#1b2b48] text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <span className={`material-symbols-outlined text-sm ${label === "Clause Extraction" ? "animate-pulse" : ""}`}>
                      {icon}
                    </span>
                  </div>
                  <span className={`text-[12px] font-medium ${active ? "text-[#041632]" : "text-slate-400"}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {criteria.length > 0 ? (
        <>
          <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              ["format_list_bulleted", "Analysis Complete", criteria.length, "Criteria Found", "text-[#1b2b48]"],
              ["priority_high", "Action Required", stats.mandatory, "Mandatory Clauses", "text-[#ba1a1a]"],
              ["info", "Review Suggested", stats.optional, "Optional Clauses", "text-[#515f74]"],
              ["verified", "High Reliability", `${stats.confidence}%`, "Extraction Confidence", "text-emerald-600"],
            ].map(([icon, meta, value, label, iconColor]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
                  <span className="text-[10px] font-bold uppercase text-slate-400">{meta}</span>
                </div>
                <p className="text-3xl font-bold text-[#041632]">{value}</p>
                <h5 className="text-[12px] font-medium text-slate-500">{label}</h5>
              </div>
            ))}
          </section>

          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 p-6">
              <h3 className="text-base font-semibold text-[#041632]">Extracted Clauses & AI Rules</h3>
              <div className="flex gap-2">
                <button className="rounded border border-slate-200 bg-white px-3 py-1 text-xs font-bold hover:bg-slate-50">
                  Export Map
                </button>
                <button className="rounded bg-[#1b2b48] px-3 py-1 text-xs font-bold text-white hover:opacity-90">
                  Verify All
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                    <th className="p-4 text-[10px] font-bold">Source Text Snippet</th>
                    <th className="p-4 text-[10px] font-bold">AI Extracted Rule</th>
                    <th className="p-4 text-[10px] font-bold">Category</th>
                    <th className="p-4 text-[10px] font-bold">Confidence</th>
                    <th className="p-4 text-right text-[10px] font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {criteria.map((criterion) => {
                    const confidence = Math.round(criterion.confidence * 100)
                    return (
                      <tr key={criterion.id} className="transition-colors hover:bg-slate-50">
                        <td className="w-1/3 p-4">
                          <p className="rounded border-l-2 border-slate-300 bg-slate-50 p-2 text-xs italic text-slate-500">
                            {criterion.extracted_text}
                          </p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-[#041632]">settings_suggest</span>
                            <span className="text-sm font-bold text-[#1b2b48]">
                              {criterion.name}: {criterion.operator} {String(criterion.value)} {criterion.unit || ""}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase text-slate-600">
                            {criterion.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                              <div className="h-full bg-emerald-500" style={{ width: `${confidence}%` }} />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-600">{confidence}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-slate-400 hover:text-[#041632]">
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="border-t border-slate-200 bg-slate-50/30 p-4 text-center">
              <button
                className="flex items-center gap-1 text-xs font-bold text-[#1b2b48] mx-auto hover:underline"
                onClick={() => navigate(`/criteria/${tenderId}`)}
                type="button"
              >
                Save & Proceed to Criterion Logic <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
            </div>
          </section>
        </>
      ) : null}
    </div>
  )
}
