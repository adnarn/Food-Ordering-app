import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCounts, setCartCounts] = useState(0);

  const updateCartCounts = (count) => {
    setCartCounts(count);
  };

  return (
    <CartContext.Provider value={{ cartCounts, updateCartCounts }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
