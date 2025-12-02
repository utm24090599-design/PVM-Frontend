import { useState } from "react";

/*
  Estructura de respuesta esperada del backend
*/
interface InventoryCheckResponse {
  available: number;    // cantidad totalmente disponible
  partial: boolean;     // si hay disponibilidad parcial
  maxPartial: number;   // máximo que se puede entregar
}

export function useInventoryReservation() {
  const [status, setStatus] = useState<
    | "idle"
    | "checking"
    | "available"
    | "partial"
    | "none"
    | "reserving"
    | "reserved"
    | "error"
  >("idle");

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  // ============================================================
  // 1. Verificar inventario (inicio del flujo del diagrama)
  // ============================================================
  async function checkAvailability(
    productId: string | number, 
    quantity: number,
    availableStock?: number
  ) {
    setStatus("checking");

    try {
      let resp: InventoryCheckResponse;
      
      // Intentar usar el backend primero
      try {
        const { productsApi } = await import('../services/api');
        resp = await productsApi.checkStock(Number(productId), quantity);
      } catch (backendError) {
        // Fallback a mock si el backend falla
        console.warn('Backend unavailable, using mock:', backendError);
        resp = await fakeInventoryCheck(
          productId,
          quantity,
          availableStock
        );
      }

      // Caso 1 → disponibilidad completa
      if (resp.available >= quantity) {
        setStatus("available");
        return { type: "full", resp };
      }

      // Caso 2 → disponibilidad parcial
      if (resp.partial) {
        setStatus("partial");
        return { type: "partial", resp };
      }

      // Caso 3 → sin stock
      setStatus("none");
      return { type: "none", resp };
    } catch (err) {
      setError(err);
      setStatus("error");
      return { type: "error" };
    }
  }

  // ============================================================
  // 2. Solicitar ajuste al usuario (cuando hay disponibilidad parcial)
  // ============================================================
  // Representa el modal AjustarOrdenModal()
  function requestAdjustment(options: {
    maxAvailable: number;
    onAdjust: (newQty: number) => void;
  }) {
    return {
      title: "Inventario insuficiente",
      message: `Solo hay ${options.maxAvailable} unidades disponibles.`,
      maxAvailable: options.maxAvailable,
      onAdjust: options.onAdjust,
    };
  }

  // ============================================================
  // 3. Confirmación cuando NO hay stock (showConfirm en diagrama)
  // ============================================================
  function showConfirm() {
    return {
      title: "Sin stock",
      message: "Te avisaremos cuando tengamos stock",
      icon: "info",
      confirmText: "Ok",
      cancelText: "",
      onConfirm: () =>
        showToast({
          type: "success",
          message: "Orden confirmada",
        }),
      onCancel: () =>
        showToast({
          type: "info",
          message: "Acción cancelada",
        }),
    };
  }

  // ============================================================
  // 4. Reservar inventario (final del flujo)
  // ============================================================
  async function reserve(productId: string, quantity: number) {
    setStatus("reserving");

    try {
      const resp = await fakeReserve(productId, quantity);
      setStatus("reserved");
      setResult(resp);
      return true;
    } catch (err) {
      setError(err);
      setStatus("error");
      return false;
    }
  }

  // ============================================================
  // Retorno del hook
  // ============================================================
  return {
    status,
    result,
    error,

    checkAvailability,   // paso 1
    requestAdjustment,   // paso 2 (modal parcial)
    showConfirm,         // paso 3 (sin stock)
    reserve,             // paso 4 (final)
  };
}

/* ===================================================================
    MOCKS → Usados mientras no está el backend real
=================================================================== */

async function fakeInventoryCheck(
  _productId: number | string,
  qty: number,
  availableStock?: number
): Promise<InventoryCheckResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Si se proporciona el stock disponible, usarlo
      if (availableStock !== undefined) {
        if (qty <= availableStock) {
          resolve({ available: qty, partial: false, maxPartial: qty });
        } else if (availableStock > 0) {
          resolve({ available: availableStock, partial: true, maxPartial: availableStock });
        } else {
          resolve({ available: 0, partial: false, maxPartial: 0 });
        }
        return;
      }

      // Lógica mock original
      if (qty <= 10)
        resolve({ available: qty, partial: false, maxPartial: qty });

      else if (qty > 10 && qty <= 15)
        resolve({ available: 10, partial: true, maxPartial: 10 });

      else resolve({ available: 0, partial: false, maxPartial: 0 });
    }, 400);
  });
}

async function fakeReserve(productId: string, qty: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true, productId, qty }), 400);
  });
}

function showToast({ type, message }: { type: string; message: string }) {
  console.log(`[${type}] ${message}`);
}
