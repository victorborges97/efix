import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

const schema = z.object({
  errorCode: z.string().length(6, "Código deve ter 6 dígitos"),
  clientCode: z.string().length(6, "Código do cliente deve ter 6 dígitos"),
  comment: z
    .string()
    .max(200, "Máximo de 200 caracteres")
    .nonempty("Comentário é obrigatório"),
  evaluation: z.boolean({ message: "Avaliação é obrigatório" }),
});

type FormValues = z.infer<typeof schema>;

export function EvaluationDialog({ onSuccess }: { onSuccess: () => void }) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selected, setSelected] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      await api.post("/evaluations", data);
      reset();
      onSuccess();
      closeRef.current?.click();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 md:flex-[0] bg-emerald-600 hover:bg-emerald-700 cursor-pointer">
          Avaliar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Avaliação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="errorCode">Código do Erro</Label>
            <Input
              className="mt-1.5"
              disabled={isSubmitting}
              id="errorCode"
              {...register("errorCode")}
            />
            {errors.errorCode && (
              <p className="text-red-500 text-sm">{errors.errorCode.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="clientCode">Código do Cliente</Label>
            <Input
              className="mt-1.5"
              disabled={isSubmitting}
              id="clientCode"
              {...register("clientCode")}
            />
            {errors.clientCode && (
              <p className="text-red-500 text-sm">
                {errors.clientCode.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="comment">Comentário</Label>
            <textarea
              className={cn(
                "mt-1.5 !h-[50px]",
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              )}
              disabled={isSubmitting}
              maxLength={200}
              id="comment"
              {...register("comment")}
            />
            <div className="text-sm text-right text-gray-500">
              {watch("comment")?.length ?? 0}/200
            </div>
            {errors.comment && (
              <p className="text-red-500 text-sm">{errors.comment.message}</p>
            )}
          </div>
          <div>
            <Label>Avaliação</Label>
            <div className="flex gap-4 mt-1.5">
              <Button
                type="button"
                variant={selected === true ? "default" : "outline"}
                className={`flex-1 ${
                  selected === true
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "cursor-pointer"
                }`}
                disabled={isSubmitting}
                onClick={() => {
                  if (selected === true) return;
                  setSelected(true);
                  setValue("evaluation", true, { shouldValidate: true });
                }}
              >
                ✅ Positiva
              </Button>
              <Button
                type="button"
                variant={selected === false ? "default" : "outline"}
                className={`flex-1 ${
                  selected === false
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "cursor-pointer"
                }`}
                disabled={isSubmitting}
                onClick={() => {
                  if (selected === false) return;
                  setSelected(false);
                  setValue("evaluation", false, { shouldValidate: true });
                }}
              >
                ❌ Negativa
              </Button>
            </div>

            {errors.evaluation && (
              <p className="text-red-500 text-sm">
                {errors.evaluation.message}
              </p>
            )}
          </div>
          <DialogClose asChild>
            <button type="button" ref={closeRef} className="hidden" />
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
