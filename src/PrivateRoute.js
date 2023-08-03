// import React from 'react';
// import { Route, Navigate, useLocation } from 'react-router-dom';
// import { useUserContext } from './UserContext';

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const { user } = useUserContext(); // Obtén la información del usuario desde el contexto
//   const location = useLocation();

//   // Si el usuario está logueado, muestra el componente Element (ruta protegida),
//   // de lo contrario, redirige al inicio de sesión
//   return user ? <Route {...rest} element={<Element />} /> : <Navigate to={{ pathname: '/sign-in', state: { from: location } }} />;
// };

// export default PrivateRoute;
