"use client";
import Cartpage from "@/app/components/Cartpage";
import { useEffect, useState } from "react";
import { getStockAction } from "../Actions/cartActions";
import {  useCart } from "@/context/CartContext";

export default function Cart() {
  const { cart } = useCart();
  const productIds = cart.map((item) => item.productId);

  const [stockData, setStockData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    async function fetchStock() {
      const stockDataArray = await Promise.all(productIds.map(getStockAction));
      const stockMap = productIds.reduce<{ [key: string]: number }>((acc, id, index) => {
        acc[id] = stockDataArray[index];
        return acc;
      }, {});
      setStockData(stockMap);
    }
    if (productIds.length > 0) {
      fetchStock();
    }
  }, [productIds]);

  return <Cartpage stockData={stockData} />;
}
