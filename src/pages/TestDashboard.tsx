import { useAuth } from '../auth/UseAuth';

export default function Dashboard() {
  const { role, logout } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Tu rol es: <strong>{role}</strong></p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}