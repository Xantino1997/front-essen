// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { CartProvider } from './CartContext'; // Agrega esta importación

import IndexPages from './pages/IndexPages';
import About from './pages/About';
import ProductCarousel from './pages/Productos';
import EditarProductos from './pages/EditarProductos';
import LoginForm from "./pages/LoginForm";
import Layout from './Layout';
import Error404 from './Error404';

function PrivateRoute({ element }) {
  // ... Resto del código del PrivateRoute
}

function App() {
  return (
    <UserProvider>
      <CartProvider> {/* Agrega el CartProvider aquí */}
        <Router>
          <Routes>
            {/* Use the Layout component as a layout for all routes */}
            <Route path="/" element={<Layout />}>
              {/* Index page */}
              <Route index element={<IndexPages />} />

              {/* About page */}
              <Route path="/about" element={<About />} />

              {/* Product Carousel page */}
              <Route path="/productos" element={<ProductCarousel />} />

              {/* Login page */}
              <Route path="/sign-in" element={<LoginForm />} />

              {/* Protected route */}
              <Route
                path="/editar-productos"
                element={<PrivateRoute element={<EditarProductos />} />}
              />

              {/* Catch-all route for 404 errors */}
              <Route path="*" element={<Error404 />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider> {/* Cierre del CartProvider */}
    </UserProvider>
  );
}

export default App;


// El componente PrivateRoute devuelve un Route con el elemento especificado si el usuario está logueado. Además, se envuelve el componente EditarProductos dentro del componente PrivateRoute cuando lo definimos en las rutas.

// Estocpermite que la ruta de EditarProductos solo sea accesible cuando el usuario esté logueado. Si el usuario no está logueado y trata de acceder a esa ruta, será redirigido automáticamente al formulario de inicio de sesión.

// El componente PrivateRoute: Es un componente funcional que recibe una prop element. El componente utiliza el hook useUserContext para obtener el estado de autenticación del contexto de usuario (user). Si el usuario está autenticado, simplemente renderiza el componente element. Si el usuario no está autenticado, redirige al usuario a la página de inicio de sesión usando el componente Navigate de react-router-dom.