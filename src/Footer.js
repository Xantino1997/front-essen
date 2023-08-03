// Footer.js
import React from "react";
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import "./StylesPages/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="column">
        <h3 className="column-contact" >Contacto</h3>
        {/* <hr style={{ borderWidth: '3px', borderColor: 'white' }} /> */}
        <ul>
          <li>
            {/* Reemplaza el <a> por Link */}
            <Link to="#">Email: example@gmail.com</Link>
          </li>
          <li>
            {/* Reemplaza el <a> por Link */}
            <Link to="#">Tel: 3461 455 3345</Link>
          </li>
        </ul>
      </div>
      <div className="column">
        <h3 className="column-contact">Redes Sociales</h3>
        {/* <hr style={{ borderWidth: '3px', borderColor: 'white' }} /> */}
        <ul>
          <li>
            {/* Reemplaza el <a> por Link */}
            <Link to="#">Facebook</Link>
          </li>
          <li>
            {/* Reemplaza el <a> por Link */}
            <Link to="#">Twitter</Link>
          </li>
          <li>
            {/* Reemplaza el <a> por Link */}
            <Link to="#">Instagram</Link>
          </li>
        </ul>
      </div>
      {/* <div className="column">
        <h3>Suscríbete</h3>
        <form>
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Correo electrónico" />
          <button type="submit">Enviar</button>
        </form>
      </div> */}
    </footer>
  );
};

export default Footer;
