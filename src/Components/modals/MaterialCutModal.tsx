import React, { useState, useEffect } from 'react';
// Asegúrate que la ruta de importación de tipos sea correcta
import type { OrderItem, PartialCutData } from '../Components/types/orderTypes';
// Importar el hook de feedback (ajusta la ruta si es necesario)
import { useFeedback } from '../../providers/FeedbackProvider'; 

interface MaterialCutModalProps {
  item: OrderItem; // El ítem que necesita el corte
  isOpen: boolean;
  onClose: () => void;
  // Función que recibirá los datos validados para enviar al backend (simulación)
  onSaveCut: (data: PartialCutData) => Promise<void>; 
}

export const MaterialCutModal: React.FC<MaterialCutModalProps> = ({ item, isOpen, onClose, onSaveCut }) => {
  // Asumimos que useFeedback está disponible
  const { showToast } = useFeedback(); 
  
  // Estado para las cantidades que el usuario ingresa
  const [delivered, setDelivered] = useState<number>(0);
  const [leftover, setLeftover] = useState<number>(0);
  const [error, setError] = useState<string>('');

  // Sincronizar estados al abrir el modal
  useEffect(() => {
    if (isOpen) {
      const baseQuantity = item.collectedQuantity;
      
      // Inicializar con la cantidad solicitada (lo más lógico es que quieran entregar eso)
      setDelivered(item.requestedQuantity); 
      // Sobrante inicial es el material base menos lo solicitado
      const initialLeftover = Math.max(0, baseQuantity - item.requestedQuantity);
      setLeftover(initialLeftover); 
      setError('');
    }
  }, [isOpen, item]);

  if (!isOpen) return null;

  // Propiedades del Item
  const baseQuantity = item.collectedQuantity;
  const unit = item.unit.toLowerCase();

  // ------------------------------------------
  // Lógica de Validación y Cálculo
  // ------------------------------------------

  // Manejador para el cambio de cantidad entregada
  const handleDeliveredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const deliveredValue = parseFloat(e.target.value) || 0;
    
    // Validación de límites: no puedes entregar más de lo recogido
    if (deliveredValue > baseQuantity) {
      setError(`No puedes entregar más de ${baseQuantity} ${unit}.`);
      setDelivered(baseQuantity);
      setLeftover(0);
      return;
    }

    setDelivered(deliveredValue);
    // Calcular el sobrante automáticamente
    const newLeftover = Math.max(0, baseQuantity - deliveredValue);
    setLeftover(parseFloat(newLeftover.toFixed(3))); // Redondeo para flotantes
    setError('');
  };
  
  // Manejador para el cambio de cantidad sobrante
  const handleLeftoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const leftoverValue = parseFloat(e.target.value) || 0;
      
      // Validación de límites: el sobrante no puede ser más que el material base
      if (leftoverValue > baseQuantity) {
          setError(`El sobrante no puede ser mayor a ${baseQuantity} ${unit}.`);
          setLeftover(baseQuantity);
          setDelivered(0);
          return;
      }
      
      setLeftover(leftoverValue);
      // Calcular el entregado automáticamente
      const newDelivered = Math.max(0, baseQuantity - leftoverValue);
      setDelivered(parseFloat(newDelivered.toFixed(3)));
      setError('');
  }

  // Lógica de guardado
  const handleSave = async () => {
    const sum = delivered + leftover;
    
    if (delivered <= 0) {
        setError(`La Cantidad Entregada debe ser mayor a cero.`);
        return;
    }
    
    // Validación final: La suma debe ser igual al material base (CollectedQuantity)
    if (Math.abs(sum - baseQuantity) > 0.001) { 
      setError(`Error: Entregado (${delivered}) + Sobrante (${leftover}) debe sumar ${baseQuantity} ${unit}.`);
      return;
    }

    try {
      await onSaveCut({ 
        itemId: item.id, 
        deliveredQuantity: delivered, 
        leftoverQuantity: leftover 
      });
    } catch (e) {
      setError('Error al registrar el corte. Falló la comunicación.');
      // El toast se maneja en OrderDetails, pero lo dejamos aquí por si acaso
      showToast({ type: 'error', message: 'Fallo la comunicación con el backend.' }); 
    }
  };
  
  // ------------------------------------------
  // Renderizado
  // ------------------------------------------

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg">
        <h3 className="text-xl font-bold mb-4 text-blue-600 flex items-center">
            <span className="material-symbols-outlined mr-2">cut</span>
            Registro de Corte Parcial
        </h3>
        <p className="mb-4 text-gray-700">
            Producto: <strong className="font-semibold">{item.cartTitle}</strong>
        </p>
        
        {/* Cantidad Base (Recogida) */}
        <div className="bg-blue-50 p-3 rounded-md mb-4 border border-blue-200">
            <p className="text-sm text-blue-800 font-medium">Material Base a Cortar (Recogido):</p>
            <p className="text-2xl font-extrabold text-blue-900">{baseQuantity} {unit}</p>
            <p className="text-xs text-blue-600 mt-1">
                La suma de Entregado + Sobrante debe ser igual a esta cantidad.
            </p>
        </div>

        {/* Input: Cantidad Entregada (el corte) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad Final Entregada al Cliente ({unit})
          </label>
          <input
            type="number"
            step="any"
            value={delivered}
            onChange={handleDeliveredChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
            min="0"
            max={baseQuantity}
          />
        </div>

        {/* Input: Cantidad Sobrante */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad Sobrante (Vuelve a Inventario) ({unit})
          </label>
          <input
            type="number"
            step="any"
            value={leftover}
            onChange={handleLeftoverChange}
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-lg"
            min="0"
            max={baseQuantity}
          />
        </div>

        {/* Mostrar Error de Validación */}
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-4 flex items-center">
            <span className="material-symbols-outlined mr-2">warning</span>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Botones de Acción */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            disabled={!!error || delivered === 0} 
          >
            <span className="material-symbols-outlined align-middle mr-1">save</span>
            Registrar Corte
          </button>
        </div>
      </div>
    </div>
  );
};