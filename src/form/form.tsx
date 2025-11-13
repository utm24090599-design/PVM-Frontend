import React, { useState } from "react";
import axios from "axios";

export default function Form() {
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    password: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="usuario"
          placeholder="Usuario o Email"
          value={formData.usuario}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Registrarse</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
}
