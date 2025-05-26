import { useState } from "react";
import { endOfDay, format, parseISO, startOfDay, subDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EvaluationDetails } from "@/components/shared/evaluations/evaluation-detail";
import { EvaluationDialog } from "@/components/shared/evaluations/evaluation-dialog";
import { EvaluationPerSuggestion } from "@/components/shared/evaluations/evaluation-per-suggestion";
import { EvaluationAverage } from "@/components/shared/evaluations/evaluation-average";
import { TitlePage } from "@/components/shared/title-page";

export default function DashboardPage() {
  const [refresh, setRefresh] = useState(false);

  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 15),
    to: new Date(),
  });

  return (
    <div className="space-y-6">
      <div className="flex md:justify-between md:flex-row flex-col md:items-center">
        <TitlePage>Dashboard de Avaliações</TitlePage>

        <div className="flex flex-col md:flex-row mt-4 md:mt-0 md:justify-end md:items-end gap-4">
          <div className="flex gap-2 md:min-w-[289px] flex-wrap">
            <div className="flex-1 md:max-w-40">
              <label className="block text-sm font-medium mb-1">
                Data Inicial
              </label>
              <Input
                className="bg-gray-50"
                type="date"
                value={format(dateRange.from!, "yyyy-MM-dd")}
                max={
                  dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined
                }
                onChange={(e) => {
                  setDateRange((old) => ({
                    to: old.to,
                    from: parseISO(e.target.value),
                  }));
                }}
              />
            </div>

            <div className="flex-1 md:max-w-40">
              <label className="block text-sm font-medium mb-1">
                Data Final
              </label>
              <Input
                type="date"
                className="bg-gray-50"
                value={format(dateRange.to!, "yyyy-MM-dd")}
                min={
                  dateRange.from
                    ? format(dateRange.from, "yyyy-MM-dd")
                    : undefined
                }
                onChange={(e) =>
                  setDateRange((old) => ({
                    from: old.from,
                    to: parseISO(e.target.value),
                  }))
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                setRefresh(!refresh);
              }}
              className="flex-1 md:flex-[0] bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              Filtrar
            </Button>
            <EvaluationDialog onSuccess={() => setRefresh(!refresh)} />
          </div>
        </div>
      </div>

      <EvaluationAverage
        key={String(refresh) + "evaluation_average"}
        filter={{
          startDate: startOfDay(dateRange.from!).toISOString(),
          endDate: endOfDay(dateRange.to!).toISOString(),
        }}
      />

      <EvaluationPerSuggestion
        key={String(refresh) + "evaluation_per_suggestion"}
        filter={{
          startDate: startOfDay(dateRange.from!).toISOString(),
          endDate: endOfDay(dateRange.to!).toISOString(),
        }}
      />

      <EvaluationDetails
        key={String(refresh) + "evaluation_details"}
        filter={{
          startDate: startOfDay(dateRange.from!).toISOString(),
          endDate: endOfDay(dateRange.to!).toISOString(),
        }}
      />
    </div>
  );
}
