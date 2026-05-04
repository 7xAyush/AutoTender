import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api"

export default function CriteriaReview() {
  const { tenderId } = useParams()
  const navigate = useNavigate()
  const [criteria, setCriteria] = useState([])
  const [savingId, setSavingId] = useState(null)

  useEffect(() => {
    api.get(`/tenders/${tenderId}`).then((response) => setCriteria(response.data.criteria))
  }, [tenderId])

  const updateLocal = (id, key, value) => {
    setCriteria((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)))
  }

  const saveCriterion = async (criterion) => {
    setSavingId(criterion.id)
    const payload = {
      ...criterion,
      mandatory: criterion.mandatory === true || criterion.mandatory === "true",
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
    setSavingId(null)
  }

  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary">Criteria Review</h2>
            <p className="mt-2 text-sm text-slate-500">Review and edit extracted clauses before running vendor evaluation.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/vendor/${tenderId}`)}
            className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
          >
            Continue to Vendor Evaluation
          </button>
        </div>
      </section>

      <section className="panel overflow-x-auto">
        <table className="min-w-[1100px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-4 font-semibold">Criterion Name</th>
              <th className="px-4 py-4 font-semibold">Category</th>
              <th className="px-4 py-4 font-semibold">Mandatory</th>
              <th className="px-4 py-4 font-semibold">Rule Type</th>
              <th className="px-4 py-4 font-semibold">Operator</th>
              <th className="px-4 py-4 font-semibold">Value</th>
              <th className="px-4 py-4 font-semibold">Confidence</th>
              <th className="px-4 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((criterion) => (
              <tr key={criterion.id} className="border-t border-slate-100 align-top">
                <td className="px-4 py-4">
                  <input value={criterion.name} onChange={(e) => updateLocal(criterion.id, "name", e.target.value)} />
                </td>
                <td className="px-4 py-4">
                  <select value={criterion.category} onChange={(e) => updateLocal(criterion.id, "category", e.target.value)}>
                    {["Financial", "Technical", "Certification", "Experience"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-4">
                  <select
                    value={String(criterion.mandatory)}
                    onChange={(e) => updateLocal(criterion.id, "mandatory", e.target.value === "true")}
                  >
                    <option value="true">Mandatory</option>
                    <option value="false">Optional</option>
                  </select>
                </td>
                <td className="px-4 py-4">
                  <select value={criterion.rule_type} onChange={(e) => updateLocal(criterion.id, "rule_type", e.target.value)}>
                    {["range", "boolean", "set", "score_threshold"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-4">
                  <input value={criterion.operator || ""} onChange={(e) => updateLocal(criterion.id, "operator", e.target.value)} />
                </td>
                <td className="px-4 py-4">
                  <input value={criterion.value} onChange={(e) => updateLocal(criterion.id, "value", e.target.value)} />
                </td>
                <td className="px-4 py-4">
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={criterion.confidence}
                    onChange={(e) => updateLocal(criterion.id, "confidence", e.target.value)}
                  />
                </td>
                <td className="px-4 py-4">
                  <button
                    type="button"
                    onClick={() => saveCriterion(criterion)}
                    className="rounded-xl bg-accent px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                  >
                    {savingId === criterion.id ? "Saving..." : "Save"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
