import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StylesPages/Header.css";
import logoEssen from "./assets/logo-essen.png";
import carrito from "./assets/carrito-compras.png";
import userImage from "./assets/profile.png";
import { useUserContext } from "./UserContext";
import { useCart } from "./CartContext"; // Importa el contexto del carrito

const Header = () => {
  const [activeLink, setActiveLink] = useState("Inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const { cart, addToCart, emptyCart } = useCart(); // Obtiene el estado del carrito desde el contexto del carrito

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("precompras")) || [];
    addToCart(storedCart);
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // 1. Limpiar la información del usuario del contexto
    setUser(null);

    // 2. Eliminar cualquier token de sesión o información de autenticación almacenada en el navegador
    // Por ejemplo, si estás utilizando sessionStorage, puedes hacer:
    sessionStorage.removeItem("token");

    // 3. Redirigir al usuario a la página de inicio o a la página de inicio de sesión
    navigate("/"); // Redireccionar a la página de inicio
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleEmptyCart = () => {
    // Vaciar el carrito
    emptyCart();
    setIsCartOpen(false);
  };

  const CloseCart = () => {
    // cerrar el carrito
    setIsCartOpen(false);
  };

  return (
    <header className="header-div">
      <div className="logo">
        <img className="logo-img" src={logoEssen} alt="Logo" />
      </div>

      {/* Botón del menú hamburguesa */}
      {isMenuOpen ? (
        <button className="menu-btn-cerrar" onClick={handleMenuToggle}>
          Cerrar
        </button>
      ) : (
        <button className="menu-btn" onClick={handleMenuToggle}></button>
      )}

      <nav className={isMenuOpen ? "open" : ""}>
        <ul>
          <li className={activeLink === "Inicio" ? "active" : ""}>
            <Link to="/" onClick={() => handleLinkClick("Inicio")}>
              Inicio
            </Link>
          </li>
          <li className={activeLink === "Nosotros" ? "active" : ""}>
            <Link to="/nosotros" onClick={() => handleLinkClick("Nosotros")}>
              Nosotros
            </Link>
          </li>
          <li className={activeLink === "Productos" ? "active" : ""}>
            <Link to="/productos" onClick={() => handleLinkClick("Productos")}>
              Productos
            </Link>
          </li>

          {user ? (
            <>
              <li className={activeLink === "EditarProductos" ? "active" : ""}>
                <Link
                  to="/editar-productos"
                  onClick={() => handleLinkClick("EditarProductos")}
                >
                  Editar Productos
                </Link>
              </li>
              <li>
                <button className="header-login-btn" onClick={handleLogout}>
                  Salir
                </button>
              </li>
              <hr />
              <img
                className="header-login-img"
                src={user.profilePicture || userImage}
                alt="Usuario"
              />
              <hr />
              <br />
              <h2 className="header-login-parrafo">
                Bienvenido {user.username}
              </h2>
              <hr />
            </>
          ) : (
            <>
              <li>
                <Link to="/sign-in">Iniciar Sesión</Link>
              </li>
              <div className="carrito-compra" onClick={handleCartToggle}>
                <img
                  className="carrito-img"
                  src={carrito}
                  alt="Carrito de compras"
                />
                <h4
                  className={
                    cart.length > 0
                      ? "carrito-cantidad-ligthblue"
                      : "carrito-cantidad-red"
                  }
                >
                  {cart.length}
                </h4>{" "}
                {/* Muestra el total de productos en el carrito */}
              </div>
              {/* Mostrar el carrito cuando isCartOpen es verdadero */}
              {isCartOpen && (
                <div className="carrito-lista">
                  <h2 className="carrito-lista-titulo">Carrito de compras</h2>
                  {cart.length > 0 ? (
                    <>
                      <ul>
                        {cart.map((product, index) => (
                          <li className="carrito-lista-cantidad" key={index}>
                            {product.title}
                            <br /> Cantidad: {product.quantity}
                            {/* Mostrar la imagen principal del producto */}
                            <img
                              className="carrito-img"
                              src={product.image}
                              alt={`Imagen de ${product.title}`}
                            />
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <p>No hay nada nuevo aquí</p>
                      <button className="empty-cart-btn" onClick={CloseCart}>
                        Cerrar
                      </button>
                    </>
                  )}
                  {cart.length > 0 && (
                    <>
                      <button
                        className="empty-cart-btn"
                        onClick={handleEmptyCart}
                      >
                        Vaciar Carrito
                      </button>
                      <button className="empty-cart-btn" onClick={CloseCart}>
                        Cerrar
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
