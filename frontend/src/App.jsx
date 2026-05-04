import { useEffect, useState } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import UploadTender from "./pages/UploadTender"
import CriteriaReview from "./pages/CriteriaReview"
import VendorProfile from "./pages/VendorProfile"
import EvaluationReport from "./pages/EvaluationReport"
import Settings from "./pages/Settings"
import Support from "./pages/Support"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import api from "./api"

const appRoutes = ["/dashboard", "/upload", "/criteria", "/vendor", "/report", "/settings", "/support"]

function LatestTenderRedirect({ target }) {
  const [state, setState] = useState({ loading: true, tenderId: null })

  useEffect(() => {
    api
      .get("/tenders")
      .then((response) => {
        setState({
          loading: false,
          tenderId: response.data[0]?.id ?? null,
        })
      })
      .catch(() => {
        setState({ loading: false, tenderId: null })
      })
  }, [])

  if (state.loading) {
    return <div className="ml-64 p-8 text-sm text-slate-500">Loading latest tender...</div>
  }

  if (!state.tenderId) {
    return (
      <div className="ml-64 p-8 text-sm text-slate-500">
        No tender found yet. Upload a tender first from `/upload`.
      </div>
    )
  }

  return <Navigate replace to={`/${target}/${state.tenderId}`} />
}

function LatestReportRedirect() {
  const [state, setState] = useState({ loading: true, reportId: null })

  useEffect(() => {
    api
      .get("/dashboard/summary")
      .then((response) => {
        setState({
          loading: false,
          reportId: response.data.recent_evaluations?.[0]?.report_id ?? null,
        })
      })
      .catch(() => {
        setState({ loading: false, reportId: null })
      })
  }, [])

  if (state.loading) {
    return <div className="ml-64 p-8 text-sm text-slate-500">Loading latest report...</div>
  }

  if (!state.reportId) {
    return (
      <div className="ml-64 p-8 text-sm text-slate-500">
        No evaluation report found yet. Complete a vendor evaluation first.
      </div>
    )
  }

  return <Navigate replace to={`/report/${state.reportId}`} />
}

export default function App() {
  const location = useLocation()
  const showShell = appRoutes.some((route) => location.pathname.startsWith(route))

  if (!showShell) {
    return <Landing />
  }

  return (
    <div className="app-shell min-h-screen">
      <Sidebar />
      <div className="min-h-screen">
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadTender />} />
            <Route path="/criteria" element={<LatestTenderRedirect target="criteria" />} />
            <Route path="/criteria/:tenderId" element={<CriteriaReview />} />
            <Route path="/vendor" element={<LatestTenderRedirect target="vendor" />} />
            <Route path="/vendor/:tenderId" element={<VendorProfile />} />
            <Route path="/report" element={<LatestReportRedirect />} />
            <Route path="/report/:reportId" element={<EvaluationReport />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
