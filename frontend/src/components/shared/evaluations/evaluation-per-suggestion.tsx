import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import type { Paginated } from "@/shared/dto/paginated.dto";
import { Button } from "@/components/ui/button";
import type { EvaluationPerSuggestion } from "@/shared/interfaces/evaluation-per-suggestion";
import { Utils } from "@/shared/utils";
import toast from "react-hot-toast";
import { useSocket } from "@/shared/hooks/use-socket";

export function EvaluationPerSuggestion({
  filter,
}: {
  filter?: { startDate?: string; endDate?: string };
}) {
  useSocket<any>("suggestion:created", (_) => {
    fetchData(false);
  });

  const [page, setPage] = useState(1);
  const perPage = 10;

  const [suggestions, setSuggestions] = useState<EvaluationPerSuggestion[]>([]);
  const [meta, setMeta] = useState(defaultMeta);

  const [loading, setLoading] = useState(true);

  const fetchData = async (hasLoading = true) => {
    try {
      if (hasLoading) setLoading(true);
      setMeta(defaultMeta);

      const params: any = {
        page,
        perPage,
        from: filter?.startDate,
        to: filter?.endDate,
      };

      const res = await api.get<Paginated<EvaluationPerSuggestion>>(
        "/dashboard/details",
        {
          params,
        }
      );
      setSuggestions(res.data.data);
      setMeta(res.data.meta);
    } catch (error: any) {
      let errorApi = Utils.getErrorApi(
        error,
        "Ocorreu um erro ao buscar a Avaliação por Sugestão."
      );
      if (errorApi.toString().includes("Erro de conexão")) return;
      toast.error(errorApi);
    } finally {
      if (hasLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Avaliação por Sugestão</CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Código do Erro</TableHead>
              <TableHead>Sugestão</TableHead>
              <TableHead className="text-center w-[180px]">Média</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                </TableRow>
              ))
            ) : suggestions.length > 0 ? (
              suggestions.map((sug) => (
                <TableRow key={sug.suggestion.id}>
                  <TableCell>{sug.suggestion.errorCode}</TableCell>
                  <TableCell>{sug.suggestion.text}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        sug.averageEvaluation >= 0.7 ? "default" : "secondary"
                      }
                      className={
                        sug.averageEvaluation >= 0.7
                          ? "bg-green-100 text-green-800 font-semibold"
                          : "bg-red-100 text-red-700 font-semibold"
                      }
                    >
                      {(sug.averageEvaluation * 100).toFixed(0)}% positiva
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6">
                  Nenhuma sugestão avaliada ainda.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex w-full justify-between items-center">
          <span className="text-xs text-muted-foreground flex-1">
            Página {meta.page} de {meta.totalPages}
          </span>
          <div className="space-x-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              disabled={page === meta.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Próxima
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const defaultMeta = {
  page: 1,
  perPage: 10,
  total: 0,
  totalPages: 1,
};
