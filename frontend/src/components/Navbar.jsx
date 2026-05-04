export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Procurement Intelligence</p>
          <h2 className="text-xl font-bold text-primary">Tender Evaluation Workspace</h2>
        </div>
        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-success">
          Audit Ready
        </div>
      </div>
    </header>
  )
}
