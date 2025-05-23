import { SuggestionDialog } from "@/components/suggestions/suggestion-dialog";
import { SuggestionList } from "@/components/suggestions/suggestion-list";
import { useState } from "react";

export default function SuggestionsPage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sugestões de Erro</h1>
        <SuggestionDialog onSuccess={() => setRefresh(!refresh)} />
      </div>
      <SuggestionList key={String(refresh)} />
    </div>
  );
}
