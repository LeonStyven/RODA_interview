import { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import AppLayout from "../../../shared/layouts/AppLayout";
import { PATHS } from "../../../shared/shared.routes";
import { fetchCreditos } from "../services/credits.service";
import type { Credito } from "../interfaces/credito.interface";
import CreditsList from "../components/CreditsList";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

export default function CreditsPage() {
  const location = useLocation() as { state?: { clienteNombre?: string } };
  const clienteNombre = location.state?.clienteNombre;


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
        <Link className="btn btn-soft ml-4" to={PATHS.clientes}>
          ← Volver a clientes
        </Link>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead className="bg-base-200 text-base-100">
            <tr>
              <th></th>
              <th>ID</th>
              <th>Producto</th>
              <th>Inversion</th>
              <th>Estado</th>
              <th>Desembolso</th>
              <th>Cuotas</th>
              <th></th>
            </tr>
          </thead>
          <CreditsList data={creditos} onSelect={handleSelectCredito} />
        </table>
      </div>      
    </AppLayout>
  );
}