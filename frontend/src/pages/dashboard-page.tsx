import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format, subDays } from "date-fns";
import {
  DateRangePicker,
  type DateRangeCustom,
} from "@/components/shared/date-range-picker";
import { api } from "@/lib/api";

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRangeCustom>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const [data, setData] = useState<
    {
      evaluation: boolean;
      id: number;
      errorCode: string;
      date: Date;
      clientCode: string;
      comment: string | null;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const from = dateRange.from!.toISOString();
        const to = dateRange.to!.toISOString();
        const res = await fetchEvaluationSummary(from, to);
        setData(res);
      } catch (err) {
        console.error("Erro ao buscar dados da API", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [dateRange]);

  async function fetchEvaluationSummary(from: string, to: string) {
    const res = await api.get("/evaluations", {
      params: { from, to },
    });
    return res.data;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      </div>

      {loading && <p className="text-muted-foreground">Carregando...</p>}

      {data && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Média geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{0} ⭐</div>
              <p className="text-sm text-muted-foreground">
                Todas as sugestões avaliadas
              </p>
            </CardContent>
          </Card>

          {data.map((sug) => (
            <Card key={sug.id}>
              <CardHeader>
                <CardTitle>{sug.errorCode}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">{sug.comment}</div>
                <div className="mt-2 text-2xl font-bold">{0} ⭐</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
