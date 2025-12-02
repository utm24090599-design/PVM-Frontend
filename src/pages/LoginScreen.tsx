import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "../components/ui/EmailInput";
import PasswordInput from "../components/ui/PasswordInput";
import { useAuth } from "../auth/UseAuth";
import { authenticateUser, setCurrentUser } from "../utils/userStorage";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError(null);

    try {
      // Intentar autenticar con el backend primero
      const { authApi } = await import('../services/api');
      const response = await authApi.login({ email, password });
      
      // Guardar token y datos del usuario
      login(response.token, response.user.role);
      setCurrentUser({
        id: response.user.id,
        nombre: response.user.name,
        email: response.user.email,
        password: '', // No guardar password
        role: response.user.role as any,
        createdAt: new Date().toISOString(),
      });

      // Redirigir según el rol
      if (response.user.role === 'CLIENT') {
        navigate("/app/catalog");
      } else {
        navigate("/app/dashboard");
      }
    } catch (err: any) {
      // Si falla el backend, intentar con usuarios locales (fallback)
      const user = authenticateUser(email, password);
      
      if (!user) {
        setError(err.response?.data?.message || "Email o contraseña incorrectos");
        return;
      }

      // Guardar usuario en sesión
      setCurrentUser(user);
      login(`token-${user.id}`, user.role);

      // Redirigir según el rol
      if (user.role === 'CLIENT') {
        navigate("/app/catalog");
      } else {
        navigate("/app/dashboard");
      }
    }
  };
  //Formulario
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <EmailInput
            label="Email"
            name="email"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          <PasswordInput
            label="Contraseña"
            name="password"
            value={password}
            onChange={(value) => setPassword(value)}
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 font-semibold"
          >
            Iniciar sesión
          </button>
          {error && (
            <p className="text-red-500 mt-2 text-sm text-center">
              {error}
            </p>
          )}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">Usuarios de prueba:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• receptionist@test.com / 123456</li>
              <li>• inventory@test.com / 123456</li>
              <li>• sale@test.com / 123456</li>
              <li>• delivery@test.com / 123456</li>
            </ul>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <a href="/register" className="text-blue-600 hover:underline">
                Regístrate aquí
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
