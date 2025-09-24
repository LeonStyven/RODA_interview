import type { Cuota } from "../interfaces/cuota.interface";

type Props = {
  data: Cuota[];
};

export default function ScheduleTable({ data }: Props) {
  if (!data.length) {
    return <p className="mt-2 text-sm text-neutral-500">Sin cuotas</p>;
  }

  return (
    <table className="mt-2 w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="py-2 text-left">#</th>
          <th className="py-2 text-left">Vence</th>
          <th className="py-2 text-left">Cuota</th>
          <th className="py-2 text-left">Estado</th>
        </tr>
      </thead>
      <tbody>
        {data.map((q) => (
          <tr key={q.schedule_id} className="border-b">
            <td className="py-2">{q.num_cuota}</td>
            <td className="py-2">{q.fecha_vencimiento}</td>
            <td className="py-2">${q.valor_cuota}</td>
            <td className="py-2">{q.estado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
