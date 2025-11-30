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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[420px]">
        
        <h2 className="text-xl font-semibold mb-2">Disponibilidad insuficiente</h2>

        <p className="mb-4">Algunos productos no tienen suficiente stock:</p>

        <ul className="list-disc list-inside space-y-1 mb-4">
          {issues.map(item => (
            <li key={item.id}>
              <strong>{item.title}</strong> — Pedidos: {item.requestedQty}, Disponibles: {item.availableQty}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 mt-4">
          <button
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            onClick={() => onAcceptAvailable(issues)}
          >
            Usar cantidades disponibles
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            onClick={() => onDiscard(issues)}
          >
            Quitar productos
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default StockIssueModal;
