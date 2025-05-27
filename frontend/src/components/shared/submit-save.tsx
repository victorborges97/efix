import { Loader, Save } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  isSubmitting: boolean;
  label?: string;
  labelLoading?: string;
  className?: string;
};
export function ButtonSubmit(props: Props) {
  const {
    isSubmitting,
    label = "Salvar",
    labelLoading = "Salvando...",
    className,
  } = props;
  return (
    <Button
      type="submit"
      className={cn(
        "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer",
        className
      )}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader className="animate-spin h-4 w-4" />
          {labelLoading}
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
}
