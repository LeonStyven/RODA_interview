import type { Credito } from "../interfaces/credito.interface";

type Props = {
  data: Credito[];
  onSelect: (c: Credito) => void;
};

export default function CreditsList({ data, onSelect }: Props) {
  if (!data.length) {
    return <p className="mt-2 text-sm text-neutral-500">Sin créditos</p>;
  }

  return (
    <tbody>
      {data.map((cr) => (
        <tr className="hover:bg-base-300 cursor-pointer" onClick={() => onSelect(cr)}>
          <th></th>
          <th>{cr.credito_id}</th>
          <th>{cr.producto}</th>
          <th>{cr.inversion}</th>
          <th>
            {cr.estado === "vigente" ? (
              <div className="badge badge-soft badge-success">{cr.estado}</div>
            ) : cr.estado === "cancelado" ? (
              <div className="badge badge-soft badge-warning">{cr.estado}</div>
            ) : cr.estado === "cancelado" ? (
              <div className="badge badge-soft badge-error">{cr.estado}</div>

            ) : <div className="badge badge-soft badge-ghost">{cr.estado}</div>
          }
          </th>
          <th>{cr.fecha_desembolso !== "" ? cr.fecha_desembolso : 'Sin fecha'}</th>
          <th>{cr.cuotas_totales}</th>
          <th></th>
        </tr>
      ))}
    </tbody>
  );
}
