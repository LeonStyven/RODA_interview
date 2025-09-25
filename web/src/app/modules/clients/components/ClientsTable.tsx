import React from "react";
import type { Cliente } from "../interfaces/cliente.interface";
import CreditsList from "../../credits/components/CreditsList";
import { fetchCreditos } from "../../credits/services/credits.service";
import type { Credito } from "../../credits/interfaces/credito.interface";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../shared/shared.routes";

type Props = {
  data: Cliente[];
  onSelect: (c: Cliente) => void;
};

export default function ClientsTable({ data, onSelect }: Props) {
  const navigate = useNavigate();
  const [expandedClienteId, setExpandedClienteId] = React.useState<number | null>(null);
  const [creditsData, setCreditsData] = React.useState<Credito[]>([]);
  const [loadingCredits, setLoadingCredits] = React.useState(false);

  const handleToggleRow = async (clienteId: number) => {
    if (expandedClienteId === clienteId) {
      setExpandedClienteId(null);
      setCreditsData([]);
    } else {
      setExpandedClienteId(clienteId);
      setLoadingCredits(true);
      try {
        const response = await fetchCreditos(clienteId);
        setCreditsData(response.data);
      } catch (error) {
        console.error("Error fetching credits:", error);
        setCreditsData([]);
      } finally {
        setLoadingCredits(false);
      }
    }
  };

  return (
    <table className="table">
    <thead className="bg-base-200 text-base-100">
      <tr>
        <th></th>
        <th>ID</th>
        <th>Nombre Cliente</th>
        <th>Ciudad</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
        {data.map((c) => (
          <React.Fragment key={c.cliente_id}>
            {/* Tabla de clientes (sin expandir) */}
            <tr className={`hover:bg-base-300 cursor-pointer ${expandedClienteId === c.cliente_id ? "bg-base-300" : ""}`} onClick={() => handleToggleRow(c.cliente_id)} aria-label={expandedClienteId === c.cliente_id ? "Contraer" : "Expandir"}>
              <td></td>
              <td>{c.cliente_id}</td>
              <td>{c.nombre}</td>
              <td>{c.ciudad}</td>
              <td></td>
            </tr>


            {/* Tabla de créditos del cliente (Expandida) */}
            {expandedClienteId === c.cliente_id && (
              <tr className="bg-base-300">
              <td colSpan={5}>
                  <div className="collapse collapse-arrow join-item border-base-300 border rounded-box bg-base-100 collapse-open">
                    <div className="collapse-content">
                      {loadingCredits ? (
                        <div className="flex justify-center py-4">
                          <span className="loading loading-spinner loading-md"></span>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th></th>
                                <th>ID Crédito</th>
                                <th>Producto</th>
                                <th>Inversión</th>
                                <th>Estado</th>
                                <th>Fecha Desembolso</th>
                                <th>Cuotas Totales</th>
                                <th></th>
                              </tr>
                            </thead>
                            <CreditsList
                              data={creditsData}
                              onSelect={(cr) => navigate(PATHS.cronograma(c.cliente_id, cr.credito_id))}
                            />
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
  </table>
      
  );
}



/* 

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-4">
        <table className="table">
          <thead className="bg-base-200 text-base-100">
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nombre Cliente</th>
              <th>Ciudad</th>
              <th></th>
            </tr>
          </thead>
          <ClientsTable data={clientes} onSelect={handleSelectCliente}/>
        </table>
      </div> 

*/