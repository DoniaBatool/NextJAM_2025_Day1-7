"use client";

import { Suspense } from "react";
import OrderPageContent from "../components/OrderPageContent";


const OrderPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderPageContent />
    </Suspense>
  );
};

export default OrderPage;
