import type { Cuota } from "../interfaces/cuota.interface";

type Props = {
  data: Cuota[];
};

export default function ScheduleTable({ data }: Props) {
  return (
    <table className="table">
      <thead className=" w-full bg-base-200 text-base-100">
        <tr>
          <th></th>
          <th>#</th>
          <th>Fecha de Vencimiento</th>
          <th>Valor Cuota</th>
          <th>Estado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((q) => (
          <tr key={q.num_cuota}>
            <td></td>
            <td>{q.num_cuota}</td>
            <td>{q.fecha_pago ? q.fecha_pago : "Sin Fecha"}</td>
            <td>{q.monto}</td>
            <td>
              {q.estado === "pendiente" ? (
                <div className="badge badge-soft badge-ghost">{q.estado}</div>
              ) : q.estado === "parcial" ? (
                <div className="badge badge-soft badge-warning">{q.estado}</div>
              ) : q.estado === "pagada" ? (
                <div className="badge badge-soft badge-success">{q.estado}</div>
              ) : (
                <div className="badge badge-soft badge-error">{q.estado}</div>
              )}
            </td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}