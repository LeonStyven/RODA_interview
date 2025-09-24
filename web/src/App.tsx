import { useEffect, useState } from "react";
import { apiGet } from "./lib/api.ts";

export default function App() {
  const [status, setStatus] = useState<string>("checking...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<{ status: string }>("/health")
      .then((r) => setStatus(r.status))
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main style={{ padding: 16, fontFamily: "system-ui" }}>
      <h1>Roda – MVP</h1>
      <p>API health: {error ? `error: ${error}` : status}</p>
    </main>
  );
}
