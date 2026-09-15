"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";


export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const obtenerPedidos = async () => {
      const { data, error } = await supabase
        .from("Pedidos")
        .select("*");

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
        <ul className="flex flex-col divide-y divide-neutral-200 rounded-md border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
          {pedidos.map((pedido) => (
            <li
              key={pedido.id}
              className="flex items-center justify-between px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200"
            >
              <span>
                #{pedido.id} — {pedido.nombre_cliente}
              </span>
              <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                {pedido.estatus}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}