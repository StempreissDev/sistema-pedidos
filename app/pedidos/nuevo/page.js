"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";

export default function NuevoPedido() {
  const [nombreCliente, setNombreCliente] = useState("");
  const [foto, setFoto] = useState(null);
  const [previsualizacion, setPrevisualizacion] = useState(null);

const manejarEnvio = async () => {
  if (nombreCliente.trim() && foto != null) {
    const { data, error } = await supabase
      .from("Pedidos")
      .insert({ nombre_cliente: nombreCliente });

    if (error) {
      console.log("Error al guardar:", error);
    } else {
      console.log("Pedido guardado:", data);
    }
  } else {
    console.log("Datos incompletos");
  }
};

   const manejarCambioFoto = (e) => {
    const archivoSeleccionado = e.target.files[0];
    setFoto(archivoSeleccionado);
    setPrevisualizacion(URL.createObjectURL(archivoSeleccionado));
  };

  return (
    <div>
      <h1>Nuevo Pedido</h1>

      <input
        type="text"
        placeholder="Nombre del cliente"
        value={nombreCliente}
        onChange={(e) => setNombreCliente(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={manejarCambioFoto}
      />

      {previsualizacion && (
        <img src={previsualizacion} alt="Previsualización" width="200" />
      )}


      <button onClick={manejarEnvio}>Crear pedido</button>
    </div>
  );
}