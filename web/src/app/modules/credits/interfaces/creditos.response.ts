import type { Pagination } from "../../../shared/interfaces/pagination.interface";
import type { Credito } from "./credito.interface";

export type CreditosResponse = {
  data: Credito[];
  pagination: Pagination;
};
