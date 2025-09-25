// Router
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../shared/shared.routes";

import { useEffect, useState } from "react";
import AppLayout from "../../../shared/layouts/AppLayout";

import Paginator from "../../../shared/components/Paginator";
import ClientsTable from "../components/ClientsTable";
import { fetchClientes } from "../services/clients.service";
import type { Cliente } from "../interfaces/cliente.interface";

export default function ClientsHome() {

    // Variables para la busqueda del usuario
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");


    const navigate = useNavigate();

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 10;

    useEffect(() => {
    fetchClientes(page, pageSize, debouncedSearch).then((r) => {
        setClientes(r.data);
        setTotal(r.pagination.total);
    });
    }, [page, pageSize, debouncedSearch])

    useEffect(() => {
    const id = setTimeout(() => {
        setDebouncedSearch(search.trim());
    }, 400); // 400ms de debounce antes de enviar la peticion
    return () => clearTimeout(id);
    }, [search]);

    useEffect(() => {
        // cada vez que se confirma el debounce, volvemos a la página 1
        setPage(1);
    }, [debouncedSearch]);


    async function handleSelectCliente(c: Cliente) {
        navigate(PATHS.creditos(c.cliente_id), {
            state: { clienteNombre: c.nombre },
        });
    }

    return (
        <AppLayout>
            <section className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                <h2 className="text-lg font-semibold">Clientes</h2>
                {/* Input de busqueda */}
                <input 
                    type="text" 
                    placeholder="Nombre del Cliente" 
                    className="input" 
                    value={search}
                />
                {/* Tabla */}
                <ClientsTable 
                    data={clientes} 
                    onSelect={handleSelectCliente} 
                />
                {/* Paginacion */}
                <Paginator 
                    page={page} 
                    pageSize={pageSize} 
                    total={total} 
                    onChange={(p) => setPage(p)}
                />
            </section>
        </AppLayout>

);
}

{/* 
    <AppLayout>
      <div className="mb-3">
        <Link className="text-sm text-blue-600 hover:underline" to={PATHS.clientes}>
          ← Volver a clientes
        </Link>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
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
*/}

