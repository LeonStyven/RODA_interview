import type { Cliente } from "../interfaces/cliente.interface";

type Props = {
  data: Cliente[];
  onSelect: (c: Cliente) => void;
};

export default function ClientsTable({ data, onSelect }: Props) {
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
          <tr className="hover:bg-base-300 cursor-pointer" onClick={() => onSelect(c)}>
            <th></th>
            <th>{c.cliente_id}</th>
            <th>{c.nombre}</th>
            <th>{c.ciudad}</th>
            <th></th>
          </tr>
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