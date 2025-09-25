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
        <Link className="btn btn-soft ml-4" to={PATHS.clientes}>
          ← Volver
        </Link>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-4">
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
          <ScheduleTable data={cuotas} />
        </table>
      </div>
      <Paginator page={page} pageSize={pageSize} total={total} onChange={setPage} />
    </AppLayout>
  );
}