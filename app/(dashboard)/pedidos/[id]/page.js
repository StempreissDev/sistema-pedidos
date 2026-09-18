"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import { obtenerUrlFirmada } from "@/utils/fotos";
import EstadoBadge from "@/components/EstadoBadge";

export default function DetallePedido() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [fotoUrl, setFotoUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPedido = async () => {
      const { data, error } = await supabase
        .from("Pedidos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Error al obtener pedido:", error);
        setError("No se pudo encontrar el pedido.");
      } else {
        setPedido(data);
      }
    };

    obtenerPedido();
  }, [id]);

  useEffect(() => {
    if (!pedido?.foto_url) return;

    let activo = true;
    obtenerUrlFirmada(pedido.foto_url).then((url) => {
      if (activo) setFotoUrl(url);
    });

    return () => {
      activo = false;
    };
  }, [pedido?.foto_url]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 p-8">
      <Link
        href="/pedidos"
        className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        ← Volver a pedidos
      </Link>

      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

      {!error && !pedido && (
        <p className="text-neutral-500 dark:text-neutral-400">Cargando...</p>
      )}

      {pedido && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Pedido #{pedido.id}
          </h1>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400">
              Cliente
            </span>
            <span className="text-sm text-neutral-800 dark:text-neutral-200">
              {pedido.nombre_cliente}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400">
              Estatus
            </span>
            <EstadoBadge estatus={pedido.estatus} />
          </div>

          {pedido.foto_url && (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400">
                Foto
              </span>
              {fotoUrl ? (
                <img
                  src={fotoUrl}
                  alt={`Foto del pedido de ${pedido.nombre_cliente}`}
                  className="rounded-md border border-neutral-200 dark:border-neutral-800"
                />
              ) : (
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Cargando foto...
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
