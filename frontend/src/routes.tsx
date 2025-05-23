import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/app-layout";
import SuggestionsPage from "./pages/suggestions-page";
import DashboardPage from "./pages/dashboard-page";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/suggestions" element={<SuggestionsPage />} />
      </Route>
    </Routes>
  );
}
