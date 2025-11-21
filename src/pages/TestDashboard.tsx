// import { useAuth } from '../auth/UseAuth';
import CardsDemo from '../Components/CardsDemo';

export default function Dashboard() {
  // const { role, logout } = useAuth();

  return (
    <div className='mt-[100px] grid place-content-center gap-4'>
      <div className='absolute right-0 top-0 m-4 p-2 bg-gray-500 rounded-[10px]'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></div>
      <CardsDemo />
    </div>
  );
}