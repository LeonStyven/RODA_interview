import { httpGet } from "../../../shared/services/http";
import type { ClientesResponse } from "../interfaces/clientes.response";

export function fetchClientes(page = 1, pageSize = 10) {
  const q = `?page=${page}&page_size=${pageSize}`;
  return httpGet<ClientesResponse>(`/clientes/${q}`);
}
