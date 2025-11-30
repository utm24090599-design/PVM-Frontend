import { useAuth } from '../auth/UseAuth';
import GridCatalogue from '../catalogue/ProductGrid';
// import OrderSection from '../components/OrderSection';
// import CheckoutPage from '../components/PntPn';

export default function Dashboard() {
  const { role } = useAuth();

  return (
    <div className=''>
      <h1>{role}</h1>
      <button type='button' onClick={()=>{
        localStorage.removeItem("cart");
      }}>Remove items</button>
      <GridCatalogue />
    </div>
  );
}