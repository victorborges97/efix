import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-4">
        <Outlet />
      </main>
    </div>
  );
}
