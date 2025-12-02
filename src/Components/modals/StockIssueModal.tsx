import React from "react";

export interface StockIssueItem {
  id: number;
  title: string;
  requestedQty: number;
  availableQty: number;
}

interface StockIssueModalProps {
  open: boolean;
  issues: StockIssueItem[];
  onClose: () => void;
  onAcceptAvailable: (items: StockIssueItem[]) => void;
  onDiscard: (items: StockIssueItem[]) => void;
}

const StockIssueModal: React.FC<StockIssueModalProps> = ({
  open,
  issues,
  onClose,
  onAcceptAvailable,
  onDiscard,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-red-500 text-3xl">
            warning
          </span>
          <h2 className="text-xl font-semibold text-gray-800">Disponibilidad insuficiente</h2>
        </div>

        <p className="text-gray-600 mb-4">
          Algunos productos en tu carrito no tienen suficiente stock disponible:
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
          <ul className="space-y-3">
            {issues.map(item => (
              <li key={item.id} className="border-b border-yellow-200 last:border-0 pb-2 last:pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <strong className="text-gray-800 block mb-1">{item.title}</strong>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-red-600">Solicitado: {item.requestedQty}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={item.availableQty > 0 ? "text-green-600" : "text-red-600"}>
                          Disponible: {item.availableQty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <button
            className="px-4 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
            onClick={() => onAcceptAvailable(issues)}
          >
            <span className="material-symbols-outlined text-sm">check_circle</span>
            Ajustar a cantidades disponibles
          </button>

          <button
            className="px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-semibold flex items-center justify-center gap-2"
            onClick={() => onDiscard(issues)}
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            Quitar productos sin stock
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Cancelar y revisar carrito
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default StockIssueModal;
