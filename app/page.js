import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Sistema de Pedidos</h1>
      <p>Bienvenido a tu sistema de pedidos de lienzos fotográficos.</p>
      <Link href="/pedidos">Ver pedidos</Link>
    </div>
  );
}