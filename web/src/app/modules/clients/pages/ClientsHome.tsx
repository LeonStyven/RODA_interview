// Router
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../shared/shared.routes";

import { useEffect, useState } from "react";
import AppLayout from "../../../shared/layouts/AppLayout";

import Paginator from "../../../shared/components/Paginator";
import ClientsTable from "../components/ClientsTable";
import { fetchClientes } from "../services/clients.service";
import type { Cliente } from "../interfaces/cliente.interface";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';


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

      {/* Input de busqueda */}
      <FontAwesomeIcon icon={faFilter} />
      <input 
          type="text" 
          placeholder="Nombre del Cliente" 
          className="input ml-4" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Buscar clientes por nombre"
      />

      {/* Tabla */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-4">
          <ClientsTable data={clientes} onSelect={handleSelectCliente}/>
      </div> 
      
      {/* Paginacion */}
      <Paginator 
          page={page} 
          pageSize={pageSize} 
          total={total} 
          onChange={(p) => setPage(p)}
      />
    </AppLayout>
  );
}

