'use client';
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getStockAction, updateStockAction } from "@/app/Actions/cartActions";

// ✅ Cart Item Interface
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

// ✅ Stock Interface
interface Stock {
  productId: string;
  stock: number;
}

// ✅ Cart Context Type
interface CartContextType {
  cart: CartItem[];
  stocks: Stock[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: string, serviceType: string, quantity: number) => void;
  removeItem: (productId: string, serviceType: string) => void;
  fetchStock: (productId: string) => void;
  clearCart: () => void;
}

// ✅ Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);

  // ✅ Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // ✅ Save cart to localStorage when cart updates
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart"); // ✅ Remove cart from storage when empty
    }
  }, [cart]);

  // ✅ Fetch stock (Optimized to prevent unnecessary updates)
  const fetchStock = useCallback(async (productId: string) => {
    const stock = await getStockAction(productId);
    setStocks((prevStocks) => {
      const existingStock = prevStocks.find((s) => s.productId === productId);
      if (existingStock && existingStock.stock === stock) {
        return prevStocks; // ✅ Prevent unnecessary re-renders
      }
      return prevStocks.map((s) =>
        s.productId === productId ? { ...s, stock } : s
      );
    });
  }, []);

  // ✅ Add to Cart
  const addToCart = async (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.productId === item.productId && cartItem.serviceType === item.serviceType
      );
      return existingItem
        ? prevCart.map((cartItem) =>
            cartItem.productId === item.productId && cartItem.serviceType === item.serviceType
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          )
        : [...prevCart, item];
    });

    if (!item.isRenovate) {
      await updateStockAction(item.productId, -item.quantity);
      await fetchStock(item.productId);
    }
  };

  // ✅ Update Quantity
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
    if (quantityChange !== 0 && serviceType !== "Renovate") {
      await updateStockAction(productId, -quantityChange);
      await fetchStock(productId);
    }
  };

  // ✅ Remove Item
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

  // ✅ Clear Cart (when order is confirmed)
  const clearCart = () => {
    setCart([]); // ✅ Empty cart state
    localStorage.removeItem("cart"); // ✅ Remove cart from localStorage
  };

  return (
    <CartContext.Provider value={{ cart, stocks, addToCart, updateQuantity, removeItem, fetchStock, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom Hook to Use Cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
