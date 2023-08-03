import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../StylesPages/IndexPages.css";
import whatsapp from '../assets/whatsapp-essen.jpeg'
import essen1 from '../assets/essen1.jpeg'
import essen2 from '../assets/essen2.jpeg'
import essen3 from '../assets/essen3.jpeg'
import Swal from "sweetalert2";

import { useUserContext } from "../UserContext"; // Importa el contexto de usuario

const IndexPages = () => {
  const { user } = useUserContext(); // Obtén la información del usuario desde el contexto
  const [isLoggedIn, setIsLoggedIn] = useState(!!user); // Verifica si el usuario está logeado

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleAddToMessage = () => {
    

    Swal.fire({
      title: `Deseas enviar msj al vendedor`,
      input: "text",
      inputPlaceholder: "¿Cuál es tu nombre?",
      showCancelButton: true,
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
      text: "* nombre NO obligatorio",

      preConfirm: (name) => {
        if (name) {
          const message = `Hola soy ${name}, quiero saber más de este producto.`;
          const isMobileDevice =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            );
          const whatsappURL = isMobileDevice
            ? `whatsapp://send?text=${encodeURIComponent(message)}`
            : `https://web.whatsapp.com/send?text=${encodeURIComponent(
                message
              )}`;
          window.open(whatsappURL, "_blank");
          return;
        }

        const message = "Hola , quiero saber más de este producto.";
        const isMobileDevice =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          );
        const whatsappURL = isMobileDevice
          ? `whatsapp://send?text=${encodeURIComponent(message)}`
          : `https://web.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
      },
    });
  };

  return (
    <>
      <div className="index-container">
        <Slider {...settings}>
          <div className="producto">
            <img src={essen1} alt="Imagen 1" />
            <p>Descripción de la imagen 1</p>
          </div>
          <div className="producto">
            <img src={essen2} alt="Imagen 2" />
            <p>Descripción de la imagen 2</p>
          </div>
          <div className="producto">
            <img src={essen3} alt="Imagen 3" />
            <p>Descripción de la imagen 3</p>
          </div>
          {/* Agrega más imágenes y descripciones aquí */}
        </Slider>
      </div>
      <div className="whatsapp-logo" onClick={handleAddToMessage}>
        <img className="whatsapp" src={whatsapp} alt="WhatsApp" />
      </div>
    </>
  );
};

export default IndexPages;
