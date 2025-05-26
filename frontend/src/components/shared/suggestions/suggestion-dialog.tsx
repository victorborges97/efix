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
import { useRef } from "react";

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

  const closeRef = useRef<HTMLButtonElement | null>(null);

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data);
      await api.post("/suggestions", data);
      reset();
      onSuccess();
      closeRef.current?.click();
    } catch (error: any) {
      if (error?.response?.data) {
        console.error(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 md:flex-[0] bg-emerald-600 hover:bg-emerald-700 cursor-pointer">
          Nova
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova sugestão</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="errorCode">Código do erro</Label>
            <Input id="errorCode" {...register("errorCode")} />
            {errors.errorCode && (
              <p className="text-sm text-red-500">{errors.errorCode.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="text">Sugestão</Label>
            <Input id="text" {...register("text")} />
            {errors.text && (
              <p className="text-sm text-red-500">{errors.text.message}</p>
            )}
          </div>
          <DialogClose asChild>
            <button type="button" ref={closeRef} className="hidden" />
          </DialogClose>
          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
