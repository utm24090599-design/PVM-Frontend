import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/UseAuth';

export default function Login() {
  const [role, setRole] = useState('user');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login('fake-token', role);
    navigate('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}