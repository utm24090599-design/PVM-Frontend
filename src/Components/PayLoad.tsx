import { useState} from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface PaymentPayload {
  paymentId: string;
  labelCode: string;
  totalAmount: number;
  products: Product[];
}

const generatePaymentPayload = (cartItems: Product[]): PaymentPayload => {
  const paymentId = `PAY-${Date.now()}`;
  const labelCode = `LBL-${Math.random().toString(36).substr(2, 8)}`;
  let totalAmount = 0;
  const products: Product[] = [];

  cartItems.forEach((item) => {
    const subtotal = item.price * item.quantity;
    products.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    });
    totalAmount += subtotal;
  });

  const payload: PaymentPayload = {
    paymentId,
    labelCode,
    totalAmount,
    products,
  };

  localStorage.setItem('paymentPayload', JSON.stringify(payload));

  return payload;
};

const App = () => {
  const [cartItems] = useState<Product[]>([
    { id: 1, name: 'Producto 1', price: 10.99, quantity: 2 },
    { id: 2, name: 'Producto 2', price: 5.99, quantity: 1 },
    { id: 3, name: 'Producto 3', price: 7.99, quantity: 3 },
  ]);

  const handleGeneratePayload = () => {
    const payload = generatePaymentPayload(cartItems);
    console.log(payload);
  };

  return (
    <div>
      <h1>Generar Payload de Pago</h1>
      <button onClick={handleGeneratePayload}>Generar Payload</button>
    </div>
  );
};

export default App;