"use client";

import { useState, useEffect } from "react";
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
    <div>
      <h1>Lista de Pedidos</h1>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
           {pedido.id} - {pedido.nombre_cliente} - {pedido.estatus}
          </li>
        ))}
      </ul>
    </div>
  );
}