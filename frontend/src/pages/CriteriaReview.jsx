import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api"

export default function CriteriaReview() {
  const { tenderId } = useParams()
  const navigate = useNavigate()
  const [tender, setTender] = useState(null)
  const [criteria, setCriteria] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [savingId, setSavingId] = useState(null)

  useEffect(() => {
    api.get(`/tenders/${tenderId}`).then((response) => {
      setTender(response.data)
      setCriteria(response.data.criteria)
      setSelectedId(response.data.criteria[0]?.id ?? null)
    })
  }, [tenderId])

  const selected = useMemo(() => criteria.find((item) => item.id === selectedId) || null, [criteria, selectedId])

  const updateLocal = (id, key, value) => {
    setCriteria((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)))
  }

  const saveCriterion = async (criterion) => {
    setSavingId(criterion.id)
    const payload = {
      ...criterion,
      mandatory: Boolean(criterion.mandatory),
      confidence: Number(criterion.confidence),
      value:
        criterion.rule_type === "boolean"
          ? criterion.value === true || criterion.value === "true"
          : Number.isNaN(Number(criterion.value))
            ? criterion.value
            : Number(criterion.value),
    }
    const response = await api.put(`/criteria/${criterion.id}`, payload)
    setCriteria((prev) => prev.map((item) => (item.id === criterion.id ? response.data : item)))
    setSelectedId(criterion.id)
    setSavingId(null)
  }

  return (
    <div className="ml-64 min-h-screen bg-[#f8fafc] p-6">
      <div className="mx-auto mb-6 max-w-[1440px]">
        <div className="flex items-end justify-between">
          <div>
            <nav className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
              <span>Active Tenders</span>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <span className="text-slate-600">{tender?.title || "Smart City Phase II"}</span>
            </nav>
            <h2 className="text-[32px] font-semibold tracking-[-0.01em] text-[#1b2b48]">
              {tender?.title || "Smart City Phase II"}
            </h2>
            <div className="mt-2 flex items-center gap-4">
              <span className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                <span className="material-symbols-outlined text-[14px]">pending_actions</span>
                NEEDS REVIEW
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <span className="material-symbols-outlined text-[14px]">description</span>
                Document ID: RFP-2024-089-SC
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
              Approve All
            </button>
            <button
              className="flex items-center gap-2 rounded-lg bg-[#1b2b48] px-4 py-2 text-sm font-bold text-white"
              onClick={() => navigate(`/vendor/${tenderId}`)}
              type="button"
            >
              Continue to Evaluation
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6 items-start">
        <div className="col-span-8 space-y-4">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">Extracted Criteria Table</h3>
              <div className="flex gap-2">
                <button className="p-1 text-slate-400 hover:text-[#1b2b48]">
                  <span className="material-symbols-outlined text-base">filter_list</span>
                </button>
                <button className="p-1 text-slate-400 hover:text-[#1b2b48]">
                  <span className="material-symbols-outlined text-base">download</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
                    <th className="px-4 py-4 font-semibold">NAME</th>
                    <th className="px-4 py-4 font-semibold">CATEGORY</th>
                    <th className="px-4 py-4 font-semibold">MANDATORY</th>
                    <th className="px-4 py-4 font-semibold">EXTRACTED RULE</th>
                    <th className="px-4 py-4 font-semibold">CONFIDENCE</th>
                    <th className="px-4 py-4 font-semibold" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {criteria.map((criterion) => {
                    const confidence = Math.round(Number(criterion.confidence) * 100)
                    const lowConfidence = confidence < 70
                    return (
                      <tr
                        key={criterion.id}
                        className={`cursor-pointer transition-colors hover:bg-slate-50 ${
                          selectedId === criterion.id ? "bg-slate-50" : ""
                        } ${lowConfidence ? "border-l-4 border-amber-400 bg-amber-50/30" : ""}`}
                        onClick={() => setSelectedId(criterion.id)}
                      >
                        <td className="px-4 py-4 font-medium text-[#1b2b48]">{criterion.name}</td>
                        <td className="px-4 py-4">
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-700">
                            {criterion.category}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className={`relative flex h-5 w-10 items-center rounded-full px-1 ${criterion.mandatory ? "bg-[#1b2b48]" : "bg-slate-300"}`}>
                            <div className={`h-3.5 w-3.5 rounded-full bg-white ${criterion.mandatory ? "ml-auto" : ""}`} />
                          </div>
                        </td>
                        <td className={`px-4 py-4 font-mono text-xs ${lowConfidence ? "bg-amber-100/50 text-amber-700" : "bg-slate-50/50 text-slate-600"}`}>
                          {criterion.operator} {String(criterion.value)} {criterion.unit || ""}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-12 overflow-hidden rounded-full bg-slate-200">
                              <div
                                className={`h-full ${lowConfidence ? "bg-amber-500" : "bg-emerald-500"}`}
                                style={{ width: `${confidence}%` }}
                              />
                            </div>
                            <span className={`text-xs font-bold ${lowConfidence ? "text-amber-600" : "text-emerald-600"}`}>
                              {confidence}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button className={lowConfidence ? "text-amber-600" : "text-slate-400 hover:text-[#1b2b48]"}>
                            <span className="material-symbols-outlined">
                              {lowConfidence ? "warning" : "edit_square"}
                            </span>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-1 text-[12px] font-semibold text-slate-500">Total Criteria</p>
              <h4 className="text-2xl font-bold text-[#1b2b48]">{criteria.length}</h4>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-1 text-[12px] font-semibold text-slate-500">Low Confidence</p>
              <h4 className="text-2xl font-bold text-amber-600">{criteria.filter((item) => item.confidence < 0.7).length}</h4>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-1 text-[12px] font-semibold text-slate-500">Mandatory Items</p>
              <h4 className="text-2xl font-bold text-[#1b2b48]">{criteria.filter((item) => item.mandatory).length}</h4>
            </div>
          </div>
        </div>

        <div className="col-span-4 sticky top-24 space-y-6">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1b2b48]">edit_note</span>
                <h3 className="font-bold text-[#1b2b48]">Edit Criterion</h3>
              </div>
              <button className="text-slate-400 hover:text-[#ba1a1a]">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {selected ? (
              <div className="space-y-6 p-6">
                <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined mt-0.5 text-sm text-amber-600">psychology</span>
                    <div>
                      <p className="text-xs font-bold text-amber-800">AI Reasoning</p>
                      <p className="text-xs leading-relaxed text-amber-700">
                        Extracted from the source clause with confidence {Math.round(Number(selected.confidence) * 100)}%.
                        Human verification recommended.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Criterion Name</label>
                    <input value={selected.name} onChange={(e) => updateLocal(selected.id, "name", e.target.value)} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Category</label>
                      <select value={selected.category} onChange={(e) => updateLocal(selected.id, "category", e.target.value)}>
                        {["Technical", "Financial", "Compliance", "Experience", "Certification"].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Rule Type</label>
                      <select value={selected.rule_type} onChange={(e) => updateLocal(selected.id, "rule_type", e.target.value)}>
                        {["range", "boolean", "set", "score_threshold"].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <div>
                      <p className="text-sm font-bold text-[#1b2b48]">Mandatory Toggle</p>
                      <p className="text-[10px] text-slate-500">Bidders must meet this to qualify</p>
                    </div>
                    <button
                      className={`relative flex h-6 w-12 items-center rounded-full px-1 ${selected.mandatory ? "bg-[#1b2b48]" : "bg-slate-300"}`}
                      onClick={() => updateLocal(selected.id, "mandatory", !selected.mandatory)}
                      type="button"
                    >
                      <div className={`h-4 w-4 rounded-full bg-white ${selected.mandatory ? "ml-auto" : ""}`} />
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Rule Definition</label>
                    <div className="mb-2 flex items-center gap-2">
                      <input className="w-24" value={selected.operator || ""} onChange={(e) => updateLocal(selected.id, "operator", e.target.value)} />
                      <input className="flex-1" value={selected.value} onChange={(e) => updateLocal(selected.id, "value", e.target.value)} />
                      <input className="w-16" value={selected.unit || ""} onChange={(e) => updateLocal(selected.id, "unit", e.target.value)} />
                    </div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Confidence</label>
                    <input
                      max="1"
                      min="0"
                      step="0.01"
                      type="number"
                      value={selected.confidence}
                      onChange={(e) => updateLocal(selected.id, "confidence", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    className="flex-1 rounded-lg bg-[#1b2b48] py-3 text-sm font-bold text-white shadow-lg shadow-slate-200"
                    onClick={() => saveCriterion(selected)}
                    type="button"
                  >
                    {savingId === selected.id ? "Saving..." : "Save Criterion"}
                  </button>
                  <button
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                    onClick={() => setSelectedId(criteria[0]?.id ?? null)}
                    type="button"
                  >
                    Reset
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-sm text-slate-500">Select a criterion to edit.</div>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Document Source</h4>
              <button className="text-xs font-bold text-[#1b2b48]">Open PDF</button>
            </div>
            <div className="group relative">
              <img
                className="h-40 w-full rounded-lg border border-slate-100 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3wQtwmtD44-Mit4L_FGd3HxKYHMfVejJgdxcZr-0LNC_RQ2PrD9UXq2VYoSt4LHCBG_2mPs_I6l2UWBTALt08rBR5MowNBQ2pjZKzMrTCHyTPoLb10_bCWNjiLbJ9JaI7vN6d1yeYdfQNTdVUn5Zy-PUDuRFmvBIz-BeiQtI-uRPOEorHL69RkwLp7Jk6I6WhhWa3Udh41bvZUfnae2GEGe5h1Llm9-T_NKtInKz_7WTxfB26neGA_NVmIXmK6Jw_WREDIcQXqHVW"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#1b2b48]/10 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold shadow-sm">View Clause 4.2.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
