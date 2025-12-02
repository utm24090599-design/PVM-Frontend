import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";
import NameInput from "../components/ui/NameInput";
import EmailInput from "../components/ui/EmailInput";
import PasswordInput from "../components/ui/PasswordInput";
import { createUser } from "../utils/userStorage";

export default function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    password: "",
  });
  const [validpassword, setValidPassword] = useState(false);
  const [validemail, setValidEmail] = useState(false);
  const [validNombre, setValidNombre] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    // Validar que todos los campos sean válidos
    if (!validNombre || !validemail || !validpassword) {
      setError("Por favor completa todos los campos correctamente");
      return;
    }

    try {
      // Intentar registrar en el backend primero
      const { authApi } = await import('../services/api');
      await authApi.register({
        nombre: formData.nombre,
        email: formData.usuario,
        password: formData.password,
      });
      
      setMensaje("Usuario registrado exitosamente. Redirigiendo al login...");
      
      // Redirigir al login después de 1.5 segundos
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      // Si falla el backend, intentar crear usuario localmente (fallback)
      try {
        createUser(formData.nombre, formData.usuario, formData.password, 'CLIENT');
        setMensaje("Usuario registrado exitosamente. Redirigiendo al login...");
        
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (localErr) {
        if (localErr instanceof Error) {
          setError(localErr.message);
        } else {
          setError(err.response?.data?.message || "Error al registrar usuario");
        }
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-card">
        <h2>Registro</h2>
         <NameInput
         //validacion de nombre integrada
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(value, valid) => {
            setFormData((prev) => ({...prev, nombre: value}));
            setValidNombre(valid);
          }}
          onBlur={(_value, valid)=>{
            setValidNombre(valid);
          }}
         />
        
          <EmailInput
          //validacion de email integrada
          name="usuario"
          placeholder="Correo"
          value={formData.usuario}
          onChange={(value, valid) => {
            setFormData((prev) => ({...prev, usuario: value}));
            setValidEmail(valid);
          }}
          onBlur={(_value, valid)=>{
            setValidEmail(valid);
          }}
         />
          
       
        <PasswordInput
        //validacion de password integrada
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(value, valid) => {
            setFormData((prev) => ({...prev, password: value}));
            setValidPassword(valid);
          }}
          onBlur={(_value, valid)=>{
            setValidPassword(valid);
          }}
         />
        <button type="submit" disabled={!validNombre || !validemail || !validpassword}>
          Registrarse
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {mensaje && <p className="text-green-500">{mensaje}</p>}
      </form>
    </div>
  );
}
