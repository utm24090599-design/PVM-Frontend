import React from 'react';
// Importamos el hook que exportamos de FeedbackProvider
import { useFeedback } from '../providers/FeedbackProvider'; 
// Importamos el OrderItem global para mantener la consistencia (id: number, requestedQuantity)
import type { OrderItem, Order } from '../Components/types/orderTypes'; 
import type { ToastType } from '../contexts/feedbackContext'; // Necesitamos ToastType para la aserción

// Definición de Props: Item debe ser OrderItem o null
interface OrderDetailsProps {
  item: OrderItem | null;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ item }) => {
  // Hook para usar los modales de confirmación y toasts
  const { showConfirm, showToast } = useFeedback();

  // ------------------------------------------
  // LÓGICA DE VISUALIZACIÓN
  // ------------------------------------------

  if (!item) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500 text-lg p-8">
        <span className="material-symbols-outlined mr-2 text-3xl">info</span>
        Selecciona un artículo de la lista de órdenes para ver los detalles y acciones.
      </div>
    );
  }

  // ------------------------------------------
  // LÓGICA DE BOTONES (Simulación de acciones)
  // ------------------------------------------

  const handleConfirmAll = () => {
    showConfirm({
      title: 'Confirmar toda la Recogida',
      message: '¿Estás seguro de confirmar todos los artículos recogidos para esta orden?',
      // ✨ ASERCIÓN 1: Forzamos el tipo 'done_all' a 'any' para evitar conflicto con el tipo restrictivo del Modal
      icon: 'done_all' as any, 
      confirmText: 'Sí, Confirmar Todo',
      onConfirm: () => {
        showToast({ type: 'success', message: 'Orden confirmada completamente (simulación).' });
      },
      onCancel: () => showToast({ type: 'info', message: 'Confirmación de orden cancelada.' }),
    });
  };

  const handleClearAll = () => {
    showConfirm({
      title: 'Limpiar todas las Cantidades',
      message: '¿Estás seguro de restablecer todas las cantidades de recogida a cero para esta orden?',
      // ✨ ASERCIÓN 2: Forzamos el tipo 'backspace' a 'any'
      icon: 'backspace' as any, 
      confirmText: 'Sí, Limpiar Todo',
      onConfirm: () => {
        // ✨ ASERCIÓN 3: Forzamos el tipo 'warning' a 'ToastType' para evitar conflicto con el tipo restrictivo del Context
        showToast({ type: 'warning' as ToastType, message: 'Cantidades restablecidas a cero (simulación).' }); 
      },
      onCancel: () => showToast({ type: 'info', message: 'Acción de limpieza cancelada.' }),
    });
  };

  const handleMakeTicket = () => {
    showToast({ type: 'info', message: `Generando etiqueta para el artículo: ${item.cartTitle}` });
  };
  
  const handleConfirmItem = () => {
    showToast({ type: 'success', message: `Artículo '${item.cartTitle}' marcado como CONFIRMADO (simulación).` });
  };


  return (
    <div className="flex flex-col h-full space-y-4">
      
      {/* CABECERA DE ACCIONES GENERALES */}
      <div className="flex justify-between items-center bg-gray-100 p-3 rounded-xl shadow-md border-b-4 border-blue-500">
        {/* Usamos item.id como identificador */}
        <h2 className="text-xl font-bold text-gray-700">Acciones del Artículo (ID: {item.id})</h2> 
        <button 
          onClick={handleMakeTicket} 
          className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-full shadow-md hover:bg-yellow-600 transition duration-150 flex items-center"
        >
          <span className="material-symbols-outlined mr-2">print</span>
          Ticket / Etiqueta
        </button>
      </div>
      
      {/* DETALLE DEL PRODUCTO SELECCIONADO */}
      <div className="flex-1 p-6 bg-white rounded-xl border border-blue-200 overflow-y-auto shadow-inner">
        <div className="flex items-start mb-4">
            <span className="material-symbols-outlined text-4xl text-blue-600 mr-4">inventory_2</span> 
            <div>
              <h3 className="text-2xl font-extrabold text-gray-800">{item.cartTitle}</h3>
              <p className="text-md text-gray-600">{item.cartProductDescription}</p>
            </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg border">
          
          <DetailBlock label="ID Producto" value={item.id} />
          <DetailBlock label="Unidad de Venta" value="Unidades" /> 

          <DetailBlock 
            label="Cantidad Solicitada" 
            value={item.requestedQuantity} 
            className="bg-red-50 text-red-700"
          />
          <DetailBlock 
            label="Inventario Disponible" 
            value={item.availableStock} 
            className="bg-green-50 text-green-700"
          />
          
          <DetailBlock 
            label="Cantidad Recogida" 
            value={item.collectedQuantity} 
            className="col-span-2 bg-blue-100 text-blue-800 font-bold"
          />

          {/* Alerta de modificación */}
          {item.requiresModification && (
            <div className="col-span-2 p-3 mt-2 bg-yellow-100 rounded-lg border border-yellow-400 flex items-center shadow-sm">
              <span className="material-symbols-outlined mr-2 text-yellow-700">build</span>
              <strong className="text-yellow-800">Requiere Ajuste Manual:</strong>
              <span className="ml-2 text-sm text-yellow-700">Material rollo/peso. La cantidad recogida debe ser verificada.</span>
            </div>
          )}
        </div>
        
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
            <strong className="text-gray-700 flex items-center">
              <span className="material-symbols-outlined mr-2">location_on</span>
              Ubicación de Stock: Pasillo A, Estante 3
            </strong>
        </div>

      </div>

      {/* FOOTER DE ACCIONES ESPECÍFICAS */}
      <div className="flex justify-end space-x-3 p-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        
        <button 
          onClick={handleClearAll} 
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition duration-150 transform hover:scale-105"
        >
          <span className="material-symbols-outlined align-middle mr-2">delete_forever</span>
          Limpiar Todo
        </button>
        
        <button 
          onClick={handleConfirmAll} 
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition duration-150 transform hover:scale-105"
        >
          <span className="material-symbols-outlined align-middle mr-2">check_circle</span>
          Confirmar Todo
        </button>
        
        <button 
          onClick={handleConfirmItem} 
          className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition duration-150 transform hover:scale-105"
        >
          <span className="material-symbols-outlined align-middle mr-2">task_alt</span>
          Confirmar Item
        </button>
        
      </div>
      
    </div>
  );
};

// Componente auxiliar para un layout de detalle más limpio
interface DetailBlockProps {
    label: string;
    value: string | number;
    className?: string;
}

const DetailBlock: React.FC<DetailBlockProps> = ({ label, value, className = 'bg-gray-100' }) => (
    <div className={`p-2 rounded-md ${className}`}>
        <p className="text-xs font-medium text-gray-500 uppercase">{label}</p>
        <p className="text-xl font-extrabold">{value}</p>
    </div>
);

export default OrderDetails;