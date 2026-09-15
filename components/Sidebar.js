"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { ClipboardList, Users, Settings, Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Pedidos", href: "/pedidos", icon: ClipboardList },
  { label: "Clientes", href: null, icon: Users },
  { label: "Ajustes", href: null, icon: Settings },
];

export default function Sidebar() {
  const [abierto, setAbierto] = useState(true);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex">
      <aside
        aria-hidden={!abierto}
        className={cn(
          "flex flex-col gap-1 overflow-hidden border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
          abierto ? "w-56 p-4" : "w-0 border-transparent p-0"
        )}
      >
        <div className="mb-2 whitespace-nowrap px-3 text-xs font-semibold uppercase text-muted-foreground">
          Menú
        </div>

        <nav className="flex flex-col gap-1">
          {items.map(({ label, href, icon: Icon }) => {
            const activo = href && pathname.startsWith(href);

            if (!href) {
              return (
                <span
                  key={label}
                  title="Próximamente"
                  className="flex cursor-not-allowed items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground/50"
                >
                  <Icon className="size-4" />
                  {label}
                </span>
              );
            }

            return (
              <Link
                key={label}
                href={href}
                tabIndex={abierto ? 0 : -1}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  activo
                    ? "bg-accent text-accent-foreground"
                    : "text-sidebar-foreground"
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          tabIndex={abierto ? 0 : -1}
          className="mt-auto flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Sun className="size-4 dark:hidden" />
          <Moon className="hidden size-4 dark:block" />
          <span className="dark:hidden">Modo oscuro</span>
          <span className="hidden dark:inline">Modo claro</span>
        </button>
      </aside>

      <button
        onClick={() => setAbierto(!abierto)}
        aria-label={abierto ? "Ocultar menú" : "Mostrar menú"}
        className="m-2 flex h-fit items-center justify-center rounded-lg border border-border p-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
      >
        {abierto ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>
    </div>
  );
}
