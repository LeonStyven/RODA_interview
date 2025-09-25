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
    <div className="overflow-x-auto">
      <table className="table table-sm">
        <thead>
          <tr>
            <th></th>
            <th>ID Crédito</th>
            <th>Producto</th>
            <th>Inversión</th>
            <th>Estado</th>
            <th>Fecha Desembolso</th>
            <th>Cuotas Totales</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((cr) => (
            <tr key={cr.credito_id} className="hover:bg-base-300 cursor-pointer" onClick={() => onSelect(cr)}>
              <td></td>
              <td>{cr.credito_id}</td>
              <td>{cr.producto}</td>
              <td>{cr.inversion}</td>
              <td>
                {cr.estado === "vigente" ? (
                  <div className="badge badge-soft badge-success">{cr.estado}</div>
                ) : cr.estado === "cancelado" ? (
                  <div className="badge badge-soft badge-warning">{cr.estado}</div>
                ) : cr.estado === "cancelado" ? (
                  <div className="badge badge-soft badge-error">{cr.estado}</div>
                ) : (
                  <div className="badge badge-soft badge-ghost">{cr.estado}</div>
                )}
              </td>
              <td>{cr.fecha_desembolso !== "" ? cr.fecha_desembolso : "Sin fecha"}</td>
              <td>{cr.cuotas_totales}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
