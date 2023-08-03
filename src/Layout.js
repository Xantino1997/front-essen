import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Importa useLocation
import Header from './Header';
import Footer from './Footer';
import CircleLoader from './pages/CircleLoader'; // Importa el CircleLoader

export default function Layout() {
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const location = useLocation(); // Obtiene la ubicación actual de la ruta

  // Simula el tiempo de carga para el CircleLoader (2 segundos en este ejemplo)
  useEffect(() => {
    setIsContentLoaded(false); // Asegúrate de establecer el estado en 'false' cada vez que cambie la ubicación

    const timer = setTimeout(() => {
      setIsContentLoaded(true);
    }, 900); // Cambia este tiempo por el que necesites para simular el tiempo de carga

    return () => clearTimeout(timer); // Limpia el temporizador cuando el componente se desmonte
  }, [location]); // Vuelve a cargar el CircleLoader cada vez que cambie la ubicación

  return (
    <main style={{ padding: '10px', paddingTop: '0px' }}>
      <Header />
      <>
        <br /> {/* Etiqueta <br> para salto de línea */}
        <br /> {/* Etiqueta <br> para salto de línea */}
        <br /> {/* Etiqueta <br> para salto de línea */}
        <br /> {/* Etiqueta <hr> para una línea horizontal */}
      </>
      {/* Mostrar el CircleLoader mientras el contenido se está cargando */}
      {!isContentLoaded ? <CircleLoader /> : null}
      {/* Renderizar el Outlet para mostrar el contenido de la página actual */}
      <Outlet />
      <br />
      <Footer />
    </main>
  );
}
