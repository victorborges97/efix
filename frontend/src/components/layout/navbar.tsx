import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/suggestions", label: "Sugestões" },
  ];

  return (
    <header className="w-full border-b bg-white px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="text-lg font-bold text-primary">
          eFix
        </Link>
        <nav className="flex gap-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "py-2 px-3 rounded-md hover:bg-gray-200",
                location.pathname === item.path && "bg-gray-200 font-semibold"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div></div>
      </div>
    </header>
  );
}
