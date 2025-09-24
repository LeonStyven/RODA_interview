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
    <ul className="mt-3 space-y-2">
      {data.map((cr) => (
        <li key={cr.credito_id}>
          <button
            className="w-full rounded-md border px-3 py-1 text-left hover:bg-neutral-50"
            onClick={() => onSelect(cr)}
          >
            <span className="font-medium">#{cr.credito_id}</span> — {cr.producto} — ${cr.inversion} — {cr.estado}
          </button>
        </li>
      ))}
    </ul>
  );
}
