import { useEffect, useState } from "react";
import AppLayout from "../../../shared/layouts/AppLayout";

import Paginator from "../../../shared/components/Paginator";
import ClientsTable from "../components/ClientsTable";
import ScheduleTable from "../../schedule/components/ScheduleTable";
import CreditsList from "../../credits/components/CreditsList";


import { fetchClientes } from "../services/clients.service";
import { fetchCreditos } from "../../credits/services/credits.service";
import { fetchCronograma } from "../../schedule/services/shedule.service";

import type { Cliente } from "../interfaces/cliente.interface";
import type { Credito } from "../../credits/interfaces/credito.interface";
import type { Cuota } from "../../schedule/interfaces/cuota.interface";

export default function ClientsHome() {

    // Variables para clientes
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 10;

    //Variables para cronograma
    const [schPage, setSchPage] = useState(1);
    const [schTotal, setSchTotal] = useState(0);
    const schPageSize = 12;


    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
    const [creditos, setCreditos] = useState<Credito[]>([]);
    const [selectedCredito, setSelectedCredito] = useState<Credito | null>(null);
    const [cuotas, setCuotas] = useState<Cuota[]>([]);

    useEffect(() => {
        fetchClientes(page, pageSize).then((r) => {
        setClientes(r.data);
        setTotal(r.pagination.total);
        });
    }, [page]);

    useEffect(() => {
        if (!selectedCredito) return;
        fetchCronograma(selectedCredito.credito_id, schPage, schPageSize)
            .then((resp) => {
            setCuotas(resp.data);
            setSchTotal(resp.pagination.total);
            });
    }, [selectedCredito, schPage]);


    async function handleSelectCliente(c: Cliente) {
        setSelectedCliente(c);
        setSelectedCredito(null);
        setCuotas([]);
        const resp = await fetchCreditos(c.cliente_id, 1, 10);
        setCreditos(resp.data);
    }

    
    async function handleSelectCredito(cr: Credito) {
        setSelectedCredito(cr);
        setSchPage(1);               // ← reset a página 1 al cambiar de crédito
        const resp = await fetchCronograma(cr.credito_id, 1, schPageSize);
        setCuotas(resp.data);
        setSchTotal(resp.pagination.total);   // ← guardar el total
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

        {selectedCliente && (
            <section className="mt-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                <h3 className="text-lg font-semibold">
                Créditos de {selectedCliente.nombre}
                </h3>
                <CreditsList data={creditos} onSelect={handleSelectCredito} />

            </section>
        )}

        {selectedCredito && (
            <section className="mt-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold">Cronograma crédito #{selectedCredito.credito_id}</h3>
            
            <ScheduleTable data={cuotas} />
            <Paginator
                page={schPage}
                pageSize={schPageSize}
                total={schTotal}
                onChange={(p) => setSchPage(p)}
            />
            </section>
        )}
        </AppLayout>
    );
    }
