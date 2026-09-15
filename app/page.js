"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import EstadoBadge from "@/components/EstadoBadge";

export default function Home() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidosActivos, setPedidosActivos] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPanel = async () => {
      const { count: activos } = await supabase
        .from("Pedidos")
        .select("*", { count: "exact", head: true })
        .neq("estatus", "listo");

      const { data: recientes, error } = await supabase
        .from("Pedidos")
        .select("*")
        .order("id", { ascending: false })
        .limit(5);

      if (error) {
        console.log("Error al cargar pedidos recientes:", error);
      } else {
        setPedidos(recientes ?? []);
      }

      setPedidosActivos(activos ?? 0);
      setCargando(false);
    };

    cargarPanel();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Panel de pedidos
        </h1>
        <p className="text-sm text-muted-foreground">
          Resumen general de tu sistema de pedidos de lienzos fotográficos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Pedidos activos</CardDescription>
            <CardTitle className="text-3xl">{pedidosActivos}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Listos hoy</CardDescription>
            <CardTitle className="text-3xl">—</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Ingresos del mes</CardDescription>
            <CardTitle className="text-3xl">—</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pedidos recientes</CardTitle>
          <CardDescription>Últimos pedidos registrados.</CardDescription>
        </CardHeader>
        <CardContent>
          {cargando ? (
            <p className="text-sm text-muted-foreground">Cargando...</p>
          ) : pedidos.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No hay pedidos todavía.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {pedidos.map((pedido) => (
                <li key={pedido.id}>
                  <Link
                    href={`/pedidos/${pedido.id}`}
                    className="flex items-center justify-between gap-4 rounded-lg px-2 py-3 text-sm transition hover:bg-accent/50"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {pedido.nombre_cliente}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Pedido #{pedido.id} · {pedido.foto_url ? 1 : 0} foto(s)
                      </span>
                    </div>
                    <EstadoBadge estatus={pedido.estatus} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
