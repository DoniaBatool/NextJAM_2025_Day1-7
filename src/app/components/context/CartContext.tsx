"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { getStockAction, updateStockAction } from "@/app/Actions/cartActions";

interface CartItem {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  productImage: string;
  productDescription: string;
  stock: number;
  isRenovate: boolean;
  serviceType: "Purchase" | "Customize" | "Renovate";
}

interface Stock {
  productId: string;
  stock: number;
}

interface CartContextType {
  cart: CartItem[];
  stocks: Stock[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: string, serviceType: string, quantity: number) => void;
  removeItem: (productId: string, serviceType: string) => void;
  updateStock: (productId: string, newStock: number) => void;
  resetStock: (initialStocks: Stock[]) => void;
  fetchStock: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);

  const fetchStock = useCallback(async (productId: string) => {
    const stock = await getStockAction(productId);
    setStocks((prevStocks) => {
      const updatedStocks = prevStocks.map((stockItem) =>
        stockItem.productId === productId ? { ...stockItem, stock } : stockItem
      );
      if (!updatedStocks.find((s) => s.productId === productId)) {
        updatedStocks.push({ productId, stock });
      }
      return updatedStocks;
    });
  }, []);

  const addToCart = async (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.productId === item.productId && cartItem.serviceType === item.serviceType
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.productId === item.productId && cartItem.serviceType === item.serviceType
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevCart, item];
      }
    });

    if (!item.isRenovate) {
      setStocks((prevStocks) =>
        prevStocks.map((stock) =>
          stock.productId === item.productId ? { ...stock, stock: stock.stock - item.quantity } : stock
        )
      );
    }

    await updateStockAction(item.productId, item.isRenovate ? 0 : -item.quantity);
    await fetchStock(item.productId);
  };

  const updateQuantity = async (productId: string, serviceType: string, newQuantity: number) => {
    const currentQuantity =
      cart.find((item) => item.productId === productId && item.serviceType === serviceType)?.quantity || 0;
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.productId === productId && cartItem.serviceType === serviceType
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );

    const quantityChange = newQuantity - currentQuantity;
    if (serviceType !== "Renovate") {
      await updateStockAction(productId, -quantityChange);
      await fetchStock(productId);
    }
  };

  const removeItem = async (productId: string, serviceType: string) => {
    const removedItem = cart.find((item) => item.productId === productId && item.serviceType === serviceType);
    if (removedItem) {
      setStocks((prevStocks) =>
        prevStocks.map((stock) =>
          stock.productId === productId ? { ...stock, stock: stock.stock + removedItem.quantity } : stock
        )
      );

      setCart((prevCart) =>
        prevCart.filter((cartItem) => !(cartItem.productId === productId && cartItem.serviceType === serviceType))
      );

      await updateStockAction(productId, removedItem.quantity);
      await fetchStock(productId);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        stocks,
        addToCart,
        updateQuantity,
        removeItem,
        updateStock: () => {},
        resetStock: () => {},
        fetchStock,
      }}
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
