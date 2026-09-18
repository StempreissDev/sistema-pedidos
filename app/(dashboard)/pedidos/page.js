"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import EstadoBadge from "@/components/EstadoBadge";


export default function Pedidos() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const obtenerPedidos = async () => {
      const { data, error } = await supabase
        .from("Pedidos")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.log("Error al obtener pedidos:", error);
      } else {
        setPedidos(data);
      }
    };

    obtenerPedidos();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Lista de Pedidos
        </h1>
        <Link href="/pedidos/nuevo">
          <button className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">
            Nuevo pedido
          </button>
        </Link>
      </div>

      {pedidos.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">
          No hay pedidos todavía.
        </p>
      ) : (
        <table className="w-full table-auto border-collapse overflow-hidden rounded-md border border-neutral-200 text-sm dark:border-neutral-800">
          <thead>
            <tr className="bg-neutral-100 dark:bg-neutral-900">
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                Número de orden
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                Nombre
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                Estatus
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {pedidos.map((pedido) => (
              <tr
                key={pedido.id}
                onClick={() => router.push(`/pedidos/${pedido.id}`)}
                className="cursor-pointer text-neutral-800 transition hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-900"
              >
                <td className="px-4 py-3">#{pedido.id}</td>
                <td className="px-4 py-3">{pedido.nombre_cliente}</td>
                <td className="px-4 py-3">
                  <EstadoBadge estatus={pedido.estatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}