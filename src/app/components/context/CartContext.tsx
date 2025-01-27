"use client";
import { createContext, useContext, useState } from "react";

interface CartItem {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  productImage: string;
  productDescription: string;
  stock:number;
  isRenovate:true;
  
  
}

interface Stock {
  productId: string;
  stock: number;
}

interface CartContextType {
  cart: CartItem[];
  stocks: Stock[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateStock: (productId: string, newStock: number) => void;
  resetStock: (initialStocks: Stock[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]); // Manage product stock levels

  // Add an item to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.productId === item.productId);

      if (existingItem) {
        // Update quantity if the item already exists in the cart
        return prevCart.map((cartItem) =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Add new item to the cart
        return [...prevCart, item];
      }
    });

    // Update stock
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.productId === item.productId
          ? { ...stock, stock: stock.stock - item.quantity }
          : stock
      )
    );
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.productId === productId ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  // Remove an item from the cart
  const removeItem = (productId: string) => {
    const removedItem = cart.find((item) => item.productId === productId);

    if (removedItem) {
      // Restore the stock for the removed item
      setStocks((prevStocks) =>
        prevStocks.map((stock) =>
          stock.productId === productId
            ? { ...stock, stock: stock.stock + removedItem.quantity }
            : stock
        )
      );
    }

    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.productId !== productId));
  };

  // Update the stock for a specific product
  const updateStock = (productId: string, newStock: number) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.productId === productId ? { ...stock, stock: newStock } : stock
      )
    );
  };

  // Reset all stock values (useful for initial loading or resetting stock globally)
  const resetStock = (initialStocks: Stock[]) => {
    setStocks(initialStocks);
  };

  return (
    <CartContext.Provider
      value={{ cart, stocks, addToCart, updateQuantity, removeItem, updateStock, resetStock }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
