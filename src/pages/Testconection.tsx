import { useState } from "react";
import axios from "axios";

// TestConnection: simple component with a button that calls
// `${BACKEND_URL}/api/prueba` and displays the response.
// Usage: import TestConnection from './TestConnection';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "URL_BACKEND";

export default function TestConnection() {
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchTest = async () => {
    setLoading(true);
    setError(null);
    setResponseText("");

    try {
      const res = await axios.get(`${BACKEND_URL}/api/prueba`);

      // Si el backend devuelve JSON, lo mostramos formateado.
      if (typeof res.data === "object") {
        setResponseText(JSON.stringify(res.data, null, 2));
      } else {
        setResponseText(String(res.data));
      }
    } catch (err: unknown) {
      // ✅ Manejo de errores seguro con TypeScript
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data || err.message;
        setError(String(msg));
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-3">TestConnection</h2>

      <div className="flex gap-2 mb-3">
        <button
          onClick={fetchTest}
          disabled={loading}
          className="px-4 py-2 rounded-xl border hover:shadow-sm disabled:opacity-60"
        >
          {loading ? "Probando..." : "Probar conexión"}
        </button>

        <button
          onClick={() => {
            setResponseText("");
            setError(null);
          }}
          className="px-3 py-2 rounded-xl border"
        >
          Limpiar
        </button>
      </div>

      <label htmlFor="response-textarea" className="text-sm mb-1 block">Respuesta del backend:</label>
      <textarea
        id="response-textarea"
        title="Respuesta del backend"
        placeholder="La respuesta del backend aparecerá aquí"
        readOnly
        value={error ? `ERROR: ${String(error)}` : responseText}
        rows={6}
        className="w-full text-xs font-mono p-2 rounded-md border resize-none bg-gray-50"
      />

      <p className="text-xs mt-2 text-gray-500">
        Usa <code>VITE_BACKEND_URL</code> en tu archivo <code>.env</code> para
        configurar la URL real del backend.
      </p>
    </div>
  );
}
