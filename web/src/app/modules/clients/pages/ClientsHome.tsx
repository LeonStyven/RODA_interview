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

    const navigate = useNavigate();

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 10;

    useEffect(() => {
        fetchClientes(page, pageSize).then((r) => {
        setClientes(r.data);
        setTotal(r.pagination.total);
        });
    }, [page]);

    async function handleSelectCliente(c: Cliente) {
        navigate(PATHS.creditos(c.cliente_id));
    }

    return (
        <AppLayout>
            <section className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                <h2 className="text-lg font-semibold">Clientes</h2>
                <ClientsTable data={clientes} onSelect={handleSelectCliente} />
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
