import type { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <main className="mx-auto max-w-5xl p-4 font-sans">
      <h1 className="text-2xl font-bold">Roda – MVP</h1>
      <p className="text-sm text-neutral-500">Clientes → Créditos → Cronograma</p>
      <div className="mt-4">{children}</div>
    </main>
  );
}
