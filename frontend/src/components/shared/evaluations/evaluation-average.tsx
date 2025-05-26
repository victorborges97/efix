import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { api } from "@/lib/api";
import type { EvaluationProps } from "@/shared/dto/evaluation-props.dto";
import { useEffect, useState } from "react";

interface Props extends EvaluationProps {}

export function EvaluationAverage({ filter }: Props) {
  const [summary, setSummary] = useState({ total: 0, average: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params: any = {
        from: filter?.startDate,
        to: filter?.endDate,
      };
      const res = await api.get("/dashboard/summary", {
        params,
      });
      setSummary(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Avaliação Média Geral</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="bg-green-100 text-green-800 text-sm w-[120px] font-semibold px-3 py-1 rounded-full flex items-center gap-1">
          {loading
            ? "Carregando..."
            : (summary.average * 100).toFixed(0) + "% positiva"}
        </div>
        <Progress value={summary.average * 100} />
      </CardContent>
    </Card>
  );
}
