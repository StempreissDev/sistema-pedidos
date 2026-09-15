import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        Sistema de Pedidos
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400">
        Bienvenido a tu sistema de pedidos de lienzos fotográficos.
      </p>
      <Link
        href="/pedidos"
        className="rounded-md bg-neutral-900 px-4 py-2 text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Ver pedidos
      </Link>
    </div>
  );
}