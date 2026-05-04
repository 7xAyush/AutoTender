export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 ml-64 flex h-16 w-[calc(100%-16rem)] items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md">
      <div className="flex flex-1 items-center gap-8">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            className="w-full rounded-lg border-none bg-slate-50 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#d7e2ff]"
            placeholder="Search tenders, vendors, or compliance IDs..."
            type="text"
          />
        </div>
        <nav className="hidden items-center gap-6 lg:flex">
          <a className="text-sm font-medium text-slate-500 transition-colors hover:text-[#1b2b48]" href="#">
            Directives
          </a>
          <a className="text-sm font-medium text-slate-500 transition-colors hover:text-[#1b2b48]" href="#">
            Audit Logs
          </a>
          <a className="text-sm font-medium text-slate-500 transition-colors hover:text-[#1b2b48]" href="#">
            Compliance
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-5">
        <button className="rounded-lg bg-[#1b2b48] px-4 py-2 text-xs font-bold text-white hover:opacity-90">
          Run AI Analysis
        </button>
        <div className="flex items-center gap-3 border-l border-slate-200 pl-5 text-slate-500">
          <span className="material-symbols-outlined cursor-pointer hover:text-[#1b2b48]">notifications</span>
          <span className="material-symbols-outlined cursor-pointer hover:text-[#1b2b48]">history</span>
          <div className="h-8 w-8 overflow-hidden rounded-full border border-slate-300 bg-slate-200">
            <img
              alt="Administrator Profile"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSH54EaenIFvxUO9uSBW7fKGOXhj-UXK34T90Fn-3gY-Huoyrnrd1ExvFtHPFdwShZj-QjFe9kRgt-V4hpdyvXws4qpiZ7C_ehgKNNWMONyZAzxFazgZxoPWSStMJBkNrHZwIxNDtyPDpl4CcpecI2kx652-9JRfisnW66XqKwQSzmqmCMRlImfuhZO7eC_cqhXi2mMb-t8XKsVgNgkeg0Z76s2jrE2MOnVVtnX3VPeiNwqhzozgYIy3g76sXor4d55Fl7kpyixCMG"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
