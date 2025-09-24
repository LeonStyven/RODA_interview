import type { Pagination } from "../../../shared/interfaces/pagination.interface";

export type Cuota = {
  schedule_id: number;
  credito_id: number;
  num_cuota: number;
  fecha_vencimiento: string;
  valor_cuota: number;
  estado: string;
};

export type CronogramaResponse = {
  data: Cuota[];
  pagination: Pagination;
};
