import { useEffect, useState } from "react";
import { apiGet } from "./lib/api.ts";

export default function App() {
  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl font-semibold">Roda – MVP</h1>
      <p className="text-gray-600">Tailwind activo ✅</p>
    </div>
  );
}
