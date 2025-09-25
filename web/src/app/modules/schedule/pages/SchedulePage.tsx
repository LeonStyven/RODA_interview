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
      <div className="mb-3">
        <Link className="btn btn-soft ml-4" to={PATHS.creditos(String(clienteId))}>
          ← Volver a creditos
        </Link>
        <Link className="btn btn-soft ml-4" to={PATHS.clientes}>
          ← Volver a clientes
        </Link>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table my-4">
          <thead>
            <tr>
              <th></th>
              <th>Cuota</th>
              <th>Fecha de Vencimiento</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <ScheduleTable data={cuotas} />
        </table>
        <Paginator page={page} pageSize={pageSize} total={total} onChange={setPage} />
      </div>
    </AppLayout>
  );
}