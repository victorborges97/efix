import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { Utils } from "@/shared/utils";
import toast from "react-hot-toast";
import { ButtonSubmit } from "../submit-save";

const schema = z.object({
  errorCode: z
    .string()
    .min(6, "O código deve conter 6 dígitos")
    .max(6, "O código deve conter 6 dígitos"),
  text: z.string().min(1, "A sugestão é obrigatória"),
});

type FormValues = z.infer<typeof schema>;

export function SuggestionDialog({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const closeRef = useRef<HTMLButtonElement | null>(null);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      await api.post("/suggestions", data);
      reset();
      onSuccess();
      toast.success("Sugestão salva com sucesso!");
      closeRef.current?.click();
    } catch (error: any) {
      let errorApi = Utils.getErrorApi(
        error,
        "Não foi possível cadastrar a nova sugestão. Tente novamente mais tarde."
      );
      toast.error(errorApi);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="flex-1 md:flex-[0] dark:text-gray-50 bg-emerald-600 hover:bg-emerald-700 cursor-pointer">
          Nova
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova sugestão</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-2 sm:grid-cols-4"
        >
          <div className="col-span-1">
            <Label htmlFor="errorCode">Código do erro</Label>
            <Input
              id="errorCode"
              maxLength={6}
              disabled={loading}
              {...register("errorCode")}
            />
            {errors.errorCode && (
              <p className="text-sm text-red-500">{errors.errorCode.message}</p>
            )}
          </div>

          <div className="col-span-1 md:col-span-3">
            <Label htmlFor="text">Sugestão</Label>
            <Input disabled={loading} id="text" {...register("text")} />
            {errors.text && (
              <p className="text-sm text-red-500">{errors.text.message}</p>
            )}
          </div>

          <div className="col-span-1 sm:col-span-4">
            <DialogClose asChild>
              <button type="button" ref={closeRef} className="hidden" />
            </DialogClose>

            <ButtonSubmit isSubmitting={loading} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
