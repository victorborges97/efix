import { Link, useLocation } from "react-router-dom";
import { Menu, LayoutDashboard, Lightbulb } from "lucide-react";
import { Button } from "../ui/button";
import {
  SheetContent,
  SheetTrigger,
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";

export function Navbar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Sugestões", href: "/suggestions", icon: Lightbulb },
  ];
  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="border-b px-6 py-3 flex items-center justify-between bg-white">
      <Link to="/" className="text-2xl font-bold text-black">
        eFix
      </Link>
      <div className="hidden md:flex space-x-4">
        {links.map(({ name, href, icon: Icon }) => (
          <Link key={href} to={href}>
            <Button
              className="cursor-pointer"
              variant={isActive(href) ? "secondary" : "ghost"}
            >
              <Icon className="mr-2 h-4 w-4" />
              {name}
            </Button>
          </Link>
        ))}
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] p-4">
            <SheetTitle>Menu</SheetTitle>
            <SheetHeader className="hidden">
              <SheetDescription>description goes here</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col space-y-2">
              {links.map(({ name, href, icon: Icon }) => (
                <Link key={href} to={href}>
                  <Button
                    variant={isActive(href) ? "secondary" : "ghost"}
                    className="w-full justify-start cursor-pointer"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {name}
                  </Button>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
