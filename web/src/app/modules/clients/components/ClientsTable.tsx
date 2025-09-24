import type { Cliente } from "../interfaces/cliente.interface";

type Props = {
  data: Cliente[];
  onSelect: (c: Cliente) => void;
};

export default function ClientsTable({ data, onSelect }: Props) {
  return (
    <ul className="mt-3 space-y-2">
      {data.map((c) => (
        <li key={c.cliente_id}>
          <button
            className="rounded-md border px-3 py-1 text-left hover:bg-neutral-50 w-full"
            onClick={() => onSelect(c)}
          >
            <span className="font-medium">#{c.cliente_id}</span> — {c.nombre}
            {c.ciudad ? <span className="text-neutral-500"> ({c.ciudad})</span> : null}
          </button>
        </li>
      ))}
    </ul>
  );
}
