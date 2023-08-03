import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
const UserContext = createContext();

// Creamos el proveedor del contexto
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Creamos un hook personalizado para acceder al contexto más fácilmente
const useUserContext = () => useContext(UserContext);

export { UserContext, UserProvider, useUserContext };
