import type { Pagination } from "../../../shared/interfaces/pagination.interface";
import type { Cuota } from "./cuota.interface";

export type CronogramaResponse = {
  data: Cuota[];
  pagination: Pagination;
};
