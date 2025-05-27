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
import type { Evaluation } from "@/shared/interfaces/evaluation";
import { format } from "date-fns";
import type { Paginated } from "@/shared/dto/paginated.dto";
import { Button } from "@/components/ui/button";
import type { EvaluationProps } from "@/shared/dto/evaluation-props.dto";
import { Utils } from "@/shared/utils";
import toast from "react-hot-toast";

interface Props extends EvaluationProps {}

export function EvaluationDetails({ filter }: Props) {
  const [page, setPage] = useState(1);
  const perPage = 10;

  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [meta, setMeta] = useState(defaultMeta);

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setMeta(defaultMeta);

      const params: any = {
        page,
        perPage,
        from: filter?.startDate,
        to: filter?.endDate,
      };

      const res = await api.get<Paginated<Evaluation>>("/evaluations", {
        params,
      });
      setEvaluations(res.data.data);
      setMeta(res.data.meta);
    } catch (error: any) {
      let errorApi = Utils.getErrorApi(
        error,
        "Ocorreu um erro ao buscar a Detalhamentos das Avaliações."
      );
      if (errorApi.toString().includes("Erro de conexão")) return;
      toast.error(errorApi);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhamentos das Avaliações</CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Data</TableHead>
              <TableHead className="w-[150px]">Cliente</TableHead>
              <TableHead>Comentário</TableHead>
              <TableHead className="text-center w-[180px]">Avaliação</TableHead>
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
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                </TableRow>
              ))
            ) : evaluations.length > 0 ? (
              evaluations.map((evalItem) => (
                <TableRow key={evalItem.id}>
                  <TableCell>
                    {format(evalItem.createdAt, "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{evalItem.clientCode}</TableCell>
                  <TableCell>{evalItem.comment}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        evalItem.evaluation
                          ? "bg-green-100 text-green-800 font-semibold"
                          : "bg-red-100 text-red-700 font-semibold"
                      }
                    >
                      {evalItem.evaluation ? "Positiva" : "Negativa"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  Nenhuma avaliação encontrada.
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
              disabled={page === 1 || meta.totalPages === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              disabled={meta.totalPages <= 0 || page === meta.totalPages}
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
