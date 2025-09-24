const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
