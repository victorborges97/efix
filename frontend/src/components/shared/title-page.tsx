import type React from "react";

export function TitlePage({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl font-bold text-gray-800">{children}</h1>;
}
