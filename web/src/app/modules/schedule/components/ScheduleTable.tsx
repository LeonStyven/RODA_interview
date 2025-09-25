import type { Cuota } from "../interfaces/cuota.interface";

type Props = {
  data: Cuota[];
};

export default function ScheduleTable({ data }: Props) {
  if (!data.length) {
    return <p className="mt-2 text-sm text-neutral-500">Sin cuotas</p>;
  }

  return (
    <tbody>
      {data.map((q) => (
        <tr>
          <th></th>
          <th>{q.num_cuota}</th>
          <th>{q.fecha_pago ? q.fecha_pago : "Sin Fecha"}</th>
          <th>{q.monto}</th>
          <th>
            {q.estado === "pendiente" ? (
              <div className="badge badge-soft badge-ghost">{q.estado}</div>
            ) : q.estado === "parcial" ? (
              <div className="badge badge-soft badge-warning">{q.estado}</div>
            ) : q.estado === "pagada" ? (
              <div className="badge badge-soft badge-success">{q.estado}</div>

            ) : <div className="badge badge-soft badge-error">{q.estado}</div>
          }
          </th>
          <th></th>
        </tr>
      ))}
    </tbody>
    
  );
}