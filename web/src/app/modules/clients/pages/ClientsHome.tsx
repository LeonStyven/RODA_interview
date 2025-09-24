import { useEffect, useState } from "react";
import AppLayout from "../../../shared/layouts/AppLayout";

import Paginator from "../../../shared/components/Paginator";

import { fetchClientes } from "../services/clients.service";
import { fetchCreditos } from "../../credits/services/credits.service";
import { fetchCronograma } from "../../schedule/services/shedule.service";

import type { Cliente } from "../interfaces/cliente.interface";
import type { Credito } from "../../credits/interfaces/credito.interface";
import type { Cuota } from "../../schedule/interfaces/cuota.interface";

export default function ClientsHome() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [creditos, setCreditos] = useState<Credito[]>([]);
  const [selectedCredito, setSelectedCredito] = useState<Credito | null>(null);
  const [cuotas, setCuotas] = useState<Cuota[]>([]);

  useEffect(() => {
    fetchClientes(page, pageSize).then((r) => {
      setClientes(r.data);
      setTotal(r.pagination.total);
    });
  }, [page]);

  async function handleSelectCliente(c: Cliente) {
    setSelectedCliente(c);
    setSelectedCredito(null);
    setCuotas([]);
    const resp = await fetchCreditos(c.cliente_id, 1, 10);
    setCreditos(resp.data);
  }

  async function handleSelectCredito(cr: Credito) {
    setSelectedCredito(cr);
    const resp = await fetchCronograma(cr.credito_id, 1, 12);
    setCuotas(resp.data);
  }

  const maxPage = Math.max(1, Math.ceil(total / pageSize));

  return (
    <AppLayout>
      {/* Clientes */}
      <section className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">Clientes</h2>
        <ul className="mt-3 space-y-2">
          {clientes.map((c) => (
            <li key={c.cliente_id}>
              <button
                className="rounded-md border px-3 py-1 text-left hover:bg-neutral-50"
                onClick={() => handleSelectCliente(c)}
              >
                <span className="font-medium">#{c.cliente_id}</span> — {c.nombre}
                {c.ciudad ? <span className="text-neutral-500"> ({c.ciudad})</span> : null}
              </button>
            </li>
          ))}
        </ul>
        <Paginator
            page={page}
            pageSize={pageSize}
            total={total}
            onChange={(p) => setPage(p)}
            />
      </section>

      {/* Créditos */}
      {selectedCliente && (
        <section className="mt-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Créditos de {selectedCliente.nombre}</h3>
          {creditos.length === 0 ? (
            <p className="mt-2 text-sm text-neutral-500">Sin créditos</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {creditos.map((cr) => (
                <li key={cr.credito_id}>
                  <button
                    className="rounded-md border px-3 py-1 text-left hover:bg-neutral-50"
                    onClick={() => handleSelectCredito(cr)}
                  >
                    <span className="font-medium">#{cr.credito_id}</span> — {cr.producto} — ${cr.inversion} — {cr.estado}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Cronograma */}
      {selectedCredito && (
        <section className="mt-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Cronograma crédito #{selectedCredito.credito_id}</h3>
          {cuotas.length === 0 ? (
            <p className="mt-2 text-sm text-neutral-500">Sin cuotas</p>
          ) : (
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
                {cuotas.map((q) => (
                  <tr key={q.schedule_id} className="border-b">
                    <td className="py-2">{q.num_cuota}</td>
                    <td className="py-2">{q.fecha_vencimiento}</td>
                    <td className="py-2">${q.valor_cuota}</td>
                    <td className="py-2">{q.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}
    </AppLayout>
  );
}
