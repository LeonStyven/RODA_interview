import type { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <main className="mx-auto max-w-5xl">
      <div className="mt-4">{children}</div>
    </main>
  );    
}
