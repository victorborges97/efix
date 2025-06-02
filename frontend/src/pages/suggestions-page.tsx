import { useEffect, useState } from "react";
import { SuggestionDialog } from "@/components/shared/suggestions/suggestion-dialog";
import { TitlePage } from "@/components/shared/title-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import type { Paginated } from "@/shared/dto/paginated.dto";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Utils } from "@/shared/utils";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { useSocket } from "@/shared/hooks/use-socket";

type SuggestionDTO = {
  id: number;
  errorCode: string;
  text: string;
  totalEvaluations: number;
  averageEvaluation: number | null;
};

export default function SuggestionsPage() {
  useSocket<any>("suggestion:created", (_) => {
    setPage(1);
    fetchData(false);
  });

  const [errorCode, setErrorCode] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const [data, setData] = useState<SuggestionDTO[]>([]);
  const [meta, setMeta] = useState({
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchData = async (hasLoading = true) => {
    const params: any = { page, perPage };
    if (errorCode.length === 6) params.errorCode = errorCode;

    try {
      if (hasLoading) setLoading(true);
      // const res = await api.get<SuggestionDTO[]>("/suggestions", {
      const res = await api.get<Paginated<SuggestionDTO>>("/suggestions", {
        params,
      });
      setData(res.data.data);
      setMeta(res.data.meta);
    } catch (error: any) {
      let errorApi = Utils.getErrorApi(
        error,
        "Ocorreu um erro ao buscar a Sugestões."
      );
      toast.error(errorApi);
    } finally {
      if (hasLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, !refresh]);

  return (
    <div className="space-y-6">
      <div className="flex md:justify-between md:flex-row flex-col md:items-center">
        <TitlePage>Sugestões</TitlePage>

        <div className="flex flex-col md:flex-row mt-4 md:mt-0 md:justify-end md:items-end gap-4">
          <div className="flex-1 md:max-w-40">
            <Label>Código de Error</Label>
            <Input
              placeholder="Filtrar por código de erro"
              value={errorCode}
              onChange={(e) => setErrorCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="max-w-xl bg-white"
              onKeyDown={(key) => {
                if (["enter", "Enter"].includes(key.code)) {
                  setRefresh(!refresh);
                  (key.target as HTMLElement).blur(); // remove o foco do input
                }
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                setRefresh(!refresh);
              }}
              className="flex-1 md:flex-[0] dark:text-gray-50 bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              Filtrar
            </Button>
            <SuggestionDialog onSuccess={() => setRefresh(!refresh)} />
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Código</TableHead>
                <TableHead>Texto</TableHead>
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
                      <Skeleton className="h-4 w-[80%]" />
                    </TableCell>
                  </TableRow>
                ))
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    Nenhuma sugestão encontrada
                  </TableCell>
                </TableRow>
              ) : (
                data.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.errorCode}</TableCell>
                    <TableCell>{s.text}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="flex w-full justify-between items-center">
            <span className="text-xs text-muted-foreground">
              Página {meta.page}-{meta.totalPages} de {meta.total} itens
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
    </div>
  );
}
