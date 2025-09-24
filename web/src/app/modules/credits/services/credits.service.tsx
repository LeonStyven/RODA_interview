import { httpGet } from "../../../shared/services/http";
import type { CreditosResponse } from "../interfaces/creditos.response";

export function fetchCreditos(clienteId: number, page = 1, pageSize = 10) {
  const q = `?cliente_id=${clienteId}&page=${page}&page_size=${pageSize}`;
  return httpGet<CreditosResponse>(`/creditos/${q}`);
}
