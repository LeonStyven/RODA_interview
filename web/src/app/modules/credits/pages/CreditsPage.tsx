import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AppLayout from "../../../shared/layouts/AppLayout";
import { PATHS } from "../../../shared/shared.routes";
import { fetchCreditos } from "../services/credits.service";
import type { Credito } from "../interfaces/credito.interface";
import CreditsList from "../components/CreditsList";

export default function CreditsPage() {
  const { clienteId } = useParams(); // viene como string
  const navigate = useNavigate();

  const [creditos, setCreditos] = useState<Credito[]>([]);

  useEffect(() => {
    if (!clienteId) return;
    fetchCreditos(Number(clienteId), 1, 10).then((r) => setCreditos(r.data));
  }, [clienteId]);

  function handleSelectCredito(cr: Credito) {
    if (!clienteId) return;
    navigate(PATHS.cronograma(clienteId, cr.credito_id));
  }

  return (
    <AppLayout>
      <div className="mb-3">
        <Link className="text-sm text-blue-600 hover:underline" to={PATHS.clientes}>
          ← Volver a clientes
        </Link>
      </div>

      <section className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">Créditos del cliente #{clienteId}</h2>
        <CreditsList data={creditos} onSelect={handleSelectCredito} />
      </section>
    </AppLayout>
  );
}
