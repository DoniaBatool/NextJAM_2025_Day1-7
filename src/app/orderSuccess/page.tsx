"use client";

import { Suspense } from "react";
import OrderSuccessContent from "../components/OrderSuccessContent";


const OrderSuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
};

export default OrderSuccessPage;
