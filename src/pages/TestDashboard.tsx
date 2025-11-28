// import { useAuth } from '../auth/UseAuth';
import GridCatalogue from '../catalogue/ProductGrid';
import { useCart } from '../hooks/useCart';
// import OrderSection from '../components/OrderSection';
// import CheckoutPage from '../components/PntPn';

export default function Dashboard() {
  // const { role, logout } = useAuth();
  const { cart } = useCart();

  return (
    <div className='mt-[100px]'>
      <div className='absolute right-0 top-0 m-4 p-2 bg-gray-500 rounded-[10px]'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></div>
      <button type='button' onClick={()=>{
        localStorage.removeItem("cart");
      }}>Remove items</button>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
      <GridCatalogue />
      {/* <OrderSection /> */}
      {/* <CheckoutPage /> */}
    </div>
  );
}