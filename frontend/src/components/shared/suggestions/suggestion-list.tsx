import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Suggestion {
  id: string;
  errorCode: string;
  text: string;
}

export function SuggestionList() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    api
      .get("/suggestions")
      .then((res) => setSuggestions(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-4">
      {suggestions.map((s) => (
        <div key={s.id} className="border p-4 rounded-md shadow-sm">
          <p className="text-sm text-muted-foreground">Erro: {s.errorCode}</p>
          <p className="text-lg">{s.text}</p>
        </div>
      ))}
    </div>
  );
}
