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
        navigate(PATHS.creditos(c.cliente_id));
    }

    return (
        <AppLayout>
            <section className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                <h2 className="text-lg font-semibold">Clientes</h2>
                {/* Input de busqueda */}
                <div className="mt-3">
                    <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nombre (prefijo)..."
                    className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-300"
                    aria-label="Buscar clientes por nombre"
                    />
                </div>
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
