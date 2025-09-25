import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ClientsHome from "./modules/clients/pages/ClientsHome";
import { PATHS } from "./shared/shared.routes";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige raíz a /clientes */}
        <Route path="/" element={<Navigate to={PATHS.clientes} replace />} />

        <Route path={PATHS.clientes} element={<ClientsHome />} />
      </Routes>
    </BrowserRouter>
  );
}
