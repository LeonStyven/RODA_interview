import { useEffect, useState } from "react";
import AppLayout from "../../../shared/layouts/AppLayout";
import { fetchClientes } from "../services/clients.service";
import { fetchCreditos } from "../../credits/services/credits.service";
import { fetchCronograma } from "../../schedule/services/schedule.service";

// 👇 nuevos imports de tipos
import type { Cliente } from "../interfaces/cliente.interface";
import type { Credito } from "../../credits/interfaces/credito.interface";
import type { Cuota } from "../../schedule/interfaces/cuota.interface";
