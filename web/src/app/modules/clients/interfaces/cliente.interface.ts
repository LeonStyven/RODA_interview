import type { Pagination } from "../../../shared/interfaces/pagination.interface";

export type Cliente = {
  cliente_id: number;
  nombre: string;
  ciudad: string | null;
};

export type ClientesResponse = {
  data: Cliente[];
  pagination: Pagination;
};
