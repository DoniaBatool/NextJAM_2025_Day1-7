"use client";

import { Suspense } from "react";
import OrderSuccessContent from "../components/OrderSuccessContent";
import Topbar from "../components/topbar";


const OrderSuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
<Topbar/>
      <OrderSuccessContent />
    </Suspense>
  );
};

export default OrderSuccessPage;
