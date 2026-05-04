export default function StatCard({ title, value, accent }) {
  return (
    <div className="panel p-5">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <div className="mt-4 flex items-end justify-between">
        <h3 className="text-3xl font-extrabold text-primary">{value}</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${accent}`}>Live</span>
      </div>
    </div>
  )
}
