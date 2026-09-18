import { supabase } from "@/utils/supabase";

const MARCADOR_BUCKET = "/fotos-pedidos/";

// El bucket es privado. Antes se guardaba la URL pública completa en
// foto_url; ahora se guarda solo la ruta del archivo. Esta función soporta
// ambos formatos para no romper pedidos ya existentes.
export function rutaDesdeFotoUrl(fotoUrl) {
  if (!fotoUrl) return null;
  const indice = fotoUrl.indexOf(MARCADOR_BUCKET);
  return indice !== -1 ? fotoUrl.slice(indice + MARCADOR_BUCKET.length) : fotoUrl;
}

export async function obtenerUrlFirmada(fotoUrl, expiracionSegundos = 3600) {
  const ruta = rutaDesdeFotoUrl(fotoUrl);
  if (!ruta) return null;

  const { data, error } = await supabase.storage
    .from("fotos-pedidos")
    .createSignedUrl(ruta, expiracionSegundos);

  if (error) {
    console.log("Error al firmar la foto:", error);
    return null;
  }

  return data.signedUrl;
}
