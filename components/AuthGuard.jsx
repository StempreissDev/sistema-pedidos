"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    let activo = true;

    const manejarSesion = (session) => {
      if (!activo) return;

      if (!session) {
        router.replace("/login");
        return;
      }

      setAutenticado(true);
    };

    supabase.auth.getSession().then(({ data }) => manejarSesion(data.session));

    const { data: escucha } = supabase.auth.onAuthStateChange(
      (_evento, session) => manejarSesion(session)
    );

    return () => {
      activo = false;
      escucha.subscription.unsubscribe();
    };
  }, [router]);

  if (!autenticado) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-sm text-muted-foreground">
        Verificando sesión...
      </div>
    );
  }

  return children;
}
