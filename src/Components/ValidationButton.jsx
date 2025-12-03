import React from "react";
import toast from "react-hot-toast";

const ALLOWED_ROLES = ["DELIVERY_AREA", "RECEPTIONIST"];

export default function ValidationButton({ userRole }) {

  const validateData = async () => {
    // 1. Validar rol autorizado
    if (!ALLOWED_ROLES.includes(userRole)) {
      toast.error("No tienes permisos para realizar esta acción.");
      return;
    }

    try {
      // 2. Llamada a API mock
      const response = await fetch("https://mockapi.test/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ exampleData: "12345" })
      });

      const result = await response.json();

      // 3. Mostrar toast según respuesta
      if (result.success) {
        toast.success("Validación exitosa.");
      } else {
        toast.error(result.message || "Ocurrió un error en la validación.");
      }
    } catch (error) {
      toast.error("Error de conexión con la API.");
    }
  };

  return (
    <button
      onClick={validateData}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Validar Información
    </button>
  );
}
