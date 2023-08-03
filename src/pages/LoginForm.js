import React, { useState } from "react";
import "../StylesPages/LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUserContext } from "../UserContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { setUser } = useUserContext(); // Accede a la función setUser desde el UserContext
  const navigate = useNavigate(); // Hook useNavigate para redirigir después del inicio de sesión

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      Swal.fire({
        icon: "error",
        title: "Error al enviar datos",
        text: "Debes aceptar los términos y condiciones para continuar.",
      });
      return;
    }

    try {
      // Envía las credenciales al backend para obtener el resultado del inicio de sesión
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const { success, user } = data;

      if (success) {
        // Guarda los datos del usuario en el contexto
        setUser(user);

        Swal.fire({
          icon: "success",
          title: "Datos enviados",
          text: "Has iniciado sesión correctamente.",
        }).then(() => {
          navigate("/"); // Redirige a la página de inicio después del inicio de sesión exitoso
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al enviar datos",
          text: "Credenciales inválidas. Por favor, verifica tu nombre de usuario y contraseña.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al enviar datos",
        text:
          error.message ||
          "Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo más tarde.",
      });
    }
  };

  return (
    <div className="login-form">
      <form className="form" onSubmit={handleLogin}>
      <h2 className="login-form-title">Iniciar Sesión</h2>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <br />

        <button className="form-btn" type="submit">
          Ingresar
        </button>
        <div className="restart-password">
          <Link to="#">Olvidaste tu contraseña</Link>
          <div className="terms">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
              required
            />
            <label>Acepto los términos y condiciones</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
