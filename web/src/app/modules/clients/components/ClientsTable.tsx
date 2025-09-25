import type { Cliente } from "../interfaces/cliente.interface";

type Props = {
  data: Cliente[];
  onSelect: (c: Cliente) => void;
};

export default function ClientsTable({ data, onSelect }: Props) {
  return (
      <tbody>
        {data.map((c) => (
          <tr className="hover:bg-base-300 cursor-pointer" onClick={() => onSelect(c)}>
            <th></th>
            <th>{c.cliente_id}</th>
            <th>{c.nombre}</th>
            <th>{c.ciudad}</th>
            <th></th>
          </tr>
        ))}
      </tbody>
  );
}
