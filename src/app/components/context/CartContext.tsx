"use client";
import { createContext, useContext, useState, useCallback } from "react";

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
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getStock?productId=${productId}`
      );
      if (response.ok) {
        const data = await response.json();
        setStocks((prevStocks) => {
          const updatedStocks = prevStocks.map((stock) =>
            stock.productId === productId ? { ...stock, stock: data.stock } : stock
          );
  
          // If product stock is not in the array, add it
          if (!updatedStocks.find((s) => s.productId === productId)) {
            updatedStocks.push({ productId, stock: data.stock });
          }
  
          return updatedStocks;
        });
      } else {
        console.error("Failed to fetch stock");
      }
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
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
          stock.productId === item.productId
            ? { ...stock, stock: stock.stock - item.quantity }
            : stock
        )
      );
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateStock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.productId,
          quantityChange: item.isRenovate ? 0 : -item.quantity,
        }),
      });

      if (response.ok) {
        await fetchStock(item.productId);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  const updateQuantity = async (productId: string, serviceType: string, newQuantity: number) => {
    const currentQuantity = cart.find((item) => item.productId === productId && item.serviceType === serviceType)?.quantity || 0;
  
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.productId === productId && cartItem.serviceType === serviceType
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  
    // Calculate the quantity change (difference between new and old quantity)
    const quantityChange = newQuantity - currentQuantity;
  
    // Update stock in Sanity for "Purchase" and "Customize" services only
    if (serviceType !== "Renovate") {
      try {
        // When the quantity increases, stock decreases; when quantity decreases, stock increases
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateStock`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId,
            quantityChange: -quantityChange,  // Negate the quantity change to reverse stock
          }),
        });
  
        if (response.ok) {
          await fetchStock(productId);  // Re-fetch stock to update the stock data in your context
        }
      } catch (error) {
        console.error("Error updating quantity in Sanity:", error);
      }
    }
  };
  

  const removeItem = async (productId: string, serviceType: string) => {
    const removedItem = cart.find((item) => item.productId === productId && item.serviceType === serviceType);
    if (removedItem) {
      setStocks((prevStocks) =>
        prevStocks.map((stock) =>
          stock.productId === productId
            ? { ...stock, stock: stock.stock + removedItem.quantity }
            : stock
        )
      );

      setCart((prevCart) => prevCart.filter(
        (cartItem) => !(cartItem.productId === productId && cartItem.serviceType === serviceType)
      ));

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateStock`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId,
            quantityChange: removedItem.quantity,
          }),
        });

        if (response.ok) {
          await fetchStock(productId);
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
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
