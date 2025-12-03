import React, { useState } from 'react'; // Importamos useState para el estado del modal
// Importamos el hook que exportamos de FeedbackProvider
import { useFeedback } from '../providers/FeedbackProvider'; 
// Importamos el OrderItem y PartialCutData para la consistencia
import type { OrderItem, PartialCutData } from './types/orderTypes'; 
import type { ToastType } from '../contexts/feedbackContext'; 
// Importamos el nuevo componente modal
import { MaterialCutModal } from '../modals/MaterialCutModal'; 

// Definición de Props: Item debe ser OrderItem o null
interface OrderDetailsProps {
    item: OrderItem | null;
    // Nueva prop: Función para notificar al componente padre que un item fue actualizado
    onItemUpdated: (itemId: number, updates: Partial<OrderItem>) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ item, onItemUpdated }) => {
    // Hook para usar los modales de confirmación y toasts
    const { showConfirm, showToast } = useFeedback();

    // Estado para controlar la visibilidad del modal de Corte Parcial
    const [isCutModalOpen, setIsCutModalOpen] = useState(false);

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

    // Determina si el ítem necesita el modal de corte (M o KG)
    const isMaterialToCut = item.requiresModification && (item.unit === 'M' || item.unit === 'KG');
    
    // ------------------------------------------
    // LÓGICA DE CORTES PARCIALES
    // ------------------------------------------
    
    const handleOpenCutModal = () => {
        if (isMaterialToCut) {
            setIsCutModalOpen(true);
        } else {
            // Este toast nunca debería ocurrir si el botón está bien renderizado
            showToast({ type: 'info', message: 'Este artículo no requiere registro de corte parcial.' });
        }
    };

    // Función que simula el envío de datos al backend
    const handleSaveCut = async (data: PartialCutData) => {
        showToast({ type: 'info', message: 'Enviando datos de corte parcial al backend (simulación)...' });

        // En un escenario real:
        // const response = await axios.post('/api/delivery/register-cut', data);
        
        // SIMULACIÓN DE ACTUALIZACIÓN:
        // 1. Marcar el ítem como ya entregado (o cortar el stock recogido)
        // 2. Aquí usamos onItemUpdated para simular la respuesta del backend al padre.
        onItemUpdated(data.itemId, { 
            // Esto simula que el backend confirma la entrega de la cantidad cortada
            collectedQuantity: data.deliveredQuantity, 
            // Si tu tipo OrderItem tuviera isCutRegistered: true, lo pondrías aquí
        });
        
        setIsCutModalOpen(false); // Cierra el modal después de guardar
        showToast({ type: 'success', message: `Corte de ${item.cartTitle} registrado con éxito.` });
        return Promise.resolve();
    };

    // ------------------------------------------
    // LÓGICA DE BOTONES (Simulación de acciones)
    // ------------------------------------------

    const handleConfirmAll = () => {
        showConfirm({
            title: 'Confirmar toda la Recogida',
            message: '¿Estás seguro de confirmar todos los artículos recogidos para esta orden?',
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
            icon: 'backspace' as any, 
            confirmText: 'Sí, Limpiar Todo',
            onConfirm: () => {
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
                <h2 className="text-xl font-bold text-gray-700">Acciones del Artículo (ID: {item.id})</h2> 
                <button 
                    onClick={handleMakeTicket} 
                    className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-full shadow-md hover:bg-yellow-600 transition duration-150 flex items-center"
                >
                    <span className="material-symbols-outlined mr-2">print</span>
                    Ticket / Etiqueta
                </button>
            </div>
            
            {/* BOTÓN DE CORTE PARCIAL (Aparece si el ítem lo requiere) */}
            {isMaterialToCut && (
                <button 
                    onClick={handleOpenCutModal} 
                    className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-full shadow-md hover:bg-purple-700 transition duration-150 flex items-center justify-center"
                >
                    <span className="material-symbols-outlined mr-2">content_cut</span>
                    Registrar Corte Parcial
                </button>
            )}

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
                    <DetailBlock label="Unidad de Venta" value={item.unit} /> {/* Usamos item.unit */}

                    <DetailBlock 
                        label="Cantidad Solicitada" 
                        value={`${item.requestedQuantity} ${item.unit}`} 
                        className="bg-red-50 text-red-700"
                    />
                    <DetailBlock 
                        label="Inventario Disponible" 
                        value={`${item.availableStock} ${item.unit}`} 
                        className="bg-green-50 text-green-700"
                    />
                    
                    <DetailBlock 
                        label="Cantidad Recogida" 
                        value={`${item.collectedQuantity} ${item.unit}`} 
                        className="col-span-2 bg-blue-100 text-blue-800 font-bold"
                    />

                    {/* Alerta de modificación */}
                    {item.requiresModification && (
                        <div className="col-span-2 p-3 mt-2 bg-yellow-100 rounded-lg border border-yellow-400 flex items-center shadow-sm">
                            <span className="material-symbols-outlined mr-2 text-yellow-700">build</span>
                            <strong className="text-yellow-800">Requiere Ajuste Manual:</strong>
                            <span className="ml-2 text-sm text-yellow-700">Material rollo/peso ({item.unit}). La cantidad recogida debe ser verificada y ajustada en la entrega.</span>
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
            
            {/* 4. Renderizar el Nuevo Modal */}
            {item && isMaterialToCut && (
                <MaterialCutModal
                    item={item}
                    isOpen={isCutModalOpen}
                    onClose={() => setIsCutModalOpen(false)}
                    onSaveCut={handleSaveCut}
                />
            )}
            
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