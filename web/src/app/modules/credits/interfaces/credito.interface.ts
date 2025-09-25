export type Credito = {
  credito_id: number;
  cliente_id: number;
  producto: string;
  inversion: number;
  cuotas_totales: number;
  tea: number;
  fecha_desembolso: string;
  fecha_inicio_pago: string;
  estado: string;
};
