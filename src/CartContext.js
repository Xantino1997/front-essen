import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (productData) => {
    setCart([...cart, productData]);
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
}
