import React from 'react';
import "./StylesPages/Error404.css";
import notFound from "./assets/not-found.png"

function Error404() {
  return (
    <div className="contenedor">
      <h1>No se encontró</h1>
      <img className="imagen" src={notFound} alt="Not Found" />
      <h3>Lo sentimos, no encontramos esa ruta</h3>
    </div>
  );
}

export default Error404;
