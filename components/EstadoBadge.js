import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ESTILOS = {
  pendiente: "bg-muted text-muted-foreground border-border",
  "en proceso":
    "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30",
  listo:
    "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30",
};

export default function EstadoBadge({ estatus }) {
  const clave = (estatus || "").toLowerCase();
  const estilo = ESTILOS[clave] ?? ESTILOS.pendiente;

  return (
    <Badge variant="outline" className={cn("capitalize", estilo)}>
      {estatus || "pendiente"}
    </Badge>
  );
}
