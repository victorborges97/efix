import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/app-layout";
import SuggestionsPage from "./pages/suggestions-page";
import DashboardPage from "./pages/dashboard-page";
import { ThemeProvider } from "./components/ui/theme-provider";

export function AppRoutes() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/suggestions" element={<SuggestionsPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
