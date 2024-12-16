import React, { createContext, useState, useContext } from "react";

type Sutemeny = {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
};

type CartContextType = {
  sutemenyek: Sutemeny[];
  hozzaadSutemeny: (sutemeny: Sutemeny) => void;
  eltavolitSutemeny: (id: number) => void;
  torliKosarat: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sutemenyek, setSutemenyek] = useState<Sutemeny[]>([]);

  const hozzaadSutemeny = (sutemeny: Sutemeny) => {
    setSutemenyek((elozoKosar) => {
      const letezo = elozoKosar.find((item) => item.id === sutemeny.id);
      if (letezo) {
        return elozoKosar.map((item) =>
          item.id === sutemeny.id
            ? { ...item, quantity: item.quantity + sutemeny.quantity }
            : item
        );
      } else {
        return [...elozoKosar, sutemeny];
      }
    });
  };

  const eltavolitSutemeny = (id: number) => {
    setSutemenyek((elozoKosar) => elozoKosar.filter((item) => item.id !== id));
  };

  const torliKosarat = () => {
    setSutemenyek([]);
  };

  return (
    <CartContext.Provider value={{ sutemenyek, hozzaadSutemeny, eltavolitSutemeny, torliKosarat }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
