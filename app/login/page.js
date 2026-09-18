"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/");
    });
  }, [router]);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!correo.trim() || !contrasena.trim()) {
      setError("Completa correo y contraseña.");
      return;
    }

    setError(null);
    setCargando(true);

    const { data, error: errorLogin } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasena,
    });

    setCargando(false);

    if (errorLogin) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    if (data.session) {
      router.replace("/");
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>
            Sistema de pedidos de lienzos fotográficos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
            />

            <Button type="submit" disabled={cargando} className="w-full">
              {cargando ? "Ingresando..." : "Ingresar"}
            </Button>

            {error && <p className="text-sm text-destructive">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
