import { Link, NavLink, useLocation } from "react-router-dom"

const items = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/upload", label: "Upload Tender", icon: "upload_file" },
  { to: "/criteria", label: "Criteria Review", icon: "fact_check" },
  { to: "/vendor", label: "Vendor Profiles", icon: "corporate_fare" },
  { to: "/report", label: "Evaluation Reports", icon: "analytics" },
]

const utilityItems = [
  { to: "/settings", label: "Settings", icon: "settings" },
  { to: "/support", label: "Support", icon: "help" },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white shadow-sm lg:flex">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1b2b48]">
            <span className="material-symbols-outlined text-white">corporate_fare</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#1b2b48]">AutoTender</h1>
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Procurement Oversight</p>
          </div>
        </div>
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-2">
        {items.map((item) => {
          const isActive =
            location.pathname === item.to ||
            (item.to !== "/dashboard" && location.pathname.startsWith(item.to))

          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 rounded-l-lg px-4 py-3 text-sm transition-all ${
                isActive
                  ? "border-r-4 border-[#1b2b48] bg-slate-50 font-bold text-[#1b2b48]"
                  : "font-medium text-slate-500 hover:bg-slate-50 hover:text-[#1b2b48]"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <Link
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1b2b48] px-4 py-3 text-sm font-bold text-white hover:opacity-90"
          to="/upload"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>New Evaluation</span>
        </Link>
        <div className="space-y-1">
          {utilityItems.map((item) => {
            const isActive = location.pathname === item.to

            return (
              <NavLink
                key={item.to}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm transition-all ${
                  isActive
                    ? "bg-slate-50 font-bold text-[#1b2b48]"
                    : "font-medium text-slate-500 hover:bg-slate-50 hover:text-[#1b2b48]"
                }`}
                to={item.to}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
