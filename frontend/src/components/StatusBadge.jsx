export default function StatusBadge({ value }) {
  const normalized = String(value).toLowerCase()
  const styles =
    normalized === "pass" || normalized === "processed"
      ? "bg-emerald-100 text-success"
      : normalized === "fail"
        ? "bg-red-100 text-danger"
        : "bg-slate-100 text-slate-700"

  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles}`}>{value}</span>
}
