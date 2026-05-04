import { NavLink } from "react-router-dom"

const items = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/upload", label: "Upload Tender" },
]

export default function Sidebar() {
  return (
    <aside className="hidden w-72 border-r border-slate-200 bg-primary px-6 py-8 text-white lg:block">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.35em] text-blue-200">Government AI Stack</p>
        <h1 className="mt-3 text-3xl font-extrabold">AutoTender</h1>
        <p className="mt-3 text-sm text-slate-300">
          Auditable AI-assisted tender screening for public procurement teams.
        </p>
      </div>
      <nav className="space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 text-sm font-semibold ${
                isActive ? "bg-white/15 text-white" : "text-slate-300 hover:bg-white/10"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-10 rounded-2xl bg-white/10 p-4">
        <p className="text-sm font-semibold">Decision Principles</p>
        <p className="mt-2 text-sm text-slate-300">Bias-free scoring, audit traceability, and consistent rule checks.</p>
      </div>
    </aside>
  )
}
