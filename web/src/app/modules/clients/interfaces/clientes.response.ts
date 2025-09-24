import type { Pagination } from "../../../shared/interfaces/pagination.interface";
import type { Cliente } from "./cliente.interface";

export type ClientesResponse = {
  data: Cliente[];
  pagination: Pagination;
};
