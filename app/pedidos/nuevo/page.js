"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";

export default function NuevoPedido() {
  const [nombreCliente, setNombreCliente] = useState("");
  const [foto, setFoto] = useState(null);
  const [previsualizacion, setPrevisualizacion] = useState(null);

  const manejarCambioFoto = (e) => {
    const archivoSeleccionado = e.target.files[0];
    setFoto(archivoSeleccionado);
    setPrevisualizacion(URL.createObjectURL(archivoSeleccionado));
  };

  const manejarEnvio = async () => {
    if (nombreCliente.trim() && foto != null) {
      const nombreArchivo = `${Date.now()}-${foto.name}`;

      const { error: errorSubida } = await supabase.storage
        .from("fotos-pedidos")
        .upload(nombreArchivo, foto);

      if (errorSubida) {
        console.log("Error al subir la foto:", errorSubida);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("fotos-pedidos")
        .getPublicUrl(nombreArchivo);

      const { data, error } = await supabase
        .from("Pedidos")
        .insert({
          nombre_cliente: nombreCliente,
          foto_url: urlData.publicUrl,
        });

      if (error) {
        console.log("Error al guardar:", error);
      } else {
        console.log("Pedido guardado:", data);
      }
    } else {
      console.log("Datos incompletos");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Nuevo Pedido
      </h1>

      <input
        type="text"
        placeholder="Nombre del cliente"
        value={nombreCliente}
        onChange={(e) => setNombreCliente(e.target.value)}
        className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100"
      />

      <input
        type="file"
        accept="image/*"
        onChange={manejarCambioFoto}
        className="text-sm text-neutral-600 file:mr-4 file:rounded-md file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-neutral-700 dark:text-neutral-400 dark:file:bg-white dark:file:text-neutral-900"
      />

      {previsualizacion && (
        <img
          src={previsualizacion}
          alt="Previsualización"
          width="200"
          className="rounded-md border border-neutral-200 dark:border-neutral-800"
        />
      )}

      <button
        onClick={manejarEnvio}
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Crear pedido
      </button>
    </div>
  );
}