import { useState } from "react";
import axios from "axios";
import EmailInput from "../components/ui/EmailInput";
import NameInput from "../components/ui/NameInput";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  type ErrorState = string | Error | null;
  const [error, setError] = useState<ErrorState>(null);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await axios.post("URL_BACKEND/api/login", {
        email,
        password,
      });
      console.log(response.data);
      // Redirigir al usuario a la página principal después del login exitoso
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        setError(String(error));
      }
    }
  };
  //Formulario
  return (
    <form onSubmit={handleSubmit}>
      <h2> Login </h2>
      <EmailInput
        label="Email"
        name="email"
        value={email}
        onChange={(value) => setEmail(value)}
      />
      <br />
      <NameInput
        label="Contraseña"
        name="password"
        value={password}
        onChange={(value) => setPassword(value)}
      />
      <br />
      <button type="submit"> Iniciar sesión </button>
      {error && (
        <p className="text-blue-500">
          {error instanceof Error ? error.message : error}
        </p>
      )}
    </form>
  );
}

export default LoginForm;
