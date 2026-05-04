export default function StatusBadge({ value }) {
  const normalized = String(value).toLowerCase()
  const styles =
    normalized === "pass" || normalized === "processed"
      ? "bg-emerald-100 text-success"
      : normalized === "fail"
        ? "bg-red-100 text-danger"
        : normalized === "mandatory"
          ? "bg-[#d5e3fc] text-primary"
          : normalized === "optional"
            ? "bg-slate-100 text-slate-600"
        : "bg-slate-100 text-slate-700"

  return <span className={`status-pill ${styles}`}>{value}</span>
}
