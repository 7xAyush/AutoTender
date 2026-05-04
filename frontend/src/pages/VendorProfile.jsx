import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api"

const initialForm = {
  vendor_name: "",
  annual_turnover: 0,
  years_of_experience: 0,
  iso_certified: false,
  gst_registered: false,
  past_government_project_count: 0,
  technical_compliance_score: 0,
}

export default function VendorProfile() {
  const { tenderId } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [tender, setTender] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get(`/tenders/${tenderId}`).then((response) => setTender(response.data))
  }, [tenderId])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const vendorResponse = await api.post("/vendors", {
      ...form,
      annual_turnover: Number(form.annual_turnover),
      years_of_experience: Number(form.years_of_experience),
      past_government_project_count: Number(form.past_government_project_count),
      technical_compliance_score: Number(form.technical_compliance_score),
    })
    const reportResponse = await api.post("/evaluate", {
      tender_id: Number(tenderId),
      vendor_id: vendorResponse.data.id,
    })
    setLoading(false)
    navigate(`/report/${reportResponse.data.id}`)
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <section className="panel p-6">
        <h2 className="text-2xl font-bold text-primary">Tender Context</h2>
        {tender ? (
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-primary">{tender.title}</p>
              <p>{tender.department}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Active Criteria</p>
              <p className="mt-2 text-sm">{tender.criteria.length} extracted clauses ready for evaluation.</p>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-500">Loading tender details...</p>
        )}
      </section>

      <section className="panel p-6">
        <h2 className="text-2xl font-bold text-primary">Vendor Profile</h2>
        <p className="mt-2 text-sm text-slate-500">Capture vendor capability, compliance, and experience data.</p>
        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-600">Vendor Name</label>
            <input value={form.vendor_name} onChange={(e) => setForm({ ...form, vendor_name: e.target.value })} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">Annual Turnover</label>
            <input type="number" value={form.annual_turnover} onChange={(e) => setForm({ ...form, annual_turnover: e.target.value })} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">Years of Experience</label>
            <input type="number" value={form.years_of_experience} onChange={(e) => setForm({ ...form, years_of_experience: e.target.value })} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">ISO Certified</label>
            <select value={String(form.iso_certified)} onChange={(e) => setForm({ ...form, iso_certified: e.target.value === "true" })}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">GST Registered</label>
            <select value={String(form.gst_registered)} onChange={(e) => setForm({ ...form, gst_registered: e.target.value === "true" })}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">Past Government Project Count</label>
            <input
              type="number"
              value={form.past_government_project_count}
              onChange={(e) => setForm({ ...form, past_government_project_count: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">Technical Compliance Score</label>
            <input
              type="number"
              value={form.technical_compliance_score}
              onChange={(e) => setForm({ ...form, technical_compliance_score: e.target.value })}
              required
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-70"
            >
              {loading ? "Evaluating..." : "Submit Vendor for Evaluation"}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
