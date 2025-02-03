"use client";

import { Suspense } from "react";
import OrderPageContent from "../components/OrderPageContent";
import Topbar from "../components/topbar";



const OrderPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Topbar/>
      <OrderPageContent />
    </Suspense>
  );
};

export default OrderPage;
