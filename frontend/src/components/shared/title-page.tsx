import type React from "react";

export function TitlePage({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-xl md:text-2xl font-bold text-zinc-800">{children}</h1>
  );
}
