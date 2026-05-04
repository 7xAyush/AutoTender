import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"
import StatusBadge from "../components/StatusBadge"

export default function UploadTender() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: "", department: "", file: null })
  const [criteria, setCriteria] = useState([])
  const [tenderId, setTenderId] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
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
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="panel p-6">
        <h2 className="text-2xl font-bold text-primary">Upload Tender</h2>
        <p className="mt-2 text-sm text-slate-500">Submit the tender document and metadata for mock AI extraction.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">Tender Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">Department</label>
            <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">Tender File</label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })} required />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-70"
          >
            {loading ? "Processing..." : "Process Tender"}
          </button>
        </form>
      </section>

      <section className="panel p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-primary">Extracted Criteria</h3>
            <p className="mt-1 text-sm text-slate-500">Mock OCR/NLP output with editable machine-readable rules.</p>
          </div>
          {tenderId && <StatusBadge value="Processed" />}
        </div>
        <div className="mt-5 space-y-4">
          {criteria.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
              Upload a tender to preview extracted eligibility criteria.
            </div>
          ) : (
            criteria.map((criterion) => (
              <div key={criterion.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-primary">{criterion.name}</h4>
                    <p className="mt-1 text-sm text-slate-500">{criterion.extracted_text}</p>
                  </div>
                  <StatusBadge value={criterion.mandatory ? "Mandatory" : "Optional"} />
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>{criterion.category}</span>
                  <span>Rule: {criterion.operator} {String(criterion.value)} {criterion.unit || ""}</span>
                  <span>Confidence: {Math.round(criterion.confidence * 100)}%</span>
                </div>
              </div>
            ))
          )}
        </div>
        {tenderId && (
          <button
            type="button"
            onClick={() => navigate(`/criteria/${tenderId}`)}
            className="mt-6 w-full rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            Review Criteria
          </button>
        )}
      </section>
    </div>
  )
}
