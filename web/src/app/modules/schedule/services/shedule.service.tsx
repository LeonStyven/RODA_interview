import { httpGet } from "../../../shared/services/http";
import type { CronogramaResponse } from "../interfaces/cronograma.response";

export function fetchCronograma(creditoId: number, page = 1, pageSize = 12) {
  const q = `?credito_id=${creditoId}&page=${page}&page_size=${pageSize}`;
  return httpGet<CronogramaResponse>(`/cronograma/${q}`);
}
