import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AppLayout from "../../../shared/layouts/AppLayout";
import { PATHS } from "../../../shared/shared.routes";
import { fetchCronograma } from "../services/shedule.service";
import type { Cuota } from "../interfaces/cuota.interface";
import ScheduleTable from "../components/ScheduleTable";
import Paginator from "../../../shared/components/Paginator";
import CreditsList from "../../credits/components/CreditsList";
import { fetchCreditos } from "../../credits/services/credits.service";
import type { Credito } from "../../credits/interfaces/credito.interface";

export default function SchedulePage() {
  const navigate = useNavigate();
  const { clienteId, creditoId } = useParams();
  const [cuotas, setCuotas] = useState<Cuota[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 12;
  const [credits, setCredits] = useState<Credito[]>([]);
  const [loadingCredits, setLoadingCredits] = useState(false);

  useEffect(() => {
    if (!creditoId) return;
    fetchCronograma(Number(creditoId), page, pageSize).then((r) => {
      setCuotas(r.data);
      setTotal(r.pagination.total);
    });
  }, [creditoId, page]);

  useEffect(() => {
    if (!clienteId) return;
    setLoadingCredits(true);
    fetchCreditos(Number(clienteId))
      .then((r) => setCredits(r.data))
      .finally(() => setLoadingCredits(false));
  }, [clienteId]);

  return (
    <AppLayout>
      <div className="mb-3">
        <Link className="btn btn-soft ml-4" to={PATHS.clientes}>
          ← Volver
        </Link>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-4">
        <div className="p-4 font-semibold">Créditos del cliente</div>
        {loadingCredits ? (
          <div className="flex justify-center py-4">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          <CreditsList
            data={credits}
            onSelect={(cr) => navigate(PATHS.cronograma(String(clienteId), cr.credito_id))}
          />
        )}
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-4">
        <ScheduleTable data={cuotas} />
      </div>
      <Paginator page={page} pageSize={pageSize} total={total} onChange={setPage} />
    </AppLayout>
  );
}