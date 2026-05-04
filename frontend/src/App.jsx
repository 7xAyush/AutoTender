import { Route, Routes, useLocation } from "react-router-dom"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import UploadTender from "./pages/UploadTender"
import CriteriaReview from "./pages/CriteriaReview"
import VendorProfile from "./pages/VendorProfile"
import EvaluationReport from "./pages/EvaluationReport"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"

const appRoutes = ["/dashboard", "/upload", "/criteria", "/vendor", "/report"]

export default function App() {
  const location = useLocation()
  const showShell = appRoutes.some((route) => location.pathname.startsWith(route))

  if (!showShell) {
    return <Landing />
  }

  return (
    <div className="page-shell flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-4 md:p-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadTender />} />
            <Route path="/criteria/:tenderId" element={<CriteriaReview />} />
            <Route path="/vendor/:tenderId" element={<VendorProfile />} />
            <Route path="/report/:reportId" element={<EvaluationReport />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
