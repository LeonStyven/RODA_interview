export const PATHS = {
  clientes: "/clientes",
  creditos: (clienteId: number | string) => `/clientes/${clienteId}/creditos`,
  cronograma: (clienteId: number | string, creditoId: number | string) =>
    `/clientes/${clienteId}/creditos/${creditoId}`,
} as const;
