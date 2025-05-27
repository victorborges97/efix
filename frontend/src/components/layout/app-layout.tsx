import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";
import { Toaster } from "react-hot-toast";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-4">
        <Outlet />
      </main>
      <Toaster
        toastOptions={{
          success: {
            className: "!bg-green-100 !text-green-800",
          },
          error: {
            className: "!bg-red-100 !text-red-800",
          },
        }}
      />
    </div>
  );
}
