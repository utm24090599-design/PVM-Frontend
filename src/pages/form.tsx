import React, { useState } from "react";
import axios from "axios";
import "../styles/form.css";
import NameInput from "../components/ui/NameInput";
import EmailInput from "../components/ui/EmailInput";
import PasswordInput from "../components/ui/PasswordInput";

export default function Form() {
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    password: "",
  });
  const [validpassword, setvalidpassword] = useState (false);
  const [validemail, setvalidemail] = useState (false);
  const [validNombre, setvalidNombre] = useState (false);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       //por ahora depende de la peticion que se realiza al back para enviar los datos registrados
      const response = await axios.post(
        "Backend", 
        formData
      );
      setMensaje("Usuario registrado: " + response.data.message);
    } catch (error) {
      console.error(error);
      setMensaje(" Error al registrar usuario");
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
            setvalidNombre(valid);
          }}
          onBlur={(value, valid)=>{
            setvalidNombre(valid);
          }}
         />
        
          <EmailInput
          //validacion de email integrada
          name="usuario"
          placeholder="Correo"
          value={formData.usuario}
          onChange={(value, valid) => {
            setFormData((prev) => ({...prev, usuario: value}));
            setvalidemail(valid);
          }}
          onBlur={(value, valid)=>{
            setvalidemail(valid);
          }}
         />
          
       
        <PasswordInput
        //validacion de password integrada
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(value, valid) => {
            setFormData((prev) => ({...prev, password: value}));
            setvalidpassword(valid);
          }}
          onBlur={(value, valid)=>{
            setvalidpassword(valid);

          }}
         />
        <button type="submit">Registrarse</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
}
