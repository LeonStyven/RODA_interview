import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AppLayout from "../../../shared/layouts/AppLayout";
import { PATHS } from "../../../shared/shared.routes";
import { fetchCronograma } from "../services/shedule.service";
import type { Cuota } from "../interfaces/cuota.interface";
import ScheduleTable from "../components/ScheduleTable";
import Paginator from "../../../shared/components/Paginator";

export default function SchedulePage() {
  const { clienteId, creditoId } = useParams();
  const [cuotas, setCuotas] = useState<Cuota[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    if (!creditoId) return;
    fetchCronograma(Number(creditoId), page, pageSize).then((r) => {
      setCuotas(r.data);
      setTotal(r.pagination.total);
    });
  }, [creditoId, page]);

  return (
    <AppLayout>
      <div className="mb-3 flex gap-4">
        <Link className="text-sm text-blue-600 hover:underline" to={PATHS.creditos(String(clienteId))}>
          ← Volver a créditos
        </Link>
        <Link className="text-sm text-blue-600 hover:underline" to={PATHS.clientes}>
          ← Volver a clientes
        </Link>
      </div>

      <section className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">
          Cronograma del crédito #{creditoId}
        </h2>

        <ScheduleTable data={cuotas} />

        <Paginator page={page} pageSize={pageSize} total={total} onChange={setPage} />
      </section>
    </AppLayout>
  );
}
