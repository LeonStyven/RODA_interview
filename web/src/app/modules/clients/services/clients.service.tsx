import { httpGet } from "../../../shared/services/http";
import type { ClientesResponse } from "../interfaces/clientes.response";

export function fetchClientes(page = 1, pageSize = 10, search?: string) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });
  if (search && search.trim()) {
    params.set("search", search.trim());
  }
  return httpGet<ClientesResponse>(`/clientes/?${params.toString()}`);
}

