import { useState } from "react";
import QRCode from "react-qr-code";

interface PaymentLabelProps {
  total: number;
  paymentId: string;
  codeType?: "qr" | "barcode";
  codeValue: string;
}

export default function PaymentLabel({ total, paymentId, codeType = "qr", codeValue }: PaymentLabelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="p-4 rounded-2xl shadow-md bg-white">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-semibold text-center">Pago del Pedido</h2>

          {codeType === "qr" ? (
            <div className="bg-white p-3 rounded-xl">
              <QRCode value={codeValue} size={180} />
            </div>
          ) : (
            <img
              src={`https://api-bwipjs.metafloor.com/?bcid=code128&text=${encodeURIComponent(
                codeValue
              )}&scale=3&height=10&includetext`} 
              alt="Código de barras"
              className="bg-white p-2 rounded-xl"
            />
          )}

          <div className="text-center">
            <p className="text-lg font-medium">Total a pagar:</p>
            <p className="text-2xl font-bold">${total}</p>
          </div>

          <div className="w-full text-center">
            <p className="text-sm text-gray-600">ID de pago</p>
            <p className="font-mono text-lg">{paymentId}</p>
            <button
              onClick={handleCopy}
              className="mt-2 px-3 py-1 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm"
            >
              {copied ? "Copiado!" : "Copiar ID"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
