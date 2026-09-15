"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";

export default function NuevoPedido() {
  const [nombreCliente, setNombreCliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [foto, setFoto] = useState(null);
  const [previsualizacion, setPrevisualizacion] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!error) return;
    const temporizador = setTimeout(() => setError(null), 4000);
    return () => clearTimeout(temporizador);
  }, [error]);

  const manejarCambioFoto = (e) => {
    const archivoSeleccionado = e.target.files[0];
    setFoto(archivoSeleccionado);
    setPrevisualizacion(URL.createObjectURL(archivoSeleccionado));
  };

  const manejarEnvio = async () => {
    const camposFaltantes = [];
    if (!nombreCliente.trim()) camposFaltantes.push("Nombre del cliente");
    if (!telefono.trim()) camposFaltantes.push("Teléfono");
    if (foto == null) camposFaltantes.push("Foto");

    if (camposFaltantes.length > 0) {
      setError(`Falta completar: ${camposFaltantes.join(", ")}`);
      return;
    }

    const nombreArchivo = `${Date.now()}-${foto.name}`;

    const { error: errorSubida } = await supabase.storage
      .from("fotos-pedidos")
      .upload(nombreArchivo, foto);

    if (errorSubida) {
      console.log("Error al subir la foto:", errorSubida);
      setError("No se pudo subir la foto. Intenta de nuevo.");
      return;
    }

    const { data: urlData } = supabase.storage
      .from("fotos-pedidos")
      .getPublicUrl(nombreArchivo);

    const { data, error: errorInsert } = await supabase
      .from("Pedidos")
      .insert({
        nombre_cliente: nombreCliente,
        telefono: telefono,
        foto_url: urlData.publicUrl,
      });

    if (errorInsert) {
      console.log("Error al guardar:", errorInsert);
      setError("No se pudo guardar el pedido. Intenta de nuevo.");
    } else {
      console.log("Pedido guardado:", data);
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
        required
        className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100"
      />

      <input
        type="tel"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ""))}
        inputMode="numeric"
        pattern="[0-9]*"
        required
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

      {error && (
        <div
          role="alert"
          className="fixed bottom-4 right-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </div>
      )}
    </div>
  );
}