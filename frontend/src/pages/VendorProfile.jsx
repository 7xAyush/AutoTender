import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api"

const initialForm = {
  vendor_name: "",
  annual_turnover: 0,
  years_of_experience: 0,
  iso_certified: true,
  gst_registered: true,
  past_government_project_count: 0,
  technical_compliance_score: 75,
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
    <div className="ml-64 min-h-screen bg-background p-6">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6">
        <div className="col-span-12 mb-2">
          <h2 className="text-[32px] font-semibold tracking-[-0.01em] text-[#041632]">Vendor Profile & Submission</h2>
          <p className="text-base text-[#44474d]">Formalize vendor participation and technical compliance for Active Tenders.</p>
        </div>

        <div className="col-span-12 space-y-6 lg:col-span-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-[#041632]">
              <span className="material-symbols-outlined">assignment</span>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em]">ACTIVE TENDER SUMMARY</h3>
            </div>
            {tender ? (
              <div className="space-y-4">
                <div>
                  <p className="text-[12px] font-bold text-slate-400">TENDER ID</p>
                  <p className="text-base font-bold">{tender.id}</p>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-slate-400">PROJECT TITLE</p>
                  <p className="text-sm">{tender.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-[12px] font-bold text-slate-400">MIN. TURNOVER</p>
                    <p className="text-sm font-medium">{tender.criteria.find((item) => item.field === "annual_turnover")?.value || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-slate-400">EXP. REQ.</p>
                    <p className="text-sm font-medium">
                      {tender.criteria.find((item) => item.field === "years_of_experience")?.value || "N/A"} Years
                    </p>
                  </div>
                </div>
                <div>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-[12px] font-bold text-emerald-700">
                    Status: Open for Bids
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">Loading tender context...</p>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">PREVIOUS VENDORS</h3>
              <span className="material-symbols-outlined text-slate-400">search</span>
            </div>
            <div className="space-y-3">
              {[
                ["TI", "TechInfra Solutions", "Last Bid: Dec 2023"],
                ["BC", "BuildCorp Global", "Last Bid: Oct 2023"],
                ["NS", "NextSys Networks", "Last Bid: Jan 2024"],
              ].map(([abbr, name, meta]) => (
                <div key={name} className="group flex cursor-pointer items-center gap-4 rounded-lg border border-slate-100 p-3 hover:border-[#1b2b48] hover:bg-slate-50">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-100 font-bold text-[#041632]">{abbr}</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{name}</p>
                    <p className="text-xs text-slate-500">{meta}</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-[#041632]">arrow_forward</span>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full rounded-lg border border-[#1b2b48] py-2 text-sm font-bold text-[#1b2b48] hover:bg-[#1b2b48] hover:text-white">
              View Full Registry
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-[#1b2b48] p-6">
              <h3 className="text-lg font-bold text-white">New Vendor Submission Form</h3>
              <p className="text-sm text-slate-300">Ensure all fields are accurate for automated audit validation.</p>
            </div>
            <form className="space-y-8 p-6" onSubmit={handleSubmit}>
              <section>
                <h4 className="mb-4 border-b border-slate-100 pb-1 text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  IDENTITY & CONTACT
                </h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[12px] font-bold text-[#041632]">Vendor Name</label>
                    <input value={form.vendor_name} onChange={(e) => setForm({ ...form, vendor_name: e.target.value })} placeholder="Legal Entity Name" required />
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-bold text-[#041632]">Corporate Identification Number (CIN)</label>
                    <input placeholder="U00000XX0000PTC000000" />
                  </div>
                </div>
              </section>

              <section>
                <h4 className="mb-4 border-b border-slate-100 pb-1 text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  FINANCIAL & COMPLIANCE
                </h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[12px] font-bold text-[#041632]">Annual Turnover (INR Cr)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                      <input className="pl-8" type="number" value={form.annual_turnover} onChange={(e) => setForm({ ...form, annual_turnover: e.target.value })} placeholder="0.00" required />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-bold text-[#041632]">Years of Experience</label>
                    <input type="number" value={form.years_of_experience} onChange={(e) => setForm({ ...form, years_of_experience: e.target.value })} placeholder="Total years in industry" required />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-4">
                    <div>
                      <p className="text-sm font-bold">ISO Certification</p>
                      <p className="text-xs text-slate-500">Valid ISO 9001/27001 documents</p>
                    </div>
                    <div className="flex gap-2">
                      <button className={`rounded border px-4 py-1 text-[12px] ${!form.iso_certified ? "border-[#1b2b48] bg-[#1b2b48] text-white" : "border-slate-200 bg-white"}`} onClick={() => setForm({ ...form, iso_certified: false })} type="button">No</button>
                      <button className={`rounded border px-4 py-1 text-[12px] ${form.iso_certified ? "border-[#1b2b48] bg-[#1b2b48] text-white" : "border-slate-200 bg-white"}`} onClick={() => setForm({ ...form, iso_certified: true })} type="button">Yes</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-4">
                    <div>
                      <p className="text-sm font-bold">GST Registered</p>
                      <p className="text-xs text-slate-500">Active GSTIN status check</p>
                    </div>
                    <div className="flex gap-2">
                      <button className={`rounded border px-4 py-1 text-[12px] ${!form.gst_registered ? "border-[#1b2b48] bg-[#1b2b48] text-white" : "border-slate-200 bg-white"}`} onClick={() => setForm({ ...form, gst_registered: false })} type="button">No</button>
                      <button className={`rounded border px-4 py-1 text-[12px] ${form.gst_registered ? "border-[#1b2b48] bg-[#1b2b48] text-white" : "border-slate-200 bg-white"}`} onClick={() => setForm({ ...form, gst_registered: true })} type="button">Yes</button>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="mb-4 border-b border-slate-100 pb-1 text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  TRACK RECORD & SCORING
                </h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[12px] font-bold text-[#041632]">Past Gov Projects (Count)</label>
                    <input type="number" value={form.past_government_project_count} onChange={(e) => setForm({ ...form, past_government_project_count: e.target.value })} placeholder="Number of completed contracts" required />
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-bold text-[#041632]">Technical Compliance Score (0-100)</label>
                    <div className="flex items-center gap-4">
                      <input
                        className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-slate-200 p-0 accent-[#1b2b48]"
                        max="100"
                        min="0"
                        type="range"
                        value={form.technical_compliance_score}
                        onChange={(e) => setForm({ ...form, technical_compliance_score: e.target.value })}
                      />
                      <span className="w-12 text-center text-base font-bold text-[#1b2b48]">{form.technical_compliance_score}</span>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex items-center justify-end gap-4 pt-4">
                <button className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-[#1b2b48]" type="reset">
                  Discard
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-[#1b2b48] px-8 py-3 text-sm font-bold text-white shadow-md hover:opacity-90" disabled={loading} type="submit">
                  <span className="material-symbols-outlined text-sm">send</span>
                  {loading ? "Evaluating..." : "Submit Vendor for Evaluation"}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 flex gap-4 rounded-lg border border-[#d5e3fc] bg-[#d5e3fc]/30 p-4">
            <span className="material-symbols-outlined text-[#57657a]">info</span>
            <p className="text-sm text-[#57657a]">
              <strong>Evaluation Logic:</strong> Submitting this form will trigger a pre-qualification check. The
              Technical Compliance Score is weighted during final reporting.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
